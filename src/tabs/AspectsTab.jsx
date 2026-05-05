import SectionHeader from '../components/SectionHeader.jsx'
import SlideCard from '../components/SlideCard.jsx'
import AlertBox from '../components/AlertBox.jsx'

const regiones = [
  { zona: 'Subcorticales', items: [
    { sigla: 'C',  nombre: 'Núcleo caudado',       detalle: 'Cabeza del caudado, adyacente al asta frontal del ventrículo lateral' },
    { sigla: 'L',  nombre: 'Núcleo lenticular',    detalle: 'Putamen y globo pálido' },
    { sigla: 'CI', nombre: 'Cápsula interna',      detalle: 'Brazo posterior de la cápsula interna' },
    { sigla: 'I',  nombre: 'Ínsula',               detalle: 'Corteza insular — ribete de la ínsula (insular ribbon)' },
  ]},
  { zona: 'Corticales ACM', items: [
    { sigla: 'M1', nombre: 'Corteza ACM anterior',           detalle: 'Territorio anterior de la ACM al nivel de los ganglios basales' },
    { sigla: 'M2', nombre: 'Corteza ACM lateral a la ínsula', detalle: 'Territorio lateral, al nivel de los ganglios basales' },
    { sigla: 'M3', nombre: 'Corteza ACM posterior',          detalle: 'Territorio posterior, al nivel de los ganglios basales' },
    { sigla: 'M4', nombre: 'Corteza ACM anterior superior',  detalle: 'Superior a M1, por encima de los ganglios basales' },
    { sigla: 'M5', nombre: 'Corteza ACM lateral superior',   detalle: 'Superior a M2, por encima de los ganglios basales' },
    { sigla: 'M6', nombre: 'Corteza ACM posterior superior', detalle: 'Superior a M3, por encima de los ganglios basales' },
  ]},
]

const interpretacion = [
  { rango: '8 – 10', label: 'Cambios leves',          color: 'green',  desc: 'Buen pronóstico. Candidato estándar a trombectomía.' },
  { rango: '6 – 7',  label: 'Cambios moderados',      color: 'yellow', desc: 'Elegible para trombectomía en ventana estándar y extendida (ASPECT ≥ 6).' },
  { rango: '3 – 5',  label: 'Large Core',             color: 'orange', desc: 'Pacientes seleccionados. Ventana extendida con criterios estrictos.' },
  { rango: '0 – 2',  label: 'Large Core Extremo',     color: 'red',    desc: 'Infarto extenso. Solo en seleccionados, edad < 80, sin efecto de masa.' },
]

export default function AspectsTab() {
  return (
    <div className="space-y-5">
      <SectionHeader num="3" title="Escala ASPECTS" subtitle="Alberta Stroke Program Early CT Score" />

      {/* Concepto */}
      <SlideCard accent="blue" title="¿Qué es el ASPECTS?">
        <p className="text-sm text-gray-600 leading-relaxed">
          El ASPECTS es una escala de 10 puntos que cuantifica el grado de cambios isquémicos precoces
          en la TC simple en el territorio de la <strong>arteria cerebral media (ACM)</strong>.
          Se utiliza para seleccionar candidatos a trombectomía mecánica y estimar el volumen de infarto.
        </p>
      </SlideCard>

      {/* Cómo calcular */}
      <SlideCard accent="red" title="Cómo calcular el ASPECTS">
        <ol className="space-y-2 mb-4">
          {[
            'Comenzar con un puntaje de 10 (TC normal).',
            'Evaluar cada una de las 10 regiones del territorio de la ACM.',
            'Identificar cambios isquémicos precoces: hipoatenuación, pérdida de diferenciación gris-blanca, borramiento de surcos.',
            'Restar 1 punto por cada región afectada.',
            'Puntaje final = 10 − número de regiones comprometidas.',
          ].map((paso, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              {paso}
            </li>
          ))}
        </ol>
        <AlertBox type="orange" text="El ASPECTS se evalúa en DOS niveles de la TC: al nivel de los ganglios basales y por encima de ellos (nivel de los ventrículos)." />
      </SlideCard>

      {/* Imágenes */}
      <SlideCard accent="gray" title="Regiones del ASPECTS en TC">
        <p className="text-xs text-gray-500 mb-3">Nivel de ganglios basales (izq.) · Nivel supraganglionar (der.)</p>
        <div className="grid grid-cols-2 gap-3">
          {['/Aspect1', '/Aspect2'].map((base, i) => {
            const exts = ['jpg', 'jpeg', 'png', 'webp']
            return (
              <div key={i} className="rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
                <picture>
                  {exts.map(ext => (
                    <source key={ext} srcSet={`${base}.${ext}`} type={`image/${ext === 'jpg' ? 'jpeg' : ext}`} />
                  ))}
                  <img
                    src={`${base}.jpg`}
                    alt={`ASPECTS nivel ${i + 1}`}
                    className="w-full object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.parentElement.querySelector('.placeholder')?.classList.remove('hidden')
                    }}
                  />
                </picture>
                <div className="placeholder hidden p-6 text-center text-xs text-gray-400">
                  Imagen pendiente — subir Aspect{i + 1} a /public
                </div>
              </div>
            )
          })}
        </div>
      </SlideCard>

      {/* Las 10 regiones */}
      <SlideCard accent="blue" title="Las 10 regiones">
        <div className="space-y-4">
          {regiones.map((grupo) => (
            <div key={grupo.zona}>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">{grupo.zona}</p>
              <div className="space-y-1.5">
                {grupo.items.map((r) => (
                  <div key={r.sigla} className="flex items-start gap-3 bg-gray-50 rounded-lg px-3 py-2">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-600 text-white font-display font-bold text-sm flex items-center justify-center">
                      {r.sigla}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{r.nombre}</p>
                      <p className="text-xs text-gray-500">{r.detalle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SlideCard>

      {/* Interpretación */}
      <SlideCard accent="gray" title="Interpretación clínica">
        <div className="space-y-2">
          {interpretacion.map((r) => (
            <div key={r.rango} className={`rounded-xl border p-3 flex items-start gap-3 bg-${r.color}-50 border-${r.color}-200`}>
              <span className={`flex-shrink-0 font-display text-xl font-bold text-${r.color}-700 w-14 text-center`}>
                {r.rango}
              </span>
              <div>
                <p className={`text-sm font-semibold text-${r.color}-800`}>{r.label}</p>
                <p className={`text-xs text-${r.color}-700 mt-0.5`}>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </SlideCard>
    </div>
  )
}
