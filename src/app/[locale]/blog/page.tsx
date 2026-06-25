import type { Locale } from "@/i18n/routing";
import { getDictionary } from "@/lib/messages";
import { getAllPosts } from "@/lib/posts";
import BlogContent from "@/components/pages/BlogContent";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const posts = getAllPosts(locale as Locale);

  return (
    <BlogContent
      title={dict.blog.title}
      description={dict.blog.description}
      posts={posts}
      locale={locale}
    />
  );
}
