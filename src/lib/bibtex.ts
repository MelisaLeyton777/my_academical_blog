export type BibEntry = {
  citeKey: string;
  type: string;
  title: string;
  author: string;
  year?: string;
  journal?: string;
  booktitle?: string;
  publisher?: string;
  doi?: string;
  url?: string;
  pages?: string;
  volume?: string;
  number?: string;
};

function unbrace(value: string): string {
  return value.replace(/^{/, "").replace(/}$/, "").trim();
}

export function parseBibTeX(raw: string): BibEntry[] {
  const entries: BibEntry[] = [];
  const re = /@(\w+)\s*\{([^,]+),/g;
  let match: RegExpExecArray | null;

  while ((match = re.exec(raw)) !== null) {
    const type = match[1].toLowerCase();
    const citeKey = match[2].trim();
    const start = match.index + match[0].length;

    let depth = 0;
    let end = start;
    for (; end < raw.length; end++) {
      const ch = raw[end];
      if (ch === "{") depth++;
      else if (ch === "}") depth--;
      if (depth < 0) break;
    }

    const body = raw.slice(start, end - 1);
    const fields: Record<string, string> = {};

    const fieldRe = /(\w+)\s*=\s*((\{[^}]*\}|"[^"]*"|[^,}]+))/g;
    let fm: RegExpExecArray | null;
    while ((fm = fieldRe.exec(body)) !== null) {
      fields[fm[1].toLowerCase()] = unbrace(fm[2].replace(/^"(.*)"$/, "$1"));
    }

    entries.push({
      citeKey,
      type,
      title: fields.title ?? "",
      author: fields.author ?? "",
      year: fields.year,
      journal: fields.journal,
      booktitle: fields.booktitle,
      publisher: fields.publisher,
      doi: fields.doi,
      url: fields.url,
      pages: fields.pages,
      volume: fields.volume,
      number: fields.number,
    });
  }

  return entries;
}
