import { useState } from 'react'
import { CheckSquare, Square, CheckCircle, XCircle, ClipboardList } from 'lucide-react'

export default function ChecklistWidget({ title, items = [], feedback = {} }) {
  const [checked, setChecked] = useState(() => new Set())
  const [evaluated, setEvaluated] = useState(false)

  function toggle(i) {
    if (evaluated) return
    setChecked(prev => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  function evaluate() { setEvaluated(true) }
  function reset() { setChecked(new Set()); setEvaluated(false) }

  const correctItems   = items.filter(it => it.correct)
  const incorrectItems = items.filter(it => !it.correct)

  const truePositives  = correctItems.filter((_, i) => checked.has(items.indexOf(correctItems[i]))).length
  const falsePositives = incorrectItems.filter((_, i) => checked.has(items.indexOf(incorrectItems[i]))).length
  const score = Math.max(0, truePositives - falsePositives)
  const maxScore = correctItems.length

  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 overflow-hidden">
      <div className="px-4 py-3 bg-blue-100 border-b border-blue-200 flex items-center gap-2">
        <ClipboardList size={14} className="text-blue-700 flex-shrink-0" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-700">Checklist</p>
          <p className="text-sm font-medium text-gray-800 mt-0.5">{title}</p>
        </div>
      </div>

      <div className="p-3 space-y-1.5">
        {items.map((item, i) => {
          const isChecked = checked.has(i)
          const showResult = evaluated

          let rowStyle = 'rounded-lg px-3 py-2.5 flex items-center gap-3 cursor-pointer select-none transition-all border'

          if (!showResult) {
            rowStyle += isChecked
              ? ' bg-blue-100 border-blue-300'
              : ' bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50'
          } else {
            if (item.correct && isChecked)   rowStyle += ' bg-green-50 border-green-300 cursor-default'
            else if (item.correct)           rowStyle += ' bg-green-50 border-green-200 cursor-default'
            else if (!item.correct && isChecked) rowStyle += ' bg-red-50 border-red-300 cursor-default'
            else                             rowStyle += ' bg-white border-gray-100 opacity-60 cursor-default'
          }

          return (
            <div key={i} className={rowStyle} onClick={() => toggle(i)}>
              <span className="flex-shrink-0 text-blue-500">
                {showResult ? (
                  item.correct
                    ? <CheckCircle size={18} className={isChecked ? 'text-green-500' : 'text-green-300'} />
                    : isChecked
                    ? <XCircle size={18} className="text-red-500" />
                    : <Square size={18} className="text-gray-300" />
                ) : (
                  isChecked
                    ? <CheckSquare size={18} className="text-blue-600" />
                    : <Square size={18} className="text-gray-400" />
                )}
              </span>
              <span className={`text-sm flex-1 ${showResult && !item.correct && isChecked ? 'text-red-700' : showResult && item.correct ? 'text-green-800' : 'text-gray-800'}`}>
                {item.label}
              </span>
              {showResult && item.correct && !isChecked && (
                <span className="text-xs text-green-600 font-medium">No marcaste</span>
              )}
            </div>
          )
        })}
      </div>

      <div className="px-4 py-3 border-t border-blue-100">
        {!evaluated ? (
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">{checked.size} acción{checked.size !== 1 ? 'es' : ''} seleccionada{checked.size !== 1 ? 's' : ''}</p>
            <button
              onClick={evaluate}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Evaluar
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-700">
                Resultado: <span className={score === maxScore ? 'text-green-600' : score >= maxScore / 2 ? 'text-orange-600' : 'text-red-600'}>
                  {score} / {maxScore}
                </span>
                {falsePositives > 0 && (
                  <span className="text-xs text-red-500 font-normal ml-2">({falsePositives} acción{falsePositives !== 1 ? 'es' : ''} incorrecta{falsePositives !== 1 ? 's' : ''})</span>
                )}
              </p>
              <button onClick={reset} className="text-xs text-gray-400 hover:text-gray-600 underline">Reintentar</button>
            </div>
            {feedback.correct && (
              <p className="text-xs text-gray-600 bg-white rounded-lg px-3 py-2 border border-gray-200">{feedback.correct}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
