import { XCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react'

const config = {
  red:    { bg:'bg-red-50',    border:'border-red-400',    text:'text-red-800',    Icon:XCircle        },
  green:  { bg:'bg-green-50',  border:'border-green-500',  text:'text-green-800',  Icon:CheckCircle2   },
  blue:   { bg:'bg-blue-50',   border:'border-blue-500',   text:'text-blue-800',   Icon:Info           },
  orange: { bg:'bg-orange-50', border:'border-orange-400', text:'text-orange-800', Icon:AlertTriangle  },
}

export default function AlertBox({ type = 'blue', title, items = [], text }) {
  const { bg, border, text: textColor, Icon } = config[type] || config.blue
  const content = items.length > 0 ? items : (text ? [text] : [])
  return (
    <div className={`rounded-lg border ${bg} ${border} p-4 mt-3`}>
      <div className="flex gap-2 items-start">
        <Icon size={16} className={`${textColor} mt-0.5 flex-shrink-0`} />
        <div className="flex-1">
          {title && <p className={`font-semibold text-sm ${textColor} mb-1`}>{title}</p>}
          {content.length === 1
            ? <p className={`text-sm ${textColor}`}>{content[0]}</p>
            : <ul className="space-y-1">{content.map((item, i) => (
                <li key={i} className={`text-sm ${textColor} flex gap-1.5`}>
                  <span className="mt-1 w-1 h-1 rounded-full bg-current flex-shrink-0" />
                  {item}
                </li>
              ))}</ul>
          }
        </div>
      </div>
    </div>
  )
}