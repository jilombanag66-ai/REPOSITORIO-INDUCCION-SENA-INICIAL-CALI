/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Apprentice, CaseStudy, ChecklistItem, InductionModule, Quiz } from '../types/induction';

export const SENA_MODULES: InductionModule[] = [
  {
    id: 'mod-1',
    title: 'Módulo 1: Identidad e Imagen Institucional del SENA',
    shortTitle: 'Identidad Institucional',
    category: 'identidad',
    durationMinutes: 45,
    topicsCount: 5,
    description: 'Conoce los orígenes del SENA, sus símbolos patrios e institucionales, misión, visión, himno y código de integridad.',
    objectives: [
      'Identificar el significado del escudo, la bandera y el logotipo institucional.',
      'Aprender e interpretar el himno oficial del SENA.',
      'Interiorizar los valores del código de integridad y la cultura de paz.',
      'Reconocer la presencia nacional del SENA y sus 33 regionales.'
    ]
  },
  {
    id: 'mod-2',
    title: 'Módulo 2: Marco Normativo y Reglamento del Aprendiz',
    shortTitle: 'Reglamento del Aprendiz',
    category: 'reglamento',
    durationMinutes: 60,
    topicsCount: 6,
    description: 'Apropiación del Acuerdo 007 de 2012: Derechos, deberes, prohibiciones, medidas formativas, sanciones y debido proceso.',
    objectives: [
      'Diferenciar con claridad los derechos y los deberes del aprendiz SENA.',
      'Clasificar las faltas académicas y disciplinarias (leves, graves y gravísimas).',
      'Comprender el procedimiento del Comité de Evaluación y Seguimiento.',
      'Ejercer el derecho a la defensa y el debido proceso formativo.'
    ]
  },
  {
    id: 'mod-3',
    title: 'Módulo 3: Formación Profesional Integral (FPI) y Zajuna',
    shortTitle: 'Modelo Pedagógico & LMS',
    category: 'fpi',
    durationMinutes: 50,
    topicsCount: 4,
    description: 'Enfoque por competencias, etapa lectiva y etapa productiva, portafolio de evidencias y uso de las plataformas tecnológicas.',
    objectives: [
      'Entender la metodología de formación por proyectos y competencias laborales.',
      'Gestionar el portafolio individual de evidencias de aprendizaje.',
      'Navegar en las plataformas SofiaPlus y LMS Zajuna.',
      'Conocer las alternativas para el desarrollo de la etapa productiva (contrato de aprendizaje, proyecto productivo, pasantía).'
    ]
  },
  {
    id: 'mod-4',
    title: 'Módulo 4: Bienestar al Aprendiz y Servicios de Apoyo',
    shortTitle: 'Bienestar y Apoyos',
    category: 'bienestar',
    durationMinutes: 35,
    topicsCount: 4,
    description: 'Estrategias de permanencia, apoyos de sostenimiento, monitorías, liderazgo, cultura, deporte, salud y orientación ocupacional.',
    objectives: [
      'Acceder a los programas de salud, orientación psicológica y actividades culturales/deportivas.',
      'Conocer los requisitos para apoyos de sostenimiento FIC y regulares.',
      'Participar en convocatorias de monitorías académicas y técnicas.',
      'Aprovechar los servicios de Biblioteca Virtual, SENNOVA y Fondo Emprender.'
    ]
  }
];

export const SENA_SYMBOLS = [
  {
    id: 'escudo',
    name: 'Escudo del SENA',
    meaning: 'Refleja los tres sectores económicos clave del país mediante tres figuras emblemáticas dispuestas armónicamente.',
    elements: [
      {
        icon: 'cog',
        title: 'El Piñón o Rueda Dentada',
        description: 'Simboliza el sector de la industria y la construcción, motores de la tecnificación nacional.'
      },
      {
        icon: 'caduceus',
        title: 'El Caduceo',
        description: 'Representa el sector del comercio y los servicios, la actividad mercantil y el intercambio ético.'
      },
      {
        icon: 'leaf',
        title: 'Las Ramas de Café',
        description: 'Simbolizan el sector agropecuario y campesino, raíz histórica y riqueza de Colombia.'
      }
    ]
  },
  {
    id: 'bandera',
    name: 'Bandera del SENA',
    meaning: 'Consta de un lienzo blanco con el escudo institucional en el centro, izada con orgullo en todas las sedes.',
    elements: [
      {
        icon: 'flag',
        title: 'Fondo Blanco Impecable',
        description: 'Representa la paz, la transparencia, la rectitud ética, la concordia y la apertura a todos los colombianos.'
      },
      {
        icon: 'shield',
        title: 'Escudo en Verde Institucional',
        description: 'El verde (#39A900) simboliza la esperanza, la juventud, el crecimiento laboral y el desarrollo productivo.'
      }
    ]
  },
  {
    id: 'logotipo',
    name: 'Logotipo Oficial (El Hombre Caminante)',
    meaning: 'Creado durante la administración de Fernando Navas Talero, representa la proyección vital del aprendiz.',
    elements: [
      {
        icon: 'user-check',
        title: 'El Hombre Libre',
        description: 'Una figura humana estilizada que avanza con determinación y firmeza hacia el porvenir.'
      },
      {
        icon: 'git-commit',
        title: 'Caminos que se Cruzan',
        description: 'Las líneas representan los múltiples senderos de la formación técnica y tecnológica que abren oportunidades de vida.'
      }
    ]
  }
];

