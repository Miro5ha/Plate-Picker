import { useState } from 'react'
import { wordToPlate } from '../leet'
import PlateDisplay from './PlateDisplay'
import RegionSelect from './RegionSelect'

const T = {
  ru: { region: 'Регион', word: 'Слово (5–6 букв)', error: 'Буквы на позициях 2–4 не имеют цифровых аналогов.', hint: 'Попробуй другое слово.' },
  en: { region: 'Region', word: 'Word (5–6 letters)', error: 'Letters at positions 2–4 have no digit equivalents.', hint: 'Try another word.' },
  uz: { region: 'Viloyat', word: 'So\'z (5–6 harf)', error: '2–4 pozitsiyalardagi harflarning raqamli ekvivalenti yo\'q.', hint: 'Boshqa so\'z kiriting.' },
}

export default function ModeWord({ lang = 'ru' }) {
  const [region, setRegion] = useState('01')
  const [word, setWord] = useState('')
  const t = T[lang]

  const plate = word.length >= 5 ? wordToPlate(word, region) : null

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-3 justify-center items-end">
        <RegionSelect value={region} onChange={setRegion} label={t.region} />

        <div className="flex flex-col gap-1 items-center">
          <label className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase">{t.word}</label>
          <input
            value={word}
            onChange={(e) => setWord(e.target.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 6))}
            placeholder=""
            maxLength={6}
            className="w-48 text-center border-2 border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 text-2xl font-mono font-black focus:border-gray-900 outline-none uppercase tracking-widest bg-white dark:bg-slate-700 dark:text-gray-100"
          />
        </div>
      </div>

      {word.length >= 5 && (
        <div className="mt-2">
          {plate === null ? (
            <div className="fade-in text-center text-gray-400 dark:text-slate-500 py-6">
              {t.error}
              <span className="text-sm mt-1 block">{t.hint}</span>
            </div>
          ) : (
            <div className="slide-up bg-white dark:bg-slate-700 rounded-xl p-5 shadow border border-gray-100 dark:border-slate-600">
              <PlateDisplay
                region={plate.region}
                letter1={plate.letter1}
                digits={plate.digits}
                letter2={plate.letter2}
                letter3={plate.letter3}
                showRead={false}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
