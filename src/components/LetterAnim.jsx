const SW = 4        // base letter stroke (matches font-black weight at half scale)
const SW_D = 5      // animated draw stroke
const CAP = 'round'
const JOIN = 'round'

// ── SVG letters with custom draw/morph animations ────────────────────────

function C({ hovered, color }) {
  // C endpoints are angled inward so the closing curve can visibly bulge right
  return (
    <svg width="13" height="11" viewBox="0 0 26 30" overflow="visible">
      <path d="M 20,6 A 11,12 0 1,0 20,24"
        fill="none" stroke={color} strokeWidth={SW} strokeLinecap={CAP} />
      {/* Closing bezier curves rightward to form 0 */}
      <path d="M 20,6 C 30,6 30,24 20,24"
        fill="none" stroke="#2563eb" strokeWidth={SW_D} strokeLinecap={CAP}
        pathLength="1" strokeDasharray="1"
        strokeDashoffset={hovered ? 0 : 1}
        style={{ transition: 'stroke-dashoffset 0.4s ease' }} />
    </svg>
  )
}

function U({ hovered, color }) {
  return (
    <svg width="10" height="11" viewBox="0 0 22 30">
      <path d="M 4,4 L 4,20 Q 4,27 11,27 Q 18,27 18,20 L 18,4"
        fill="none" stroke={color} strokeWidth={SW} strokeLinecap={CAP} />
      {/* Blue top closing line → 0 */}
      <line x1="18" y1="4" x2="4" y2="4"
        stroke="#2563eb" strokeWidth={SW} strokeLinecap={CAP}
        pathLength="1" strokeDasharray="1"
        strokeDashoffset={hovered ? 0 : 1}
        style={{ transition: 'stroke-dashoffset 0.4s ease' }} />
    </svg>
  )
}

function G({ hovered, color }) {
  return (
    <svg width="10" height="11" viewBox="0 0 22 30">
      {/* Base G */}
      <path d="M 19,7 A 10,11 0 1,0 19,17 L 12,17"
        fill="none" stroke={color} strokeWidth={SW} strokeLinecap={CAP} strokeLinejoin={JOIN} />
      {/* Blue extension that completes the lower circle → 6 */}
      <path d="M 19,17 Q 20,26 11,26 Q 3,26 3,19 Q 3,13 10,13"
        fill="none" stroke="#2563eb" strokeWidth={SW_D} strokeLinecap={CAP}
        pathLength="1" strokeDasharray="1"
        strokeDashoffset={hovered ? 0 : 1}
        style={{ transition: 'stroke-dashoffset 0.45s ease' }} />
    </svg>
  )
}

function T({ hovered, color }) {
  return (
    <svg width="10" height="11" viewBox="0 0 22 30">
      {/* Horizontal bar – stays */}
      <line x1="2" y1="4" x2="20" y2="4"
        stroke={color} strokeWidth={SW} strokeLinecap={CAP} />
      {/* Vertical stroke – rotates to 7's diagonal */}
      <line x1="11" y1="4" x2="11" y2="27"
        stroke={color} strokeWidth={SW} strokeLinecap={CAP}
        style={{
          transformOrigin: '11px 4px',
          transform: hovered ? 'rotate(24deg)' : 'rotate(0deg)',
          transition: 'transform 0.42s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }} />
    </svg>
  )
}

function B({ hovered, color }) {
  return (
    // wider viewBox to accommodate left arc of 8
    <svg width="11" height="11" viewBox="-4 0 26 30">
      {/* Right bumps */}
      <path d="M 4,4 L 12,4 Q 18,4 18,10 Q 18,15 4,15 Q 18,15 18,21 Q 18,26 12,26 L 4,26"
        fill="none" stroke={color} strokeWidth={SW} strokeLinecap={CAP} strokeLinejoin={JOIN} />
      {/* Left vertical (fades out) */}
      <line x1="4" y1="4" x2="4" y2="26"
        stroke={color} strokeWidth={SW} strokeLinecap={CAP}
        style={{ opacity: hovered ? 0 : 1, transition: 'opacity 0.28s ease' }} />
      {/* Blue left arc of 8 (draws in) */}
      <path d="M 4,4 Q -3,4 -3,10 Q -3,15 4,15 Q -3,15 -3,21 Q -3,26 4,26"
        fill="none" stroke="#2563eb" strokeWidth={SW_D} strokeLinecap={CAP}
        pathLength="1" strokeDasharray="1"
        strokeDashoffset={hovered ? 0 : 1}
        style={{ transition: 'stroke-dashoffset 0.42s ease' }} />
    </svg>
  )
}

function R({ hovered, color }) {
  return (
    <svg width="10" height="11" viewBox="0 0 22 30"
      style={{
        transform: hovered ? 'scaleX(-1)' : 'none',
        transition: 'transform 0.4s ease',
      }}>
      {/* Left vertical */}
      <line x1="4" y1="4" x2="4" y2="26"
        stroke={color} strokeWidth={SW} strokeLinecap={CAP} />
      {/* Upper loop */}
      <path d="M 4,4 L 12,4 Q 18,4 18,10 Q 18,15 12,15 L 4,15"
        fill="none" stroke={color} strokeWidth={SW} strokeLinecap={CAP} strokeLinejoin={JOIN} />
      {/* Diagonal leg – fades out on hover */}
      <line x1="12" y1="15" x2="19" y2="26"
        stroke={color} strokeWidth={SW} strokeLinecap={CAP}
        style={{ opacity: hovered ? 0 : 1, transition: 'opacity 0.25s ease' }} />
    </svg>
  )
}

// ── CSS-transform letters ─────────────────────────────────────────────────

const CSS_TRANSFORMS = {
  J: 'rotate(180deg)',
  L: 'scaleY(-1)',
  E: 'scaleX(-1)',
  A: 'rotate(8deg)',
  F: 'scaleX(-1)',
  P: 'scaleX(-1)',
  I: 'scaleX(0.28)',
  O: 'scaleX(0.82)',
  D: 'scaleX(0.74)',
  Q: 'scaleX(0.72)',
  H: 'skewX(16deg)',
  Y: 'rotate(8deg)',
  S: 'rotate(180deg) scaleX(-1)',
  V: 'rotate(180deg)',
  Z: 'scaleX(-1)',
  K: 'scaleX(-1)',
  X: 'scaleX(0.48)',
}

const SVG_COMPONENTS = { C, U, G, T, B, R }

export default function LetterAnim({ letter, hovered }) {
  const color = hovered ? '#1d4ed8' : '#1f2937'
  const SVGComp = SVG_COMPONENTS[letter]

  if (SVGComp) {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center' }}>
        <SVGComp hovered={hovered} color={color} />
      </span>
    )
  }

  return (
    <span
      style={{
        display: 'inline-block',
        color,
        transform: hovered ? (CSS_TRANSFORMS[letter] ?? 'none') : 'none',
        transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.2s',
      }}
      className="font-black text-sm"
    >
      {letter}
    </span>
  )
}
