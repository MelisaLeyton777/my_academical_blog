import type { Locale } from "@/i18n/routing";
import { getDictionary } from "@/lib/messages";
import ProjectsContent from "@/components/pages/ProjectsContent";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <ProjectsContent
      title={dict.projects.title}
      description={dict.projects.description}
    />
  );
}
