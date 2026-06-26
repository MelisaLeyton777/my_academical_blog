import type { Locale } from "@/i18n/routing";
import { getDictionary } from "@/lib/messages";
import { getMDXContent } from "@/lib/mdx";
import { getAllPosts } from "@/lib/posts";
import HomeContent from "@/components/pages/HomeContent";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const homeContent = getMDXContent(locale, "home") ?? "";
  const aboutContent = getMDXContent(locale, "about") ?? "";
  const posts = getAllPosts(locale as Locale);

  return (
    <HomeContent
      homeContent={homeContent}
      aboutContent={aboutContent}
      latestPosts={posts}
      cta={dict.home.cta}
      locale={locale}
      contactDict={dict.contact}
    />
  );
}
