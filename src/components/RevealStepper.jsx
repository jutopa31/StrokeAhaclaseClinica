import { useState } from 'react'
import { ChevronRight, Eye, RotateCcw, Video } from 'lucide-react'
import VideoEmbed from './VideoEmbed.jsx'

const stepConfig = {
  info:     { bg:'bg-blue-50',   border:'border-blue-300',   label:'Información',       dot:'bg-blue-500'    },
  question: { bg:'bg-orange-50', border:'border-orange-300', label:'Pregunta',          dot:'bg-orange-500'  },
  answer:   { bg:'bg-green-50',  border:'border-green-400',  label:'Respuesta',         dot:'bg-green-500'   },
  error:    { bg:'bg-red-50',    border:'border-red-400',    label:'Error identificado',dot:'bg-red-500'     },
  correct:  { bg:'bg-teal-50',   border:'border-teal-400',   label:'Conducta correcta', dot:'bg-teal-500'    },
  analysis: { bg:'bg-purple-50', border:'border-purple-400', label:'Análisis docente',  dot:'bg-purple-500'  },
  video:    { bg:'bg-gray-900',  border:'border-gray-700',   label:'Video',             dot:'bg-red-500'     },
}

function Step({ step, index }) {
  const cfg = stepConfig[step.type] || stepConfig.info

  if (step.type === 'video') {
    return (
      <div className="rounded-xl overflow-hidden animate-slide-up">
        <div className="flex items-center gap-2 bg-gray-900 px-4 py-2">
          <Video size={14} className="text-red-400" />
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">{step.title}</span>
          <span className="text-xs text-gray-600 ml-auto">Paso {index + 1}</span>
        </div>
        <VideoEmbed url={step.videoUrl} title={step.videoTitle} caption={step.caption} />
        {step.content && (
          <div className="bg-gray-50 border border-gray-200 border-t-0 rounded-b-xl px-4 py-3">
            {(Array.isArray(step.content) ? step.content : [step.content]).map((item, i) => (
              <p key={i} className="text-sm text-gray-700 flex gap-2">
                {Array.isArray(step.content) && step.content.length > 1 && (
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" />
                )}
                {item}
              </p>
            ))}
          </div>
        )}
      </div>
    )
  }

  const items = Array.isArray(step.content) ? step.content : [step.content]
  return (
    <div className={`rounded-xl border-l-4 ${cfg.bg} ${cfg.border} p-4 animate-slide-up`}>
      <div className="flex items-center gap-2 mb-2">
        <span className={`w-2 h-2 rounded-full ${cfg.dot} flex-shrink-0`} />
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">{cfg.label}</span>
        <span className="text-xs text-gray-400 ml-auto">Paso {index + 1}</span>
      </div>
      <h4 className="font-display text-base text-gray-900 mb-2">{step.title}</h4>
      <div className="space-y-1">
        {items.map((item, i) => (
          <p key={i} className="text-sm text-gray-700 flex gap-2">
            {items.length > 1 && <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" />}
            {item}
          </p>
        ))}
      </div>
    </div>
  )
}

export default function RevealStepper({ steps = [] }) {
  const [current, setCurrent] = useState(0)
  const [showAll, setShowAll] = useState(false)

  const revealed = showAll ? steps : steps.slice(0, current + 1)
  const isComplete = current >= steps.length - 1

  const placeholderMode = steps.every(s =>
    s.type !== 'video' &&
    (Array.isArray(s.content) ? s.content[0] : s.content)?.toString().startsWith('(Completar')
  )

  if (placeholderMode) {
    return (
      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
        <div className="text-gray-400 text-4xl mb-3">📋</div>
        <p className="text-gray-500 font-medium">Contenido pendiente</p>
        <p className="text-sm text-gray-400 mt-1">El docente completará este caso antes de la clase.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Progress */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{showAll ? 'Todos los pasos' : `Paso ${Math.min(current + 1, steps.length)} de ${steps.length}`}</span>
        <div className="flex gap-1">
          {steps.map((s, i) => (
            <div key={i} className={`transition-all rounded-full
              ${s.type === 'video' ? 'w-3' : 'w-2'} h-2
              ${i <= current || showAll
                ? s.type === 'video' ? 'bg-red-500' : 'bg-red-400'
                : 'bg-gray-200'}`}
            />
          ))}
        </div>
      </div>

      {/* Steps revealed so far */}
      <div className="space-y-3">
        {revealed.map((step, i) => <Step key={i} step={step} index={i} />)}
      </div>

      {/* Controls */}
      <div className="flex gap-2 pt-2">
        {!showAll && !isComplete && (
          <button
            onClick={() => setCurrent(c => Math.min(steps.length - 1, c + 1))}
            className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl text-sm font-semibold transition-all"
          >
            Siguiente paso <ChevronRight size={16} />
          </button>
        )}
        {!showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="flex items-center gap-1.5 px-4 py-3 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
          >
            <Eye size={14} /> Ver todo
          </button>
        )}
        <button
          onClick={() => { setCurrent(0); setShowAll(false) }}
          className="flex items-center gap-1.5 px-4 py-3 text-sm text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
        >
          <RotateCcw size={14} />
        </button>
      </div>
    </div>
  )
}