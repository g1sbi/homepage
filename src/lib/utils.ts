export function formatDate(dateStr: string): string {
  return new Date(dateStr).toISOString().slice(0, 10);
}

export function excerpt(content: string, maxLen = 120): string {
  const plain = content
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]+)\]\(.*?\)/g, '$1')
    .replace(/#{1,6}\s*/g, '')
    .replace(/[*_`~>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return plain.length > maxLen ? plain.slice(0, maxLen).trimEnd() + '…' : plain;
}
