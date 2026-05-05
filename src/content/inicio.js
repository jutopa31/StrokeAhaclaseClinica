export const mensajesInicio = [
  {
    num: 1,
    accent: 'blue',
    titulo: 'Tratamiento del ACV agudo',
    items: [
      { label: 'Trombólisis IV', detalle: 'Ventana de 4,5 horas desde el inicio de síntomas', color: 'blue' },
      { label: 'Trombectomía mecánica', detalle: 'Ventana de 0 a 24 horas en oclusión de gran vaso (OGV)', color: 'blue' },
    ],
  },
  {
    num: 2,
    accent: 'green',
    titulo: 'Unidades de stroke',
    texto: 'La guía AHA/ASA recomienda formar unidades de stroke para reducir los tiempos de atención y mejorar los desenlaces. La organización del equipo es tan importante como el tratamiento.',
  },
  {
    num: 3,
    accent: 'orange',
    titulo: 'Atención inicial',
    pasos: [
      { paso: '1°', texto: 'Glucemia capilar y tensión arterial' },
      { paso: '2°', texto: 'TAC cerebral simple — excluir hemorragia y pesquisar OGV' },
    ],
  },
  {
    num: 4,
    accent: 'red',
    titulo: 'Guía AHA/ASA 2026 — Novedad clave',
    texto: 'La ventana terapéutica se amplía hasta las 24 horas. Solo se requiere una TAC simple sin sangrado para indicar trombólisis en contexto clínico adecuado.',
    destacado: true,
  },
  {
    num: 5,
    accent: 'blue',
    titulo: 'Escala NIHSS',
    texto: 'Su uso es mandatorio. A partir de 2026 la indicación de trombólisis no depende del puntaje: lo determinante es si los síntomas son discapacitantes o no.',
  },
  {
    num: 6,
    accent: 'gray',
    titulo: 'Contraindicaciones — Semáforo',
    texto: 'Las contraindicaciones se organizan como un semáforo: absolutas (rojo), relativas mayores (amarillo) y relativas menores (verde). Guían la decisión clínica de forma rápida.',
    semaforo: true,
  },
]
