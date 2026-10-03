// 이름 가운데 글자를 가린다. "김민영" → "김○영", "김민" → "김○", "남궁민수" → "남○○수"
export function maskName(name: string) {
  const chars = Array.from(name.trim());
  if (chars.length <= 1) return chars.join("");
  if (chars.length === 2) return `${chars[0]}○`;
  return chars[0] + "○".repeat(chars.length - 2) + chars[chars.length - 1];
}