export const SENA_ANTHEM_STANZAS = [
  {
    number: 0,
    type: 'Coro',
    verses: [
      'Estudiantes del SENA adelante',
      'por Colombia luchad con amor',
      'con el ánimo noble y constante',
      'al trabajo brindad ilusión.'
    ]
  },
  {
    number: 1,
    type: 'I Estrofa',
    verses: [
      'Desde el campo bravío y la urbe',
      'un ejército alegre de paz,',
      'va tejiendo los mil porvenires',
      'al compás del trabajo tenaz.'
    ]
  },
  {
    number: 2,
    type: 'II Estrofa',
    verses: [
      'En la forja del alma florecen',
      'la esperanza, la ciencia y la fe,',
      'y en el pecho despierto resuena',
      'la consigna de patria y deber.'
    ]
  },
  {
    number: 3,
    type: 'III Estrofa',
    verses: [
      'Hoy la patria nos llama a la siega',
      'de un mañana más libre y mejor,',
      'con la ciencia en las manos unidas',
      'y en el pecho latiendo el honor.'
    ]
  }
];

export const SENA_VALUES = [
  {
    title: 'Honestidad',
    description: 'Actúo siempre con base en la verdad, coherencia y justicia, dando a cada quien lo que le corresponde.'
  },
  {
    title: 'Respeto',
    description: 'Reconozco, valoro y trato de manera digna a todas las personas, con sus virtudes y diferencias.'
  },
  {
    title: 'Compromiso',
    description: 'Soy consciente de la importancia de mi rol como aprendiz y formador, y cumplo mis responsabilidades.'
  },
  {
    title: 'Diligencia',
    description: 'Cumplo con los deberes y funciones con atención, prontitud, destreza y eficiencia.'
  },
  {
    title: 'Justicia',
    description: 'Actúo con imparcialidad garantizando los derechos de los miembros de la comunidad educativa.'
  },
  {
    title: 'Solidaridad',
    description: 'Presto ayuda mutua y colaboro con mis compañeros y entorno para el beneficio colectivo.'
  },
  {
    title: 'Lealtad',
    description: 'Defiendo los principios institucionales y actúo con fidelidad hacia la comunidad del SENA.'
  }
];

