import { put } from "@vercel/blob";

// Uploads an image to Vercel Blob and returns its public URL.
export async function uploadImage(file: File, folder: string): Promise<string> {
  const { url } = await put(`${folder}/${file.name}`, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return url;
}
