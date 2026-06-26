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
  const homeContent = getMDXContent(locale, "home") ?? "";
  const aboutContent = getMDXContent(locale, "about") ?? "";

  return (
    <HomeContent
      homeContent={homeContent}
      aboutContent={aboutContent}
      cta={dict.home.cta}
      locale={locale}
    />
  );
}
