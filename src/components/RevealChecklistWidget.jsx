import { useState } from 'react'
import { Square, CheckCircle2, XCircle, RotateCcw, ClipboardList } from 'lucide-react'

export default function RevealChecklistWidget({ title, items = [] }) {
  const [revealed, setRevealed] = useState(() => new Array(items.length).fill(false))

  const toggle = (i) => setRevealed(prev => {
    const next = [...prev]
    next[i] = !next[i]
    return next
  })

  const reset = () => setRevealed(new Array(items.length).fill(false))

  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 overflow-hidden">
      <div className="px-4 py-3 bg-blue-100 border-b border-blue-200 flex items-center gap-2">
        <ClipboardList size={14} className="text-blue-700 flex-shrink-0" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-700">Evaluación paso a paso</p>
          <p className="text-sm font-medium text-gray-800 mt-0.5">{title}</p>
        </div>
      </div>

      <div className="p-3 space-y-2">
        {items.map((item, i) => {
          const isRevealed = revealed[i]

          return (
            <div key={i} className="rounded-xl border overflow-hidden transition-all duration-200">
              {/* Row header — always visible, clickable */}
              <div
                onClick={() => toggle(i)}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer select-none transition-colors
                  ${isRevealed
                    ? item.cumple
                      ? 'bg-green-100 border-green-300'
                      : 'bg-red-50 border-red-300'
                    : 'bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-300'
                  }`}
              >
                <span className="flex-shrink-0">
                  {!isRevealed
                    ? <Square size={18} className="text-gray-400" />
                    : item.cumple
                    ? <CheckCircle2 size={18} className="text-green-600" />
                    : <XCircle size={18} className="text-red-500" />
                  }
                </span>
                <span className={`text-sm font-medium flex-1
                  ${isRevealed
                    ? item.cumple ? 'text-green-900' : 'text-red-900'
                    : 'text-gray-800'
                  }`}>
                  {item.label}
                </span>
                {isRevealed && (
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0
                    ${item.cumple ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {item.cumple ? 'Se cumple' : 'No se cumple'}
                  </span>
                )}
              </div>

              {/* Feedback — revealed on click */}
              {isRevealed && item.feedback && (
                <div className={`px-4 py-3 border-t text-xs leading-relaxed animate-slide-up
                  ${item.cumple
                    ? 'bg-green-50 border-green-200 text-green-900'
                    : 'bg-red-50 border-red-200 text-red-900'
                  }`}>
                  {item.feedback}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="px-4 pb-3">
        <button
          onClick={reset}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          <RotateCcw size={12} /> Reiniciar
        </button>
      </div>
    </div>
  )
}
