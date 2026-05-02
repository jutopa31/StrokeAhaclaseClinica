import SectionHeader from '../components/SectionHeader.jsx'
import RevealStepper from '../components/RevealStepper.jsx'
import { caso2 } from '../content/caso2.js'

export default function CasoClinico2Tab() {
  return (
    <div className="space-y-5">
      <SectionHeader num="6" title={caso2.titulo} subtitle={caso2.subtitulo || 'Análisis paso a paso'} />
      <RevealStepper steps={caso2.steps} title={caso2.titulo} />
    </div>
  )
}