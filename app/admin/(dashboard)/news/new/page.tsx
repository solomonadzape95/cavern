import { requirePermission } from "@/lib/auth/dal";
import { PostForm } from "../PostForm";
import { createPost } from "../actions";

export default async function NewPostPage() {
  await requirePermission("news");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-(length:--text-title) text-canvas-deep">New post</h1>
        <p className="mt-1 text-canvas/60">Publish a devlog, release, or studio update.</p>
      </div>
      <PostForm action={createPost} />
    </div>
  );
}
