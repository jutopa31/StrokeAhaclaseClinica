export const nihssItems = [
  { id:'1a', name:'Nivel de conciencia', description:'Respuesta a estímulo verbal y exploración general', maxScore:3,
    options:[{score:0,label:'Alerta, responde correctamente'},{score:1,label:'Somnoliento, responde con estimulación mínima'},{score:2,label:'Estuporoso, requiere estimulación repetida o dolorosa'},{score:3,label:'Coma, sin respuesta o solo reflejos'}]},
  { id:'1b', name:'Orientación (preguntas)', description:'Preguntar mes actual y edad del paciente', maxScore:2,
    options:[{score:0,label:'Ambas correctas'},{score:1,label:'Una correcta'},{score:2,label:'Ninguna correcta (o intubado / afásico)'}]},
  { id:'1c', name:'Comandos', description:'Abrir/cerrar ojos y abrir/cerrar el puño', maxScore:2,
    options:[{score:0,label:'Ambos correctos'},{score:1,label:'Uno correcto'},{score:2,label:'Ninguno correcto'}]},
  { id:'2', name:'Mirada conjugada', description:'Movimiento ocular horizontal — no seguimiento vertical', maxScore:2,
    options:[{score:0,label:'Normal'},{score:1,label:'Paresia parcial de la mirada'},{score:2,label:'Desviación forzada o paresia total'}]},
  { id:'3', name:'Campos visuales', description:'Confrontación en cuatro cuadrantes', maxScore:3,
    options:[{score:0,label:'Sin pérdida visual'},{score:1,label:'Hemianopsia parcial'},{score:2,label:'Hemianopsia completa'},{score:3,label:'Ceguera bilateral incluyendo cortical'}]},
  { id:'4', name:'Parálisis facial', description:'Mostrar dientes, elevar cejas, cerrar ojos', maxScore:3,
    options:[{score:0,label:'Movimiento normal y simétrico'},{score:1,label:'Paresia menor — asimetría al sonreír'},{score:2,label:'Parálisis parcial cara inferior'},{score:3,label:'Parálisis completa uni o bilateral'}]},
  { id:'5L', name:'Motor brazo izquierdo', description:'Extender brazo 90° sentado o 45° acostado — 10 seg', maxScore:4,
    options:[{score:0,label:'Sin caída en 10 s'},{score:1,label:'Cae antes de 10 s, no toca la cama'},{score:2,label:'Esfuerzo contra gravedad, cae a la cama'},{score:3,label:'Sin esfuerzo contra gravedad'},{score:4,label:'Sin movimiento'}]},
  { id:'5R', name:'Motor brazo derecho', description:'Extender brazo 90° sentado o 45° acostado — 10 seg', maxScore:4,
    options:[{score:0,label:'Sin caída en 10 s'},{score:1,label:'Cae antes de 10 s, no toca la cama'},{score:2,label:'Esfuerzo contra gravedad, cae a la cama'},{score:3,label:'Sin esfuerzo contra gravedad'},{score:4,label:'Sin movimiento'}]},
  { id:'6L', name:'Motor pierna izquierda', description:'Elevar pierna 30° en decúbito dorsal — 5 seg', maxScore:4,
    options:[{score:0,label:'Sin caída en 5 s'},{score:1,label:'Cae antes de 5 s, no toca la cama'},{score:2,label:'Esfuerzo contra gravedad, cae a la cama'},{score:3,label:'Sin esfuerzo contra gravedad'},{score:4,label:'Sin movimiento'}]},
  { id:'6R', name:'Motor pierna derecha', description:'Elevar pierna 30° en decúbito dorsal — 5 seg', maxScore:4,
    options:[{score:0,label:'Sin caída en 5 s'},{score:1,label:'Cae antes de 5 s, no toca la cama'},{score:2,label:'Esfuerzo contra gravedad, cae a la cama'},{score:3,label:'Sin esfuerzo contra gravedad'},{score:4,label:'Sin movimiento'}]},
  { id:'7', name:'Ataxia de miembros', description:'Dedo-nariz y talón-rodilla. Solo puntuar si desproporcionada a la paresia.', maxScore:2,
    options:[{score:0,label:'Ausente'},{score:1,label:'Presente en un miembro'},{score:2,label:'Presente en dos miembros'}]},
  { id:'8', name:'Sensibilidad', description:'Pinchazo en cara, brazo, tronco y pierna', maxScore:2,
    options:[{score:0,label:'Normal, sin pérdida sensitiva'},{score:1,label:'Pérdida leve-moderada'},{score:2,label:'Pérdida grave o total'}]},
  { id:'9', name:'Lenguaje / Afasia', description:'Describir imagen, nombrar objetos, leer oraciones', maxScore:3,
    options:[{score:0,label:'Sin afasia'},{score:1,label:'Afasia leve-moderada — comunicación posible'},{score:2,label:'Afasia grave — comunicación fragmentada'},{score:3,label:'Mudo / afasia global / coma'}]},
  { id:'10', name:'Disartria', description:'Pedir que repita palabras. No puntuar si hay afasia.', maxScore:2,
    options:[{score:0,label:'Normal'},{score:1,label:'Leve-moderada, puede entenderse'},{score:2,label:'Grave — ininteligible o anartria'}]},
  { id:'11', name:'Extinción e inatención', description:'Estimulación simultánea bilateral táctil y visual', maxScore:2,
    options:[{score:0,label:'Sin anormalidad'},{score:1,label:'Inatención en una modalidad'},{score:2,label:'Hemi-inatención grave — más de una modalidad'}]},
]

export const nihssCategories = [
  { min:0,  max:0,  label:'Sin síntomas',     color:'bg-gray-100 text-gray-700',     dot:'bg-gray-400'    },
  { min:1,  max:4,  label:'Leve',             color:'bg-green-50 text-green-800',    dot:'bg-green-500'   },
  { min:5,  max:15, label:'Moderado',          color:'bg-yellow-50 text-yellow-800',  dot:'bg-yellow-500'  },
  { min:16, max:20, label:'Moderado-severo',   color:'bg-orange-50 text-orange-800',  dot:'bg-orange-500'  },
  { min:21, max:42, label:'Severo',            color:'bg-red-50 text-red-800',        dot:'bg-red-500'     },
]

export function getCategory(score) {
  return nihssCategories.find(c => score >= c.min && score <= c.max) || nihssCategories[0]
}