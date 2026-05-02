import { useState } from 'react'
import { Play, ExternalLink, AlertCircle } from 'lucide-react'

function youtubeId(url) {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  return m ? m[1] : null
}

function isDirectVideo(url) {
  return /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url)
}

export default function VideoEmbed({ url, title, caption }) {
  const [playing, setPlaying] = useState(false)

  if (!url) {
    return (
      <div className="rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-8 gap-2 min-h-[200px]">
        <AlertCircle size={28} className="text-gray-400" />
        <p className="text-sm text-gray-500 font-medium">Video pendiente</p>
        <p className="text-xs text-gray-400">Agregar la URL del video en el archivo de contenido</p>
      </div>
    )
  }

  const ytId = youtubeId(url)
  const direct = isDirectVideo(url)

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
      {/* YouTube */}
      {ytId && (
        !playing ? (
          <button
            onClick={() => setPlaying(true)}
            className="relative w-full block group"
            aria-label={`Reproducir: ${title || 'Video'}`}
          >
            <img
              src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
              alt={title || 'Miniatura del video'}
              className="w-full object-cover aspect-video"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play size={28} className="text-white ml-1" fill="white" />
              </div>
            </div>
            {title && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
                <p className="text-white text-sm font-medium">{title}</p>
              </div>
            )}
          </button>
        ) : (
          <div className="aspect-video">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`}
              title={title || 'Video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )
      )}

      {/* Video directo (MP4, WebM, etc.) */}
      {direct && !ytId && (
        <div className="aspect-video bg-black">
          <video
            className="w-full h-full"
            controls
            preload="metadata"
            src={url}
          >
            Tu navegador no soporta reproducción de video.
          </video>
        </div>
      )}

      {/* URL genérica (fallback — link externo) */}
      {!ytId && !direct && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-blue-50 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <Play size={18} className="text-blue-600 ml-0.5" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">{title || 'Ver video'}</p>
            <p className="text-xs text-blue-600 flex items-center gap-1 mt-0.5">
              Abrir en nueva pestaña <ExternalLink size={10} />
            </p>
          </div>
        </a>
      )}

      {/* Caption */}
      {caption && (
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
          <p className="text-xs text-gray-500 italic">{caption}</p>
        </div>
      )}
    </div>
  )
}