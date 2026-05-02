import SectionHeader from '../components/SectionHeader.jsx'
import RevealStepper from '../components/RevealStepper.jsx'
import { caso1 } from '../content/caso1.js'

export default function CasoClinico1Tab() {
  return (
    <div className="space-y-5">
      <SectionHeader num="5" title={caso1.titulo} subtitle={caso1.subtitulo || 'Análisis paso a paso'} />
      <RevealStepper steps={caso1.steps} title={caso1.titulo} />
    </div>
  )
}