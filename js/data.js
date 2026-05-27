/* ═══════════════════════════════════════════════════════
   MediCitas — Mock Data Store v3
   Incluye: calificaciones, stats en cero, pagado field
   ═══════════════════════════════════════════════════════ */
const DB = (() => {
  const usuarios = [
    { id:1, nombre:'Andrés Gómez',      email:'andres@paciente.com',       password:'paciente123',    rol:'paciente',    telefono:'3001234567', fechaRegistro:'2024-11-15', avatar:'AG', activo:true },
    { id:2, nombre:'Clínica San Pablo', email:'admin@clinicasanpablo.com', password:'consultorio123', rol:'consultorio', telefono:'6077001234', fechaRegistro:'2024-10-01', avatar:'CS', activo:true, id_consultorio:'cons_001' },
    { id:3, nombre:'María Rodríguez',   email:'admin@medicitas.co',        password:'admin2024',      rol:'admin',       telefono:'3209876543', fechaRegistro:'2024-01-01', avatar:'MR', activo:true },
  ];

  let nextEspId = 13;
  const especialidades = [
    { id:1,  nombre:'Medicina General',    icono:'med',   categoria:'Medicina',     descripcion:'Atención primaria y diagnóstico general',         color:'#0070C0' },
    { id:2,  nombre:'Pediatría',           icono:'ped',   categoria:'Medicina',     descripcion:'Atención médica para niños y adolescentes',       color:'#7C3AED' },
    { id:3,  nombre:'Ginecología',         icono:'gin',   categoria:'Medicina',     descripcion:'Salud femenina y obstetricia',                    color:'#EC4899' },
    { id:4,  nombre:'Dermatología',        icono:'derm',  categoria:'Medicina',     descripcion:'Enfermedades de la piel, cabello y uñas',         color:'#F59E0B' },
    { id:5,  nombre:'Ortopedia',           icono:'orto',  categoria:'Medicina',     descripcion:'Sistema musculoesquelético y traumatología',      color:'#64748B' },
    { id:6,  nombre:'Odontología General', icono:'odont', categoria:'Odontología',  descripcion:'Limpieza, obturaciones y extracciones',           color:'#00B09B' },
    { id:7,  nombre:'Ortodoncia',          icono:'orto2', categoria:'Odontología',  descripcion:'Corrección de la posición dental',                color:'#10B981' },
    { id:8,  nombre:'Cardiología',         icono:'card',  categoria:'Medicina',     descripcion:'Enfermedades del corazón y sistema circulatorio', color:'#EF4444' },
    { id:9,  nombre:'Neurología',          icono:'neur',  categoria:'Medicina',     descripcion:'Sistema nervioso central y periférico',           color:'#8B5CF6' },
    { id:10, nombre:'Oftalmología',        icono:'oftal', categoria:'Medicina',     descripcion:'Salud visual y enfermedades oculares',            color:'#3B82F6' },
    { id:11, nombre:'Psicología',          icono:'psic',  categoria:'Salud mental', descripcion:'Salud mental y bienestar emocional',              color:'#6366F1' },
    { id:12, nombre:'Nutrición',           icono:'nutr',  categoria:'Medicina',     descripcion:'Alimentación saludable y dietética clínica',      color:'#84CC16' },
  ];

  const servicios = [
    { id:'s01', nombre:'Consulta general',         especialidad_id:1,  precio:45000,  duracion:30, descripcion:'Valoración médica completa' },
    { id:'s02', nombre:'Electrocardiograma',       especialidad_id:1,  precio:60000,  duracion:20, descripcion:'ECG de 12 derivaciones' },
    { id:'s03', nombre:'Espirometría',             especialidad_id:1,  precio:55000,  duracion:25, descripcion:'Prueba de función pulmonar' },
    { id:'s04', nombre:'Consulta pediátrica',      especialidad_id:2,  precio:55000,  duracion:40, descripcion:'Valoración integral del menor' },
    { id:'s05', nombre:'Control de crecimiento',   especialidad_id:2,  precio:40000,  duracion:30, descripcion:'Seguimiento del desarrollo infantil' },
    { id:'s06', nombre:'Consulta ginecológica',    especialidad_id:3,  precio:65000,  duracion:45, descripcion:'Valoración ginecológica completa' },
    { id:'s07', nombre:'Citología vaginal',        especialidad_id:3,  precio:40000,  duracion:20, descripcion:'Papanicolau y colposcopia' },
    { id:'s08', nombre:'Valoración dermatológica', especialidad_id:4,  precio:70000,  duracion:45, descripcion:'Diagnóstico de afecciones cutáneas' },
    { id:'s09', nombre:'Biopsia de piel',          especialidad_id:4,  precio:120000, duracion:60, descripcion:'Toma de muestra para histología' },
    { id:'s10', nombre:'Limpieza dental',          especialidad_id:6,  precio:65000,  duracion:60, descripcion:'Detartaje y pulido dental' },
    { id:'s11', nombre:'Blanqueamiento',           especialidad_id:6,  precio:350000, duracion:90, descripcion:'Blanqueamiento dental profesional' },
    { id:'s12', nombre:'Extracción',               especialidad_id:6,  precio:80000,  duracion:45, descripcion:'Extracción simple o compleja' },
    { id:'s13', nombre:'Consulta cardiológica',    especialidad_id:8,  precio:90000,  duracion:45, descripcion:'Valoración cardiovascular completa' },
    { id:'s14', nombre:'Ecocardiograma',           especialidad_id:8,  precio:180000, duracion:60, descripcion:'Ultrasonido del corazón' },
    { id:'s15', nombre:'Psicoterapia',             especialidad_id:11, precio:80000,  duracion:60, descripcion:'Sesión de terapia individual' },
    { id:'s16', nombre:'Consulta nutricional',     especialidad_id:12, precio:60000,  duracion:45, descripcion:'Plan alimentario personalizado' },
  ];

  const tags = [
    { id:'t01', nombre:'Urgencias',     estilo:'red',    colorCustom:null, descripcion:'Atención de urgencias disponible' },
    { id:'t02', nombre:'Sin EPS',       estilo:'orange', colorCustom:null, descripcion:'Servicio particular, sin EPS' },
    { id:'t03', nombre:'Con EPS',       estilo:'green',  colorCustom:null, descripcion:'Acepta EPS y seguros médicos' },
    { id:'t04', nombre:'Domicilio',     estilo:'blue',   colorCustom:null, descripcion:'Atiende a domicilio' },
    { id:'t05', nombre:'Online',        estilo:'purple', colorCustom:null, descripcion:'Consultas virtuales disponibles' },
    { id:'t06', nombre:'Parking',       estilo:'gray',   colorCustom:null, descripcion:'Estacionamiento disponible' },
    { id:'t07', nombre:'Piso 1',        estilo:'gray',   colorCustom:null, descripcion:'Acceso en planta baja' },
    { id:'t08', nombre:'Accesible',     estilo:'green',  colorCustom:null, descripcion:'Acceso para movilidad reducida' },
    { id:'t09', nombre:'Ped. cert.',    estilo:'purple', colorCustom:null, descripcion:'Especialidad pediátrica certificada' },
    { id:'t10', nombre:'Urgencias 24h', estilo:'red',    colorCustom:null, descripcion:'Disponible las 24 horas' },
    { id:'t11', nombre:'Fin de semana', estilo:'blue',   colorCustom:null, descripcion:'Atención en fines de semana' },
    { id:'t12', nombre:'Laboratorio',   estilo:'orange', colorCustom:null, descripcion:'Laboratorio clínico en sitio' },
  ];

  const consultorios = [
    { id_consultorio:'cons_001', nombre_consultorio:'Clínica San Pablo',       nombre_profesional:'Dr. Carlos Mendoza',  iniciales:'CM', especialidad_principal:'Medicina General',    especialidad_id:1,  barrio:'Cabecera del Llano', municipio:'Bucaramanga',   direccion:'Cra 33 # 42-60, Cabecera del Llano', lat:7.1193, lng:-73.1227, telefono_contacto:'607 700 1234', whatsapp:'3174001234', email:'admin@clinicasanpablo.com', horario_resumen:'Lun-Vie 8am-6pm | Sáb 9am-1pm',  precio_min:45000, precio_max:80000,  calificacion:4.8, resenas:127, plan_nombre:'MediCitas Pro', plan_badge:'badge-blue', verificado:true, pagado:true,  activo:true, validacion_estado:'aprobado', motivo_rechazo:null, servicios_ids:['s01','s02','s03'], tags_ids:['t02','t06','t11'], descripcion:'Centro médico integral con más de 15 años de experiencia en atención primaria. Equipos modernos de diagnóstico y profesionales altamente calificados.', foto_url:'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&q=80', galeria:[], tarjeta_profesional:null, suscripcion_estado:'activa', fecha_pago:'2025-05-01', fecha_registro:'2024-10-01' },
    { id_consultorio:'cons_002', nombre_consultorio:'Centro Pediátrico Bambi', nombre_profesional:'Dra. Laura Vargas',   iniciales:'LV', especialidad_principal:'Pediatría',           especialidad_id:2,  barrio:'La Rosita',         municipio:'Floridablanca', direccion:'Cl 5 # 24-30, La Rosita',            lat:7.0656, lng:-73.0916, telefono_contacto:'607 648 9900', whatsapp:'3209990011', email:'laura@bambi.com',               horario_resumen:'Lun-Sáb 8am-5pm',                precio_min:50000, precio_max:70000,  calificacion:4.9, resenas:89,  plan_nombre:'MediCitas Pro', plan_badge:'badge-blue', verificado:true, pagado:true,  activo:true, validacion_estado:'aprobado', motivo_rechazo:null, servicios_ids:['s04','s05'],         tags_ids:['t09','t08','t11'], descripcion:'Especialistas en salud infantil con enfoque humanizado. Atendemos desde recién nacidos hasta adolescentes de 18 años.', foto_url:'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=400&q=80', galeria:[], tarjeta_profesional:null, suscripcion_estado:'activa', fecha_pago:'2025-05-01', fecha_registro:'2024-10-15' },
    { id_consultorio:'cons_003', nombre_consultorio:'OdontoPlus Bucaramanga',  nombre_profesional:'Dr. Felipe Torres',   iniciales:'FT', especialidad_principal:'Odontología General', especialidad_id:6,  barrio:'El Prado',          municipio:'Bucaramanga',   direccion:'Av 35 # 51-20, El Prado',            lat:7.1257, lng:-73.1183, telefono_contacto:'607 655 8800', whatsapp:'3178885544', email:'felipe@odontoplus.com',         horario_resumen:'Lun-Vie 9am-7pm | Sáb 9am-3pm',  precio_min:60000, precio_max:400000, calificacion:4.7, resenas:203, plan_nombre:'MediCitas Pro', plan_badge:'badge-blue', verificado:true, pagado:true,  activo:true, validacion_estado:'aprobado', motivo_rechazo:null, servicios_ids:['s10','s11','s12'],   tags_ids:['t02','t06','t07'], descripcion:'Clínica odontológica de alta tecnología. Blanqueamiento, ortodoncia, implantes y más.', foto_url:'https://images.unsplash.com/photo-1606811841689-23dfddce3e66?w=400&q=80', galeria:[], tarjeta_profesional:null, suscripcion_estado:'activa', fecha_pago:'2025-05-01', fecha_registro:'2024-11-01' },
    { id_consultorio:'cons_004', nombre_consultorio:'Dermatolé Centro Médico', nombre_profesional:'Dra. Sandra Ruiz',    iniciales:'SR', especialidad_principal:'Dermatología',         especialidad_id:4,  barrio:'San Francisco',      municipio:'Bucaramanga',   direccion:'Cl 45 # 29-15, San Francisco',        lat:7.1173, lng:-73.1140, telefono_contacto:'607 700 4455', whatsapp:'3115556677', email:'sandra@dermato.com',            horario_resumen:'Mar-Vie 9am-5pm | Sáb 9am-12pm', precio_min:70000, precio_max:150000, calificacion:4.6, resenas:54,  plan_nombre:'MediCitas Pro', plan_badge:'badge-blue', verificado:true, pagado:true,  activo:true, validacion_estado:'aprobado', motivo_rechazo:null, servicios_ids:['s08','s09'],         tags_ids:['t02','t05'],       descripcion:'Especialistas en dermatología médica y estética. Tratamientos de acné, rosácea, dermatitis y procedimientos láser.', foto_url:'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80', galeria:[], tarjeta_profesional:null, suscripcion_estado:'activa', fecha_pago:'2025-05-01', fecha_registro:'2024-11-20' },
    { id_consultorio:'cons_005', nombre_consultorio:'CardioVida Bucaramanga',  nombre_profesional:'Dr. Mauricio Silva',  iniciales:'MS', especialidad_principal:'Cardiología',          especialidad_id:8,  barrio:'Sotomayor',          municipio:'Bucaramanga',   direccion:'Cra 15 # 93-21, Sotomayor',          lat:7.1288, lng:-73.1215, telefono_contacto:'607 632 7700', whatsapp:'3187774488', email:'mauricio@cardiovida.com',       horario_resumen:'Lun-Jue 7am-4pm | Vie 7am-12pm', precio_min:90000, precio_max:250000, calificacion:4.9, resenas:31,  plan_nombre:'MediCitas Pro', plan_badge:'badge-blue', verificado:true, pagado:true,  activo:true, validacion_estado:'aprobado', motivo_rechazo:null, servicios_ids:['s13','s14'],         tags_ids:['t01','t12','t06'], descripcion:'Centro especializado en cardiología clínica y preventiva. Ecocardiografía, holter, prueba de esfuerzo y más.', foto_url:'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&q=80', galeria:[], tarjeta_profesional:null, suscripcion_estado:'activa', fecha_pago:'2025-05-01', fecha_registro:'2024-09-15' },
    { id_consultorio:'cons_006', nombre_consultorio:'Mente Sana Psicología',   nombre_profesional:'Ps. Valentina Cruz',  iniciales:'VC', especialidad_principal:'Psicología',           especialidad_id:11, barrio:'Chapinero',          municipio:'Bucaramanga',   direccion:'Cl 52 # 26-30 Of. 301',              lat:7.1109, lng:-73.1198, telefono_contacto:'607 612 3344', whatsapp:'3004448899', email:'valentina@mentesana.com',       horario_resumen:'Lun-Vie 8am-8pm | Sáb 9am-2pm',  precio_min:75000, precio_max:95000,  calificacion:5.0, resenas:47,  plan_nombre:'MediCitas Pro', plan_badge:'badge-blue', verificado:false,pagado:false, activo:true, validacion_estado:'pendiente_revision', motivo_rechazo:null, servicios_ids:['s15'],              tags_ids:['t05','t08'],       descripcion:'Psicología clínica y terapia cognitivo-conductual. Atención presencial y virtual.', foto_url:'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&q=80', galeria:[], tarjeta_profesional:null, suscripcion_estado:'pendiente', fecha_pago:null, fecha_registro:'2024-12-01' },
    { id_consultorio:'cons_007', nombre_consultorio:'NeuroCentro Santander', nombre_profesional:'Dr. Héctor Ramírez', iniciales:'HR', especialidad_principal:'Neurología', especialidad_id:9, barrio:'Mejoras Públicas', municipio:'Bucaramanga', direccion:'Cra 27 # 58-30, Mejoras Públicas', lat:7.1221, lng:-73.1189, telefono_contacto:'607 611 2233', whatsapp:'3156667788', email:'hector@neurocentro.com', horario_resumen:'Lun-Vie 8am-5pm', precio_min:100000, precio_max:200000, calificacion:0, resenas:0, plan_nombre:'MediCitas Pro', plan_badge:'badge-blue', verificado:false, pagado:false, activo:false, validacion_estado:'pendiente_revision', motivo_rechazo:null, servicios_ids:[], tags_ids:[], galeria:[], tarjeta_profesional:'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80', suscripcion_estado:'pendiente', fecha_pago:null, fecha_registro:'2025-05-20', descripcion:'Centro de neurología clínica y diagnóstica. Electroencefalogramas, estudios del sueño y consulta especializada.', foto_url:'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&q=80', _baseResenas:0 },

  ];

  let nextCitaId = 100;
  const citas = [
    { id_cita:'cita_001', id_consultorio:'cons_001', nombre_consultorio:'Clínica San Pablo',       id_paciente:1, nombre_paciente:'Andrés Gómez',  telefono_paciente:'3001234567', email_paciente:'andres@paciente.com', fecha_solicitada:'2025-06-15', hora_solicitada:'10:00', motivo:'Control de presión arterial',           servicio_id:'s01', estado:'confirmada', notas_consultorio:'Traer resultados de exámenes anteriores', fecha_creacion:'2025-05-20' },
    { id_cita:'cita_002', id_consultorio:'cons_001', nombre_consultorio:'Clínica San Pablo',       id_paciente:1, nombre_paciente:'Andrés Gómez',  telefono_paciente:'3001234567', email_paciente:'andres@paciente.com', fecha_solicitada:'2025-05-10', hora_solicitada:'14:30', motivo:'Fiebre y malestar general',             servicio_id:'s01', estado:'completada', notas_consultorio:'', fecha_creacion:'2025-05-05' },
    { id_cita:'cita_003', id_consultorio:'cons_003', nombre_consultorio:'OdontoPlus Bucaramanga',  id_paciente:null, nombre_paciente:'Juliana Pérez',  telefono_paciente:'3167654321', email_paciente:'juliana@email.com', fecha_solicitada:'2025-06-20', hora_solicitada:'09:00', motivo:'Limpieza dental de rutina',             servicio_id:'s10', estado:'pendiente', notas_consultorio:'', fecha_creacion:'2025-05-22' },
    { id_cita:'cita_004', id_consultorio:'cons_001', nombre_consultorio:'Clínica San Pablo',       id_paciente:null, nombre_paciente:'Roberto Castro', telefono_paciente:'3125557788', email_paciente:'',                  fecha_solicitada:'2025-06-18', hora_solicitada:'11:30', motivo:'Revisión de resultados de laboratorio', servicio_id:'s01', estado:'pendiente', notas_consultorio:'', fecha_creacion:'2025-05-23' },
  ];

  // ── CALIFICACIONES ───────────────────────────────────
  let nextCalId = 10;
  const calificaciones = [];

  const planes = [
    { id:'plan_pro', nombre:'MediCitas Pro', precio:90000, descripcion:'El plan completo para consultorios que quieren crecer', features:['Perfil visible en el directorio público','Agenda y gestión de citas ilimitada','Bandeja de entrada de solicitudes','Estadísticas y reportes mensuales','Notificaciones WhatsApp a pacientes','Mapa de ubicación integrado','Gestión de servicios y especialidades','Etiquetas personalizadas','Cargue de galería e imágenes','Soporte prioritario por WhatsApp'], destacado:true, color:'#0070C0', duracion_dias:30 },
  ];

  const notificaciones = {
    paciente: [
      { id:'n01', tipo:'cita',        titulo:'Cita confirmada',        mensaje:'Tu cita en Clínica San Pablo el 15 Jun fue confirmada.', fecha:'Hace 2h',      leida:false },
      { id:'n02', tipo:'recordatorio',titulo:'Recordatorio de cita',   mensaje:'Tienes cita mañana a las 10:00am en Clínica San Pablo.', fecha:'Hace 1 día',   leida:false },
      { id:'n03', tipo:'sistema',     titulo:'Bienvenido a MediCitas', mensaje:'Tu cuenta ha sido creada exitosamente.',                  fecha:'Hace 3 días',  leida:true  },
    ],
    consultorio: [
      { id:'n04', tipo:'solicitud', titulo:'Nueva solicitud de cita',  mensaje:'Roberto Castro solicitó cita para el 18 Jun a las 11:30.', fecha:'Hace 1h',    leida:false },
      { id:'n05', tipo:'solicitud', titulo:'Nueva solicitud de cita',  mensaje:'Andrés Gómez solicitó cita para el 15 Jun a las 10:00.',  fecha:'Hace 4h',    leida:true  },
      { id:'n06', tipo:'pago',      titulo:'Suscripción activa',       mensaje:'Tu plan MediCitas Pro está activo hasta Jun 2025.',        fecha:'Hace 3 días', leida:true  },
    ],
    admin: [
      { id:'n07', tipo:'registro', titulo:'Nuevo consultorio',   mensaje:'Mente Sana Psicología se registró en la plataforma.', fecha:'Hace 2 días',   leida:false },
      { id:'n08', tipo:'pago',     titulo:'Pago recibido',       mensaje:'CardioVida Bucaramanga realizó pago de $90.000.',     fecha:'Hace 3 días',   leida:true  },
      { id:'n09', tipo:'sistema',  titulo:'Reporte disponible',  mensaje:'El reporte de Mayo 2025 ya está disponible.',         fecha:'Hace 1 semana', leida:true  },
    ],
  };

  function calcFechaFin(inicio) {
    const d = new Date(inicio + 'T12:00:00'); d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  }

  const suscripciones = consultorios.filter(c=>c.pagado).map(c=>({
    id:`susc_${c.id_consultorio}`, id_consultorio:c.id_consultorio, nombre_consultorio:c.nombre_consultorio,
    plan_id:'plan_pro', plan_nombre:'MediCitas Pro', estado:'activa',
    fecha_inicio:c.fecha_pago, fecha_fin:calcFechaFin(c.fecha_pago), monto:90000,
  }));

  const pagos = [
    { id:'p01', nombre_consultorio:'Clínica San Pablo',       monto:90000, estado:'aprobado', metodo:'Transferencia', referencia:'TXN-20250501-001', fecha:'2025-05-01' },
    { id:'p02', nombre_consultorio:'OdontoPlus Bucaramanga',  monto:90000, estado:'aprobado', metodo:'Nequi',         referencia:'NQI-20250501-002', fecha:'2025-05-01' },
    { id:'p03', nombre_consultorio:'Centro Pediátrico Bambi', monto:90000, estado:'aprobado', metodo:'Daviplata',     referencia:'DVP-20250501-003', fecha:'2025-05-01' },
    { id:'p04', nombre_consultorio:'Dermatolé Centro Médico', monto:90000, estado:'aprobado', metodo:'Transferencia', referencia:'TXN-20250501-004', fecha:'2025-05-01' },
    { id:'p05', nombre_consultorio:'CardioVida Bucaramanga',  monto:90000, estado:'aprobado', metodo:'Nequi',         referencia:'NQI-20250501-005', fecha:'2025-05-01' },
    { id:'p06', nombre_consultorio:'Mente Sana Psicología',   monto:90000, estado:'pendiente',metodo:'—',             referencia:'—',                fecha:'—'          },
  ];

  // ── SVG ICONS ────────────────────────────────────────
  function getEspIconoSVG(key, size=22) {
    const c='currentColor';
    const map = {
      med:   `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M5 6h14v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6z"/><path d="M9 12h6M12 9v6"/></svg>`,
      ped:   `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="5" r="3"/><path d="M8 21v-6a4 4 0 018 0v6"/><path d="M5 21h14"/></svg>`,
      gin:   `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round"><path d="M12 2C8.5 2 6 4.5 6 8c0 4 6 12 6 12s6-8 6-12c0-3.5-2.5-6-6-6z"/></svg>`,
      derm:  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4"/></svg>`,
      orto:  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round"><line x1="12" y1="3" x2="12" y2="21"/><path d="M5 8l7 4 7-4M5 16l7-4 7 4"/></svg>`,
      odont: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round"><path d="M9 3c-2.5 0-4 2-4 5 0 4 2 7.5 3 10.5.5 1.5 1 2.5 2 2.5s1.5-1 2-2.5c.5 1.5 1 2.5 2 2.5s1.5-1 2-2.5c1-3 3-6.5 3-10.5 0-3-1.5-5-4-5-1 0-2 .5-3 .5S10 3 9 3z"/></svg>`,
      orto2: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round"><rect x="3" y="9" width="18" height="8" rx="4"/><path d="M8 9V7M12 9V6M16 9V7"/></svg>`,
      card:  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"/></svg>`,
      neur:  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="5" r="3"/><path d="M6 8c-1 .5-2 2-2 4 0 1.5.5 3 2 4M18 8c1 .5 2 2 2 4 0 1.5-.5 3-2 4M9 16c.5 2 1.5 3 3 3s2.5-1 3-3"/></svg>`,
      oftal: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round"><path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>`,
      psic:  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="5"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>`,
      nutr:  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round"><path d="M12 2a8 8 0 018 8c0 5-8 14-8 14S4 15 4 10a8 8 0 018-8z"/><path d="M9 10l2 2 4-4"/></svg>`,
      default:`<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>`,
    };
    return map[key] || map.default;
  }

  // ── HELPERS ──────────────────────────────────────────
  function getConsultorioById(id) { return consultorios.find(c=>c.id_consultorio===id); }
  function getServiciosByEsp(espId) { return servicios.filter(s=>s.especialidad_id===espId); }
  function getTagsByIds(ids) { return tags.filter(t=>(ids||[]).includes(t.id)); }
  function getHorasOcupadas(consId, fecha) {
    return citas.filter(c=>c.id_consultorio===consId&&c.fecha_solicitada===fecha&&(c.estado==='pendiente'||c.estado==='confirmada')).map(c=>c.hora_solicitada);
  }
  function getStatsCons(consId) {
    const mis = citas.filter(c=>c.id_consultorio===consId);
    const s = { citas_mes:mis.length, pendientes:0, confirmadas:0, completadas:0, canceladas:0, ingresos_mes:0 };
    mis.forEach(c=>{
      if(c.estado==='pendiente')  s.pendientes++;
      if(c.estado==='confirmada') s.confirmadas++;
      if(c.estado==='completada') s.completadas++;
      if(c.estado==='cancelada')  s.canceladas++;
    });
    return s;
  }

  function addCita(data) {
    const c = { id_cita:`cita_${++nextCitaId}`, estado:'pendiente', fecha_creacion:new Date().toISOString().split('T')[0], notas_consultorio:'', ...data };
    citas.push(c); return c;
  }
  function updateCitaEstado(id, estado, notas) {
    const c=citas.find(c=>c.id_cita===id);
    if(c){ c.estado=estado; if(notas!==undefined) c.notas_consultorio=notas; }
    return c;
  }

  // ── CALIFICACIONES ────────────────────────────────────
  function addCalificacion(data) {
    const cal = { id:`cal_${++nextCalId}`, ...data };
    calificaciones.push(cal);
    // Recalcular promedio del consultorio
    const cons = getConsultorioById(data.id_consultorio);
    if(cons) {
      const allCals = calificaciones.filter(c=>c.id_consultorio===data.id_consultorio);
      const avg = allCals.reduce((acc,c)=>acc+c.calificacion,0) / allCals.length;
      cons.calificacion = Math.round(avg*10)/10;
      cons.resenas = allCals.length + (cons._baseResenas || 0);
    }
    return cal;
  }
  // Guardar base de reseñas originales para no sobreescribir
  consultorios.forEach(c=>{ c._baseResenas = c.resenas; });

  function addTag(d) { const t={id:`t${String(tags.length+1).padStart(2,'0')}`,colorCustom:null,...d}; tags.push(t); return t; }
  function addServicio(d) { const s={id:`s${String(servicios.length+1).padStart(2,'0')}`,...d}; servicios.push(s); return s; }
  function addUser(d) { const u={id:usuarios.length+1,activo:true,fechaRegistro:new Date().toISOString().split('T')[0],...d}; usuarios.push(u); return u; }

  function addConsultorio(data) {
    const id=`cons_${String(consultorios.length+1).padStart(3,'0')}`;
    const c={ id_consultorio:id, iniciales:(data.nombre_profesional||'NC').split(' ').filter(w=>w).map(w=>w[0]).join('').slice(0,2).toUpperCase(), plan_nombre:'MediCitas Pro', plan_badge:'badge-blue', verificado:false, pagado:false, activo:false, validacion_estado:'pendiente_revision', motivo_rechazo:null, calificacion:0, resenas:0, _baseResenas:0, servicios_ids:[], tags_ids:[], galeria:[], tarjeta_profesional:null, suscripcion_estado:'pendiente', fecha_pago:null, fecha_registro:new Date().toISOString().split('T')[0], ...data };
    consultorios.push(c); return c;
  }

  function addEspecialidad(d) { const e={id:nextEspId++,...d}; especialidades.push(e); return e; }
  function updateEspecialidad(id,d) { const e=especialidades.find(x=>x.id===id); if(e) Object.assign(e,d); return e; }
  function deleteEspecialidad(id) { const i=especialidades.findIndex(x=>x.id===id); if(i>-1) especialidades.splice(i,1); }

  function marcarPagado(consId) {
    const c=getConsultorioById(consId); if(!c) return;
    c.pagado=true; c.verificado=true; c.suscripcion_estado='activa';
    c.fecha_pago=new Date().toISOString().split('T')[0];
    if(!suscripciones.find(s=>s.id_consultorio===consId)){
      suscripciones.push({id:`susc_${consId}`,id_consultorio:consId,nombre_consultorio:c.nombre_consultorio,plan_id:'plan_pro',plan_nombre:'MediCitas Pro',estado:'activa',fecha_inicio:c.fecha_pago,fecha_fin:calcFechaFin(c.fecha_pago),monto:90000});
      pagos.push({id:`p_${Date.now()}`,nombre_consultorio:c.nombre_consultorio,monto:90000,estado:'aprobado',metodo:'Pasarela simulada',referencia:`SIM-${Date.now()}`,fecha:c.fecha_pago});
    }
  }

  function validarConsultorio(consId) {
    const c=getConsultorioById(consId); if(!c) return;
    c.validacion_estado='aprobado'; c.activo=true; c.motivo_rechazo=null;
  }
  function rechazarConsultorio(consId, motivo) {
    const c=getConsultorioById(consId); if(!c) return;
    c.validacion_estado='rechazado'; c.activo=false; c.motivo_rechazo=motivo||'Documentación inválida';
  }

    function authenticate(email, password) { return usuarios.find(u=>u.email===email&&u.password===password&&u.activo); }

  return {
    usuarios, especialidades, servicios, tags, consultorios, citas, calificaciones, planes,
    notificaciones, suscripciones, pagos,
    getConsultorioById, getServiciosByEsp, getTagsByIds, getHorasOcupadas, getStatsCons,
    addCita, updateCitaEstado, addCalificacion,
    addTag, addServicio, addUser, addConsultorio,
    addEspecialidad, updateEspecialidad, deleteEspecialidad,
    marcarPagado, validarConsultorio, rechazarConsultorio, authenticate, getEspIconoSVG, calcFechaFin,
    formatPrecio: n=>'$'+Number(n).toLocaleString('es-CO'),
    formatFecha: s=>{ if(!s||s==='—') return '—'; const d=new Date(s+'T12:00:00'); return d.toLocaleDateString('es-CO',{day:'2-digit',month:'short',year:'numeric'}); }
  };
})();
