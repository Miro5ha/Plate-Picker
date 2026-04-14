import { decodeDigits, findMultiMatches } from '../leet'

export default function PlateDisplay({ region, letter1, digits, letter2, letter3, showRead = true }) {
  const decoded = decodeDigits(digits)
  const multiMatches = findMultiMatches(digits)

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Plate visual */}
      <div className="flex items-center gap-1 bg-white border-4 border-gray-800 rounded-lg px-5 py-2 shadow-lg select-none">
        <span className="text-3xl font-black tracking-widest text-gray-900 font-mono">{region}</span>
        <span className="text-3xl font-black tracking-widest text-gray-900 font-mono mx-1">{letter1}</span>
        {decoded.map((item, i) => (
          <span key={i} className="text-3xl font-black text-gray-900 font-mono">{item.digit}</span>
        ))}
        <span className="text-3xl font-black tracking-widest text-gray-900 font-mono mx-1">{letter2}{letter3}</span>
      </div>

      {/* Digit decode row */}
      <div className="flex gap-2">
        {decoded.map((item, i) => (
          <div key={i} className="flex flex-col items-center bg-gray-100 dark:bg-gray-800/30 border border-gray-300 dark:border-gray-600 rounded px-3 py-1 min-w-[48px]">
            <span className="text-xl font-black text-gray-900 dark:text-gray-100">{item.digit}</span>
            <span className="text-xs text-gray-400">↓</span>
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{item.letters.join(', ')}</span>
          </div>
        ))}
      </div>

      {/* Multi-digit combinations */}
      {multiMatches.length > 0 && (
        <div className="flex gap-2">
          {multiMatches.map((m, i) => (
            <div key={i} className="flex flex-col items-center bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 rounded px-3 py-1">
              <span className="text-xl font-black text-purple-600 dark:text-purple-400">{m.combo}</span>
              <span className="text-xs text-gray-400">↓</span>
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{m.letters.join(', ')}</span>
            </div>
          ))}
        </div>
      )}

      {/* Full read */}
      {showRead && (
        <div className="text-base font-semibold text-gray-600 dark:text-gray-300">
          Читается как:{' '}
          <span className="text-gray-900 dark:text-gray-100 font-black tracking-widest">
            {letter1}{decoded.map((d) => d.letters[0] ?? '?').join('')}{letter2}{letter3}
          </span>
        </div>
      )}
    </div>
  )
}
