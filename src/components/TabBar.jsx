import { useLocation, useNavigate } from 'react-router-dom'

export default function TabBar({ tabs }) {
  const location = useLocation()
  const navigate = useNavigate()
  const active = location.pathname

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex overflow-x-auto hide-scrollbar">
        {tabs.map(tab => {
          const isActive = active === tab.path || (active === '/' && tab.path === '/nihss')
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`
                flex-shrink-0 px-4 py-3 text-sm font-medium transition-all duration-150 border-b-2 whitespace-nowrap
                ${isActive
                  ? 'border-red-600 text-red-700 bg-red-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}
              `}
            >
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.shortLabel}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}