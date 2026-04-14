export default function LeetCard({ digit, letters }) {
  return (
    <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-1">
      <span className="font-black text-gray-900 dark:text-gray-100 text-lg">{digit}</span>
      <span className="text-gray-400 text-xs">=</span>
      <span className="font-black text-gray-800 dark:text-gray-200 text-sm">{letters.join(', ')}</span>
    </div>
  )
}
