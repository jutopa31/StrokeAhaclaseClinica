# ACV Clase — Aplicación interactiva de Stroke para Clínica Médica

SPA (Single Page Application) React para soporte docente de la clase de ACV isquémico
agudo dirigida a residentes de Clínica Médica. Basada en la Guía AHA/ASA 2026.

**Desarrollada por:** Unidad de Stroke — Hospital Nacional Prof. Alejandro Posadas  
**Stack:** React 19 + Vite + Tailwind CSS 3 + React Router 7 + Lucide React  
**Deploy:** Vercel (estático, sin backend)

---

## Inicio rápido

```bash
# Instalar dependencias
npm install

# Desarrollo local
npm run dev
# → http://localhost:5173

# Build de producción
npm run build

# Preview del build
npm run preview
```

## Deploy en Vercel

```bash
# Primera vez
npm install -g vercel
vercel          # login + configuración interactiva → URL disponible en ~30 segundos

# Actualizaciones
vercel --prod   # deploy directo a producción
```

> Vercel detecta Vite automáticamente. No requiere configuración adicional.
> El archivo `vercel.json` ya incluye el rewrite necesario para HashRouter.

---

## Estructura del proyecto

```
acv-clase/
├── src/
│   ├── main.jsx              ← Punto de entrada React
│   ├── App.jsx               ← Shell: Header + TabBar + Router
│   ├── index.css             ← Tailwind base + utilidades globales
│   │
│   ├── content/              ← DATOS PUROS — sin JSX, sin imports de React
│   │   ├── nihss.js          ← Ítems del NIHSS y categorías de severidad
│   │   ├── codigoAcv.js      ← Pasos del protocolo, TA, targets del timer
│   │   ├── ventanas.js       ← Ventanas terapéuticas y mensajes clave
│   │   ├── contraindicaciones.js ← Lista de contraindicaciones con categorías
│   │   ├── caso1.js          ← Pasos del Caso Clínico 1 (editable por docente)
│   │   ├── caso2.js          ← Pasos del Caso Clínico 2 (editable por docente)
│   │   └── mensajesClave.js  ← Mensajes finales y frase de cierre
│   │
│   ├── components/           ← Componentes reutilizables sin datos hardcodeados
│   │   ├── TabBar.jsx        ← Navegación sticky con scroll horizontal en mobile
│   │   ├── SectionHeader.jsx ← Encabezado de sección con número y línea decorativa
│   │   ├── SlideCard.jsx     ← Tarjeta contenedora con acento de color
│   │   ├── AlertBox.jsx      ← Caja de alerta (red/green/blue/orange)
│   │   ├── ClinicalTable.jsx ← Tabla clínica con header oscuro y filas alternas
│   │   ├── NihssCalc.jsx     ← Calculadora NIHSS interactiva (modo step/all)
│   │   ├── TimerBar.jsx      ← Cronómetro con metas del Código ACV
│   │   ├── VentanasClock.jsx ← Simulador de ventanas terapéuticas con sliders
│   │   ├── RevealStepper.jsx ← Presentador paso a paso para casos clínicos
│   │   └── VideoEmbed.jsx    ← Embed inteligente (YouTube / MP4 / URL genérica)
│   │
│   └── tabs/                 ← Una por sección — importan de content/ y components/
│       ├── NihssTab.jsx
│       ├── CodigoAcvTab.jsx
│       ├── VentanasTab.jsx
│       ├── ContraindicacionesTab.jsx
│       ├── CasoClinico1Tab.jsx
│       ├── CasoClinico2Tab.jsx
│       └── MensajesClaveTab.jsx
│
├── index.html                ← Google Fonts (DM Sans + DM Serif Display)
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── vercel.json               ← Rewrite para SPA con HashRouter
├── package.json
└── docs/
    ├── ARCHITECTURE.md       ← Arquitectura detallada del proyecto
    ├── CONTENT_GUIDE.md      ← Cómo editar el contenido clínico
    └── COMPONENTS.md         ← API de cada componente
```

---

## Secciones de la app

| # | Tab | Componente interactivo principal |
|---|-----|----------------------------------|
| 1 | NIHSS | `NihssCalc` — calculadora por ítem con modo step/all |
| 2 | Código ACV | `TimerBar` — cronómetro con metas door-to-needle |
| 3 | Ventanas | `VentanasClock` — simulador de ventanas con sliders |
| 4 | Contraindicaciones | Lista filtrable por categoría con acordeón |
| 5 | Caso Clínico 1 | `RevealStepper` — presentación paso a paso con video |
| 6 | Caso Clínico 2 | `RevealStepper` — presentación paso a paso con video |
| 7 | Mensajes clave | Grid de cards por tipo (acción / concepto / error) |

---

## Dependencias principales

| Paquete | Versión | Uso |
|---------|---------|-----|
| react | 19 | Framework UI |
| react-dom | 19 | Renderer |
| react-router-dom | 7 | HashRouter + Routes |
| lucide-react | latest | Íconos |
| tailwindcss | 3 | Estilos utility-first |
| vite | 8 | Bundler y dev server |

> **Nota:** Tailwind v3, no v4. La config usa `tailwind.config.js` (CommonJS-compatible con `export default`).

---

## Convenciones de código

- Archivos `.jsx` para componentes, `.js` para módulos de datos
- `content/` no puede importar React — son módulos de datos puros
- Componentes de `components/` son sin estado de dominio; reciben datos como props
- Tabs son los únicos que "conocen" tanto el contenido como los componentes
- HashRouter (`#/ruta`) para compatibilidad Vercel sin configuración de rewrites por ruta