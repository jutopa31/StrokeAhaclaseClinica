import { useState } from 'react'
import SectionHeader from '../components/SectionHeader.jsx'
import SlideCard from '../components/SlideCard.jsx'
import AlertBox from '../components/AlertBox.jsx'
import { contraindicaciones, categoriaConfig } from '../content/contraindicaciones.js'
import { ChevronDown, ChevronUp } from 'lucide-react'

function ContraItem({ item }) {
  const [open, setOpen] = useState(false)
  const cfg = categoriaConfig[item.categoria]
  return (
    <div className={`rounded-xl border ${cfg.border} ${cfg.bg} overflow-hidden transition-all`}>
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-4 py-3 text-left">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${cfg.dot}`} />
          <span className="text-sm font-medium text-gray-800">{item.situacion}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
          <span className={`hidden sm:inline text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.badge}`}>{categoriaConfig[item.categoria].label}</span>
          {open ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
        </div>
      </button>
      {open && (
        <div className="px-4 pb-3 pt-0">
          <p className="text-sm text-gray-700 pl-4">{item.detalle}</p>
        </div>
      )}
    </div>
  )
}

export default function ContraindicacionesTab() {
  const [filtro, setFiltro] = useState('todas')
  const categorias = ['todas', 'tratar', 'individualizar', 'evitar']
  const filtered = filtro === 'todas' ? contraindicaciones : contraindicaciones.filter(c => c.categoria === filtro)

  return (
    <div className="space-y-5">
      <SectionHeader num="4" title="Contraindicaciones para trombólisis" subtitle="Guía AHA/ASA 2026" />
      <SlideCard accent="blue">
        <p className="text-sm text-gray-700">La guía AHA 2026 abandona la lista rígida de contraindicaciones absolutas/relativas y adopta un modelo de <strong>tres categorías según relación beneficio/riesgo</strong>. Muchas situaciones que antes contraindicaban ahora requieren decisión individualizada.</p>
      </SlideCard>

      {/* Filtro */}
      <div className="flex flex-wrap gap-2">
        {categorias.map(cat => {
          const cfg = cat === 'todas' ? null : categoriaConfig[cat]
          return (
            <button key={cat} onClick={() => setFiltro(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border
                ${filtro === cat
                  ? cat === 'todas' ? 'bg-gray-800 text-white border-gray-800'
                    : `${cfg.badge} border-transparent`
                  : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`}>
              {cat === 'todas' ? 'Todas' : cfg.label}
              <span className="ml-1 opacity-60">
                ({cat === 'todas' ? contraindicaciones.length : contraindicaciones.filter(c => c.categoria === cat).length})
              </span>
            </button>
          )
        })}
      </div>

      <div className="space-y-2">
        {filtered.map((item, i) => <ContraItem key={i} item={item} />)}
      </div>

      <AlertBox type="green" title="Cambios relevantes en AHA 2026" items={[
        'Aneurismas no rotos: ya NO contraindican.',
        'Neoplasias extra-axiales (meningiomas, schwannomas): ya NO contraindican.',
        'Stroke mimics con alta probabilidad clínica de ACV: se puede trombolizar.',
        'DOACs < 48 hs: categoría individualizar, no contraindicación absoluta.',
      ]} />
      <AlertBox type="red" title="Contraindicaciones que se mantienen absolutas" items={[
        'Hemorragia activa o en TC de cerebro.',
        'TBI grave o neurocirugía < 14 días.',
        'Tumor cerebral intra-axial.',
        'Coagulopatía severa (plaquetas < 100.000 o INR > 1.7).',
        'Disección aórtica — el trombolítico puede extenderla.',
        'Endocarditis infecciosa activa.',
      ]} />
    </div>
  )
}