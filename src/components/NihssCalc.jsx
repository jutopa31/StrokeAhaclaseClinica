import { useState } from 'react'
import { nihssItems, getCategory } from '../content/nihss.js'
import { ChevronLeft, ChevronRight, RotateCcw, LayoutList, Columns } from 'lucide-react'

export default function NihssCalc() {
  const [scores, setScores] = useState({})
  const [step, setStep] = useState(0)
  const [mode, setMode] = useState('step')

  const total = Object.values(scores).reduce((a, b) => a + b, 0)
  const cat = getCategory(total)
  const completed = Object.keys(scores).length
  const maxTotal = nihssItems.reduce((a, item) => a + item.maxScore, 0)

  const setScore = (id, score) => setScores(prev => ({ ...prev, [id]: score }))
  const reset = () => { setScores({}); setStep(0) }
  const current = nihssItems[step]

  return (
    <div className="space-y-4">
      {/* Score Banner */}
      <div className={`rounded-xl p-4 ${cat.color} flex items-center justify-between`}>
        <div>
          <div className="text-3xl font-display font-bold">{total} <span className="text-lg font-sans font-normal">/ {maxTotal}</span></div>
          <div className="text-sm font-medium mt-0.5 flex items-center gap-2">
            <span className={`inline-block w-2 h-2 rounded-full ${cat.dot}`} />
            {cat.label}
          </div>
        </div>
        <div className="text-right text-xs opacity-70">{completed} / {nihssItems.length} ítems</div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div className="bg-red-500 h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${(completed / nihssItems.length) * 100}%` }} />
      </div>

      {/* Mode toggle */}
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Modo de visualización</span>
        <div className="flex rounded-lg border border-gray-200 overflow-hidden text-xs">
          <button onClick={() => setMode('step')} className={`px-3 py-1.5 flex items-center gap-1 ${mode==='step' ? 'bg-gray-800 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
            <Columns size={12} /> Paso a paso
          </button>
          <button onClick={() => setMode('all')} className={`px-3 py-1.5 flex items-center gap-1 ${mode==='all' ? 'bg-gray-800 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
            <LayoutList size={12} /> Todos
          </button>
        </div>
      </div>

      {mode === 'step' ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 animate-slide-up">
          <div className="flex items-start justify-between mb-1">
            <span className="text-xs font-semibold text-red-600 uppercase tracking-widest">{current.id}</span>
            <span className="text-xs text-gray-400">{step + 1} de {nihssItems.length}</span>
          </div>
          <h3 className="font-display text-xl text-gray-900 mb-1">{current.name}</h3>
          <p className="text-sm text-gray-500 mb-4">{current.description}</p>
          <div className="space-y-2">
            {current.options.map(opt => (
              <button key={opt.score}
                onClick={() => setScore(current.id, opt.score)}
                className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all
                  ${scores[current.id] === opt.score
                    ? 'bg-red-600 text-white border-red-600 font-medium'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-red-300 hover:bg-red-50'}`}>
                <span className={`inline-block w-6 h-6 rounded-full text-xs font-bold text-center leading-6 mr-2 flex-shrink-0
                  ${scores[current.id] === opt.score ? 'bg-white text-red-600' : 'bg-gray-200 text-gray-600'}`}
                  style={{display:'inline-flex',alignItems:'center',justifyContent:'center'}}>
                  {opt.score}
                </span>
                {opt.label}
              </button>
            ))}
          </div>
          <div className="flex justify-between mt-5 pt-4 border-t border-gray-100">
            <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
              className="flex items-center gap-1 px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed">
              <ChevronLeft size={16} /> Anterior
            </button>
            <button onClick={reset} className="flex items-center gap-1 px-3 py-2 text-sm text-gray-400 hover:text-red-600">
              <RotateCcw size={14} /> Reiniciar
            </button>
            <button onClick={() => setStep(s => Math.min(nihssItems.length - 1, s + 1))} disabled={step === nihssItems.length - 1}
              className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 font-medium hover:text-red-800 disabled:opacity-30 disabled:cursor-not-allowed">
              Siguiente <ChevronRight size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {nihssItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <span className={`inline-block w-8 h-8 rounded-full text-xs font-bold text-center leading-8 
                    ${scores[item.id] !== undefined ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-500'}`}
                    style={{display:'inline-flex',alignItems:'center',justifyContent:'center'}}>
                    {scores[item.id] ?? '?'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex gap-1.5 items-center mb-0.5">
                    <span className="text-xs font-semibold text-red-500">{item.id}</span>
                    <span className="font-medium text-gray-900 text-sm">{item.name}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{item.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.options.map(opt => (
                      <button key={opt.score} onClick={() => setScore(item.id, opt.score)}
                        className={`px-2.5 py-1 rounded-lg text-xs transition-all
                          ${scores[item.id] === opt.score ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-700'}`}>
                        {opt.score} — {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button onClick={reset} className="w-full flex items-center justify-center gap-2 py-2 text-sm text-gray-400 hover:text-red-600 mt-2">
            <RotateCcw size={14} /> Reiniciar
          </button>
        </div>
      )}
    </div>
  )
}