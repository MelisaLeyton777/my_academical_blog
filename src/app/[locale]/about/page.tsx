import type { Locale } from "@/i18n/routing";
import { getMDXContent } from "@/lib/mdx";
import AboutContent from "@/components/pages/AboutContent";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = getMDXContent(locale, "about") ?? "";

  return <AboutContent content={content} />;
}
