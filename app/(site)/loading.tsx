import { Loader } from "@/components/ui/Loader";

/** Suspense fallback shown while a route segment streams in. */
export default function Loading() {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-canvas-deep">
      <Loader label="Loading" className="[--loader-size:4.5rem] md:[--loader-size:6rem]" />
    </div>
  );
}
