export const ventanas = [
  { nombre:'Trombólisis IV (rtPA / TNK)', inicio:0, fin:4.5, color:'green',
    descripcion:'Ventana clásica desde el último visto normal',
    condicion:'Todos los candidatos sin contraindicaciones absolutas',
    meta:'Door-to-needle ≤ 60 min desde el ingreso',
    referencia:'AHA 2026 — Clase I, Nivel A' },
  { nombre:'Trombectomía — ventana estándar', inicio:0, fin:6, color:'blue',
    descripcion:'Oclusión de gran vaso confirmada por angio-TC',
    condicion:'Carótida interna intracraneal, ACM M1/M2, arteria basilar',
    meta:'Door-to-puncture ≤ 90 min desde el ingreso',
    referencia:'AHA 2026 — Clase I, Nivel A' },
  { nombre:'Trombectomía — ventana extendida', inicio:6, fin:24, color:'yellow',
    descripcion:'Selección por imagen: TC perfusión o RMN-DWI',
    condicion:'Estudios DAWN y DEFUSE-3: mismatch clínico-imagen favorable',
    meta:'Definido por imagen, no solo por tiempo',
    referencia:'AHA 2026 — Clase I, Nivel A (DAWN / DEFUSE-3)' },
]

export const mensajesVentanas = [
  'Cada 15 min de demora = 1 mes de vida independiente perdido en promedio',
  'La ventana de 24 hs para trombectomía requiere imagen favorable — no aplica a todos',
  'Si califica para ambas: administrar trombólisis Y derivar para trombectomía sin esperar respuesta clínica',
  'El ACV del despertar puede tratarse con mismatch DWI-FLAIR en RMN o imagen de perfusión favorable',
]