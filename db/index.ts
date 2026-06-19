import { drizzle } from "drizzle-orm/neon-http";
import { neon, neonConfig } from "@neondatabase/serverless";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set. See .env.example.");
}

// The neon-http driver runs every query as a one-shot HTTPS fetch to Neon's
// SQL endpoint. When Neon's compute is autosuspended (it scales to zero after
// idle on the free/launch tiers), the first query has to wake it — and that
// wake, or any transient network blip on the way to Neon, can make the fetch
// fail or return a gateway error. Drizzle then rethrows it as the generic
// "Failed query" error. Since HTTP queries are stateless, retrying is safe.
const MAX_ATTEMPTS = 3;
// Gateway/overload statuses worth retrying — never retry 4xx SQL errors,
// which are deterministic and would just fail again.
const TRANSIENT_STATUS = new Set([429, 500, 502, 503, 504]);

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

neonConfig.fetchFunction = async (url: string, opts: RequestInit) => {
  let lastError: unknown;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(url, opts);
      if (TRANSIENT_STATUS.has(res.status) && attempt < MAX_ATTEMPTS) {
        await delay(200 * attempt);
        continue;
      }
      return res;
    } catch (err) {
      // Network-level failure (cold start, reset, DNS, timeout) — retry.
      lastError = err;
      if (attempt < MAX_ATTEMPTS) await delay(200 * attempt);
    }
  }
  console.error(
    `Neon HTTP query failed after ${MAX_ATTEMPTS} attempts (likely a compute cold start or network blip):`,
    lastError,
  );
  throw lastError;
};

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle({ client: sql, schema, casing: "snake_case" });
