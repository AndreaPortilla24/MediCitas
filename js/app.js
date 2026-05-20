/* ═══════════════════════════════════════════════════════
   MediCitas — App Core v3
   History API, loading buttons, color picker
   ═══════════════════════════════════════════════════════ */

// ── SVG ICON LIBRARY ─────────────────────────────────
const IC = {
  logo:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M5 6h14v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6z"/><path d="M9 12h6M12 9v6"/></svg>`,
  bell:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>`,
  chevron:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>`,
  check:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  x:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  user:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>`,
  calendar:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  inbox:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/></svg>`,
  chart:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  stethoscope:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6 6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3"/><path d="M8 15v1a6 6 0 006 6v0a6 6 0 006-6v-4"/><circle cx="20" cy="10" r="2"/></svg>`,
  tag:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`,
  shield:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  map:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  wa:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
  eye:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  edit:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  trash:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>`,
  plus:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  arrow_l:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>`,
  arrow_r:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  home:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  list:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,
  credit:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
  image:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
  upload:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>`,
  clock:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  info:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  star:`<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  star_o:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  phone:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.52 9.94 19.79 19.79 0 01.46 1.28 2 2 0 012.46 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l.79-.79a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`,
  mail:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg>`,
  grid:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
  search:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  lock:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>`,
  logout:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  warn:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  palette:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="13.5" cy="6.5" r="1"/><circle cx="17.5" cy="10.5" r="1"/><circle cx="8.5" cy="7.5" r="1"/><circle cx="6.5" cy="12.5" r="1"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.1 0 2-.9 2-2v-.5c0-.55.45-1 1-1h1c2.76 0 5-2.24 5-5C21 6.48 17 2 12 2z"/></svg>`,
};

function ic(name, size=18, cls='') {
  const svg = IC[name] || IC.info;
  return svg.replace('<svg ', `<svg width="${size}" height="${size}" class="${cls}" `);
}

// ── DESIGN SYSTEM COLOR PALETTE ──────────────────────
const DS_COLORS = [
  { hex:'#0070C0', name:'Azul primario' },
  { hex:'#00B09B', name:'Verde teal' },
  { hex:'#7C3AED', name:'Morado' },
  { hex:'#EC4899', name:'Rosa' },
  { hex:'#F59E0B', name:'Naranja' },
  { hex:'#EF4444', name:'Rojo' },
  { hex:'#10B981', name:'Verde esmeralda' },
  { hex:'#64748B', name:'Gris pizarra' },
  { hex:'#6366F1', name:'Índigo' },
  { hex:'#84CC16', name:'Lima' },
];

// ── COLOR PICKER WIDGET ───────────────────────────────
function renderColorPicker(inputId, currentColor='#0070C0', onChangeFn='') {
  return `
  <div class="color-picker-widget" data-target="${inputId}">
    <div class="cp-palette">
      ${DS_COLORS.map(c=>`
        <button type="button" class="cp-swatch ${currentColor===c.hex?'active':''}"
          style="background:${c.hex}" title="${c.name}"
          onclick="cpSelect('${inputId}','${c.hex}',this)${onChangeFn?';'+onChangeFn:''}"></button>
      `).join('')}
    </div>
    <div class="cp-custom">
      <div class="cp-preview" id="${inputId}-preview" style="background:${currentColor}"></div>
      <input type="text" class="form-control cp-hex" id="${inputId}-hex" value="${currentColor}"
        placeholder="#000000" maxlength="7"
        oninput="cpHexInput('${inputId}',this.value)${onChangeFn?';'+onChangeFn:''}">
      <input type="hidden" id="${inputId}" value="${currentColor}">
    </div>
  </div>`;
}

window.cpSelect = function(inputId, hex, btn) {
  document.getElementById(inputId).value = hex;
  const hexEl = document.getElementById(`${inputId}-hex`);
  if(hexEl) hexEl.value = hex;
  const prev = document.getElementById(`${inputId}-preview`);
  if(prev) prev.style.background = hex;
  btn.closest('.cp-palette').querySelectorAll('.cp-swatch').forEach(s=>s.classList.remove('active'));
  btn.classList.add('active');
};

window.cpHexInput = function(inputId, val) {
  if(/^#[0-9A-Fa-f]{6}$/.test(val)) {
    document.getElementById(inputId).value = val;
    const prev = document.getElementById(`${inputId}-preview`);
    if(prev) prev.style.background = val;
    document.querySelectorAll(`[data-target="${inputId}"] .cp-swatch`).forEach(s=>s.classList.remove('active'));
  }
};

