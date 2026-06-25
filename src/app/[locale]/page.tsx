import type { Locale } from "@/i18n/routing";
import { getDictionary } from "@/lib/messages";
import HomeContent from "@/components/pages/HomeContent";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <HomeContent
      title={dict.home.title}
      subtitle={dict.home.subtitle}
      cta={dict.home.cta}
      locale={locale}
    />
  );
}
