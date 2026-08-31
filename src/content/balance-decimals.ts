export const MAX_BALANCE_DECIMAL_PLACES = 12;

export type ExactDecimal = { units: bigint; scale: number };

function normalize({ units, scale }: ExactDecimal): ExactDecimal {
  if (units === 0n) return { units: 0n, scale: 0 };

  let normalizedUnits = units;
  let normalizedScale = scale;
  while (normalizedScale > 0 && normalizedUnits % 10n === 0n) {
    normalizedUnits /= 10n;
    normalizedScale -= 1;
  }
  return { units: normalizedUnits, scale: normalizedScale };
}

export function exactDecimalFromNumber(value: number): ExactDecimal | null {
  if (!Number.isFinite(value)) return null;

  const match = /^(-?)(\d+)(?:\.(\d+))?(?:e([+-]?\d+))?$/i.exec(value.toString());
  if (!match) return null;

  const [, sign, whole, fraction = '', exponentText] = match;
  const exponent = exponentText === undefined ? 0 : Number(exponentText);
  const decimalPlaces = fraction.length - exponent;
  if (decimalPlaces > MAX_BALANCE_DECIMAL_PLACES) return null;

  const digits = `${whole}${fraction}`.replace(/^0+(?=\d)/, '');
  let units = BigInt(digits || '0');
  if (sign === '-') units = -units;
  if (decimalPlaces < 0) units *= 10n ** BigInt(-decimalPlaces);

  return normalize({ units, scale: Math.max(0, decimalPlaces) });
}

export function sumExactDecimals(values: readonly ExactDecimal[]): ExactDecimal {
  const scale = values.reduce((maximum, value) => Math.max(maximum, value.scale), 0);
  const units = values.reduce(
    (sum, value) => sum + value.units * 10n ** BigInt(scale - value.scale),
    0n,
  );
  return normalize({ units, scale });
}

export function compareExactDecimals(left: ExactDecimal, right: ExactDecimal) {
  const scale = Math.max(left.scale, right.scale);
  const leftUnits = left.units * 10n ** BigInt(scale - left.scale);
  const rightUnits = right.units * 10n ** BigInt(scale - right.scale);
  return leftUnits === rightUnits ? 0 : leftUnits > rightUnits ? 1 : -1;
}

export function exactDecimalToNumber(value: ExactDecimal) {
  const absolute = value.units < 0n ? -value.units : value.units;
  const digits = absolute.toString().padStart(value.scale + 1, '0');
  const decimal = value.scale === 0
    ? digits
    : `${digits.slice(0, -value.scale)}.${digits.slice(-value.scale)}`;
  return Number(value.units < 0n ? `-${decimal}` : decimal);
}
