import { useState, useEffect, useRef } from 'react'
import ModeManual from './components/ModeManual'
import ModeWord from './components/ModeWord'
import LeetCard from './components/LeetCard'
import { DIGIT_TO_LETTERS, LETTER_TO_DIGIT_MULTI } from './leet'

const T = {
  ru: {
    subtitle: 'Подборщик красивых номеров Узбекистана',
    tab1: 'Перебор',
    tab2: 'По слову',
    table1: '1 цифра → буквы',
    table2: '2 цифры → буквы',
  },
  en: {
    subtitle: 'Uzbekistan beautiful plate finder',
    tab1: 'Combos',
    tab2: 'By word',
    table1: '1 digit → letters',
    table2: '2 digits → letters',
  },
  uz: {
    subtitle: 'O\'zbekiston chiroyli raqamlarini tanlash',
    tab1: 'Tanlash',
    tab2: 'So\'z bilan',
    table1: '1 raqam → harflar',
    table2: '2 raqam → harflar',
  },
}

const LANGS = [
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
  { code: 'uz', label: 'UZ' },
]

export default function App() {
  const [mode, setMode] = useState('manual')
  const [dark, setDark] = useState(false)
  const [lang, setLang] = useState('ru')
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef(null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  useEffect(() => {
    function handleClick(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const t = T[lang]
  const currentLang = LANGS.find((l) => l.code === lang)

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex flex-col items-center py-10 px-4 transition-colors duration-200">

      {/* Header */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-1">
        <h1 className="text-3xl font-black text-gray-800 dark:text-gray-100 tracking-tight">
          Plate Picker
        </h1>
        <div className="flex items-center gap-2">
          {/* Language dropdown */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="w-9 h-6 rounded-md bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-black transition-colors"
            >
              {currentLang.label}
            </button>
            {langOpen && (
              <div className="dropdown-enter absolute right-0 top-8 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg shadow-lg overflow-hidden z-10">
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false) }}
                    className={`block w-full px-4 py-2 text-xs font-black text-left transition-colors ${
                      l.code === lang
                        ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="w-6 h-6 rounded-md bg-gray-900 dark:bg-white transition-colors"
            title="Переключить тему"
          />
        </div>
      </div>
      <p className="text-gray-500 dark:text-slate-400 mb-6 text-sm w-full max-w-2xl">
        {t.subtitle}
      </p>

      {/* Mode tabs */}
      <div className="flex bg-white dark:bg-slate-800 rounded-xl shadow border border-gray-200 dark:border-slate-700 mb-8 overflow-hidden">
        <button
          onClick={() => setMode('manual')}
          className={`w-36 py-3 font-semibold text-sm transition-colors ${
            mode === 'manual'
              ? 'bg-gray-900 text-white'
              : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700'
          }`}
        >
          {t.tab1}
        </button>
        <button
          onClick={() => setMode('word')}
          className={`w-36 py-3 font-semibold text-sm transition-colors ${
            mode === 'word'
              ? 'bg-gray-900 text-white'
              : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700'
          }`}
        >
          {t.tab2}
        </button>
      </div>

      {/* Card */}
      <div key={mode} className="fade-in w-full max-w-2xl bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-gray-100 dark:border-slate-700 p-8">
        {mode === 'manual' ? <ModeManual lang={lang} /> : <ModeWord lang={lang} />}
      </div>

      {/* Leet tables */}
      <div className="mt-8 w-full max-w-2xl flex flex-col gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow border border-gray-100 dark:border-slate-700 p-5">
          <h2 className="text-sm font-bold text-gray-500 dark:text-slate-400 uppercase mb-3">{t.table1}</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {Object.entries(DIGIT_TO_LETTERS).sort(([a], [b]) => Number(a) - Number(b)).map(([digit, letters]) => (
              <LeetCard key={digit} digit={digit} letters={letters} />
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow border border-gray-100 dark:border-slate-700 p-5">
          <h2 className="text-sm font-bold text-gray-500 dark:text-slate-400 uppercase mb-3">{t.table2}</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {Object.entries(
              Object.entries(LETTER_TO_DIGIT_MULTI).reduce((acc, [letter, digits]) => {
                if (!acc[digits]) acc[digits] = []
                acc[digits].push(letter)
                return acc
              }, {})
            ).map(([digits, letters]) => (
              <div key={digits} className="flex items-center gap-1 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-1">
                <span className="font-black text-gray-900 dark:text-gray-100 text-lg">{digits}</span>
                <span className="text-gray-400 text-xs">=</span>
                <span className="font-black text-gray-800 dark:text-gray-200 text-sm">{letters.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
