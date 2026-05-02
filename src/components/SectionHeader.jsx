export default function SectionHeader({ num, title, subtitle }) {
  return (
    <div className="mb-6">
      <div className="flex items-baseline gap-3">
        <span className="font-display text-4xl text-red-600 leading-none">{num}</span>
        <h1 className="font-display text-2xl text-gray-900 leading-tight">{title}</h1>
      </div>
      {subtitle && <p className="mt-1 text-sm text-gray-500 ml-10">{subtitle}</p>}
      <div className="mt-3 h-px bg-gradient-to-r from-red-600 via-red-200 to-transparent" />
    </div>
  )
}