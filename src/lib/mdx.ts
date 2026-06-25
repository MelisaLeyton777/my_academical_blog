import "server-only";

import fs from "fs";
import path from "path";

export function getMDXContent(locale: string, page: string): string | null {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    locale,
    `${page}.mdx`
  );

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const body = stripFrontmatter(raw);
  return body;
}

function stripFrontmatter(raw: string): string {
  const match = raw.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
  return match ? match[1].trim() : raw.trim();
}
