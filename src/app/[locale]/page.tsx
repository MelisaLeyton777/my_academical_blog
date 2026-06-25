import type { Locale } from "@/i18n/routing";
import { getDictionary } from "@/lib/messages";
import { getMDXContent } from "@/lib/mdx";
import HomeContent from "@/components/pages/HomeContent";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const content = getMDXContent(locale, "home") ?? "";

  return (
    <HomeContent content={content} cta={dict.home.cta} locale={locale} />
  );
}
