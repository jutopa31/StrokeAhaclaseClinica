import { useState, useRef, useEffect } from 'react'
import { Play, Square, RotateCcw, Clock } from 'lucide-react'

export default function TimerBar({ targets }) {
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setElapsed(e => e + 1), 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [running])

  const reset = () => { setRunning(false); setElapsed(0) }
  const mins = Math.floor(elapsed / 60)
  const secs = elapsed % 60
  const fmt = (n) => String(n).padStart(2, '0')

  return (
    <div className="bg-gray-900 rounded-xl p-5 text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-red-400" />
          <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">Cronómetro — Código ACV</span>
        </div>
        <div className="font-display text-3xl tabular-nums">
          <span className={mins >= (targets[targets.length-1]?.minutes || 90) ? 'text-red-400' : 'text-white'}>
            {fmt(mins)}:{fmt(secs)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {targets.map((t) => {
          const reached = mins >= t.minutes
          const next = !reached && targets.filter(x => mins < x.minutes)[0]?.minutes === t.minutes
          return (
            <div key={t.minutes} className={`rounded-lg p-3 transition-all ${reached ? 'bg-red-600' : next && running ? 'bg-gray-700 ring-2 ring-red-400 animate-pulse' : 'bg-gray-800'}`}>
              <div className="text-xs font-semibold text-white">{t.label}</div>
              <div className={`text-lg font-display font-bold ${reached ? 'text-white' : 'text-gray-400'}`}>{t.minutes} min</div>
              <div className="text-xs text-gray-300 leading-tight mt-0.5">{t.description}</div>
              {reached && <div className="text-xs text-red-200 mt-1 font-semibold">✓ Alcanzado</div>}
            </div>
          )
        })}
      </div>

      <div className="flex gap-2">
        <button onClick={() => setRunning(r => !r)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${running ? 'bg-gray-600 hover:bg-gray-500' : 'bg-red-600 hover:bg-red-500'}`}>
          {running ? <><Square size={14}/> Pausar</> : <><Play size={14}/> {elapsed === 0 ? 'Iniciar' : 'Continuar'}</>}
        </button>
        <button onClick={reset} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-700 transition-all">
          <RotateCcw size={14} /> Reiniciar
        </button>
      </div>
    </div>
  )
}