import { put } from "@vercel/blob";

// Uploads an image to Vercel Blob and returns its public URL.
export async function uploadImage(file: File, folder: string): Promise<string> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error(
      "Image upload is not configured: BLOB_READ_WRITE_TOKEN is missing. " +
        "Link a Vercel Blob store to the project and redeploy.",
    );
  }

  const { url } = await put(`${folder}/${file.name}`, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return url;
}
