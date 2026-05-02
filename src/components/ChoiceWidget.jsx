import { useState } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'

export default function ChoiceWidget({ title, options = [] }) {
  const [selected, setSelected] = useState(null)

  const answered = selected !== null

  return (
    <div className="rounded-xl border border-orange-200 bg-orange-50 overflow-hidden">
      <div className="px-4 py-3 bg-orange-100 border-b border-orange-200">
        <p className="text-xs font-semibold uppercase tracking-widest text-orange-700">Pregunta</p>
        <p className="text-sm font-medium text-gray-800 mt-0.5">{title}</p>
      </div>

      <div className="p-3 space-y-2">
        {options.map((opt, i) => {
          const isSelected = selected === i
          const showResult = answered

          let base = 'w-full text-left rounded-lg border px-4 py-3 text-sm transition-all flex items-start gap-3'
          let style = 'border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50 cursor-pointer'

          if (showResult) {
            if (opt.correct) {
              style = 'border-green-400 bg-green-50 cursor-default'
            } else if (isSelected) {
              style = 'border-red-400 bg-red-50 cursor-default'
            } else {
              style = 'border-gray-100 bg-white opacity-50 cursor-default'
            }
          } else if (isSelected) {
            style = 'border-orange-400 bg-orange-100 cursor-pointer'
          }

          return (
            <button
              key={i}
              className={`${base} ${style}`}
              onClick={() => !answered && setSelected(i)}
              disabled={answered}
            >
              <span className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-bold
                ${showResult && opt.correct ? 'border-green-500 bg-green-500 text-white' :
                  showResult && isSelected ? 'border-red-500 bg-red-500 text-white' :
                  isSelected ? 'border-orange-500 bg-orange-500 text-white' :
                  'border-gray-300 text-gray-400'}`}>
                {showResult && opt.correct
                  ? <CheckCircle size={14} />
                  : showResult && isSelected
                  ? <XCircle size={14} />
                  : String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">
                <span className="text-gray-800">{opt.label}</span>
                {showResult && (opt.correct || isSelected) && opt.explanation && (
                  <span className={`block text-xs mt-1 ${opt.correct ? 'text-green-700' : 'text-red-700'}`}>
                    {opt.explanation}
                  </span>
                )}
              </span>
            </button>
          )
        })}
      </div>

      {answered && (
        <div className="px-4 py-3 border-t border-orange-100 flex items-center justify-between">
          {options[selected]?.correct
            ? <p className="text-sm font-semibold text-green-700 flex items-center gap-1.5"><CheckCircle size={15} /> Correcto</p>
            : <p className="text-sm font-semibold text-red-700 flex items-center gap-1.5"><XCircle size={15} /> Incorrecto</p>
          }
          <button
            onClick={() => setSelected(null)}
            className="text-xs text-gray-400 hover:text-gray-600 underline"
          >
            Reintentar
          </button>
        </div>
      )}
    </div>
  )
}
