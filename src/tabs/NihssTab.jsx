import SectionHeader from '../components/SectionHeader.jsx'
import SlideCard from '../components/SlideCard.jsx'
import NihssCalc from '../components/NihssCalc.jsx'

export default function NihssTab() {
  return (
    <div className="space-y-5">
      <SectionHeader num="1" title="Reconocimiento del ACV" subtitle="Escala NIHSS" />
      <SlideCard accent="blue" title="¿Para qué sirve el NIHSS en clínica médica?">
        <p className="text-sm text-gray-600 leading-relaxed">
          El NIHSS cuantifica el déficit neurológico de forma rápida y reproducible. En el contexto del clínico, su valor
          principal es doble: <strong>comunicar al equipo de stroke en un lenguaje estandarizado</strong> y anticipar si
          hay oclusión de gran vaso (NIHSS alto → sospecha de OGV). Un NIHSS alto no contraindica trombólisis,
          y un NIHSS bajo no la excluye.
        </p>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs text-center">
          {[['0','Sin síntomas','gray'],['1–4','Leve','green'],['5–15','Moderado','yellow'],['16–20','Mod-severo','orange'],['21–42','Severo','red']].map(([score, label, color]) => (
            <div key={score} className={`rounded-lg p-2 bg-${color}-50 border border-${color}-200`}>
              <div className={`font-display text-lg text-${color}-700`}>{score}</div>
              <div className={`text-${color}-600 font-medium`}>{label}</div>
            </div>
          ))}
        </div>
      </SlideCard>
      <NihssCalc />
      <SlideCard accent="gray">
        <p className="text-xs text-gray-500 italic">
          Nota docente: No se espera que memoricen todos los ítems hoy. El objetivo es que puedan calcular un NIHSS
          básico y comunicarlo al neurólogo de guardia. Practicar con el equipo de enfermería.
        </p>
      </SlideCard>
    </div>
  )
}