export const REGULATION_ARTICLES = [
  {
    category: 'Derechos',
    chapter: 'Capítulo II - Derechos del Aprendiz',
    article: 'Art. 7',
    summary: 'El aprendiz goza de recibir formación profesional integral de calidad acorde al programa.',
    keyPoints: [
      'Recibir inducción completa al iniciar su programa de formación.',
      'Disponer de los recursos físicos, tecnológicos y didácticos necesarios.',
      'Ser escuchado y atendido en sus peticiones respetuosas con debido proceso.',
      'Recibir oportunamente el carné institucional vigente.',
      'Acceder a los programas de Bienestar al Aprendiz y apoyos de sostenimiento.'
    ]
  },
  {
    category: 'Deberes',
    chapter: 'Capítulo III - Deberes del Aprendiz',
    article: 'Art. 8',
    summary: 'El aprendiz asume compromisos éticos, académicos y de convivencia en el centro y entornos virtuales.',
    keyPoints: [
      'Portar visiblemente el carné institucional dentro y fuera del centro de formación.',
      'Asistir puntualmente a todas las actividades programadas en etapa lectiva y productiva.',
      'Respetar los derechos de autor, evitando el plagio y la suplantación.',
      'Cuidar los equipos, herramientas, software y ambientes de aprendizaje.',
      'Acacar las normas de bioseguridad, seguridad y salud en el trabajo (SST).'
    ]
  },
  {
    category: 'Prohibiciones',
    chapter: 'Capítulo IV - Prohibiciones',
    article: 'Art. 9',
    summary: 'Conductas expresamente vetadas que atentan contra la convivencia y la legalidad.',
    keyPoints: [
      'Ingresar o consumir sustancias psicoactivas o bebidas embriagantes en el centro.',
      'Portar cualquier tipo de arma, explosivo u objeto que atente contra la integridad.',
      'Cometer fraude en evaluaciones, evidencias o adulteración de documentos.',
      'Incurrir en actos de violencia física, verbal, discriminación o ciberacoso.',
      'Propiciar o participar en desórdenes que alteren la normal marcha de las actividades.'
    ]
  },
  {
    category: 'Faltas y Sanciones',
    chapter: 'Capítulo VII y VIII - Medidas Formativas y Sanciones',
    article: 'Art. 24 a 28',
    summary: 'Clasificación de faltas (Leves, Graves, Gravísimas) y medidas pedagógicas aplicables.',
    keyPoints: [
      'Llamado de atención verbal con compromiso inmediato.',
      'Plan de mejoramiento académico o disciplinario concertado con el instructor.',
      'Condicionamiento de matrícula: medida sancionatoria preventiva por reiteración de faltas.',
      'Cancelación de matrícula: pérdida del cupo con inhabilidad para ingresar al SENA de 6 meses a 3 años.'
    ]
  },
  {
    category: 'Debido Proceso',
    chapter: 'Capítulo IX - Comité de Evaluación y Seguimiento',
    article: 'Art. 29 a 35',
    summary: 'Garantía constitucional del derecho a la defensa y contradicción antes de emitir cualquier sanción.',
    keyPoints: [
      'Notificación formal por escrito con indicación de los hechos y normas presuntamente infringidas.',
      'Término de 3 días hábiles para presentar descargos y aportar pruebas.',
      'Sesión del Comité con presencia del aprendiz, vocero e instructor orientador.',
      'Recomendación del comité al Subdirector de Centro, quien emite el acto administrativo.',
      'Derecho a interponer Recurso de Reposición dentro de los 5 días hábiles siguientes.'
    ]
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-1',
    title: 'Caso 1: Evidencia descargada de internet sin citar autor',
    category: 'academica',
    situation: 'Durante la entrega de una evidencia técnica en la plataforma Zajuna, el instructor detecta que un aprendiz subió un documento exactamente idéntico al de un repositorio público en línea, haciéndolo pasar como propio sin ninguna referencia bibliográfica.',
    contextArticle: 'Reglamento del Aprendiz, Art. 8 (Deberes sobre derechos de autor) y Art. 9 (Prohibición de plagio y fraude).',
    options: [
      {
        id: 'opt-1a',
        text: 'Expulsión inmediata del centro sin derecho a explicar lo sucedido.',
        isCorrect: false,
        feedback: 'Incorrecto. Ninguna sanción puede aplicarse sin respetar el debido proceso y la garantía de descargos establecida en el Capítulo IX.'
      },
      {
        id: 'opt-1b',
        text: 'Revisión con el aprendiz, no aprobación de la evidencia y concertación de un Plan de Mejoramiento Académico para reformular el entregable con normas APA.',
        isCorrect: true,
        feedback: '¡Correcto! En primer término prima la medida formativa. Si la conducta no es reiterada, se concerta un plan de mejoramiento académico con fecha límite estricta.'
      },
      {
        id: 'opt-1c',
        text: 'Aprobar la evidencia con advertencia privada y no registrar novedad.',
        isCorrect: false,
        feedback: 'Incorrecto. El plagio atenta contra la integridad académica y debe registrarse como novedad formativa.'
      }
    ],
    resolutionRule: 'Acuerdo 007 de 2012, Art. 24: Las medidas formativas buscan la corrección pedagógica de la conducta académica antes de escalar a sanciones mayores.'
  },
  {
    id: 'case-2',
    title: 'Caso 2: Inasistencia injustificada reiterada por 3 días consecutivos',
    category: 'tramite',
    situation: 'Un aprendiz de formación presencial deja de asistir a su centro de formación el lunes, martes y miércoles sin enviar soporte médico ni avisar al instructor vocero de la ficha.',
    contextArticle: 'Reglamento del Aprendiz, Art. 22 (Deserción del proceso de formación).',
    options: [
      {
        id: 'opt-2a',
        text: 'El instructor notifica la novedad para citar al aprendiz a justificar su inasistencia dentro de los 3 días hábiles siguientes.',
        isCorrect: true,
        feedback: '¡Exacto! El reglamento estipula que ante 3 días continuos de inasistencia sin justificación, se debe notificar formalmente para que el aprendiz presente sus soportes antes de declarar deserción.'
      },
      {
        id: 'opt-2b',
        text: 'Cancelar la matrícula automáticamente el cuarto día sin comunicación previa.',
        isCorrect: false,
        feedback: 'Incorrecto. Se violaría el debido proceso. Siempre se debe conceder el plazo para que el aprendiz exponga si ocurrió una fuerza mayor o calamidad doméstica comprobada.'
      },
      {
        id: 'opt-2c',
        text: 'Ignorar la inasistencia y esperar hasta el final del trimestre.',
        isCorrect: false,
        feedback: 'Incorrecto. El seguimiento oportuno es responsabilidad compartida del equipo ejecutor de la formación para prevenir la deserción.'
      }
    ],
    resolutionRule: 'Art. 22 numeral 1: La deserción por inasistencia exige requerimiento al aprendiz para que justifique su ausencia en el término de tres (3) días hábiles.'
  },
  {
    id: 'case-3',
    title: 'Caso 3: Ingreso a talleres sin elementos de protección (EPP)',
    category: 'disciplinaria',
    situation: 'Un aprendiz ingresa al taller de mecanizado y robótica sin calzado de seguridad, sin gafas de protección y con accesorios metálicos en las manos, ignorando la advertencia del personal de seguridad.',
    contextArticle: 'Reglamento del Aprendiz, Art. 8 numeral 18 (Normas de Seguridad y Salud en el Trabajo SST).',
    options: [
      {
        id: 'opt-3a',
        text: 'Permitirle continuar si promete tener cuidado con las máquinas.',
        isCorrect: false,
        feedback: 'Incorrecto. La seguridad física es innegociable y pone en riesgo inminente la vida del aprendiz y sus compañeros.'
      },
      {
        id: 'opt-3b',
        text: 'Restringir el acceso inmediato al ambiente de riesgo, realizar llamado de atención por escrito y sensibilización en SST con el equipo de bienestar.',
        isCorrect: true,
        feedback: '¡Muy bien! Se preserva la vida inmediatamente retirándolo del área de riesgo y se procede con el llamado de atención formativo.'
      },
      {
        id: 'opt-3c',
        text: 'Sancionarlo con cancelación definitiva de la carrera técnica sin llamado previo.',
        isCorrect: false,
        feedback: 'Incorrecto. La sanción debe ser proporcional a la falta y seguir la escala de medidas formativas.'
      }
    ],
    resolutionRule: 'Art. 8 numeral 18 y Art. 25: El incumplimiento de normas de SST faculta la restricción preventiva del ambiente de formación y el registro de la medida formativa.'
  }
];

