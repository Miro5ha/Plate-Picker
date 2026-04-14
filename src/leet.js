// Letter -> Digit mapping for all 26 letters (visual similarity)
// Single-digit mappings
export const LETTER_TO_DIGIT = {
  A: 4,
  B: 8,
  C: 0,
  D: 0,
  E: 3,
  F: 7,
  G: 6,
  I: 1,
  J: 1,
  K: 7,
  L: 1,
  O: 0,
  P: 9,
  Q: 0,
  R: 9,
  S: 5,
  T: 7,
  U: 0,
  V: 7,
  X: 8,
  Z: 2,
}

// Multi-digit mappings
export const LETTER_TO_DIGIT_MULTI = {
  H: '14',   // 1 = left post, 4 = right post + crossbar
  N: '17',   // 1 = left vertical, 7 = diagonal + right side of N
  M: '11',   // two mirrored 1s = outer strokes of M
  W: '11',   // same as M
}

// Digit -> all letters it can represent (reverse of above)
export const DIGIT_TO_LETTERS = Object.entries(LETTER_TO_DIGIT).reduce((acc, [letter, digit]) => {
  if (!acc[digit]) acc[digit] = []
  acc[digit].push(letter)
  return acc
}, {})

// Uzbek region codes
export const REGIONS = [
  { code: '01', name: 'Toshkent shahri' },
  { code: '10', name: 'Toshkent viloyati' },
  { code: '20', name: 'Samarqand' },
  { code: '25', name: 'Buxoro' },
  { code: '30', name: 'Qashqadaryo' },
  { code: '35', name: 'Surxondaryo' },
  { code: '40', name: 'Jizzax' },
  { code: '50', name: 'Sirdaryo' },
  { code: '55', name: 'Namangan' },
  { code: '60', name: 'Andijon' },
  { code: '65', name: "Farg'ona" },
  { code: '70', name: 'Xorazm' },
  { code: '75', name: 'Navoiy' },
  { code: '80', name: "Qoraqalpog'iston" },
]

export const VALID_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

/**
 * Given 3 digits, decode them — returns array of { digit, letters[] }
 */
export function decodeDigits(digits) {
  return digits.split('').map((d) => ({
    digit: d,
    letters: DIGIT_TO_LETTERS[Number(d)] ?? [],
  }))
}

// Reverse of LETTER_TO_DIGIT_MULTI: { '14': ['H'], '17': ['N'], '11': ['M','W'] }
export const DIGIT2_TO_LETTERS = Object.entries(
  Object.entries(LETTER_TO_DIGIT_MULTI ?? {}).reduce((acc, [letter, digits]) => {
    if (!acc[digits]) acc[digits] = []
    acc[digits].push(letter)
    return acc
  }, {})
).reduce((acc, [digits, letters]) => { acc[digits] = letters; return acc }, {})

/**
 * Find all 2-digit combinations in the 3-digit string that match multi-digit letters.
 * Returns array of { combo, letters[], start } where start is 0 or 1.
 */
export function findMultiMatches(digits) {
  const results = []
  for (let i = 0; i <= digits.length - 2; i++) {
    const combo = digits.slice(i, i + 2)
    const letters = DIGIT2_TO_LETTERS[combo]
    if (letters) results.push({ combo, letters, start: i })
  }
  return results
}

/**
 * Recursively consume chars from `chars[index..]` until we have exactly 3 digits.
 * Each char can produce 1 digit (LETTER_TO_DIGIT) or 2 digits (LETTER_TO_DIGIT_MULTI).
 * Returns array of { digits, consumed } where consumed = number of chars used.
 */
function fillDigits(chars, index, digits) {
  if (digits.length === 3) return [{ digits, consumed: index }]
  if (digits.length > 3 || index >= chars.length) return []

  const char = chars[index]
  const results = []

  // Try single-digit mapping
  const single = LETTER_TO_DIGIT[char]
  if (single !== undefined) {
    results.push(...fillDigits(chars, index + 1, digits + String(single)))
  }

  // Try multi-digit mapping (only if it fits in remaining slots)
  const multi = LETTER_TO_DIGIT_MULTI[char]
  if (multi && digits.length + multi.length <= 3) {
    results.push(...fillDigits(chars, index + 1, digits + multi))
  }

  return results
}

/**
 * Mode 2: map word left-to-right onto plate structure [L1][D1][D2][D3][L2][L3].
 * Supports both single-digit and multi-digit letter mappings.
 */
export function wordToPlate(word, regionCode) {
  const upper = word.toUpperCase().replace(/[^A-Z]/g, '')
  if (upper.length < 2) return null

  const L1 = upper[0]
  const chars = upper.slice(1).split('')

  const options = fillDigits(chars, 0, '')
  if (options.length === 0) return null

  const { digits, consumed } = options[0]
  const letterChars = chars.slice(consumed)

  const L2 = letterChars[0] ?? ''
  const L3 = letterChars[1] ?? L2

  if (!L2) return null

  return {
    region: regionCode,
    letter1: L1,
    digits,
    letter2: L2,
    letter3: L3,
  }
}
