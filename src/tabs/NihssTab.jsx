import { useState } from 'react'
import SectionHeader from '../components/SectionHeader.jsx'
import SlideCard from '../components/SlideCard.jsx'
import NihssCalc from '../components/NihssCalc.jsx'
import SintomasDiscapacitantesModal from '../components/SintomasDiscapacitantesModal.jsx'

export default function NihssTab() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="space-y-5">
      <SectionHeader num="1" title="Reconocimiento del ACV" subtitle="Escala NIHSS" />
      <SlideCard accent="blue" title="¿Para qué sirve el NIHSS en clínica médica?">
        <p className="text-sm text-gray-600 leading-relaxed">
          El NIHSS cuantifica el déficit neurológico de forma rápida y reproducible. En el contexto del clínico, su valor
          principal es doble: <strong>comunicar al equipo de stroke en un lenguaje estandarizado</strong> y anticipar si
          hay oclusión de gran vaso (NIHSS alto → sospecha de OGV). Un NIHSS alto no contraindica trombólisis,
          y un NIHSS bajo no la excluye. A partir de la guía 2026 la inclusión para tratamiento de trombólisis
          se determina a partir de la presencia de{' '}
          <button
            onClick={() => setModalOpen(true)}
            className="text-blue-600 underline underline-offset-2 decoration-dotted hover:text-blue-800 font-medium transition-colors"
          >
            síntomas discapacitantes
          </button>.
        </p>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs text-center">
          {[['0','Sin síntomas','gray'],['1–4','Leve','green'],['5–15','Moderado','yellow'],['16–20','Mod-severo','orange'],['21–42','Severo','red']].map(([score, label, color]) => (
            <div key={score} className={`rounded-lg p-2 bg-${color}-50 border border-${color}-200`}>
              <div className={`font-display text-lg text-${color}-700`}>{score}</div>
              <div className={`text-${color}-600 font-medium`}>{label}</div>
            </div>
          ))}
        </div>
        <SintomasDiscapacitantesModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </SlideCard>
      <NihssCalc />

    </div>
  )
}