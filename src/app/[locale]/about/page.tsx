import type { Locale } from "@/i18n/routing";
import { getDictionary } from "@/lib/messages";
import AboutContent from "@/components/pages/AboutContent";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <AboutContent
      title={dict.about.title}
      description={dict.about.description}
    />
  );
}
