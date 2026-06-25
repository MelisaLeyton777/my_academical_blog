import PageLayout from "@/components/layout/PageLayout";
import type { Locale } from "@/i18n/routing";
import { getDictionary } from "@/lib/messages";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <PageLayout locale={locale} copyright={dict.footer.copyright}>
      {children}
    </PageLayout>
  );
}
