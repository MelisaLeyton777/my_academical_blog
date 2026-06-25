import fs from "fs";
import path from "path";
import type { Locale } from "@/i18n/routing";

type Post = {
  slug: string;
  title: string;
  date?: string;
  excerpt?: string;
  content: string;
};

const postsDirectory = (locale: Locale) =>
  path.join(process.cwd(), "src", "content", locale, "posts");

export function getAllPosts(locale: Locale): Omit<Post, "content">[] {
  const dir = postsDirectory(locale);

  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  return files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const fullPath = path.join(dir, file);
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { title, date, excerpt } = parseFrontmatter(raw);

    return { slug, title, date, excerpt };
  });
}

export function getPostBySlug(
  locale: Locale,
  slug: string
): Post | null {
  const dir = postsDirectory(locale);
  const fullPath = path.join(dir, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const raw = fs.readFileSync(fullPath, "utf-8");
  const { title, date, excerpt, content } = parseFrontmatter(raw);

  return { slug, title, date, excerpt, content };
}

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!match) {
    return { title: "Untitled", date: undefined, excerpt: undefined, content: raw };
  }

  const frontmatter = match[1];
  const content = match[2];
  const title = frontmatter.match(/title:\s*"?(.+?)"?\n/)?.[1] || "Untitled";
  const date = frontmatter.match(/date:\s*(.+)\n/)?.[1];
  const excerpt = frontmatter.match(/excerpt:\s*"?(.+?)"?\n/)?.[1];

  return { title, date, excerpt, content };
}
