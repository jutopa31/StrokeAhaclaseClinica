export default function ClinicalTable({ headers = [], rows = [] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-800 text-white">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3 text-left font-medium tracking-wide text-xs uppercase">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={`border-t border-gray-100 ${ri % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
              {row.map((cell, ci) => (
                <td key={ci} className={`px-4 py-3 text-gray-700 ${ci === 0 ? 'font-medium text-gray-900' : ''}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}