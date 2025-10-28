const DAY_PATTERN = /(Tu|Th|M|W|F|Sa|Su)/g;

export interface ParsedMeeting {
  days: Set<string>;
  start: number;
  end: number;
}

function parseDays(s: string | undefined | null): string[] {
  if (!s || typeof s !== 'string') return [];
  const matches = (s.match(DAY_PATTERN) || []) as string[];
  return matches.filter((v, i) => matches.indexOf(v) === i);
}

function toMinutes(t: string | number): number {
  if (typeof t === 'number' && Number.isFinite(t)) return Math.floor(t);
  if (typeof t !== 'string') return NaN;
  const [hStr, mStr] = t.trim().split(':');
  const h = Number(hStr);
  const m = Number(mStr);
  if (!Number.isFinite(h) || !Number.isFinite(m)) return NaN;
  return Math.floor(h) * 60 + Math.floor(m);
}

export function parseMeeting(meets: unknown): ParsedMeeting | null {
  if (!meets && meets !== 0) return null;
  const ms = String(meets).trim();
  if (ms === '') return null;
  const firstDigit = ms.search(/\d/);
  if (firstDigit === -1) return null;
  const dayPart = ms.slice(0, firstDigit).replace(/\s+/g, '');
  const timePart = ms.slice(firstDigit).trim();

  const days = parseDays(dayPart);
  if (days.length === 0) return null;

  const parts = timePart.split('-').map(s => s.trim());
  if (parts.length !== 2) return null;
  const start = toMinutes(parts[0]);
  const end = toMinutes(parts[1]);
  if (!Number.isFinite(start) || !Number.isFinite(end) || start >= end) return null;

  return { days: new Set(days), start, end };
}

function hasDayOverlap(aDays: Set<string>, bDays: Set<string>): boolean {
  return Array.from(aDays).some(d => bDays.has(d));
}

function hasTimeOverlap(aStart: number, aEnd: number, bStart: number, bEnd: number): boolean {
  return aStart < bEnd && bStart < aEnd;
}

export function meetingsOverlap(aMeets: unknown, bMeets: unknown): boolean {
  const a = parseMeeting(aMeets);
  const b = parseMeeting(bMeets);
  if (!a || !b) return false;
  if (!hasDayOverlap(a.days, b.days)) return false;
  return hasTimeOverlap(a.start, a.end, b.start, b.end);
}

export function coursesConflict(a: { term: unknown; meets: unknown } | null | undefined, b: { term: unknown; meets: unknown } | null | undefined): boolean {
  if (!a || !b) return false;
  if (String(a.term) !== String(b.term)) return false;
  return meetingsOverlap(a.meets, b.meets);
}
