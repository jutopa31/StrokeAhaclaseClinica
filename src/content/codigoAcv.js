export const protocolSteps = [
  { id:1, time:'0 min', title:'Activar Código ACV',
    items:['Déficit neurológico focal súbito → activar el código sin esperar confirmación diagnóstica','Llamar a neurología en paralelo — no después del tomógrafo','Acceso venoso calibre 18 o 20 inmediato','Glucemia capilar inmediata'],
    alert:{ type:'red', text:'No esperar al neurólogo para activar el código' }},
  { id:2, time:'0–2 min', title:'La pregunta más importante',
    items:['¿A qué hora lo vieron neurológicamente normal por última vez?','Preguntar al familiar, al testigo, al vecino — quien esté disponible','ACV del despertar: el inicio es cuando se durmió asintomático, no cuando lo encontraron','Documentar: "Último visto normal: HH:MM hs" — no "hace un rato"'],
    alert:{ type:'orange', text:'Sin esta hora, no puede indicarse trombólisis' }},
  { id:3, time:'0–10 min', title:'Laboratorio y ECG',
    items:['Hemograma, TP-KPTT, glucemia, función renal, ionograma','ECG de 12 derivaciones (buscar FA, infarto, bloqueos)','NO demorar el tomógrafo esperando resultados de laboratorio','Extracciones en el mismo momento que el acceso venoso'],
    alert:null},
  { id:4, time:'≤ 25 min', title:'Tomografía cerebral — protocolo ACV',
    items:['TC de cerebro SIN contraste: excluye hemorragia, habilita trombólisis'],
    alert:null},
  { id:5, time:'≤ 45 min', title:'Evaluación neurológica + decisión',
    items:['NIHSS completo: puntaje y categoría de severidad','Verificar: hora de inicio, TA, glucemia, anticoagulantes, cirugías recientes','Confirmar ausencia de contraindicaciones absolutas','¿Hay síntomas discapacitantes?'],
    alert:null},
  { id:6, time:'≤ 60 min', title:'Door-to-needle',
    items:['Ajustar TA si > 185/110 mmHg antes de administrar (nicardipina o labetalol IV)','rtPA: 0.9 mg/kg IV (máx 90 mg) — 10% bolo, 90% en 60 min','TNK: 0.25 mg/kg IV (máx 25 mg) — bolo único en 5–10 segundos','Durante infusión: TA cada 15 min, sin punciones arteriales, sin SNG ni sonda vesical'],
    alert:{ type:'green', text:'Meta internacional: door-to-needle ≤ 60 minutos desde el ingreso' }},
  { id:7, time:'≤ 90 min', title:'Derivación para trombectomía',
    items:['Si hay oclusión de gran vaso y el centro no tiene hemodinamia neurológica','Llamar directamente al equipo de stroke intervencionista del centro receptor','Enviar imágenes digitalmente antes de que salga la ambulancia','DIDO (door-in door-out): meta ≤ 60 minutos desde el ingreso'],
    alert:{ type:'orange', text:'DIDO ≤ 60 min — meta de calidad AHA 2026' }},
]

export const tensionArterial = [
  ['Situación','Meta de TA','Conducta'],
  ['ACV isquémico sin trombólisis','Tolerar hasta 220/120 mmHg','No tratar salvo emergencia hipertensiva con daño de órgano blanco'],
  ['Previo a trombólisis','< 185/110 mmHg','Nicardipina 5 mg/h IV o labetalol 10–20 mg IV'],
  ['Post-trombólisis (primeras 24 hs)','< 180/105 mmHg','Monitoreo cada 15 min las primeras 2 hs, luego cada 30 min'],
]

export const timerTargets = [
  { label:'TC urgente',      minutes:25,  description:'Protocolo ACV sin contraste + angio-TC' },
  { label:'Decisión rtPA',  minutes:45,  description:'Evaluación neurológica completa + indicación' },
  { label:'Door-to-needle', minutes:60,  description:'Administración del trombolítico' },
  { label:'DIDO máximo',    minutes:90,  description:'Salida hacia centro de trombectomía' },
]