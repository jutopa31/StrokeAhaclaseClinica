export const caso2 = {
  titulo: 'Caso Clínico 2',
  subtitulo: '',
  steps: [
    {
      type: 'info',
      title: 'Presentación del caso',
      content: ['(Completar con el docente — datos del paciente, antecedentes y forma de presentación)']
    },
    // {
    //   type: 'video',
    //   title: 'Video del caso',
    //   videoUrl: 'https://youtu.be/ID_DEL_VIDEO',
    //   videoTitle: 'Descripción del video',
    //   caption: 'Texto opcional debajo del video',
    //   content: ['Notas opcionales'],
    // },
    {
      type: 'question',
      title: 'Pregunta al residente',
      content: '(Completar — primera pregunta de reflexión para el grupo)'
    },
    {
      type: 'answer',
      title: 'Respuesta esperada',
      content: '(Completar — respuesta correcta y razonamiento)'
    },
    {
      type: 'error',
      title: 'Lo que ocurrió realmente',
      content: ['(Completar — secuencia de errores en la atención)']
    },
    {
      type: 'correct',
      title: 'Conducta correcta',
      content: ['(Completar — qué debería haber pasado)']
    },
    {
      type: 'analysis',
      title: 'Mensaje docente',
      content: '(Completar — reflexión final y aprendizaje)'
    },
  ]
}