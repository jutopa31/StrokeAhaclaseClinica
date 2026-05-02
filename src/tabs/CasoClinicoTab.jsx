import SectionHeader from '../components/SectionHeader.jsx'
import RevealStepper from '../components/RevealStepper.jsx'

export default function CasoClinicoTab({ caso, num }) {
  return (
    <div className="space-y-5">
      <SectionHeader num={String(num)} title={caso.titulo} subtitle={caso.subtitulo || 'Análisis paso a paso'} />
      <RevealStepper steps={caso.steps} />
    </div>
  )
}
