import "server-only";
import fs from "fs";
import path from "path";
import { parseBibTeX, type BibEntry } from "./bibtex";

export function getPublications(): BibEntry[] {
  const filePath = path.join(process.cwd(), "src", "content", "publications.bib");

  if (!fs.existsSync(filePath)) return [];

  const raw = fs.readFileSync(filePath, "utf-8");
  const entries = parseBibTeX(raw);

  entries.sort((a, b) => {
    const ya = a.year ?? "0";
    const yb = b.year ?? "0";
    if (ya !== yb) return Number(yb) - Number(ya);
    return a.title.localeCompare(b.title);
  });

  return entries;
}