export const QUIZZES: Quiz[] = [
  {
    id: 'quiz-mod-1',
    title: 'Evaluación: Identidad e Imagen SENA',
    moduleId: 'mod-1',
    description: 'Comprueba tu conocimiento sobre los símbolos, misión, valores e historia institucional.',
    passingScore: 80,
    questions: [
      {
        id: 'q1-1',
        question: '¿Qué representan las ramas de café en el escudo institucional del SENA?',
        options: [
          'La exportación cafetera internacional del país',
          'El sector primario, agropecuario y campesino de Colombia',
          'El clima templado de las sedes educativas',
          'La primera sede campestre fundada por Rodolfo Martínez Tono'
        ],
        correctIndex: 1,
        explanation: 'En el escudo del SENA, las ramas de café representan el sector primario y agropecuario de la economía nacional.',
        normReference: 'Manual de Imagen Corporativa SENA - Simbología Oficial.'
      },
      {
        id: 'q1-2',
        question: '¿Cuál es el significado del color blanco en la bandera del SENA?',
        options: [
          'La pureza de la tecnología y la limpieza de los talleres',
          'La neutralidad política únicamente',
          'La paz, la concordia, la rectitud ética y la apertura democrática',
          'El uniforme oficial del área de la salud'
        ],
        correctIndex: 2,
        explanation: 'El fondo blanco del pabellón del SENA simboliza la paz, la transparencia y la vocación de servicio para todos los colombianos sin distingo.',
        normReference: 'Estatuto y Símbolos del SENA.'
      },
      {
        id: 'q1-3',
        question: '¿Quién fue el visionario fundador del SENA en 1957?',
        options: [
          'Rodolfo Martínez Tono',
          'Alberto Lleras Camargo',
          'Daniel Montoya Reyes',
          'Alfonso López Pumarejo'
        ],
        correctIndex: 0,
        explanation: 'El economista y jurista cartagenero Rodolfo Martínez Tono propuso la creación del SENA, fundado formalmente mediante el Decreto Ley 118 de 1957.',
        normReference: 'Historia Institucional SENA, Decreto 118 de 1957.'
      },
      {
        id: 'q1-4',
        question: 'En el logotipo institucional, ¿qué representa el hombre que camina y las líneas que cruza?',
        options: [
          'Un atleta compitiendo en olimpiadas técnicas WorldSkills',
          'El hombre libre que avanza hacia el futuro por los caminos de la formación profesional',
          'Un trabajador de construcción sobre un andamio de acero',
          'El símbolo internacional de las telecomunicaciones'
        ],
        correctIndex: 1,
        explanation: 'El logotipo sintetiza la silueta de un hombre libre que avanza con decisión hacia su futuro a través de los múltiples caminos del conocimiento y la técnica.',
        normReference: 'Manual de Identidad Visual del SENA.'
      },
      {
        id: 'q1-5',
        question: '¿Cuál de los siguientes NO es un valor del Código de Integridad del SENA?',
        options: [
          'Honestidad',
          'Diligencia',
          'Competitividad desmedida a toda costa',
          'Justicia y Solidaridad'
        ],
        correctIndex: 2,
        explanation: 'El SENA promueve la solidaridad, la justicia, el respeto y la honestidad; nunca la competitividad individualista sin ética.',
        normReference: 'Código de Integridad SENA, Resolución 1-00025.'
      }
    ]
  },
  {
    id: 'quiz-mod-2',
    title: 'Evaluación: Reglamento del Aprendiz (Acuerdo 007 de 2012)',
    moduleId: 'mod-2',
    description: 'Demuestra tu comprensión sobre derechos, deberes, prohibiciones y el debido proceso.',
    passingScore: 80,
    questions: [
      {
        id: 'q2-1',
        question: '¿Cuál es el término en días hábiles que tiene el aprendiz para presentar sus descargos ante una citación del Comité de Evaluación y Seguimiento?',
        options: [
          '1 día hábil',
          '3 días hábiles',
          '10 días calendario',
          '15 días hábiles'
        ],
        correctIndex: 1,
        explanation: 'El Acuerdo 007 de 2012 establece expresamente un término improrrogable de 3 días hábiles contados a partir de la notificación para presentar descargos y pruebas.',
        normReference: 'Acuerdo 007 de 2012, Art. 30.'
      },
      {
        id: 'q2-2',
        question: '¿Cuál es la primera instancia de medida formativa ante un incumplimiento académico leve no reiterativo?',
        options: [
          'Cancelación irrevocable de matrícula',
          'Expulsión por seis meses',
          'Llamado de atención verbal con compromiso pedagógico o Plan de Mejoramiento',
          'Denuncia ante la Fiscalía General'
        ],
        correctIndex: 2,
        explanation: 'Las medidas formativas tienen carácter pedagógico. El primer paso ante fallas leves es el llamado de atención verbal o la formulación de un plan de mejoramiento académico.',
        normReference: 'Acuerdo 007 de 2012, Art. 24.'
      },
      {
        id: 'q2-3',
        question: 'Portar el carné institucional en un lugar visible es:',
        options: [
          'Opcional únicamente en días de examen final',
          'Un deber permanente de todo aprendiz al ingresar y permanecer en los centros o actividades del SENA',
          'Exigible solo si el personal de vigilancia lo pide por altavoz',
          'Requerido solo para aprendices de etapa productiva'
        ],
        correctIndex: 1,
        explanation: 'Portar el carné vigente es un deber fundamental contemplado en el Art. 8 numeral 1, para garantizar la seguridad de la comunidad.',
        normReference: 'Acuerdo 007 de 2012, Art. 8 Numeral 1.'
      },
      {
        id: 'q2-4',
        question: '¿Qué recurso puede interponer un aprendiz contra el acto administrativo de sanción emitido por el Subdirector de Centro?',
        options: [
          'Acción de repetición inmediata',
          'Recurso de apelación ante el Ministerio de Trabajo',
          'Recurso de Reposición dentro de los cinco (5) días hábiles siguientes a la notificación',
          'Ninguno, las decisiones no admiten recurso'
        ],
        correctIndex: 2,
        explanation: 'Contra el acto sancionatorio procede el Recurso de Reposición, el cual debe interponerse por escrito dentro de los cinco (5) días hábiles siguientes.',
        normReference: 'Acuerdo 007 de 2012, Art. 35.'
      },
      {
        id: 'q2-5',
        question: '¿Cuál de las siguientes conductas está clasificada como falta gravísima según el reglamento?',
        options: [
          'Llegar 5 minutos tarde a una clase teórica una sola vez',
          'Falsificar o alterar documentos oficiales del SENA o de empresas patrocinadoras',
          'Olvidar el cuaderno de apuntes en el casillero',
          'Solicitar cambio de horario por motivos laborales'
        ],
        correctIndex: 1,
        explanation: 'La falsificación y adulteración de firmas, certificaciones, actas o documentos oficiales constituye falta disciplinaria gravísima sancionable con cancelación de matrícula.',
        normReference: 'Acuerdo 007 de 2012, Art. 27.'
      }
    ]
  },
  {
    id: 'quiz-mod-3',
    title: 'Evaluación: Formación Profesional Integral (FPI)',
    moduleId: 'mod-3',
    description: 'Valora tu dominio de las etapas lectiva y productiva, el LMS Zajuna y las evidencias.',
    passingScore: 80,
    questions: [
      {
        id: 'q3-1',
        question: '¿Cuáles son las dos grandes etapas secuenciales de los programas técnicos y tecnológicos en el SENA?',
        options: [
          'Etapa teórica y etapa de vacaciones',
          'Etapa Lectiva y Etapa Productiva',
          'Etapa de pruebas y etapa de grado',
          'Etapa virtual y etapa presencial'
        ],
        correctIndex: 1,
        explanation: 'El diseño curricular del SENA articula la Etapa Lectiva (apropiación de conocimientos y competencias) y la Etapa Productiva (aplicación en entorno real productivo).',
        normReference: 'Estatuto de la Formación Profesional Integral SENA.'
      },
      {
        id: 'q3-2',
        question: '¿Cuál es la plataforma LMS oficial actual del SENA para gestionar cursos virtuales y evidencias?',
        options: [
          'Zajuna',
          'Blackboard v1',
          'Moodle Local 2.0',
          'Google Classroom'
        ],
        correctIndex: 0,
        explanation: 'Zajuna es el ecosistema LMS de aprendizaje oficial del SENA, donde los aprendices interactúan con foros, contenidos y suben sus evidencias.',
        normReference: 'Dirección de Formación Profesional - Ecosistema Zajuna.'
      },
      {
        id: 'q3-3',
        question: '¿Qué es el Portafolio de Evidencias del Aprendiz?',
        options: [
          'Una billetera física donde guarda los recibos de matrícula',
          'El compendio ordenado y sistemático de las evidencias de aprendizaje que demuestran el logro de los resultados de aprendizaje',
          'Un documento exclusivo que solo los coordinadores pueden ver',
          'El listado de notas numéricas del bachillerato'
        ],
        correctIndex: 1,
        explanation: 'El portafolio de evidencias es la herramienta pedagógica donde el aprendiz documenta su progreso, guías de aprendizaje y resultados alcanzados.',
        normReference: 'Guía de Desarrollo Curricular SENA.'
      },
      {
        id: 'q3-4',
        question: '¿Cuál de las siguientes NO es una alternativa válida para el desarrollo de la etapa productiva?',
        options: [
          'Contrato de Aprendizaje con empresa patrocinadora',
          'Pasantía o apoyo a una unidad productiva familiar o entidad estatal',
          'Proyecto Productivo o creación de empresa con Fondo Emprender',
          'Permanecer inactivo sin reportar ninguna actividad durante más de un año'
        ],
        correctIndex: 3,
        explanation: 'La inactividad prolongada sin registro de alternativa productiva constituye causal de deserción formativa.',
        normReference: 'Acuerdo 007 de 2012, Art. 12.'
      },
      {
        id: 'q3-5',
        question: 'La escala de evaluación en el SENA es:',
        options: [
          'Cualitativa: Aprobado (A) o No Aprobado (D)',
          'Numérica de 1 a 10 con decimales',
          'Por letras A, B, C, D, F con promedio ponderado',
          'Estrellas de 1 a 5 según el criterio del vocero'
        ],
        correctIndex: 0,
        explanation: 'El modelo pedagógico del SENA es cualitativo por competencias laborales: A (Aprobado) o D (Deficiente / No Aprobado).',
        normReference: 'Manual de Evaluación del Aprendizaje SENA.'
      }
    ]
  },
  {
    id: 'quiz-mod-4',
    title: 'Evaluación: Bienestar al Aprendiz y Servicios',
    moduleId: 'mod-4',
    description: 'Verifica los apoyos socioeconómicos, monitorías, cultura, salud y emprendimiento.',
    passingScore: 80,
    questions: [
      {
        id: 'q4-1',
        question: '¿Qué área del SENA acompaña el desarrollo humano, la salud física/mental, la cultura y el deporte de los aprendices?',
        options: [
          'Oficina de Cobranzas y Cartera',
          'Área de Bienestar al Aprendiz',
          'Almacén General de Maquinaria',
          'Comité Paritario COPASST únicamente'
        ],
        correctIndex: 1,
        explanation: 'Bienestar al Aprendiz lidera las estrategias de permanencia, desarrollo integral, arte, deporte, salud y acompañamiento psicosocial.',
        normReference: 'Plan Nacional de Bienestar al Aprendiz SENA.'
      },
      {
        id: 'q4-2',
        question: '¿Qué es una Monitoría en el SENA?',
        options: [
          'Un castigo disciplinario para aprendices con bajo rendimiento',
          'Un estímulo institucional donde aprendices destacados apoyan procesos pedagógicos, tecnológicos o de centro recibiendo un reconocimiento económico',
          'Un software espía para revisar las computadoras de los aprendices',
          'Un curso obligatorio de recuperación nocturna'
        ],
        correctIndex: 1,
        explanation: 'La monitoría es una distinción y estímulo para aprendices sobresalientes que colaboran en ambientes de aprendizaje y reciben incentivo.',
        normReference: 'Resolución de Monitorías SENA No. 1234.'
      },
      {
        id: 'q4-3',
        question: '¿Cuál es el fondo del SENA destinado a financiar y asesorar planes de negocio de aprendices y egresados emprendedores?',
        options: [
          'Fondo Emprender',
          'Bolsa Mercantil Agropecuaria',
          'Banco Agrario Subsidio',
          'Fondo Monetario SENA'
        ],
        correctIndex: 0,
        explanation: 'El Fondo Emprender es el fondo de capital semilla más importante de Colombia, creado por el Gobierno y administrado por el SENA.',
        normReference: 'Ley 789 de 2002 - Fondo Emprender SENA.'
      },
      {
        id: 'q4-4',
        question: 'El programa SENNOVA está enfocado principalmente en:',
        options: [
          'La compra de uniformes deportivos para el centro',
          'La Investigación Aplicada, Desarrollo Tecnológico e Innovación en los Centros de Formación',
          'El servicio de cafetería de los aprendices',
          'El pago de transporte escolar'
        ],
        correctIndex: 1,
        explanation: 'SENNOVA es el Sistema de Investigación, Innovación y Desarrollo Tecnológico que vincula a aprendices e instructores en semilleros de investigación.',
        normReference: 'Ecosistema SENNOVA.'
      },
      {
        id: 'q4-5',
        question: 'Para postularse a los Apoyos de Sostenimiento (FIC o regular), el aprendiz debe cumplir con:',
        options: [
          'Estar matriculado en formación titulada, pertenecer a estratos 1 o 2, no tener contrato de aprendizaje y cumplir buen rendimiento académico',
          'Tener vehículo propio registrado a su nombre',
          'Haber sido instructor en una universidad privada',
          'No asistir a las actividades de inducción'
        ],
        correctIndex: 0,
        explanation: 'Los apoyos de sostenimiento priorizan a aprendices vulnerables con excelente desempeño académico que no cuenten con patrocinio empresarial.',
        normReference: 'Resolución de Apoyos de Sostenimiento SENA.'
      }
    ]
  }
];

