import { useState } from 'react'
import { VALID_LETTERS } from '../leet'
import PlateDisplay from './PlateDisplay'
import RegionSelect from './RegionSelect'

function permutations(arr) {
  if (arr.length <= 1) return [arr]
  const result = []
  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)]
    for (const perm of permutations(rest)) {
      result.push([arr[i], ...perm])
    }
  }
  const seen = new Set()
  return result.filter((p) => {
    const key = p.join('')
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

const T = {
  ru: { region: 'Регион', letters: 'Буквы', digits: 'Цифры' },
  en: { region: 'Region', letters: 'Letters', digits: 'Digits' },
  uz: { region: 'Viloyat', letters: 'Harflar', digits: 'Raqamlar' },
}

export default function ModeManual({ lang = 'ru' }) {
  const [region, setRegion] = useState('01')
  const [letters, setLetters] = useState('')
  const [digits, setDigits] = useState('')
  const t = T[lang]

  const lettersArr = letters.split('')
  const isValid =
    /^\d{3}$/.test(digits) &&
    lettersArr.length === 3 &&
    lettersArr.every((l) => VALID_LETTERS.includes(l))

  const letterPerms = isValid ? permutations(lettersArr) : []
  const digitPerms = isValid ? permutations(digits.split('')) : []
  const combos = letterPerms.flatMap((lp) =>
    digitPerms.map((dp) => ({ l: lp, d: dp.join('') }))
  )

  function handleDigits(val) {
    setDigits(val.replace(/\D/g, '').slice(0, 3))
  }

  function handleLetters(val) {
    setLetters(val.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3))
  }

  return (
    <div className="flex flex-col gap-6">

      <RegionSelect value={region} onChange={setRegion} label={t.region} />

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase text-center">{t.letters}</label>
          <input
            value={letters}
            onChange={(e) => handleLetters(e.target.value)}
            maxLength={3}
            className="w-full text-center border-2 border-gray-300 dark:border-slate-600 rounded-xl py-4 text-3xl font-mono font-black focus:border-gray-900 outline-none uppercase tracking-widest bg-white dark:bg-slate-700 dark:text-gray-100"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase text-center">{t.digits}</label>
          <input
            value={digits}
            onChange={(e) => handleDigits(e.target.value)}
            maxLength={3}
            className="w-full text-center border-2 border-gray-300 dark:border-slate-600 rounded-xl py-4 text-3xl font-mono font-black focus:border-gray-900 outline-none bg-white dark:bg-slate-700 dark:text-gray-100"
          />
        </div>
      </div>

      {isValid && (
        <div className="flex flex-col gap-4 mt-2">
          {combos.map(({ l: [l1, l2, l3], d }, i) => (
            <div
              key={`${l1}${l2}${l3}${d}`}
              className="slide-up bg-white dark:bg-slate-700 rounded-xl p-4 border border-gray-100 dark:border-slate-600 shadow-sm"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <PlateDisplay
                region={region}
                letter1={l1}
                digits={d}
                letter2={l2}
                letter3={l3}
                showRead={false}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
