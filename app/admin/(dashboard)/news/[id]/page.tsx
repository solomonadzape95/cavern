import { notFound } from "next/navigation";
import { requirePermission } from "@/lib/auth/dal";
import { getPostById } from "@/lib/data/news";
import { PostForm } from "../PostForm";
import { updatePost } from "../actions";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requirePermission("news");
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  return (
    <div className="space-y-6">
      <div>
        <p className="label text-canvas/60">Editing post</p>
        <h1 className="font-display text-(length:--text-title) text-canvas-deep">{post.title}</h1>
      </div>
      <PostForm post={post} action={updatePost.bind(null, post.id)} />
    </div>
  );
}
