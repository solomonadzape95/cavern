export type NewsletterFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const initialNewsletterState: NewsletterFormState = { status: "idle", message: "" };
