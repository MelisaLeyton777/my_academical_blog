import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/routing";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import PostContent from "@/components/pages/PostContent";

export async function generateStaticParams() {
  const enPosts = getAllPosts("en");
  const esPosts = getAllPosts("es");
  return [
    ...enPosts.map((post) => ({ locale: "en", slug: post.slug })),
    ...esPosts.map((post) => ({ locale: "es", slug: post.slug })),
  ];
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPostBySlug(locale as Locale, slug);

  if (!post) {
    notFound();
  }

  return (
    <PostContent
      title={post.title}
      date={post.date}
      content={post.content}
    />
  );
}
