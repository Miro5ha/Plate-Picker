const SW = 4
const SW_D = 4
const CAP = 'round'

// M → "11": diagonals fade, middle vertical draws in, first outer vertical mirrors
function M({ hovered, color }) {
  return (
    <svg width="16" height="11" viewBox="0 0 34 30">
      {/* Left outer vertical */}
      <line x1="4" y1="4" x2="4" y2="26" stroke={color} strokeWidth={SW} strokeLinecap={CAP} />
      {/* Right outer vertical */}
      <line x1="30" y1="4" x2="30" y2="26" stroke={color} strokeWidth={SW} strokeLinecap={CAP} />
      {/* Left diagonal (fades out) */}
      <line x1="4" y1="4" x2="17" y2="17"
        stroke={color} strokeWidth={SW} strokeLinecap={CAP}
        style={{ opacity: hovered ? 0 : 1, transition: 'opacity 0.3s ease' }} />
      {/* Right diagonal (fades out) */}
      <line x1="30" y1="4" x2="17" y2="17"
        stroke={color} strokeWidth={SW} strokeLinecap={CAP}
        style={{ opacity: hovered ? 0 : 1, transition: 'opacity 0.3s ease' }} />
      {/* Middle vertical draws in (blue) – the "mirrored first 1" */}
      <line x1="17" y1="4" x2="17" y2="26"
        stroke="#2563eb" strokeWidth={SW_D} strokeLinecap={CAP}
        pathLength="1" strokeDasharray="1"
        strokeDashoffset={hovered ? 0 : 1}
        style={{ transition: 'stroke-dashoffset 0.42s ease 0.1s' }} />
    </svg>
  )
}

// N → "71": diagonal rotates to look like 7's stroke, right vertical stays as 1
function N({ hovered, color }) {
  return (
    <svg width="12" height="11" viewBox="0 0 26 30">
      {/* Left vertical */}
      <line x1="4" y1="4" x2="4" y2="26" stroke={color} strokeWidth={SW} strokeLinecap={CAP} />
      {/* Right vertical */}
      <line x1="22" y1="4" x2="22" y2="26" stroke={color} strokeWidth={SW} strokeLinecap={CAP} />
      {/* Diagonal: on hover rotates to become top-horizontal of 7 */}
      <line x1="4" y1="4" x2="22" y2="26"
        stroke={color} strokeWidth={SW} strokeLinecap={CAP}
        style={{
          transformOrigin: '4px 4px',
          transform: hovered ? 'rotate(-55deg) scaleX(0.85)' : 'none',
          transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }} />
    </svg>
  )
}

// W → "77": inner peaks fade, outer strokes tilt to look like two 7s
function W({ hovered, color }) {
  return (
    <svg width="16" height="11" viewBox="0 0 34 30">
      {/* Left outer stroke */}
      <line x1="3" y1="4" x2="9" y2="26" stroke={color} strokeWidth={SW} strokeLinecap={CAP}
        style={{
          transformOrigin: '3px 4px',
          transform: hovered ? 'rotate(-18deg)' : 'none',
          transition: 'transform 0.42s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }} />
      {/* Left inner stroke (fades out) */}
      <line x1="9" y1="26" x2="17" y2="10"
        stroke={color} strokeWidth={SW} strokeLinecap={CAP}
        style={{ opacity: hovered ? 0 : 1, transition: 'opacity 0.28s ease' }} />
      {/* Right inner stroke (fades out) */}
      <line x1="17" y1="10" x2="25" y2="26"
        stroke={color} strokeWidth={SW} strokeLinecap={CAP}
        style={{ opacity: hovered ? 0 : 1, transition: 'opacity 0.28s ease' }} />
      {/* Right outer stroke */}
      <line x1="31" y1="4" x2="25" y2="26" stroke={color} strokeWidth={SW} strokeLinecap={CAP}
        style={{
          transformOrigin: '31px 4px',
          transform: hovered ? 'rotate(18deg)' : 'none',
          transition: 'transform 0.42s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }} />
      {/* Top connecting lines for two 7s (draw in) */}
      <line x1="3" y1="4" x2="17" y2="4"
        stroke="#2563eb" strokeWidth={SW_D} strokeLinecap={CAP}
        pathLength="1" strokeDasharray="1"
        strokeDashoffset={hovered ? 0 : 1}
        style={{ transition: 'stroke-dashoffset 0.35s ease' }} />
      <line x1="31" y1="4" x2="17" y2="4"
        stroke="#2563eb" strokeWidth={SW_D} strokeLinecap={CAP}
        pathLength="1" strokeDasharray="1"
        strokeDashoffset={hovered ? 0 : 1}
        style={{ transition: 'stroke-dashoffset 0.35s ease' }} />
    </svg>
  )
}

const COMPONENTS = { M, N, W }

export default function MultiLetterAnim({ letter, hovered }) {
  const color = hovered ? '#1d4ed8' : '#1f2937'
  const Comp = COMPONENTS[letter]
  if (!Comp) return <span className="font-black text-sm" style={{ color }}>{letter}</span>
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      <Comp hovered={hovered} color={color} />
    </span>
  )
}
