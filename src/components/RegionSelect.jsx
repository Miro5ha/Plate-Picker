import { useState, useRef, useEffect } from 'react'
import { REGIONS } from '../leet'

export default function RegionSelect({ value, onChange, label }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const selected = REGIONS.find((r) => r.code === value)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="flex flex-col gap-1 relative" ref={ref}>
      {label && (
        <label className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase">{label}</label>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full border-2 border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 text-lg font-mono font-bold focus:border-gray-900 outline-none bg-white dark:bg-slate-700 dark:text-gray-100 text-left flex items-center justify-between gap-2"
      >
        <span>{selected?.code} — {selected?.name}</span>
        <span className={`text-gray-400 text-xs transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {open && (
        <div className="dropdown-enter absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
          {REGIONS.map((r) => (
            <button
              key={r.code}
              type="button"
              onClick={() => { onChange(r.code); setOpen(false) }}
              className={`block w-full px-3 py-2 text-left font-mono text-sm font-bold transition-colors ${
                r.code === value
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
              }`}
            >
              {r.code} — {r.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
