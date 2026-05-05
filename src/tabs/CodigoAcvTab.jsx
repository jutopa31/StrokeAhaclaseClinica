import SectionHeader from '../components/SectionHeader.jsx'
import SlideCard from '../components/SlideCard.jsx'
import AlertBox from '../components/AlertBox.jsx'
import ClinicalTable from '../components/ClinicalTable.jsx'
import TimerBar from '../components/TimerBar.jsx'
import { protocolSteps, tensionArterial, timerTargets } from '../content/codigoAcv.js'
import { Clock } from 'lucide-react'

export default function CodigoAcvTab() {
  return (
    <div className="space-y-5">
      <SectionHeader num="2" title="Código ACV" subtitle="Manejo clínico inicial" />
      <TimerBar targets={timerTargets} />
      <div className="space-y-3">
        {protocolSteps.map(step => (
          <SlideCard key={step.id} accent="red">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 text-center">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-700 font-display text-lg font-bold">{step.id}</span>
                <div className="text-xs text-gray-400 mt-1 font-medium">{step.time}</div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-base text-gray-900 mb-2">{step.title}</h3>
                <ul className="space-y-1">
                  {step.items.map((item, i) => (
                    <li key={i} className="text-sm text-gray-700 flex gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                {step.alert && <AlertBox type={step.alert.type} text={step.alert.text} />}
              </div>
            </div>
          </SlideCard>
        ))}
      </div>
      <SlideCard accent="orange" title="Tensión arterial en el ACV agudo">
        <p className="text-sm text-gray-600 mb-3">
          La HTA en ACV isquémico es generalmente <strong>protectora</strong>. No tratar salvo situaciones específicas.
        </p>
        <ClinicalTable headers={tensionArterial[0]} rows={tensionArterial.slice(1)} />
      </SlideCard>
    </div>
  )
}