import Modal from './Modal.jsx'
import { CheckCircle2, XCircle } from 'lucide-react'

const discapacitantes = [
  'Hemiparesia o hemiplejía (brazo, pierna o ambos)',
  'Afasia (expresiva, receptiva o global)',
  'Disartria severa que impide comunicarse',
  'Hemianopsia o déficit visual significativo',
  'Alteración del nivel de conciencia',
  'Ataxia severa que impide deambulación',
  'Diplopía incapacitante',
  'Negligencia o heminegligencia severa',
  'Disfagia con riesgo de aspiración',
]

const noDiscapacitantes = [
  'Parestesias o entumecimiento leve aislado',
  'Paresia facial aislada leve sin otro déficit',
  'Disartria leve sin afasia ni déficit motor',
  'Ataxia leve sin caídas ni limitación funcional',
  'Cefalea aislada',
  'Visión borrosa monocular leve',
  'Mareos leves sin ataxia objetivable',
  'Déficit sensorial puro sin impacto funcional',
]

export default function SintomasDiscapacitantesModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Síntomas discapacitantes · Guía AHA/ASA 2026">
      <p className="text-xs text-gray-500 mb-4 leading-relaxed">
        A partir de la guía 2026, la elegibilidad para trombólisis en déficits leves ya no se basa
        en un puntaje NIHSS umbral, sino en la presencia de <strong>síntomas funcionalmente
        discapacitantes</strong> a criterio del médico tratante.
      </p>

      <div className="space-y-4">
        <div className="rounded-xl border border-green-200 bg-green-50 p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 size={16} className="text-green-600 flex-shrink-0" />
            <p className="font-semibold text-sm text-green-800">Síntomas discapacitantes</p>
          </div>
          <ul className="space-y-2">
            {discapacitantes.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-green-900">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <div className="flex items-center gap-2 mb-3">
            <XCircle size={16} className="text-red-500 flex-shrink-0" />
            <p className="font-semibold text-sm text-red-800">Síntomas NO discapacitantes</p>
          </div>
          <ul className="space-y-2">
            {noDiscapacitantes.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-red-900">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-gray-400 leading-relaxed">
          * La clasificación final es clínica e individualizada. Un síntoma "menor" puede ser
          discapacitante según la ocupación o actividades habituales del paciente.
        </p>
      </div>
    </Modal>
  )
}
