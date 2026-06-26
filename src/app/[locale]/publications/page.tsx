import type { Locale } from "@/i18n/routing";
import { getDictionary } from "@/lib/messages";
import { getPublications } from "@/lib/publications";
import PublicationsContent from "@/components/pages/PublicationsContent";

export default async function PublicationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const publications = getPublications();

  return (
    <PublicationsContent
      title={dict.publications.title}
      description={dict.publications.description}
      publications={publications}
    />
  );
}