export const INDUCTION_CHECKLIST: ChecklistItem[] = [
  {
    id: 'chk-1',
    title: 'Firma de Acta y Compromiso del Aprendiz SENA',
    description: 'Lectura concertada de deberes y aceptación formal del reglamento en plataforma.',
    category: 'Normativa',
    required: true
  },
  {
    id: 'chk-2',
    title: 'Exploración de la Imagen y Símbolos Institucionales',
    description: 'Comprensión del escudo, bandera, logotipo y canto del himno del SENA.',
    category: 'Identidad',
    required: true
  },
  {
    id: 'chk-3',
    title: 'Activación de Cuenta Institucional y Acceso a Zajuna',
    description: 'Ingreso al correo @soy.sena.edu.co y primer acceso al LMS de la ficha.',
    category: 'Tecnología',
    required: true
  },
  {
    id: 'chk-4',
    title: 'Taller Diagnóstico de Estilos de Aprendizaje',
    description: 'Diligenciamiento de la prueba inicial para orientar la ruta pedagógica con instructores.',
    category: 'Pedagogía',
    required: true
  },
  {
    id: 'chk-5',
    title: 'Solicitud y Gestión del Carné Institucional Digital',
    description: 'Carga de fotografía formal con fondo blanco en el portal de aprendices.',
    category: 'Administrativa',
    required: true
  },
  {
    id: 'chk-6',
    title: 'Taller de Inducción al Sistema de Bibliotecas SENA (SBS)',
    description: 'Manejo de bases de datos científicas, repositorios y libros digitales institucionales.',
    category: 'Académica',
    required: false
  },
  {
    id: 'chk-7',
    title: 'Caracterización Socioeconómica con Bienestar al Aprendiz',
    description: 'Formulario de identificación para programas de salud, apoyo alimentario y psicosocial.',
    category: 'Bienestar',
    required: true
  },
  {
    id: 'chk-8',
    title: 'Aprobación de los 4 Cuestionarios Evaluativos de Inducción',
    description: 'Superar con al menos el 80% las evaluaciones de los 4 módulos temáticos.',
    category: 'Evaluación',
    required: true
  }
];

