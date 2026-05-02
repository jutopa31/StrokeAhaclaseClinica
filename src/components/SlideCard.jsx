const accents = {
  red:    'border-red-500',
  blue:   'border-blue-500',
  green:  'border-green-500',
  orange: 'border-orange-500',
  gray:   'border-gray-300',
  none:   'border-transparent',
}

export default function SlideCard({ title, children, accent = 'none', className = '' }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 border-l-4 ${accents[accent] || accents.none} p-5 ${className}`}>
      {title && <h3 className="font-display text-lg text-gray-800 mb-3">{title}</h3>}
      {children}
    </div>
  )
}