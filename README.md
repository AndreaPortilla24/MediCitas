# MediCitas — Prototipo Funcional
## Directorio Médico · Bucaramanga & Área Metropolitana

---

## Estructura del proyecto

```
medicitas/
├── index.html          ← Punto de entrada principal
├── css/
│   └── base.css        ← Estilos globales (variables, componentes)
├── js/
│   ├── data.js         ← Base de datos en memoria (mock data)
│   ├── app.js          ← Core: autenticación, router, toasts, nav
│   ├── pages.js        ← Todas las vistas / páginas
│   └── modals.js       ← Todos los modales
└── README.md           ← Este archivo
```

---

## Cómo ejecutar

### Opción 1 — Sin servidor (más simple)
Abre directamente el archivo `index.html` en tu navegador.
- Windows: doble clic en `index.html`
- Mac: `open index.html` en la terminal
- Linux: `xdg-open index.html`

> Nota: algunos navegadores bloquean recursos locales. Si el mapa no carga, usa la Opción 2.

### Opción 2 — Con servidor local (recomendado)

**Con Python (instalado en la mayoría de sistemas):**
```bash
# Desde la carpeta medicitas/
python3 -m http.server 3000
# Luego abre: http://localhost:3000
```

**Con Node.js (npx):**
```bash
npx serve .
# O bien:
npx http-server . -p 3000
```

**Con VS Code:**
Instala la extensión **Live Server** y haz clic en "Go Live".

---

## Usuarios de prueba

| Rol           | Correo                          | Contraseña      |
|---------------|---------------------------------|-----------------|
| Paciente      | andres@paciente.com             | paciente123     |
| Consultorio   | admin@clinicasanpablo.com       | consultorio123  |
| Administrador | admin@medicitas.co              | admin2024       |

---

## Roles y funcionalidades

### Paciente (Andrés Gómez)
- Navegar el directorio público sin registrarse
- Filtrar por especialidad, municipio y precio
- Ver perfil detallado de cada consultorio
- Solicitar cita (con o sin cuenta)
- Ver historial de citas propias con estados
- Cancelar citas pendientes o confirmadas
- Contactar consultorio por WhatsApp
- Notificaciones de citas confirmadas

### Consultorio (Clínica San Pablo)
- Dashboard con resumen de actividad
- Bandeja de entrada de solicitudes
  - Aprobar, rechazar o completar citas
  - Filtros por estado, fecha y paciente
  - Contactar paciente por WhatsApp
- Agenda / calendario interactivo
  - Ver citas por día
  - Crear citas manuales
- Gestión de servicios (agregar/quitar)
- Gestión de etiquetas (crear / agregar / quitar)
- Edición completa del perfil del consultorio
- Estadísticas mensuales con gráficas
- Notificaciones de nuevas solicitudes

### Administrador (María Rodríguez)
- Dashboard global con métricas de plataforma
- Gestión completa de consultorios (CRUD)
- Gestión de usuarios y roles
- Vista global de todas las citas
- Gestión del plan MediCitas Pro
- Historial de pagos y suscripciones
- Gestión de etiquetas del sistema
- Gestión de especialidades

---

## Plan MediCitas Pro

- **Precio:** $90.000 / mes
- **Incluye:** Visibilidad en directorio, agendamiento ilimitado, estadísticas, gestión de citas, notificaciones WhatsApp, mapa de ubicación, etiquetas personalizadas, soporte prioritario.

---

## Integraciones externas

### WhatsApp
Todos los botones de WhatsApp abren `wa.me/{numero}?text={mensaje}` con mensajes preconfigurados:
- Paciente → Consultorio: confirmar cita
- Consultorio → Paciente: gestión
- Admin/Consultorios → MediCitas: soporte

### Google Maps / OpenStreetMap
Los perfiles de consultorio muestran un mapa embebido via OpenStreetMap (sin API key). El botón "Ver en Google Maps" abre la dirección en Google Maps con geolocalización.

---

## Estados de citas

| Estado      | Descripción                              |
|-------------|------------------------------------------|
| pendiente   | Recién enviada, en espera de revisión    |
| confirmada  | Aprobada por el consultorio              |
| completada  | Atención realizada                       |
| rechazada   | Rechazada por el consultorio (con nota)  |
| cancelada   | Cancelada por el paciente                |

---

## Tecnologías

- HTML5 + CSS3 (sin frameworks CSS)
- JavaScript vanilla (sin dependencias)
- Fuente: Sora (Google Fonts)
- Mapas: OpenStreetMap (iframe embed)
- WhatsApp: API oficial wa.me

---

## Notas del prototipo

- **Sin backend:** Todos los datos viven en memoria (se reinician al recargar la página).
- **Sin base de datos:** El archivo `js/data.js` actúa como store completo.
- **Listo para integración:** La arquitectura está preparada para conectar con un backend REST. Cada función de `DB` se puede reemplazar por llamadas a una API real.

---

*MediCitas · Prototipo v1.0 · Mayo 2025*
