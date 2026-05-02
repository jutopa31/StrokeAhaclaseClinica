import { useState } from 'react'

const statusStyles = {
  green:  { badge: 'bg-green-100 text-green-700 border-green-200',  ring: 'ring-green-300' },
  orange: { badge: 'bg-orange-100 text-orange-700 border-orange-200', ring: 'ring-orange-300' },
  red:    { badge: 'bg-red-100 text-red-700 border-red-200',         ring: 'ring-red-300' },
  blue:   { badge: 'bg-blue-100 text-blue-700 border-blue-200',      ring: 'ring-blue-300' },
}

function FindingCard({ finding }) {
  const [open, setOpen] = useState(false)
  const style = statusStyles[finding.statusColor] || statusStyles.blue
  const details = Array.isArray(finding.detail) ? finding.detail : [finding.detail]

  return (
    <div
      onClick={() => setOpen(o => !o)}
      className={`cursor-pointer rounded-xl border-2 transition-all duration-200 select-none
        ${open
          ? `bg-white border-gray-300 shadow-md ${style.ring} ring-2`
          : 'bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-sm'
        }`}
    >
      {!open ? (
        /* Closed state */
        <div className="p-4 flex flex-col items-center text-center gap-2">
          <span className="text-2xl">🔒</span>
          <span className="text-sm font-semibold text-gray-600">{finding.label}</span>
          <span className="text-xs text-gray-400 bg-gray-100 border border-gray-200 rounded-full px-3 py-1 font-medium">
            Solicitar
          </span>
        </div>
      ) : (
        /* Open state */
        <div className="p-4">
          <div className="flex items-start gap-3 mb-3">
            <span className="text-2xl leading-none">{finding.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">{finding.label}</p>
              <p className="text-xl font-bold text-gray-900 leading-tight">
                {finding.value}
                {finding.unit && <span className="text-sm font-normal text-gray-500 ml-1">{finding.unit}</span>}
              </p>
            </div>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 ${style.badge}`}>
              {finding.status}
            </span>
          </div>
          <div className="space-y-1 border-t border-gray-100 pt-3">
            {details.map((line, i) => (
              <p key={i} className="text-xs text-gray-600 flex gap-1.5">
                {details.length > 1 && <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" />}
                {line}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function FindingsWidget({ findings = [], title }) {
  const openCount = findings.length

  return (
    <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-700">Estudios</span>
      </div>
      {title && <h4 className="font-display text-base text-gray-900 mb-3">{title}</h4>}
      <p className="text-xs text-gray-500 mb-3">
        Toca cada tarjeta para revelar el resultado ({openCount} estudios disponibles)
      </p>
      <div className="grid grid-cols-2 gap-3">
        {findings.map((finding, i) => (
          <FindingCard key={i} finding={finding} />
        ))}
      </div>
    </div>
  )
}