// ── LOADING BUTTON UTILITY ────────────────────────────
function btnLoad(btn, loading=true, originalHtml='') {
  if(!btn) return;
  if(loading) {
    btn._originalHtml = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<div class="spinner-sm"></div> Procesando...`;
  } else {
    btn.disabled = false;
    btn.innerHTML = btn._originalHtml || originalHtml || 'Guardar';
  }
}

// ── APP STATE ─────────────────────────────────────────
const App = (() => {
  let currentUser = null;
  let _historyIgnore = false;

  // ── AUTH ────────────────────────────────────────────
  function login(email, password) {
    const user = DB.authenticate(email, password);
    if (!user) return null;
    currentUser = user;
    renderNav();
    return user;
  }
  function logout() { currentUser = null; navigate('home'); renderNav(); showToast('Sesión cerrada', 'info'); }
  function getUser() { return currentUser; }
  function isLoggedIn() { return !!currentUser; }
  function hasRole(r) { return currentUser && currentUser.rol === r; }

  // ── ROUTER con History API ───────────────────────────
  function navigate(page, params={}, pushState=true) {
    const guards = {
      'mis-citas':['paciente'],'perfil-paciente':['paciente'],
      'dashboard-consultorio':['consultorio'],'bandeja':['consultorio'],
      'agenda':['consultorio'],'servicios-esp':['consultorio'],
      'estadisticas':['consultorio'],'galeria':['consultorio'],
      'admin':['admin'],
    };
    if(guards[page]) {
      if(!currentUser){ showModal('login'); return; }
      if(!guards[page].includes(currentUser.rol)){ showToast('Sin permisos','error'); return; }
    }
    window._routeParams = params;
    if(pushState && !_historyIgnore) {
      const state = { page, params };
      const url = `#${page}${Object.keys(params).length?'?'+new URLSearchParams(params):''}`;
      window.history.pushState(state, '', url);
    }
    renderPage(page, params);
    window.scrollTo(0, 0);
  }

  // Handle browser back/forward
  window.addEventListener('popstate', (e) => {
    if(e.state && e.state.page) {
      _historyIgnore = true;
      navigate(e.state.page, e.state.params || {}, false);
      _historyIgnore = false;
    } else {
      _historyIgnore = true;
      navigate('home', {}, false);
      _historyIgnore = false;
    }
  });

  // ── TOAST ───────────────────────────────────────────
  function showToast(msg, type='info', duration=4000) {
    const c = document.getElementById('toast-container'); if(!c) return;
    const icons = { success:ic('check',15), error:ic('x',15), info:ic('info',15), warning:ic('warn',15) };
    const d = document.createElement('div');
    d.className = `toast ${type}`;
    d.innerHTML = `<span class="toast-icon">${icons[type]||''}</span><span>${msg}</span><button class="toast-close" onclick="this.parentElement.remove()">${ic('x',13)}</button>`;
    c.appendChild(d);
    setTimeout(()=>{ d.style.opacity='0'; d.style.transform='translateX(20px)'; d.style.transition='.3s'; setTimeout(()=>d.remove(),300); }, duration);
  }

  // ── MODAL ───────────────────────────────────────────
  function showModal(id, data={}) {
    closeModal();
    if(id==='confirm-cancelar'&&data.id){ const el=document.getElementById('modal-confirm-cancelar'); if(el){document.getElementById('cc-cita-id').value=data.id;el.style.display='flex';return;} }
    if(id==='confirm-rechazar'&&data.id){ const el=document.getElementById('modal-confirm-rechazar'); if(el){document.getElementById('cr-cita-id').value=data.id;el.style.display='flex';return;} }
    if(id==='edit-plan'&&data.planId){ openEditPlanById&&openEditPlanById(data.planId); return; }
    if(id==='edit-esp'&&data.espId){ openEditEspById&&openEditEspById(data.espId); return; }
    const el = document.getElementById(`modal-${id}`);
    if(el) el.style.display='flex';
  }
  function closeModal() {
    document.querySelectorAll('.modal-overlay').forEach(m=>m.style.display='none');
  }

  // ── INTEGRATIONS ────────────────────────────────────
  function openWhatsApp(phone, msg='') {
    const clean = phone.replace(/\D/g,'');
    const num = clean.startsWith('57') ? clean : '57'+clean;
    window.open(`https://wa.me/${num}?text=${encodeURIComponent(msg)}`,'_blank');
  }
  function sendWhatsAppCita(cons, cita) {
    openWhatsApp(cons.whatsapp,`Hola ${cons.nombre_consultorio}, soy ${cita.nombre_paciente} y quiero confirmar mi cita para el ${cita.fecha_solicitada} a las ${cita.hora_solicitada}. Motivo: ${cita.motivo}. Agendé a través de MediCitas.`);
  }
  function openMaps(cons) {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cons.direccion+', '+cons.municipio+', Colombia')}`,'_blank');
  }
  function embedMap(containerId, lat, lng, label) {
    const el = document.getElementById(containerId); if(!el) return;
    el.innerHTML = `<iframe src="https://www.openstreetmap.org/export/embed.html?bbox=${lng-.005}%2C${lat-.005}%2C${lng+.005}%2C${lat+.005}&layer=mapnik&marker=${lat}%2C${lng}" style="width:100%;height:100%;border:none;border-radius:var(--radius)" allowfullscreen></iframe>
    <div style="position:absolute;bottom:8px;right:8px"><button class="btn btn-sm btn-primary" onclick="App.openMaps({direccion:'${label}',municipio:'Bucaramanga'})">${ic('map',13)} Google Maps</button></div>`;
    el.style.position='relative';
  }

  // ── NAV ─────────────────────────────────────────────
  function renderNav() {
    const navRight = document.getElementById('nav-right');
    const navLinks = document.getElementById('nav-links');
    if(!navRight) return;
    if(!currentUser) {
      navLinks.innerHTML = `
        <button class="nav-link" onclick="App.navigate('home')">Inicio</button>
        <button class="nav-link" onclick="App.navigate('directorio')">Directorio</button>
        <button class="nav-link" onclick="App.navigate('planes')">Planes</button>
        <button class="nav-link" onclick="App.navigate('sobre-nosotros')">Nosotros</button>
        <button class="nav-link" onclick="App.navigate('contacto')">Contacto</button>`;
      navRight.innerHTML = `
        <button class="btn btn-ghost btn-sm" onclick="App.showModal('login')">Iniciar sesión</button>
        <button class="btn btn-outline btn-sm" onclick="App.navigate('registro-consultorio')">Soy consultorio</button>
        <button class="btn btn-primary btn-sm" onclick="App.showModal('register')">Registrarse</button>`;
      return;
    }
    let links = `<button class="nav-link" onclick="App.navigate('home')">Inicio</button>
                 <button class="nav-link" onclick="App.navigate('directorio')">Directorio</button>`;
    if(currentUser.rol==='paciente') links+=`<button class="nav-link" onclick="App.navigate('mis-citas')">Mis Citas</button><button class="nav-link" onclick="App.navigate('perfil-paciente')">Mi Perfil</button>`;
    if(currentUser.rol==='consultorio') links+=`<button class="nav-link" onclick="App.navigate('dashboard-consultorio')">Mi Consultorio</button>`;
    if(currentUser.rol==='admin') links+=`<button class="nav-link" onclick="App.navigate('admin')">Admin</button>`;
    navLinks.innerHTML = links;
    const notifs = DB.notificaciones[currentUser.rol]||[];
    const unread = notifs.filter(n=>!n.leida).length;
    navRight.innerHTML = `
      <div class="relative" id="notif-wrapper">
        <button class="notif-btn" onclick="toggleNotifPanel()">${ic('bell',18)}${unread>0?'<span class="notif-dot"></span>':''}</button>
      </div>
      <div class="relative" id="user-menu-wrapper">
        <button class="user-menu-btn" onclick="toggleUserMenu()">
          <div class="user-avatar">${currentUser.avatar}</div>
          <div><div class="user-name">${currentUser.nombre.split(' ')[0]}</div><div class="user-role">${{paciente:'Paciente',consultorio:'Consultorio',admin:'Administrador'}[currentUser.rol]}</div></div>
          <span style="color:var(--text3);display:flex">${ic('chevron',14)}</span>
        </button>
      </div>`;
  }

  window.toggleNotifPanel = function() {
    let p = document.getElementById('notif-panel'); if(p){p.remove();return;}
    const w = document.getElementById('notif-wrapper'); if(!w) return;
    const notifs = DB.notificaciones[currentUser?.rol]||[];
    const unread = notifs.filter(n=>!n.leida).length;
    p = document.createElement('div'); p.id='notif-panel'; p.className='notif-panel';
    p.innerHTML=`<div class="notif-header">Notificaciones ${unread>0?`<span class="badge badge-red">${unread} nuevas</span>`:`<span style="font-size:12px;color:var(--text3)">Al día</span>`}</div>
      ${notifs.length===0?`<div style="padding:24px;text-align:center;color:var(--text3);font-size:13px">Sin notificaciones</div>`:notifs.map(n=>`
        <div class="notif-item ${!n.leida?'unread':''}" onclick="markNotifRead('${n.id}')">
          <div class="notif-icon">${ic(n.tipo==='cita'?'calendar':n.tipo==='solicitud'?'inbox':n.tipo==='pago'?'credit':'info',16)}</div>
          <div><div class="notif-text"><strong>${n.titulo}</strong><br>${n.mensaje}</div><div class="notif-time">${n.fecha}</div></div>
        </div>`).join('')}
      <div style="padding:10px 16px;border-top:1px solid var(--border);text-align:center">
        <button class="btn btn-ghost btn-sm" onclick="markAllRead()">Marcar todo como leído</button>
      </div>`;
    w.appendChild(p);
    setTimeout(()=>{ document.addEventListener('click',function h(e){if(!w.contains(e.target)){p.remove();document.removeEventListener('click',h);}});},10);
  };

  window.toggleUserMenu = function() {
    let m = document.getElementById('user-dropdown'); if(m){m.remove();return;}
    const w = document.getElementById('user-menu-wrapper'); if(!w) return;
    m = document.createElement('div'); m.id='user-dropdown'; m.className='dropdown-menu';
    let items='';
    if(currentUser.rol==='paciente') items=`<button class="dropdown-item" onclick="App.navigate('mis-citas');this.closest('#user-dropdown').remove()">${ic('calendar',15)} Mis Citas</button><button class="dropdown-item" onclick="App.navigate('perfil-paciente');this.closest('#user-dropdown').remove()">${ic('user',15)} Mi Perfil</button>`;
    else if(currentUser.rol==='consultorio') items=`<button class="dropdown-item" onclick="App.navigate('dashboard-consultorio');this.closest('#user-dropdown').remove()">${ic('home',15)} Mi Consultorio</button><button class="dropdown-item" onclick="App.navigate('bandeja');this.closest('#user-dropdown').remove()">${ic('inbox',15)} Bandeja</button><button class="dropdown-item" onclick="App.navigate('agenda');this.closest('#user-dropdown').remove()">${ic('calendar',15)} Agenda</button><button class="dropdown-item" onclick="App.navigate('estadisticas');this.closest('#user-dropdown').remove()">${ic('chart',15)} Estadísticas</button>`;
    else if(currentUser.rol==='admin') items=`<button class="dropdown-item" onclick="App.navigate('admin');this.closest('#user-dropdown').remove()">${ic('shield',15)} Panel Admin</button>`;
    m.innerHTML=`<div style="padding:12px 16px;border-bottom:1px solid var(--border)"><div style="font-weight:700;font-size:13px">${currentUser.nombre}</div><div style="font-size:11px;color:var(--text3)">${currentUser.email}</div></div>${items}<div class="dropdown-divider"></div><button class="dropdown-item danger" onclick="App.logout()">${ic('logout',15)} Cerrar sesión</button>`;
    w.appendChild(m);
    setTimeout(()=>{ document.addEventListener('click',function h(e){if(!w.contains(e.target)){m.remove();document.removeEventListener('click',h);}});},10);
  };

  window.markNotifRead = function(id) { const n=(DB.notificaciones[currentUser?.rol]||[]).find(x=>x.id===id); if(n)n.leida=true; document.getElementById('notif-panel')?.remove(); renderNav(); };
  window.markAllRead = function() { (DB.notificaciones[currentUser?.rol]||[]).forEach(n=>n.leida=true); document.getElementById('notif-panel')?.remove(); renderNav(); showToast('Todo leído','success'); };

  window.showModal  = showModal;
  window.closeModal = closeModal;
  window.closeModalById = id => { const el=document.getElementById(id); if(el) el.style.display='none'; };

  return { navigate, login, logout, getUser, isLoggedIn, hasRole,
           showToast, showModal, closeModal, openWhatsApp, sendWhatsAppCita,
           openMaps, embedMap, renderNav, ic, btnLoad, renderColorPicker };
})();

window.App = App;
window.navigate  = App.navigate;
window.showToast = App.showToast;
window.showModal = App.showModal;
window.closeModal = App.closeModal;
window.ic = ic;
window.btnLoad = btnLoad;
window.renderColorPicker = renderColorPicker;
window.DS_COLORS = DS_COLORS;