export const INITIAL_APPRENTICES: Apprentice[] = [
  {
    id: 'app-001',
    name: 'Juan David Gómez Restrepo',
    documentNumber: '1023456789',
    documentType: 'CC',
    email: 'jdgomez789@soy.sena.edu.co',
    phone: '312 456 7890',
    fichaNumber: '2825410',
    programName: 'Análisis y Desarrollo de Software (ADSO)',
    regional: 'Distrito Capital',
    trainingCenter: 'Centro de Diseño y Metrología',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    status: 'En progreso',
    progressPercentage: 75,
    completedModules: ['mod-1', 'mod-2'],
    quizScores: {
      'quiz-mod-1': 100,
      'quiz-mod-2': 90
    },
    checklist: {
      'chk-1': true,
      'chk-2': true,
      'chk-3': true,
      'chk-4': true,
      'chk-5': true,
      'chk-6': true,
      'chk-7': false,
      'chk-8': false
    },
    startDate: '2026-11-03',
    lastAccess: 'Hoy a las 09:15 AM',
    notes: [
      'Excelente participación en el análisis de casos del reglamento.',
      'Pendiente adjuntar caracterización de bienestar.'
    ]
  },
  {
    id: 'app-002',
    name: 'Mariana Valentina Torres Soto',
    documentNumber: '1019876543',
    documentType: 'CC',
    email: 'mvtorres543@soy.sena.edu.co',
    phone: '320 890 1234',
    fichaNumber: '2825410',
    programName: 'Análisis y Desarrollo de Software (ADSO)',
    regional: 'Distrito Capital',
    trainingCenter: 'Centro de Diseño y Metrología',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    status: 'Completado',
    progressPercentage: 100,
    completedModules: ['mod-1', 'mod-2', 'mod-3', 'mod-4'],
    quizScores: {
      'quiz-mod-1': 100,
      'quiz-mod-2': 95,
      'quiz-mod-3': 100,
      'quiz-mod-4': 95
    },
    checklist: {
      'chk-1': true,
      'chk-2': true,
      'chk-3': true,
      'chk-4': true,
      'chk-5': true,
      'chk-6': true,
      'chk-7': true,
      'chk-8': true
    },
    startDate: '2026-11-03',
    lastAccess: 'Hoy a las 08:30 AM',
    notes: [
      'Inducción finalizada con honores. Certificado generado y validado con QR.'
    ]
  },
  {
    id: 'app-003',
    name: 'Carlos Andrés Palacios Córdoba',
    documentNumber: '1035678912',
    documentType: 'TI',
    email: 'capalacios912@soy.sena.edu.co',
    phone: '315 789 4321',
    fichaNumber: '2825410',
    programName: 'Análisis y Desarrollo de Software (ADSO)',
    regional: 'Distrito Capital',
    trainingCenter: 'Centro de Diseño y Metrología',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    status: 'En progreso',
    progressPercentage: 50,
    completedModules: ['mod-1'],
    quizScores: {
      'quiz-mod-1': 85
    },
    checklist: {
      'chk-1': true,
      'chk-2': true,
      'chk-3': true,
      'chk-4': false,
      'chk-5': false,
      'chk-6': false,
      'chk-7': false,
      'chk-8': false
    },
    startDate: '2026-11-03',
    lastAccess: 'Ayer a las 04:40 PM',
    notes: [
      'Falta realizar el cuestionario del Reglamento del Aprendiz.'
    ]
  },
  {
    id: 'app-004',
    name: 'Laura Sofía Méndez Quintero',
    documentNumber: '1088765432',
    documentType: 'CC',
    email: 'lsmendez432@soy.sena.edu.co',
    phone: '311 234 5678',
    fichaNumber: '2825410',
    programName: 'Análisis y Desarrollo de Software (ADSO)',
    regional: 'Distrito Capital',
    trainingCenter: 'Centro de Diseño y Metrología',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    status: 'Pendiente',
    progressPercentage: 20,
    completedModules: [],
    quizScores: {},
    checklist: {
      'chk-1': true,
      'chk-2': false,
      'chk-3': false,
      'chk-4': false,
      'chk-5': false,
      'chk-6': false,
      'chk-7': false,
      'chk-8': false
    },
    startDate: '2026-11-03',
    lastAccess: 'Hace 3 días',
    notes: [
      'Alerta de inactividad temprana. Vocero de ficha contactó para orientación técnica.'
    ]
  },
  {
    id: 'app-005',
    name: 'Mateo Alejandro Ruiz Carvajal',
    documentNumber: '1014567890',
    documentType: 'CC',
    email: 'maruiz890@soy.sena.edu.co',
    phone: '318 654 9870',
    fichaNumber: '2825410',
    programName: 'Análisis y Desarrollo de Software (ADSO)',
    regional: 'Distrito Capital',
    trainingCenter: 'Centro de Diseño y Metrología',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    status: 'Completado',
    progressPercentage: 100,
    completedModules: ['mod-1', 'mod-2', 'mod-3', 'mod-4'],
    quizScores: {
      'quiz-mod-1': 95,
      'quiz-mod-2': 90,
      'quiz-mod-3': 90,
      'quiz-mod-4': 100
    },
    checklist: {
      'chk-1': true,
      'chk-2': true,
      'chk-3': true,
      'chk-4': true,
      'chk-5': true,
      'chk-6': true,
      'chk-7': true,
      'chk-8': true
    },
    startDate: '2026-11-03',
    lastAccess: 'Hoy a las 10:10 AM',
    notes: [
      'Inducción concluida con éxito. Postulado a monitoría de tecnología.'
    ]
  },
  {
    id: 'app-006',
    name: 'Estefanía Henao Salazar',
    documentNumber: '1099887766',
    documentType: 'CC',
    email: 'ehenao766@soy.sena.edu.co',
    phone: '313 789 6541',
    fichaNumber: '2825410',
    programName: 'Análisis y Desarrollo de Software (ADSO)',
    regional: 'Distrito Capital',
    trainingCenter: 'Centro de Diseño y Metrología',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    status: 'En progreso',
    progressPercentage: 62,
    completedModules: ['mod-1', 'mod-3'],
    quizScores: {
      'quiz-mod-1': 90,
      'quiz-mod-3': 85
    },
    checklist: {
      'chk-1': true,
      'chk-2': true,
      'chk-3': true,
      'chk-4': true,
      'chk-5': true,
      'chk-6': false,
      'chk-7': false,
      'chk-8': false
    },
    startDate: '2026-11-03',
    lastAccess: 'Hoy a las 07:45 AM',
    notes: [
      'Progreso constante. Desarrollando caso práctico de reglamento.'
    ]
  }
];

export interface InstructorLead {
  id: string;
  name: string;
  roleTitle: string;
  email: string;
  phone: string;
  regional: string;
  trainingCenter: string;
  assignedFicha: string;
  programName: string;
  avatar: string;
  bio: string;
}

export const LEAD_INSTRUCTOR: InstructorLead = {
  id: 'inst-001',
  name: 'Ing. Carlos Hernán Mora Valderrama',
  roleTitle: 'Instructor Técnico & Líder de Inducción',
  email: 'chmora@sena.edu.co',
  phone: '315 889 0022',
  regional: 'Distrito Capital',
  trainingCenter: 'Centro de Diseño y Metrología',
  assignedFicha: '2825410',
  programName: 'Análisis y Desarrollo de Software (ADSO)',
  avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=250&q=80',
  bio: 'Docente líder asignado a la orientación normativa, seguimiento del portafolio pedagógico y aprobación de constancias de inducción para la ficha.'
};

