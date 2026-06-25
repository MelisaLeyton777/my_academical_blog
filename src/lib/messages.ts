import "server-only";

import type { Locale } from "@/i18n/routing";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

const dictionaries: Record<Locale, typeof en> = { en, es };

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale] ?? dictionaries.en;
};
