// Agregar casos al array — cada uno genera un tab automáticamente en la app.
// Tipos de step disponibles:
//   info | question | answer | error | correct | analysis | video | choice | checklist

export const casos = [
  {
    id: 'caso1',
    titulo: 'Caso Clínico 1',
    subtitulo: 'Análisis paso a paso',
    steps: [
      {
        type: 'info',
        title: 'Presentación del caso',
        paciente: {
          nombre: 'Hombre, 68 años',
          antecedentes: 'HTA, DBT tipo 2, tabaquista',
          motivo: 'Déficit neurológico focal de instalación brusca hace 45 minutos',
        },
        content: [
          'Paciente masculino de 68 años con antecedentes de HTA y DBT tipo 2 es traído por su familia a guardia.',
          'Refieren que estando en reposo presentó de forma brusca debilidad del hemicuerpo derecho e incapacidad para hablar.',
          'Al examen: Glasgow 14, hemiplejía faciobraquiocrural derecha, afasia de expresión. Sin cefalea ni pérdida de conciencia.',
        ],
      },
      {
        type: 'findings',
        title: 'Hallazgos iniciales — ¿Qué estudios solicitás?',
        findings: [
          {
            icon: '🩸',
            label: 'Glucemia capilar',
            value: '142',
            unit: 'mg/dL',
            status: 'Elevada',
            statusColor: 'orange',
            detail: 'Hiperglucemia leve — no explica el foco. Descartar hipoglucemia cumplido (DEFG).',
          },
          {
            icon: '💉',
            label: 'Presión arterial',
            value: '185/105',
            unit: 'mmHg',
            status: 'Alta',
            statusColor: 'red',
            detail: ['Igual en ambos brazos — descarta disección aórtica.', 'No tratar salvo trombolisis o >220/120.'],
          },
          {
            icon: '🧪',
            label: 'Laboratorio',
            value: 'Ver resultados',
            unit: '',
            status: 'Completado',
            statusColor: 'blue',
            detail: ['Hb 13.2 g/dL — Plaquetas 210.000 — TP 82% — KPTT 32 seg', 'Glucemia 148 mg/dL — Creatinina 1.1 — Na 138 — K 3.8'],
          },
          {
            icon: '🧠',
            label: 'TC de cerebro',
            value: 'Sin hemorragia',
            unit: '',
            status: 'Sin hemorragia',
            statusColor: 'green',
            detail: ['No se observan hiperdensidades. Sulcos conservados.', 'Compatible con isquemia aguda en territorio ACM izquierda — candidato a trombolisis.'],
          },
        ],
      },
      {
        type: 'choice',
        title: '¿Cuál es el diagnóstico más probable?',
        options: [
          { label: 'ACV isquémico hemisférico izquierdo', correct: true,  explanation: 'La clínica (hemiplejía derecha + afasia) localiza la lesión en el territorio de la ACM izquierda.' },
          { label: 'ACV hemorrágico lobar',               correct: false, explanation: 'El ACV hemorrágico suele presentar cefalea intensa y progresión rápida hacia la pérdida de conciencia.' },
          { label: 'Crisis epiléptica focal',             correct: false, explanation: 'La parálisis postictal (Todd) puede simular ACV, pero la instalación y la ausencia de movimientos convulsivos lo hacen improbable.' },
          { label: 'Hipoglucemia severa',                 correct: false, explanation: 'La hipoglucemia puede dar foco neurológico, pero lo primero es descartar con glucemia — siempre regla del DEFG.' },
        ],
      },
      {
        type: 'checklist',
        title: '¿Qué acciones tomás en los primeros 10 minutos?',
        items: [
          { label: 'Activar Código ACV / avisar al equipo de stroke',           correct: true  },
          { label: 'Glucemia capilar inmediata',                                correct: true  },
          { label: 'ECG de 12 derivaciones',                                   correct: true  },
          { label: 'Administrar aspirina 300 mg de inmediato',                  correct: false },
          { label: 'Acceso venoso periférico y extracción de laboratorio',      correct: true  },
          { label: 'TC de cerebro sin contraste',                               correct: true  },
          { label: 'Iniciar heparina IV empírica',                              correct: false },
          { label: 'Tomar presión arterial en ambos brazos',                   correct: true  },
        ],
        feedback: {
          correct: 'Aspirina e heparina están contraindicadas antes de descartar hemorragia con TC.',
        },
      },
      {
        type: 'question',
        title: 'Pregunta al residente',
        content: '(Completar — primera pregunta de reflexión para el grupo)',
      },
      {
        type: 'answer',
        title: 'Respuesta esperada',
        content: '(Completar — respuesta correcta y razonamiento)',
      },
      {
        type: 'error',
        title: 'Lo que ocurrió realmente',
        content: ['(Completar — secuencia de errores en la atención)'],
      },
      {
        type: 'correct',
        title: 'Conducta correcta',
        content: ['(Completar — qué debería haber pasado)'],
      },
      {
        type: 'analysis',
        title: 'Mensaje docente',
        content: '(Completar — reflexión final y aprendizaje)',
      },
    ],
  },

  {
    id: 'caso2',
    titulo: 'Caso Clínico 2',
    subtitulo: 'Análisis paso a paso',
    steps: [
      {
        type: 'info',
        title: 'Presentación del caso',
        content: ['(Completar con el docente — datos del paciente, antecedentes y forma de presentación)'],
      },
      // Ejemplo de step con video — descomentar y completar videoUrl:
      // {
      //   type: 'video',
      //   title: 'Video del caso',
      //   videoUrl: 'https://youtu.be/ID_DEL_VIDEO',
      //   videoTitle: 'Descripción del video',
      //   caption: 'Texto opcional debajo del video',
      // },
      {
        type: 'choice',
        title: '(Completar — pregunta de opción múltiple)',
        options: [
          { label: 'Opción A', correct: true,  explanation: '(Explicación de por qué es correcta)' },
          { label: 'Opción B', correct: false, explanation: '(Explicación de por qué no)' },
          { label: 'Opción C', correct: false, explanation: '(Explicación de por qué no)' },
        ],
      },
      {
        type: 'checklist',
        title: '(Completar — qué acciones tomás)',
        items: [
          { label: '(Acción 1)', correct: true  },
          { label: '(Acción 2)', correct: false },
          { label: '(Acción 3)', correct: true  },
        ],
        feedback: { correct: '(Completar — explicación del resultado)' },
      },
      {
        type: 'error',
        title: 'Lo que ocurrió realmente',
        content: ['(Completar)'],
      },
      {
        type: 'correct',
        title: 'Conducta correcta',
        content: ['(Completar)'],
      },
      {
        type: 'analysis',
        title: 'Mensaje docente',
        content: '(Completar)',
      },
    ],
  },

  {
    id: 'caso3',
    titulo: 'Caso Clínico 3',
    subtitulo: 'Análisis paso a paso',
    steps: [
      {
        type: 'info',
        title: 'Presentación del caso',
        content: ['(Completar con el docente — datos del paciente, antecedentes y forma de presentación)'],
      },
      {
        type: 'question',
        title: 'Pregunta al residente',
        content: '(Completar)',
      },
      {
        type: 'answer',
        title: 'Respuesta esperada',
        content: '(Completar)',
      },
      {
        type: 'analysis',
        title: 'Mensaje docente',
        content: '(Completar)',
      },
    ],
  },

  {
    id: 'caso4',
    titulo: 'Caso Clínico 4',
    subtitulo: 'Análisis paso a paso',
    steps: [
      {
        type: 'info',
        title: 'Presentación del caso',
        content: ['(Completar con el docente — datos del paciente, antecedentes y forma de presentación)'],
      },
      {
        type: 'question',
        title: 'Pregunta al residente',
        content: '(Completar)',
      },
      {
        type: 'answer',
        title: 'Respuesta esperada',
        content: '(Completar)',
      },
      {
        type: 'analysis',
        title: 'Mensaje docente',
        content: '(Completar)',
      },
    ],
  },
]
