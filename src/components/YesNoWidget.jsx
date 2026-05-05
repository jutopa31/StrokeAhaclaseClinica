import { useState } from 'react'
import { CheckCircle, XCircle, ChevronRight } from 'lucide-react'

export default function YesNoWidget({ title, noFeedback, subQuestions = [] }) {
  const [answer, setAnswer] = useState(null)
  const [revealed, setRevealed] = useState(0)

  const handleYes = () => { setAnswer('si'); setRevealed(1) }
  const handleNo  = () => { setAnswer('no') }
  const reset      = () => { setAnswer(null); setRevealed(0) }

  return (
    <div className="rounded-xl border border-orange-200 bg-orange-50 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-orange-100 border-b border-orange-200">
        <p className="text-xs font-semibold uppercase tracking-widest text-orange-700">Decisión clínica</p>
        <p className="text-sm font-medium text-gray-800 mt-0.5">{title}</p>
      </div>

      {/* Buttons */}
      {answer === null && (
        <div className="p-4 flex gap-3">
          <button
            onClick={handleYes}
            className="flex-1 py-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-lg transition-all active:scale-95 shadow-sm"
          >
            SÍ
          </button>
          <button
            onClick={handleNo}
            className="flex-1 py-4 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-lg transition-all active:scale-95 shadow-sm"
          >
            NO
          </button>
        </div>
      )}

      {/* NO → Incorrect */}
      {answer === 'no' && (
        <div className="p-4 space-y-3 animate-slide-up">
          <div className="flex items-center gap-2 bg-red-100 border border-red-300 rounded-xl px-4 py-3">
            <XCircle size={18} className="text-red-600 flex-shrink-0" />
            <p className="text-sm font-semibold text-red-800">Respuesta incorrecta</p>
          </div>
          {noFeedback && (
            <p className="text-sm text-gray-700 leading-relaxed px-1">{noFeedback}</p>
          )}
          <button onClick={reset} className="text-xs text-gray-400 hover:text-gray-600 underline">
            Reintentar
          </button>
        </div>
      )}

      {/* SÍ → sub-questions revealed progressively */}
      {answer === 'si' && (
        <div className="p-4 space-y-3 animate-slide-up">
          <div className="flex items-center gap-2 bg-green-100 border border-green-300 rounded-xl px-4 py-3">
            <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
            <p className="text-sm font-semibold text-green-800">Correcto — ahora verificá cada condición</p>
          </div>

          <div className="space-y-2">
            {subQuestions.slice(0, revealed).map((q, i) => (
              <div key={i} className="bg-white border border-orange-200 rounded-xl px-4 py-3 animate-slide-up">
                <div className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 text-orange-700 text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{q.pregunta}</p>
                    {q.respuesta && (
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{q.respuesta}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {revealed < subQuestions.length && (
            <button
              onClick={() => setRevealed(r => r + 1)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold transition-all"
            >
              Siguiente pregunta <ChevronRight size={15} />
            </button>
          )}

          {revealed >= subQuestions.length && (
            <div className="text-center text-xs text-gray-400 pt-1">Todas las condiciones verificadas</div>
          )}

          <button onClick={reset} className="text-xs text-gray-400 hover:text-gray-600 underline block">
            Reintentar
          </button>
        </div>
      )}
    </div>
  )
}
