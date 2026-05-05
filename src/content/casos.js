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
            value: 'TAC sin sangrado ni LOE',
            unit: '',
            status: 'Sin hemorragia',
            statusColor: 'green',
            detail: ['No se observan hiperdensidades ni lesión ocupante de espacio.', 'Compatible con isquemia aguda en territorio ACM izquierda — candidato a trombolisis.'],
            videoUrl: '',
            videoTitle: 'TAC de cerebro — Caso 1',
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
        type: 'yesno',
        title: '¿Administramos rtPA al paciente?',
        noFeedback: 'Incorrecto. El paciente tiene síntomas discapacitantes (hemiplejía + afasia), TC sin hemorragia, glucemia normal y tensión dentro del rango permitido. Es candidato a trombólisis IV.',
        subQuestions: [
          {
            pregunta: '¿La presión arterial es óptima para administrar rtPA?',
            respuesta: 'La TA es 185/105 mmHg. El límite permitido es < 185/110. Está dentro del rango — no es necesario tratar previamente.',
          },
          {
            pregunta: '¿La tomografía es normal o sin contraindicaciones para trombolisis?',
            respuesta: 'TAC sin sangrado ni LOE. Sin signos precoces extensos de isquemia. ASPECT conservado — no contraindica trombolisis.',
          },
          {
            pregunta: '¿Presenta alguna contraindicación?',
            respuesta: 'Revisar checklist: sin cirugía reciente, sin anticoagulación, sin antecedente de hemorragia intracraneal. En este caso no hay contraindicaciones absolutas.',
          },
          {
            pregunta: '¿En qué dosis administramos rtPA?',
            respuesta: 'rtPA (alteplase): 0,9 mg/kg IV — máximo 90 mg. 10% como bolo en 1 min, 90% restante en infusión de 60 min. Acceder a la calculadora de dosis en la pestaña correspondiente.',
          },
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
    subtitulo: 'Paciente joven en puerperio',
    steps: [
      {
        type: 'info',
        title: 'Presentación del caso',
        paciente: {
          nombre: 'Mujer, 23 años',
          antecedentes: 'CIA (comunicación interauricular) nunca estudiada · Puerperio temprano · Internada en piso de Clínica Médica',
          motivo: 'Encontrada en el piso a las 01:00 hs mientras amamantaba a su bebé',
        },
        content: [
          'Paciente femenina de 23 años, puérpera, sin antecedentes patológicos salvo sospecha de CIA nunca confirmada.',
          'Último visto normal: 23:00 hs (se acostó a amamantar). Encontrada en el piso a la 01:00 hs. Llegada al establecimiento: 02:00 hs.',
          'Al examen físico: excitación psicomotriz, trastorno del lenguaje (dificultad para comprender y expresarse), trastorno de la palabra (disartria). Impresiona menor iniciativa motora del lado derecho.',
        ],
      },
      {
        type: 'reveal-checklist',
        title: '¿Qué hacés primero? Tildá cada acción para confirmar',
        items: [
          {
            label: 'Activar Código ACV inmediatamente',
            cumple: true,
            feedback: 'Correcto. Ante cualquier déficit neurológico focal de instalación brusca, el primer paso es activar el código ACV sin importar la edad ni las comorbilidades.',
          },
          {
            label: 'Glucemia capilar y tensión arterial',
            cumple: true,
            feedback: 'Correcto. Son los dos primeros parámetros a obtener: la glucemia descarta hipoglucemia como causa del foco, y la TA determina si puede administrarse trombolítico.',
          },
          {
            label: 'TC de cerebro sin contraste + angio-TC en el mismo tiempo',
            cumple: true,
            feedback: 'Correcto. La TC sin contraste excluye hemorragia y la angio-TC pesquisa OGV. Ambos se piden juntos — el error más frecuente es olvidar la angio-TC.',
          },
          {
            label: 'Evaluar si los síntomas son discapacitantes',
            cumple: true,
            feedback: 'Correcto. Según la guía AHA/ASA 2026, la indicación de trombolisis en déficits leves depende de si los síntomas son discapacitantes. En este caso: afasia + disartria + déficit motor = síntomas discapacitantes.',
          },
        ],
      },
      {
        type: 'findings',
        title: 'Hallazgos iniciales',
        findings: [
          {
            icon: '🩸',
            label: 'Glucemia capilar',
            value: '88',
            unit: 'mg/dL',
            status: 'Normal',
            statusColor: 'green',
            detail: 'Normoglucemia — descarta hipoglucemia como causa del foco neurológico.',
          },
          {
            icon: '💉',
            label: 'Presión arterial',
            value: '195/110',
            unit: 'mmHg',
            status: 'Elevada',
            statusColor: 'red',
            detail: ['Supera 185/110 — debe optimizarse ANTES de administrar trombolítico.', 'Meta: < 185/110 mmHg con nicardipina IV o labetalol IV.'],
          },
          {
            icon: '🧠',
            label: 'TC de cerebro',
            value: 'Ver resultados',
            unit: '',
            status: 'Revisar',
            statusColor: 'orange',
            detail: ['Hiperdensidad espontánea en ACM izquierda — signo de la cuerda.', 'Signo indirecto de trombosis de gran vaso. Sin hemorragia franca.'],
            videoUrl: '/Celestedelvalle1.mp4',
            videoTitle: 'TAC de cerebro — Signo de la cuerda',
          },
          {
            icon: '🫀',
            label: 'ECG',
            value: 'Ritmo sinusal',
            unit: '',
            status: 'Sin FA',
            statusColor: 'blue',
            detail: ['Sin fibrilación auricular. Sin alteraciones del ST.', 'La ausencia de FA no descarta embolia paradójica por CIA.'],
          },
        ],
      },
      {
        type: 'reveal-checklist',
        title: 'Evaluá cada afirmación — tildá para revelar',
        items: [
          {
            label: '¿La paciente está en ventana terapéutica?',
            cumple: true,
            feedback: 'SÍ. Último visto normal: 23:00 hs. Encontrada: 01:00 hs. Llegada al hospital: 02:00 hs. Han transcurrido 3 horas desde el último visto normal. La ventana para trombolisis es de 4,5 horas → la paciente está dentro de la ventana.',
          },
          {
            label: '¿Administramos rtPA al paciente?',
            cumple: false,
            feedback: 'Todavía NO. La tensión arterial es de 195/110 mmHg — supera el límite de 185/110 mmHg requerido para administrar trombolítico de forma segura. Primero se debe optimizar la TA.',
          },
          {
            label: '¿Objetivo de TA cumplido?',
            cumple: true,
            feedback: 'Meta alcanzada: TA < 185/110 mmHg con nicardipina IV 5 mg/h o labetalol IV 10–20 mg. Una vez alcanzada la meta tensional, se puede proceder con la trombolisis.',
          },
          {
            label: 'La tomografía normal descarta ACV',
            cumple: false,
            feedback: 'INCORRECTO. La TAC en fase aguda puede ser normal y aun así haber ACV isquémico establecido. Una TC normal no descarta isquemia cerebral.',
          },
          {
            label: 'La tomografía muestra signo de la cuerda → administrar trombolisis + angio-TC para evaluar OGV. Ante alta sospecha, llamar a hemodinamia',
            cumple: true,
            feedback: 'Correcto. La hiperdensidad espontánea en la ACM (signo de la cuerda) indica trombosis de gran vaso. Conducta: administrar trombolítico, solicitar angio-TC en el mismo tiempo y, ante la confirmación de OGV, contactar al equipo de hemodinamia neurológica para trombectomía mecánica.',
          },
        ],
      },
      {
        type: 'choice',
        title: '¿Cuál es el mecanismo etiopatogénico más probable?',
        options: [
          { label: 'Embolia paradójica por CIA', correct: true,
            explanation: 'La CIA permite el paso de trombos venosos a la circulación sistémica (cortocircuito derecha-izquierda). El estado hipercoagulable del puerperio favorece la formación de trombos venosos. Mecanismo clásico en ACV en jóvenes.' },
          { label: 'Ateroesclerosis de gran vaso', correct: false,
            explanation: 'Extremadamente infrecuente a los 23 años sin factores de riesgo clásicos. La ateroesclerosis requiere años de exposición a factores de riesgo.' },
          { label: 'Vasculitis del SNC', correct: false,
            explanation: 'Posible en jóvenes, pero es diagnóstico de exclusión. No explica la CIA ni el contexto puerperal de forma tan directa.' },
          { label: 'Disección arterial cervical', correct: false,
            explanation: 'Causa frecuente de ACV en jóvenes, pero suele asociarse a dolor cervical o cefalea brusca, y no tiene relación directa con CIA ni puerperio.' },
        ],
      },
      {
        type: 'error',
        title: 'Errores frecuentes en este escenario',
        content: [
          'No activar el Código ACV por "ser muy joven para un ACV".',
          'Administrar rtPA sin optimizar la TA previamente (con TA > 185/110).',
          'Interpretar la TC como normal e ignorar el signo de la cuerda.',
          'Retrasar la TC esperando resultados de laboratorio o ecocardiograma.',
          'Atribuir la excitación psicomotriz a una causa psiquiátrica sin descartar causa orgánica primero.',
          'No realizar angio-TC para pesquisar OGV en la misma atención.',
        ],
      },
    ],
  },

  {
    id: 'caso3',
    titulo: 'Caso Clínico 3',
    subtitulo: 'La misma paciente — segunda consulta',
    steps: [
      {
        type: 'info',
        title: 'Evolución del caso',
        paciente: {
          nombre: 'Misma paciente — 23 años, puérpera',
          antecedentes: 'CIA conocida · ACV isquémico reciente NO trombolizado · Anticoagulada',
          motivo: 'Deterioro del sensorio y nuevo déficit neurológico contralateral — ingresa a terapia intensiva',
        },
        content: [
          'La misma paciente del caso anterior que no fue trombolizada regresa horas después con deterioro del nivel de conciencia.',
          'Presenta ahora déficit motor del lado izquierdo (contralateral al episodio previo derecho), lo que sugiere un nuevo evento isquémico en el hemisferio derecho.',
          'La tomografía de control muestra isquemia establecida previa del hemisferio izquierdo, sin extensión hemorrágica significativa. Se realiza angio-TC.',
          'Debido al deterioro, es trasladada a unidad de terapia intensiva.',
        ],
      },
      {
        type: 'findings',
        title: 'Estudios de la segunda consulta',
        findings: [
          {
            icon: '🧠',
            label: 'TC de cerebro',
            value: 'Isquemia establecida',
            unit: '',
            status: 'Sin hemorragia',
            statusColor: 'orange',
            detail: ['Isquemia previa hemisferio izquierdo. Sin transformación hemorrágica.', 'ASPECT > 2 — extensión isquémica no contraindica trombectomía.'],
            videoUrl: '/Celestedelvalle2.mp4',
            videoTitle: 'TAC de cerebro — Caso 3',
          },
          {
            icon: '🫀',
            label: 'Angio-TC',
            value: 'OGV confirmada',
            unit: '',
            status: 'Oclusión ACM D',
            statusColor: 'red',
            detail: ['Oclusión de la arteria cerebral media derecha (M1).', 'Oclusión de gran vaso → candidata a trombectomía mecánica.'],
          },
          {
            icon: '💊',
            label: 'Anticoagulación',
            value: 'Anticoagulada',
            unit: '',
            status: 'Contraindicación',
            statusColor: 'red',
            detail: ['Paciente bajo anticoagulación terapéutica.', 'Contraindicación absoluta para trombolisis IV.'],
          },
          {
            icon: '🧪',
            label: 'Laboratorio',
            value: 'Ver resultados',
            unit: '',
            status: 'Revisado',
            statusColor: 'blue',
            detail: ['RIN: 1.8 — anticoagulación terapéutica activa. Contraindicación absoluta para trombolisis.', 'Plaquetas normales. Función renal conservada.'],
          },
        ],
      },
      {
        type: 'yesno',
        title: '¿La paciente está en ventana y es candidata a trombolisis IV?',
        noFeedback: '',
        subQuestions: [
          {
            pregunta: '¿Presenta contraindicación para trombolisis?',
            respuesta: 'SÍ. La paciente está anticoagulada — contraindicación absoluta para rtPA/TNK. La trombolisis IV está descartada en este caso.',
          },
        ],
      },
      {
        type: 'yesno',
        title: '¿Es candidata a trombectomía mecánica?',
        noFeedback: 'Incorrecto. A pesar de la contraindicación para trombolisis, la trombectomía mecánica tiene criterios independientes. La anticoagulación NO es contraindicación para trombectomía.',
        subQuestions: [
          {
            pregunta: '¿Tiene oclusión de gran vaso (OGV)?',
            respuesta: 'SÍ. La angio-TC confirma oclusión de ACM derecha (M1). OGV presente — criterio cumplido.',
          },
          {
            pregunta: '¿El ASPECT es favorable para trombectomía?',
            respuesta: 'SÍ. ASPECT > 2 — sin isquemia extensa en el nuevo territorio. La extensión de la lesión previa (hemisferio izquierdo) no afecta la elegibilidad para trombectomía del nuevo evento derecho.',
          },
          {
            pregunta: '¿Qué hacemos entonces?',
            respuesta: 'Llamar a hemodinamia / equipo de neurointervención. OGV confirmada + ASPECT > 2 + sin contraindicación para trombectomía. Preparar traslado urgente para trombectomía mecánica.',
          },
        ],
      },
      {
        type: 'correct',
        title: 'Conducta correcta',
        content: [
          'Reconocer el nuevo evento isquémico contralateral como un segundo ACV embólico.',
          'Descartar trombolisis IV por anticoagulación activa — contraindicación absoluta.',
          'Confirmar OGV por angio-TC y evaluar ASPECT del nuevo territorio.',
          'ASPECT > 2 + OGV = candidata a trombectomía mecánica. Llamar a hemodinamia de forma urgente.',
          'No demorar la derivación esperando mejoría espontánea ni nuevos estudios.',
        ],
      },
      {
        type: 'analysis',
        title: 'Mensaje docente',
        content: 'Este caso demuestra que la trombectomía mecánica y la trombolisis tienen criterios distintos e independientes. La anticoagulación impide la trombolisis pero NO la trombectomía. El ASPECT y la presencia de OGV son los determinantes clave. El conocimiento de ambas ventanas es lo que diferencia al médico que sabe del ACV del que solo conoce el rtPA.',
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
