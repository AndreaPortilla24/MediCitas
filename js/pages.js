/* ═══════════════════════════════════════════════════════
   MediCitas — Pages v3
   ═══════════════════════════════════════════════════════ */

function renderPage(page, params={}) {
  const main = document.getElementById('main-content');
  if(!main) return;
  switch(page) {
    case 'home':                 main.innerHTML=renderHome();                     initHome();           break;
    case 'directorio':           main.innerHTML=renderDirectorio();               initDirectorio(params);break;
    case 'detalle-consultorio':  main.innerHTML=renderDetalleConsultorio(params); initDetalle(params);  break;
    case 'mis-citas':            main.innerHTML=renderMisCitas();                 initMisCitas();       break;
    case 'perfil-paciente':      main.innerHTML=renderPerfilPaciente();                                 break;
    case 'dashboard-consultorio':main.innerHTML=renderDashConsultorio();          initDashCons();       break;
    case 'bandeja':              main.innerHTML=renderBandeja();                  initBandeja();        break;
    case 'agenda':               main.innerHTML=renderAgenda();                   initAgenda();         break;
    case 'servicios-esp':        main.innerHTML=renderServiciosEsp();                                   break;
    case 'estadisticas':         main.innerHTML=renderEstadisticas();                                   break;
    case 'galeria':              main.innerHTML=renderGaleria();                                        break;
    case 'admin':                main.innerHTML=renderAdmin();                    initAdmin();          break;
    case 'planes':               main.innerHTML=renderPlanes();                                         break;
    case 'sobre-nosotros':       main.innerHTML=renderSobreNosotros();                                  break;
    case 'contacto':             main.innerHTML=renderContacto();                                       break;
    case 'modelo-canvas':        main.innerHTML=renderModeloCanvas();                                   break;
    case 'registro-consultorio': main.innerHTML=renderRegistroConsultorio();                            break;
    case 'pasarela-pago':        main.innerHTML=renderPasarelaPago(params);                             break;
    default:                     main.innerHTML=renderHome();                     initHome();
  }
}

function renderStars(rating) {
  let html='<span class="stars-row">';
  for(let i=1;i<=5;i++) html+=`<span style="font-size:13px;color:${i<=Math.round(rating)?'#F6C90E':'#CBD5E0'}">★</span>`;
  return html+`<span style="font-size:12px;color:var(--text3);margin-left:4px">${rating>0?rating:'—'}</span></span>`;
}

// ── INTERACTIVE STAR RATING ───────────────────────────
function renderStarRating(id, currentVal=0) {
  return `<div class="star-rating" id="${id}-stars" data-val="${currentVal}">
    ${[1,2,3,4,5].map(i=>`
      <svg width="28" height="28" viewBox="0 0 24 24" data-val="${i}"
        class="${i<=currentVal?'filled':''}"
        onmouseover="starHover('${id}',${i})"
        onmouseout="starOut('${id}')"
        onclick="starClick('${id}',${i})">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="${i<=currentVal?'#F6C90E':'none'}" stroke="${i<=currentVal?'#F6C90E':'#CBD5E0'}" stroke-width="2"/>
      </svg>`).join('')}
  </div>
  <input type="hidden" id="${id}" value="${currentVal}">`;
}

window.starHover = function(id,val) {
  document.querySelectorAll(`#${id}-stars svg`).forEach((s,i)=>{
    const v=i+1;
    s.querySelector('polygon').setAttribute('fill',v<=val?'#F6C90E':'none');
    s.querySelector('polygon').setAttribute('stroke',v<=val?'#F6C90E':'#CBD5E0');
  });
};
window.starOut = function(id) {
  const cur = parseInt(document.getElementById(id)?.value)||0;
  document.querySelectorAll(`#${id}-stars svg`).forEach((s,i)=>{
    const v=i+1;
    s.querySelector('polygon').setAttribute('fill',v<=cur?'#F6C90E':'none');
    s.querySelector('polygon').setAttribute('stroke',v<=cur?'#F6C90E':'#CBD5E0');
  });
};
window.starClick = function(id,val) {
  document.getElementById(id).value = val;
  document.getElementById(`${id}-stars`).dataset.val = val;
  starOut(id);
};

// ══════════════════════════════════════════════════════
// HOME
// ══════════════════════════════════════════════════════
function renderHome() {
  const espCards = DB.especialidades.map(e=>`
    <div class="card card-hover" onclick="filterByEsp('${e.nombre}')">
      <div class="card-body" style="text-align:center;padding:16px 10px">
        <div style="width:42px;height:42px;border-radius:11px;background:${e.color}18;display:flex;align-items:center;justify-content:center;margin:0 auto 9px;color:${e.color}">
          ${DB.getEspIconoSVG(e.icono,30)}</div>
        <div style="font-weight:700;font-size:13px;margin-bottom:3px">${e.nombre}</div>
        <div style="font-size:11px;color:var(--text3)">${DB.consultorios.filter(c=>c.pagado&&c.especialidad_principal===e.nombre).length} consultorio(s)</div>
      </div>
    </div>`).join('');
  const featCards = DB.consultorios.filter(c=>c.pagado&&c.activo).slice(0,3).map(renderConsultorioCard).join('');
  return `
    <div class="carousel" id="hero-carousel">
      <div class="carousel-track" id="carousel-track">
        <div class="carousel-slide"><img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&q=80" alt=""><div class="carousel-overlay"><div class="carousel-caption"><h2>Tu salud, nuestra prioridad en Bucaramanga</h2><p>Encuentra y agenda citas con los mejores especialistas médicos del área metropolitana.</p><button class="btn btn-accent btn-lg" onclick="App.navigate('directorio')">Explorar directorio</button></div></div></div>
        <div class="carousel-slide"><img src="https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=1400&q=80" alt=""><div class="carousel-overlay"><div class="carousel-caption"><h2>Atención especializada para toda la familia</h2><p>Medicina general, pediatría, odontología y más de 12 especialidades disponibles.</p><button class="btn btn-accent btn-lg" onclick="App.navigate('directorio')">Ver especialidades</button></div></div></div>
        <div class="carousel-slide"><img src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1400&q=80" alt=""><div class="carousel-overlay"><div class="carousel-caption"><h2>Agenda en segundos, sin llamadas ni esperas</h2><p>Solicita tu cita en línea las 24 horas. Recibe confirmación directa del consultorio.</p><button class="btn btn-accent btn-lg" onclick="App.showModal('register')">Crear cuenta gratis</button></div></div></div>
        <div class="carousel-slide"><img src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1400&q=80" alt=""><div class="carousel-overlay"><div class="carousel-caption"><h2>Salud mental, también es salud</h2><p>Psicólogos y especialistas en bienestar emocional con agenda en línea.</p><button class="btn btn-accent btn-lg" onclick="App.navigate('directorio')">Encontrar especialista</button></div></div></div>
      </div>
      <button class="carousel-arrow prev" onclick="carouselMove(-1)">${ic('arrow_l',22)}</button>
      <button class="carousel-arrow next" onclick="carouselMove(1)">${ic('arrow_r',22)}</button>
      <div class="carousel-dots" id="carousel-dots"></div>
    </div>
    <div style="background:var(--surface);padding:24px;border-bottom:1px solid var(--border)">
      <div style="max-width:1200px;margin:0 auto">
        <div class="search-bar" style="max-width:700px">
          <input type="text" id="home-search" placeholder="Buscar especialista, clínica o especialidad...">
          <select id="home-zona"><option value="">Todos los municipios</option><option>Bucaramanga</option><option>Floridablanca</option><option>Girón</option><option>Piedecuesta</option></select>
          <button class="btn btn-primary" onclick="filterFromHome()" style="margin:0;border-radius:10px">${ic('search',15)} Buscar</button>
        </div>
      </div>
    </div>
    <div style="background:var(--surface2);padding:36px 24px;border-bottom:1px solid var(--border)">
      <div style="max-width:1200px;margin:0 auto">
        <div class="section-header" style="margin-bottom:20px"><div><div class="section-title">Especialidades disponibles</div><div class="section-sub">Selecciona para filtrar el directorio</div></div></div>
        <div class="grid-4">${espCards}</div>
      </div>
    </div>
    <div style="padding:36px 24px;max-width:1200px;margin:0 auto">
      <div class="section-header"><div><div class="section-title">Consultorios verificados</div><div class="section-sub">Profesionales con plan activo en Bucaramanga</div></div>
        <button class="btn btn-outline" onclick="App.navigate('directorio')">Ver todos ${ic('arrow_r',14)}</button>
      </div>
      <div class="grid-3">${featCards}</div>
    </div>
    <div style="background:linear-gradient(135deg,#003E80,#0070C0,#00B09B);padding:56px 24px;text-align:center">
      <div style="max-width:600px;margin:0 auto;color:#fff">
        <div style="font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;opacity:.7;margin-bottom:10px">Para consultorios</div>
        <h2 style="font-size:28px;font-weight:800;margin-bottom:12px;letter-spacing:-.5px">Lleva tu consultorio a más pacientes</h2>
        <p style="font-size:15px;opacity:.85;margin-bottom:24px">Un plan que incluye visibilidad, agendamiento, estadísticas y gestión completa de citas por solo <strong>$90.000/mes</strong>.</p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
          <button class="btn btn-lg" style="background:#fff;color:var(--primary);font-weight:700" onclick="App.navigate('planes')">${ic('credit',16)} Ver plan</button>
          <button class="btn btn-lg" style="border:2px solid rgba(255,255,255,.5);color:#fff;background:transparent" onclick="App.navigate('registro-consultorio')">${ic('plus',16)} Registrar mi consultorio</button>
        </div>
      </div>
    </div>
    <div style="background:var(--surface2);padding:28px 24px;border-top:1px solid var(--border)">
      <div style="max-width:1200px;margin:0 auto;display:flex;gap:14px;flex-wrap:wrap;justify-content:center">
        <button class="btn btn-ghost" onclick="App.navigate('sobre-nosotros')">${ic('user',15)} Sobre nosotros</button>
        <button class="btn btn-ghost" onclick="App.navigate('modelo-canvas')">${ic('grid',15)} Modelo Canvas</button>
        <button class="btn btn-ghost" onclick="App.navigate('contacto')">${ic('mail',15)} Contáctanos</button>
        <button class="btn btn-ghost" onclick="App.navigate('planes')">${ic('credit',15)} Planes</button>
      </div>
    </div>
    <footer style="background:var(--text);color:rgba(255,255,255,.6);padding:26px 24px;text-align:center;font-size:13px">
      <div style="margin-bottom:5px;font-weight:700;font-size:16px;color:#fff">MediCitas</div>
      <div>Directorio médico de Bucaramanga y área metropolitana</div>
      <div style="margin-top:5px;font-size:12px;opacity:.4">© 2025 MediCitas.</div>
    </footer>`;
}

function initHome() { initCarousel(); }
function initCarousel() {
  let cur=0; const track=document.getElementById('carousel-track'); const dotsEl=document.getElementById('carousel-dots');
  if(!track) return;
  const total=track.querySelectorAll('.carousel-slide').length;
  dotsEl.innerHTML=Array.from({length:total},(_,i)=>`<button class="carousel-dot ${i===0?'active':''}" onclick="goSlide(${i})"></button>`).join('');
  function goTo(n){ cur=((n%total)+total)%total; track.style.transform=`translateX(-${cur*100}%)`; dotsEl.querySelectorAll('.carousel-dot').forEach((d,i)=>d.classList.toggle('active',i===cur)); }
  window.carouselMove=dir=>goTo(cur+dir); window.goSlide=n=>goTo(n);
  const iv=setInterval(()=>{ if(document.getElementById('hero-carousel'))goTo(cur+1); else clearInterval(iv); },5000);
}
function filterFromHome(){ App.navigate('directorio',{q:document.getElementById('home-search')?.value||'',zona:document.getElementById('home-zona')?.value||''}); }
function filterByEsp(nombre){ App.navigate('directorio',{especialidad:nombre}); }
window.filterFromHome=filterFromHome; window.filterByEsp=filterByEsp;

// ══════════════════════════════════════════════════════
// DIRECTORIO
// ══════════════════════════════════════════════════════
function renderDirectorio() {
  return `<div class="page">
    <div class="section-header"><div><div class="section-title">Directorio médico</div><div class="section-sub">Especialistas verificados en Bucaramanga</div></div><div style="font-size:13px;color:var(--text3)" id="dir-count"></div></div>
    <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:14px 16px;margin-bottom:18px">
      <div class="filter-bar" style="margin-bottom:0">
        <input type="text" id="f-texto" placeholder="Buscar nombre, especialidad..." style="flex:1;min-width:140px" oninput="applyFilters()">
        <select id="f-esp" onchange="applyFilters()"><option value="">Todas las especialidades</option>${DB.especialidades.map(e=>`<option value="${e.nombre}">${e.nombre}</option>`).join('')}</select>
        <select id="f-municipio" onchange="applyFilters()"><option value="">Todos los municipios</option><option>Bucaramanga</option><option>Floridablanca</option><option>Girón</option><option>Piedecuesta</option></select>
        <select id="f-precio" onchange="applyFilters()"><option value="">Cualquier precio</option><option value="50">Hasta $50.000</option><option value="80">Hasta $80.000</option><option value="120">Hasta $120.000</option></select>
        <button class="btn btn-ghost btn-sm" onclick="clearFilters()">Limpiar</button>
      </div>
    </div>
    <div class="grid-3" id="dir-grid"></div>
    <div id="dir-empty" style="display:none" class="empty-state"><div class="empty-icon">${ic('search',44)}</div><div class="empty-title">Sin resultados</div><div class="empty-sub">Intenta con otros filtros</div></div>
  </div>`;
}
function initDirectorio(params={}) {
  if(params.q){const el=document.getElementById('f-texto');if(el)el.value=params.q;}
  if(params.zona){const el=document.getElementById('f-municipio');if(el)el.value=params.zona;}
  if(params.especialidad){const el=document.getElementById('f-esp');if(el)el.value=params.especialidad;}
  applyFilters();
}
window.applyFilters=function(){
  const texto=document.getElementById('f-texto')?.value?.toLowerCase()||'';
  const esp=document.getElementById('f-esp')?.value||'';
  const mun=document.getElementById('f-municipio')?.value||'';
  const precio=parseInt(document.getElementById('f-precio')?.value)||0;
  let list=DB.consultorios.filter(c=>c.pagado&&c.activo);
  if(texto) list=list.filter(c=>c.nombre_profesional.toLowerCase().includes(texto)||c.nombre_consultorio.toLowerCase().includes(texto)||c.especialidad_principal.toLowerCase().includes(texto)||c.barrio.toLowerCase().includes(texto));
  if(esp) list=list.filter(c=>c.especialidad_principal===esp);
  if(mun) list=list.filter(c=>c.municipio===mun);
  if(precio) list=list.filter(c=>c.precio_min<=precio*1000);
  const grid=document.getElementById('dir-grid'),empty=document.getElementById('dir-empty'),count=document.getElementById('dir-count');
  if(!grid) return;
  if(list.length===0){grid.innerHTML='';if(empty)empty.style.display='';if(count)count.textContent='';}
  else{grid.innerHTML=list.map(renderConsultorioCard).join('');if(empty)empty.style.display='none';if(count)count.textContent=`${list.length} resultado${list.length!==1?'s':''}`;}
};
window.clearFilters=function(){['f-texto','f-esp','f-municipio','f-precio'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});applyFilters();};

function renderConsultorioCard(c) {
  const tags=DB.getTagsByIds(c.tags_ids||[]);
  return `<div class="spec-card" onclick="App.navigate('detalle-consultorio',{id:'${c.id_consultorio}'})">
    <div class="spec-row">
      <div class="spec-avatar">${c.iniciales}</div>
      <div style="flex:1;min-width:0">
        <div class="spec-name">${c.nombre_profesional}</div>
        <div class="spec-esp">${c.especialidad_principal}</div>
        <div class="spec-meta">${ic('map',12)} ${c.barrio}, ${c.municipio}</div>
      </div>
      ${c.verificado?`<span class="badge badge-green">${ic('check',11)} Verificado</span>`:''}
    </div>
    <div style="margin-bottom:8px">${renderStars(c.calificacion)} <span style="font-size:12px;color:var(--text3)">(${c.resenas})</span></div>
    <div class="info-row">${ic('clock',13)} ${c.horario_resumen}</div>
    ${tags.length>0?`<div class="tag-list">${tags.slice(0,3).map(t=>`<span class="tag tag-${t.estilo}" ${t.colorCustom?`style="background:${t.colorCustom}18;color:${t.colorCustom};border-color:${t.colorCustom}44"`:''}>
      ${t.nombre}</span>`).join('')}</div>`:''}
    <div style="display:flex;gap:8px;margin-top:12px;align-items:center;flex-wrap:wrap">
      <span class="price-tag">${DB.formatPrecio(c.precio_min)} – ${DB.formatPrecio(c.precio_max)}</span>
      <button class="btn btn-outline btn-sm" onclick="event.stopPropagation();App.navigate('detalle-consultorio',{id:'${c.id_consultorio}'})">Ver perfil</button>
      <button class="btn btn-primary btn-sm" onclick="event.stopPropagation();openModalCita('${c.id_consultorio}')">Agendar</button>
    </div>
  </div>`;
}

// ══════════════════════════════════════════════════════
// DETALLE CONSULTORIO
// ══════════════════════════════════════════════════════
function renderDetalleConsultorio(params) {
  const c=DB.getConsultorioById(params.id);
  if(!c) return `<div class="page"><div class="empty-state"><div class="empty-title">No encontrado</div><button class="btn btn-primary" onclick="App.navigate('directorio')" style="margin-top:12px">Volver</button></div></div>`;
  const tags=DB.getTagsByIds(c.tags_ids||[]);
  const servicios=DB.servicios.filter(s=>(c.servicios_ids||[]).includes(s.id));
  const reviews=DB.calificaciones.filter(r=>r.id_consultorio===c.id_consultorio);
  return `<div class="page">
    <button class="btn btn-ghost btn-sm" onclick="App.navigate('directorio')" style="margin-bottom:14px">${ic('arrow_l',15)} Volver al directorio</button>
    <div style="display:grid;grid-template-columns:1fr 310px;gap:18px;align-items:start">
      <div>
        <div class="card" style="margin-bottom:14px">
          <div style="height:150px;background:linear-gradient(135deg,#003E80,#0070C0,#00B09B);position:relative">
            <div style="position:absolute;bottom:-26px;left:20px;width:54px;height:54px;border-radius:50%;background:linear-gradient(135deg,#0070C0,#00B09B);display:flex;align-items:center;justify-content:center;color:#fff;font-size:19px;font-weight:700;border:3px solid #fff">${c.iniciales}</div>
            ${c.verificado?`<div style="position:absolute;top:12px;right:12px"><span class="badge badge-green" style="background:rgba(255,255,255,.9)">${ic('check',11)} Verificado</span></div>`:''}
          </div>
          <div class="card-body" style="padding-top:38px">
            <div style="font-size:20px;font-weight:800;margin-bottom:2px">${c.nombre_profesional}</div>
            <div style="font-size:14px;color:var(--primary);font-weight:600;margin-bottom:3px">${c.especialidad_principal}</div>
            <div style="font-size:13px;color:var(--text3);margin-bottom:10px">${c.nombre_consultorio}</div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:8px">
              ${renderStars(c.calificacion)}<span style="font-size:13px;color:var(--text3)">${c.resenas} reseña${c.resenas!==1?'s':''}</span>
              <span class="price-tag">${DB.formatPrecio(c.precio_min)} – ${DB.formatPrecio(c.precio_max)}</span>
            </div>
            ${tags.length>0?`<div class="tag-list">${tags.map(t=>`<span class="tag tag-${t.estilo}" ${t.colorCustom?`style="background:${t.colorCustom}18;color:${t.colorCustom};border-color:${t.colorCustom}44"`:''}>
              ${t.nombre}</span>`).join('')}</div>`:''}
          </div>
        </div>
        <div class="card" style="margin-bottom:14px"><div class="card-body">
          <div style="font-weight:700;margin-bottom:7px">Sobre el consultorio</div>
          <p style="font-size:14px;color:var(--text2);line-height:1.65">${c.descripcion}</p>
        </div></div>
        ${c.galeria&&c.galeria.length>0?`<div class="card" style="margin-bottom:14px"><div class="card-body">
          <div style="font-weight:700;margin-bottom:10px">Galería</div>
          <div class="galeria-grid">${c.galeria.map(url=>`<div class="galeria-item"><img src="${url}" alt="Galería"></div>`).join('')}</div>
        </div></div>`:''}
        <div class="card" style="margin-bottom:14px"><div class="card-body">
          <div style="font-weight:700;margin-bottom:10px">Servicios disponibles</div>
          ${servicios.length>0?`<div style="display:flex;flex-direction:column;gap:8px">${servicios.map(s=>`
            <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;background:var(--surface2);border-radius:8px;border:1px solid var(--border)">
              <div><div style="font-weight:600;font-size:13px">${s.nombre}</div><div style="font-size:12px;color:var(--text3)">${s.descripcion} · ${s.duracion} min</div></div>
              <div style="display:flex;align-items:center;gap:8px"><span class="price-tag">${DB.formatPrecio(s.precio)}</span>
                <button class="btn btn-primary btn-sm" onclick="openModalCita('${c.id_consultorio}','${s.id}')">Agendar</button>
              </div>
            </div>`).join('')}</div>`:`<div style="color:var(--text3);font-size:13px">Sin servicios registrados</div>`}
        </div></div>
        <!-- RESEÑAS -->
        ${reviews.length>0?`<div class="card"><div class="card-body">
          <div style="font-weight:700;margin-bottom:12px">Reseñas de pacientes</div>
          <div style="display:flex;flex-direction:column;gap:10px">
            ${reviews.map(r=>`<div style="padding:12px;background:var(--surface2);border-radius:8px;border:1px solid var(--border)">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:5px">
                <strong style="font-size:13px">${r.nombre_paciente}</strong>
                <div>${renderStars(r.calificacion)}</div>
              </div>
              <div style="font-size:13px;color:var(--text2)">${r.comentario}</div>
              <div style="font-size:11px;color:var(--text3);margin-top:4px">${DB.formatFecha(r.fecha)}</div>
            </div>`).join('')}
          </div>
        </div></div>`:''} 
      </div>
      <div>
        <div class="card" style="margin-bottom:14px"><div class="card-body">
          <div style="font-weight:700;margin-bottom:10px">Información de contacto</div>
          <div class="info-row">${ic('phone',14)} ${c.telefono_contacto}</div>
          <div class="info-row">${ic('mail',14)} ${c.email||'—'}</div>
          <div class="info-row">${ic('clock',14)} ${c.horario_resumen}</div>
          <div class="info-row">${ic('map',14)} ${c.direccion}</div>
          <hr class="divider">
          <div style="display:flex;flex-direction:column;gap:8px">
            <button class="btn btn-primary btn-block" onclick="openModalCita('${c.id_consultorio}')">${ic('calendar',15)} Solicitar cita</button>
            <button class="btn btn-wa btn-block" onclick="App.openWhatsApp('${c.whatsapp}','Hola ${c.nombre_profesional}, vi tu perfil en MediCitas.')">${ic('wa',15)} WhatsApp</button>
            <button class="btn btn-ghost btn-block" onclick="App.openMaps(DB.getConsultorioById('${c.id_consultorio}'))">${ic('map',15)} Cómo llegar</button>
          </div>
        </div></div>
        <div class="card"><div class="map-placeholder" id="map-det-${c.id_consultorio}" style="height:200px;border-radius:var(--radius)">
          ${ic('map',28)}<span style="font-size:13px">${c.barrio}, ${c.municipio}</span>
          <button class="btn btn-primary btn-sm" onclick="App.openMaps(DB.getConsultorioById('${c.id_consultorio}'))">Ver en Google Maps</button>
        </div></div>
      </div>
    </div>
  </div>`;
}
function initDetalle(params) { const c=DB.getConsultorioById(params.id); if(c) setTimeout(()=>App.embedMap(`map-det-${c.id_consultorio}`,c.lat,c.lng,c.direccion),200); }

// ══════════════════════════════════════════════════════
// MIS CITAS — con módulo de calificación
// ══════════════════════════════════════════════════════
function renderMisCitas() {
  const user=App.getUser();
  const all=DB.citas.filter(c=>c.id_paciente===user?.id||c.email_paciente===user?.email);
  return `<div class="page">
    <div class="section-header"><div><div class="section-title">Mis Citas</div><div class="section-sub">Historial y seguimiento de solicitudes</div></div>
      <button class="btn btn-primary" onclick="App.navigate('directorio')">${ic('plus',14)} Agendar nueva cita</button>
    </div>
    <div class="tabs" id="tabs-mc">
      <button class="tab active" onclick="filterMC('todas',this)">Todas <span class="tab-count">${all.length}</span></button>
      <button class="tab" onclick="filterMC('pendiente',this)">Pendientes <span class="tab-count">${all.filter(c=>c.estado==='pendiente').length}</span></button>
      <button class="tab" onclick="filterMC('confirmada',this)">Confirmadas <span class="tab-count">${all.filter(c=>c.estado==='confirmada').length}</span></button>
      <button class="tab" onclick="filterMC('completada',this)">Completadas <span class="tab-count">${all.filter(c=>c.estado==='completada').length}</span></button>
      <button class="tab" onclick="filterMC('cancelada',this)">Canceladas <span class="tab-count">${all.filter(c=>c.estado==='cancelada').length}</span></button>
    </div>
    <div id="mc-list"></div>
  </div>`;
}
function initMisCitas() { filterMC('todas'); }

window.filterMC=function(estado,btn){
  document.querySelectorAll('#tabs-mc .tab').forEach(t=>t.classList.remove('active'));
  if(btn) btn.classList.add('active');
  const user=App.getUser();
  let lista=DB.citas.filter(c=>c.id_paciente===user?.id||c.email_paciente===user?.email);
  if(estado!=='todas') lista=lista.filter(c=>c.estado===estado);
  const el=document.getElementById('mc-list'); if(!el) return;
  if(lista.length===0){el.innerHTML=`<div class="empty-state"><div class="empty-icon">${ic('calendar',44)}</div><div class="empty-title">Sin citas en esta categoría</div><div class="empty-sub" style="margin-top:12px"><button class="btn btn-primary" onclick="App.navigate('directorio')">Buscar especialista</button></div></div>`;return;}
  const bm={pendiente:'badge-orange',confirmada:'badge-green',completada:'badge-blue',cancelada:'badge-gray'};
  const lm={pendiente:'Pendiente',confirmada:'Confirmada',completada:'Completada',cancelada:'Cancelada'};
  el.innerHTML=`<div style="display:flex;flex-direction:column;gap:12px">${lista.map(cita=>{
    const cons=DB.getConsultorioById(cita.id_consultorio);
    const yaCalificada=DB.calificaciones.some(r=>r.id_cita===cita.id_cita);
    const reviewBlock = cita.estado==='completada'&&!yaCalificada ? `
      <div class="review-card">
        <div class="review-header"><strong style="font-size:13px">Califica esta atención</strong><span class="badge badge-blue">Nueva</span></div>
        <div style="margin-bottom:10px">${renderStarRating('rating-'+cita.id_cita)}</div>
        <textarea class="form-control" id="comentario-${cita.id_cita}" rows="2" placeholder="Cuéntanos cómo fue tu experiencia..." style="margin-bottom:10px"></textarea>
        <button class="btn btn-primary btn-sm" id="btn-calificar-${cita.id_cita}" onclick="enviarCalificacion('${cita.id_cita}','${cita.id_consultorio}',this)">
          ${ic('star',13)} Enviar calificación
        </button>
      </div>` : (cita.estado==='completada'&&yaCalificada ? `
      <div style="display:flex;align-items:center;gap:6px;margin-top:8px;font-size:12px;color:#00876A">
        ${ic('check',14)} Ya calificaste esta atención
      </div>` : '');
    return `<div class="card"><div class="card-body" style="display:flex;gap:14px;align-items:flex-start">
      <div class="spec-avatar" style="width:44px;height:44px;font-size:14px;flex-shrink:0">${cons?.iniciales||'?'}</div>
      <div style="flex:1">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;flex-wrap:wrap">
          <div><div style="font-weight:700">${cons?.nombre_profesional||cita.nombre_consultorio}</div>
          <div style="font-size:13px;color:var(--primary)">${cons?.especialidad_principal||''}</div></div>
          <span class="badge ${bm[cita.estado]||'badge-gray'}">${lm[cita.estado]||cita.estado}</span>
        </div>
        <div class="info-row" style="margin-top:7px">${ic('calendar',13)} ${DB.formatFecha(cita.fecha_solicitada)} a las ${cita.hora_solicitada||'—'}</div>
        <div class="info-row">${ic('list',13)} ${cita.motivo}</div>
        ${cita.notas_consultorio?`<div class="alert alert-info" style="margin-top:6px"><div class="alert-icon">${ic('info',14)}</div><div class="alert-body">${cita.notas_consultorio}</div></div>`:''}
        ${reviewBlock}
        <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">
          ${cita.estado==='confirmada'&&cons?`<button class="btn btn-wa btn-sm" onclick="App.sendWhatsAppCita(DB.getConsultorioById('${cita.id_consultorio}'),DB.citas.find(c=>c.id_cita==='${cita.id_cita}'))">${ic('wa',13)} Confirmar WA</button>`:''}
          ${(cita.estado==='pendiente'||cita.estado==='confirmada')?`<button class="btn btn-danger btn-sm" onclick="showModal('confirm-cancelar',{id:'${cita.id_cita}'})">Cancelar</button>`:''}
          ${cons?`<button class="btn btn-ghost btn-sm" onclick="App.navigate('detalle-consultorio',{id:'${cons.id_consultorio}'})">Ver consultorio</button>`:''}
        </div>
      </div>
    </div></div>`;
  }).join('')}</div>`;
};

window.enviarCalificacion=function(citaId,consId,btn){
  const rating=parseInt(document.getElementById('rating-'+citaId)?.value)||0;
  const comentario=document.getElementById('comentario-'+citaId)?.value?.trim()||'';
  if(!rating){App.showToast('Selecciona una calificación (1-5 estrellas)','error');return;}
  btnLoad(btn,true);
  setTimeout(()=>{
    const user=App.getUser();
    DB.addCalificacion({id_cita:citaId,id_consultorio:consId,id_paciente:user?.id,nombre_paciente:user?.nombre||'Paciente',calificacion:rating,comentario,fecha:new Date().toISOString().split('T')[0]});
    btnLoad(btn,false);
    App.showToast('Gracias por tu calificación','success');
    filterMC('completada');
  },600);
};

// ══════════════════════════════════════════════════════
// PERFIL PACIENTE
// ══════════════════════════════════════════════════════
function renderPerfilPaciente() {
  const user=App.getUser();
  const misCitas=DB.citas.filter(c=>c.id_paciente===user?.id||c.email_paciente===user?.email);
  return `<div class="page" style="max-width:700px">
    <div class="section-header"><div class="section-title">Mi Perfil</div></div>
    <div class="card" style="margin-bottom:16px"><div class="card-body">
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:18px">
        <div class="user-avatar" style="width:60px;height:60px;font-size:20px;font-weight:700">${user?.avatar||'?'}</div>
        <div><div style="font-size:19px;font-weight:800">${user?.nombre}</div><div style="font-size:13px;color:var(--text3)">Paciente · Desde ${DB.formatFecha(user?.fechaRegistro)}</div></div>
      </div>
      <div class="form-group"><label class="form-label">Nombre completo</label><input class="form-control" id="pf-nombre" value="${user?.nombre||''}"></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Correo (no editable)</label><input class="form-control" value="${user?.email||''}" disabled style="opacity:.6"></div>
        <div class="form-group"><label class="form-label">Teléfono / WhatsApp</label><input class="form-control" id="pf-tel" value="${user?.telefono||''}"></div>
      </div>
      <div class="form-group"><label class="form-label">Nueva contraseña <span style="font-size:11px;color:var(--text3)">(dejar vacío para no cambiar)</span></label><input class="form-control" type="password" id="pf-pass" placeholder="Nueva contraseña"></div>
      <button class="btn btn-primary" id="btn-guardar-perfil" onclick="guardarPerfil(this)">${ic('check',14)} Guardar cambios</button>
    </div></div>
    <div class="card"><div class="table-title">Historial de citas <span style="font-size:12px;color:var(--text3);font-weight:400">${misCitas.length} registros</span></div>
      ${misCitas.length===0?`<div class="card-body" style="text-align:center;color:var(--text3);padding:26px">Sin citas registradas</div>`:`
      <table class="data-table"><thead><tr><th>Consultorio</th><th>Fecha</th><th>Estado</th></tr></thead><tbody>
        ${misCitas.map(c=>{const bm={pendiente:'badge-orange',confirmada:'badge-green',completada:'badge-blue',cancelada:'badge-gray'};return`<tr>
          <td><strong>${c.nombre_consultorio}</strong></td>
          <td>${DB.formatFecha(c.fecha_solicitada)} ${c.hora_solicitada||''}</td>
          <td><span class="badge ${bm[c.estado]||'badge-gray'}">${c.estado}</span></td>
        </tr>`;}).join('')}
      </tbody></table>`}
    </div>
  </div>`;
}
window.guardarPerfil=function(btn){
  const user=App.getUser(); if(!user) return;
  btnLoad(btn,true);
  setTimeout(()=>{
    const nombre=document.getElementById('pf-nombre')?.value?.trim();
    const tel=document.getElementById('pf-tel')?.value?.trim();
    const pass=document.getElementById('pf-pass')?.value;
    if(nombre) user.nombre=nombre;
    if(tel) user.telefono=tel;
    if(pass&&pass.length>=6) user.password=pass;
    btnLoad(btn,false);
    App.showToast('Perfil actualizado','success');
    App.renderNav();
  },500);
};

// ══════════════════════════════════════════════════════
// DASHBOARD CONSULTORIO
// ══════════════════════════════════════════════════════
function renderDashConsultorio() {
  const user=App.getUser();
  const cons=DB.consultorios.find(c=>c.id_consultorio===user?.id_consultorio)||DB.consultorios[0];
  const stats=DB.getStatsCons(cons.id_consultorio);
  const pendientes=DB.citas.filter(c=>c.id_consultorio===cons.id_consultorio&&c.estado==='pendiente');
  return `<div class="page"><div class="sidebar-layout">
    ${renderConsSidebar('perfil')}
    <div>
      <div class="section-header"><div><div class="section-title">Mi Consultorio</div><div class="section-sub">${cons.nombre_consultorio}</div></div>
        ${cons.pagado?`<span class="badge badge-green">${ic('check',11)} Plan activo</span>`:`<span class="badge badge-orange">${ic('warn',11)} Sin plan</span>`}
      </div>
      ${!cons.pagado?`<div class="alert alert-warning"><div class="alert-icon">${ic('lock',15)}</div><div class="alert-body"><div class="alert-title">Consultorio no visible en el directorio</div>Activa tu plan para aparecer en búsquedas.<button class="btn btn-sm btn-primary" style="margin-top:8px" onclick="App.navigate('pasarela-pago',{consId:'${cons.id_consultorio}'})">${ic('credit',13)} Activar plan</button></div></div>`:''}
      ${pendientes.length>0?`<div class="alert alert-warning"><div class="alert-icon">${ic('bell',15)}</div><div class="alert-body"><div class="alert-title">${pendientes.length} solicitud(es) pendiente(s)</div><button class="btn btn-sm btn-primary" style="margin-top:8px" onclick="App.navigate('bandeja')">Ir a bandeja</button></div></div>`:''}
      <div class="card" style="margin-bottom:14px"><div class="card-body">
        <div style="display:flex;gap:14px;align-items:flex-start;flex-wrap:wrap">
          <div class="spec-avatar" style="width:58px;height:58px;font-size:19px;flex-shrink:0">${cons.iniciales}</div>
          <div style="flex:1">
            <div style="font-size:17px;font-weight:800;margin-bottom:2px">${cons.nombre_profesional}</div>
            <div style="font-size:14px;color:var(--primary);font-weight:600;margin-bottom:3px">${cons.especialidad_principal}</div>
            <div style="font-size:13px;color:var(--text3);margin-bottom:9px">${cons.barrio||'—'}, ${cons.municipio}</div>
            <div style="display:flex;gap:7px;flex-wrap:wrap">
              <button class="btn btn-primary btn-sm" id="btn-editar-cons" onclick="openEditConsultorio('${cons.id_consultorio}')">${ic('edit',13)} Editar perfil</button>
              ${cons.pagado?`<button class="btn btn-ghost btn-sm" onclick="App.navigate('detalle-consultorio',{id:'${cons.id_consultorio}'})">${ic('eye',13)} Ver público</button>`:''}
              <button class="btn btn-ghost btn-sm" onclick="App.navigate('galeria')">${ic('image',13)} Galería</button>
            </div>
          </div>
        </div>
      </div></div>
      <div class="stat-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:14px">
        <div class="stat-card"><div class="stat-icon orange">${ic('clock',20)}</div><div><div class="stat-val">${stats.pendientes}</div><div class="stat-lbl">Pendientes</div></div></div>
        <div class="stat-card"><div class="stat-icon green">${ic('check',20)}</div><div><div class="stat-val">${stats.confirmadas}</div><div class="stat-lbl">Confirmadas</div></div></div>
        <div class="stat-card"><div class="stat-icon blue">${ic('chart',20)}</div><div><div class="stat-val">${stats.citas_mes}</div><div class="stat-lbl">Total citas</div></div></div>
      </div>
      <div class="card" style="margin-bottom:12px"><div class="table-title">Servicios <button class="btn btn-primary btn-sm" onclick="App.navigate('servicios-esp')">Gestionar</button></div>
        <div class="card-body">${DB.servicios.filter(s=>(cons.servicios_ids||[]).includes(s.id)).map(s=>`
          <div style="display:flex;align-items:center;justify-content:space-between;padding:7px 0;border-bottom:1px solid var(--border)">
            <div><div style="font-weight:600;font-size:13px">${s.nombre}</div><div style="font-size:12px;color:var(--text3)">${s.duracion} min</div></div>
            <span class="price-tag">${DB.formatPrecio(s.precio)}</span>
          </div>`).join('')||`<div style="color:var(--text3);font-size:13px">Sin servicios. <button class="btn btn-ghost btn-sm" onclick="App.navigate('servicios-esp')">Agregar</button></div>`}
        </div>
      </div>
      <div class="card"><div class="table-title">Etiquetas <button class="btn btn-primary btn-sm" onclick="App.navigate('servicios-esp')">Gestionar</button></div>
        <div class="card-body"><div class="tag-list">${DB.getTagsByIds(cons.tags_ids||[]).map(t=>`<span class="tag tag-${t.estilo}" ${t.colorCustom?`style="background:${t.colorCustom}18;color:${t.colorCustom};border-color:${t.colorCustom}44"`:''}>
          ${t.nombre}</span>`).join('')||`<span style="color:var(--text3);font-size:13px">Sin etiquetas</span>`}</div></div>
      </div>
    </div>
  </div></div>`;
}
function initDashCons(){}

function renderConsSidebar(active) {
  const user=App.getUser();
  const cons=DB.consultorios.find(c=>c.id_consultorio===user?.id_consultorio)||DB.consultorios[0];
  const pend=DB.citas.filter(c=>c.id_consultorio===cons?.id_consultorio&&c.estado==='pendiente').length;
  const items=[
    {id:'perfil',     icon:'home',        label:'Mi consultorio',   page:'dashboard-consultorio'},
    {id:'bandeja',    icon:'inbox',        label:'Bandeja',          page:'bandeja'},
    {id:'agenda',     icon:'calendar',     label:'Agenda',           page:'agenda'},
    {id:'servicios',  icon:'stethoscope',  label:'Servicios y tags', page:'servicios-esp'},
    {id:'estadisticas',icon:'chart',       label:'Estadísticas',     page:'estadisticas'},
    {id:'galeria',    icon:'image',        label:'Galería',          page:'galeria'},
  ];
  return `<div class="sidebar">
    <div class="sidebar-title">Consultorio</div>
    ${items.map(it=>`<button class="sidebar-item ${active===it.id?'active':''}" onclick="App.navigate('${it.page}')">
      ${ic(it.icon,16)} ${it.label}${it.id==='bandeja'&&pend>0?`<span class="sidebar-badge">${pend}</span>`:''}
    </button>`).join('')}
    <hr class="divider">
    ${cons?.pagado?`<button class="sidebar-item" onclick="App.navigate('detalle-consultorio',{id:'${cons?.id_consultorio||''}'})">${ic('eye',15)} Ver perfil público</button>`:''}
    ${!cons?.pagado?`<button class="sidebar-item" style="color:var(--primary)" onclick="App.navigate('pasarela-pago',{consId:'${cons?.id_consultorio}'})">${ic('credit',15)} Activar plan</button>`:''}
  </div>`;
}

// ══════════════════════════════════════════════════════
// BANDEJA
// ══════════════════════════════════════════════════════
function renderBandeja(){
  return `<div class="page"><div class="sidebar-layout">${renderConsSidebar('bandeja')}
    <div>
      <div class="section-header"><div><div class="section-title">Bandeja de entrada</div></div></div>
      <div class="filter-bar">
        <input type="text" id="b-texto" placeholder="Buscar paciente..." oninput="filterBandeja()" style="flex:1">
        <select id="b-estado" onchange="filterBandeja()"><option value="">Todos</option><option value="pendiente">Pendiente</option><option value="confirmada">Confirmada</option><option value="cancelada">Cancelada</option><option value="completada">Completada</option></select>
        <input type="date" id="b-fecha" onchange="filterBandeja()">
        <button class="btn btn-ghost btn-sm" onclick="clearBandeja()">Limpiar</button>
      </div>
      <div class="tabs" id="tabs-b">
        <button class="tab active" onclick="setTabB('todas',this)">Todas</button>
        <button class="tab" onclick="setTabB('pendiente',this)">Pendientes</button>
        <button class="tab" onclick="setTabB('confirmada',this)">Confirmadas</button>
        <button class="tab" onclick="setTabB('cancelada',this)">Canceladas</button>
      </div>
      <div class="table-wrap">
        <table class="data-table"><thead><tr><th>Paciente</th><th>Fecha</th><th>Motivo</th><th>Estado</th><th>Acciones</th></tr></thead>
        <tbody id="bandeja-body"></tbody></table>
        <div id="bandeja-empty" style="display:none;padding:30px;text-align:center;color:var(--text3)">Sin solicitudes</div>
      </div>
    </div>
  </div></div>`;
}
let _bTab='todas';
function initBandeja(){ renderBandejaRows(); }
window.setTabB=function(e,btn){_bTab=e;document.querySelectorAll('#tabs-b .tab').forEach(t=>t.classList.remove('active'));if(btn)btn.classList.add('active');filterBandeja();};
window.filterBandeja=function(){renderBandejaRows();};
window.clearBandeja=function(){['b-texto','b-estado','b-fecha'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});renderBandejaRows();};

function renderBandejaRows(){
  const user=App.getUser();
  const cons=DB.consultorios.find(c=>c.id_consultorio===user?.id_consultorio)||DB.consultorios[0];
  const texto=document.getElementById('b-texto')?.value?.toLowerCase()||'';
  const estFilter=document.getElementById('b-estado')?.value||'';
  const fecha=document.getElementById('b-fecha')?.value||'';
  let lista=DB.citas.filter(c=>c.id_consultorio===cons.id_consultorio);
  if(_bTab!=='todas') lista=lista.filter(c=>c.estado===_bTab);
  if(estFilter) lista=lista.filter(c=>c.estado===estFilter);
  if(texto) lista=lista.filter(c=>c.nombre_paciente.toLowerCase().includes(texto)||c.motivo.toLowerCase().includes(texto));
  if(fecha) lista=lista.filter(c=>c.fecha_solicitada===fecha);
  const tbody=document.getElementById('bandeja-body'),empty=document.getElementById('bandeja-empty');
  if(!tbody) return;
  const bm={pendiente:'badge-orange',confirmada:'badge-green',completada:'badge-blue',cancelada:'badge-gray'};
  if(lista.length===0){tbody.innerHTML='';if(empty)empty.style.display='';return;}
  if(empty) empty.style.display='none';
  tbody.innerHTML=lista.sort((a,b)=>b.fecha_creacion>a.fecha_creacion?1:-1).map(cita=>`<tr>
    <td style="text-align:left"><strong>${cita.nombre_paciente}</strong><br><span style="font-size:11px;color:var(--text3)">${ic('phone',11)} ${cita.telefono_paciente}</span></td>
    <td style="text-align:left">${DB.formatFecha(cita.fecha_solicitada)}<br><span style="font-size:11px;color:var(--text3)">${cita.hora_solicitada||'—'}</span></td>
    <td style="font-size:12px;color:var(--text2);max-width:150px;text-align:left">${cita.motivo}</td>
    <td style="text-align:left"><span class="badge ${bm[cita.estado]||'badge-gray'}">${cita.estado}</span></td>
    <td><div class="actions">
      ${cita.estado==='pendiente'?`<button class="btn btn-sm btn-success" id="btn-apr-${cita.id_cita}" onclick="gestionarCita('${cita.id_cita}','confirmada',this)">${ic('check',12)} Aprobar</button>
        <button class="btn btn-sm btn-danger" onclick="showModal('confirm-rechazar',{id:'${cita.id_cita}'})">${ic('x',12)} Cancelar</button>`:''}
      ${cita.estado==='confirmada'?`<button class="btn btn-sm btn-outline" id="btn-comp-${cita.id_cita}" onclick="gestionarCita('${cita.id_cita}','completada',this)">Completar</button>`:''}
      ${cita.telefono_paciente?`<button class="btn btn-sm btn-wa" onclick="App.openWhatsApp('${cita.telefono_paciente}','Hola ${cita.nombre_paciente}, te contactamos desde ${cons.nombre_consultorio}.')">${ic('wa',12)}</button>`:''}
    </div></td>
  </tr>`).join('');
}
window.gestionarCita=function(id,estado,btn){
  if(btn) btnLoad(btn,true);
  setTimeout(()=>{
    DB.updateCitaEstado(id,estado);
    renderBandejaRows();
    App.showToast({confirmada:'Cita aprobada',completada:'Marcada como completada',cancelada:'Cancelada'}[estado]||'Actualizado','success');
  },500);
};

// ══════════════════════════════════════════════════════
// AGENDA
// ══════════════════════════════════════════════════════
function renderAgenda(){
  return `<div class="page"><div class="sidebar-layout">${renderConsSidebar('agenda')}
    <div>
      <div class="section-header"><div><div class="section-title">Agenda</div></div><button class="btn btn-primary" onclick="openModalCitaConsultorio()">${ic('plus',14)} Nueva cita</button></div>
      <div style="display:grid;grid-template-columns:280px 1fr;gap:16px;align-items:start">
        <div class="card"><div class="card-body">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <button class="btn btn-ghost btn-sm" onclick="calNav(-1)">${ic('arrow_l',14)}</button>
            <div style="font-weight:700;font-size:13px" id="cal-title"></div>
            <button class="btn btn-ghost btn-sm" onclick="calNav(1)">${ic('arrow_r',14)}</button>
          </div>
          <button class="btn btn-ghost btn-sm btn-block" style="margin-bottom:8px" onclick="calToday()">Hoy</button>
          <div id="cal-grid" style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;text-align:center"></div>
        </div></div>
        <div><div style="font-weight:700;margin-bottom:10px;font-size:14px" id="agenda-fecha-title">Citas del día</div><div id="agenda-citas-dia"></div></div>
      </div>
    </div>
  </div></div>`;
}
function initAgenda(){const t=new Date();window._calDate={year:t.getFullYear(),month:t.getMonth(),day:t.getDate()};renderCalendar();renderCitasDia(t.getFullYear(),t.getMonth()+1,t.getDate());}
window.calNav=function(d){window._calDate.month+=d;if(window._calDate.month<0){window._calDate.month=11;window._calDate.year--;}if(window._calDate.month>11){window._calDate.month=0;window._calDate.year++;}renderCalendar();};
window.calToday=function(){const t=new Date();window._calDate={year:t.getFullYear(),month:t.getMonth(),day:t.getDate()};renderCalendar();renderCitasDia(t.getFullYear(),t.getMonth()+1,t.getDate());};
function renderCalendar(){
  const{year,month,day}=window._calDate;
  const user=App.getUser();const cons=DB.consultorios.find(c=>c.id_consultorio===user?.id_consultorio)||DB.consultorios[0];
  const meses=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const title=document.getElementById('cal-title');const grid=document.getElementById('cal-grid');if(!title||!grid)return;
  title.textContent=`${meses[month]} ${year}`;
  const dias=['D','L','M','X','J','V','S'];const first=new Date(year,month,1).getDay();const daysIn=new Date(year,month+1,0).getDate();const today=new Date();
  let html=dias.map(d=>`<div style="font-size:10px;font-weight:700;color:var(--text3);padding:3px 0">${d}</div>`).join('');
  for(let i=0;i<first;i++) html+='<div></div>';
  for(let d=1;d<=daysIn;d++){
    const ds=`${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const has=DB.citas.some(c=>c.id_consultorio===cons.id_consultorio&&c.fecha_solicitada===ds&&c.estado!=='cancelada');
    const isToday=d===today.getDate()&&month===today.getMonth()&&year===today.getFullYear();
    const isSel=d===day&&month===window._calDate.month&&year===window._calDate.year;
    html+=`<div onclick="renderCitasDia(${year},${month+1},${d})" style="padding:5px 2px;font-size:12px;cursor:pointer;border-radius:5px;text-align:center;position:relative;${isSel?'background:var(--primary);color:#fff;font-weight:700;':isToday?'border:2px solid var(--primary);font-weight:700;':''}">${d}${has?`<div style="width:4px;height:4px;border-radius:50%;background:${isSel?'#fff':'var(--accent)'};margin:1px auto 0"></div>`:'<div style="height:5px"></div>'}</div>`;
  }
  grid.innerHTML=html;
}
window.renderCitasDia=function(year,month,day){
  window._calDate={...(window._calDate||{}),year,month:month-1,day};renderCalendar();
  const ds=`${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
  const user=App.getUser();const cons=DB.consultorios.find(c=>c.id_consultorio===user?.id_consultorio)||DB.consultorios[0];
  const citasH=DB.citas.filter(c=>c.id_consultorio===cons.id_consultorio&&c.fecha_solicitada===ds);
  const title=document.getElementById('agenda-fecha-title');const cont=document.getElementById('agenda-citas-dia');if(!title||!cont)return;
  const meses=['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  title.textContent=`Citas del ${day} de ${meses[month-1]} ${year}`;
  if(citasH.length===0){cont.innerHTML=`<div class="empty-state"><div class="empty-icon">${ic('calendar',40)}</div><div class="empty-title">Sin citas este día</div><div class="empty-sub"><button class="btn btn-primary btn-sm" onclick="openModalCitaConsultorio()" style="margin-top:8px">Crear cita</button></div></div>`;return;}
  const bm={pendiente:'badge-orange',confirmada:'badge-green',completada:'badge-blue',cancelada:'badge-gray'};
  cont.innerHTML=`<div style="display:flex;flex-direction:column;gap:8px">${citasH.sort((a,b)=>a.hora_solicitada>b.hora_solicitada?1:-1).map(c=>`
    <div class="card"><div class="card-body" style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px 14px">
      <div><div style="font-weight:700">${c.hora_solicitada||'—'} — ${c.nombre_paciente}</div>
        <div style="font-size:12px;color:var(--text2)">${c.motivo}</div>
        <div style="font-size:12px;color:var(--text3)">${ic('phone',11)} ${c.telefono_paciente}</div></div>
      <div style="display:flex;gap:6px;align-items:center">
        <span class="badge ${bm[c.estado]||'badge-gray'}">${c.estado}</span>
        ${c.estado==='pendiente'?`<button class="btn btn-sm btn-success" id="btn-ap-${c.id_cita}" onclick="gestionarCita('${c.id_cita}','confirmada',this);renderCitasDia(${year},${month},${day})">${ic('check',12)} Aprobar</button>`:''}
      </div>
    </div></div>`).join('')}</div>`;
};

// ══════════════════════════════════════════════════════
// SERVICIOS — sin pestaña especialidades para consultorio
// ══════════════════════════════════════════════════════
function renderServiciosEsp(){
  const user=App.getUser();const cons=DB.consultorios.find(c=>c.id_consultorio===user?.id_consultorio)||DB.consultorios[0];
  return `<div class="page"><div class="sidebar-layout">${renderConsSidebar('servicios')}
    <div>
      <div class="tabs" id="tabs-sv">
        <button class="tab active" onclick="showSvTab('servicios',this)">Mis Servicios</button>
        <button class="tab" onclick="showSvTab('tags',this)">Etiquetas</button>
      </div>
      <!-- SERVICIOS -->
      <div id="tab-servicios">
        <div class="section-header"><div class="section-title" style="font-size:16px">Servicios del consultorio</div>
          <button class="btn btn-primary btn-sm" onclick="openModalNuevoServicio('${cons.id_consultorio}')">${ic('plus',13)} Nuevo servicio</button>
        </div>
        <div class="form-group" style="margin-bottom:16px">
          <label class="form-label">Especialidad principal del consultorio</label>
          <select class="form-control" id="esp-principal-select" style="max-width:320px" onchange="cambiarEspPrincipal('${cons.id_consultorio}',this.value)">
            ${DB.especialidades.map(e=>`<option value="${e.nombre}" ${e.nombre===cons.especialidad_principal?'selected':''}>${e.nombre}</option>`).join('')}
          </select>
          <div class="form-hint">Solo puedes seleccionar entre las especialidades disponibles. La gestión de especialidades es exclusiva del administrador.</div>
        </div>
        <div class="table-wrap" style="margin-bottom:18px">
          <table class="data-table"><thead><tr><th>Servicio</th><th>Precio</th><th>Duración</th><th>Acciones</th></tr></thead>
          <tbody>${DB.servicios.filter(s=>(cons.servicios_ids||[]).includes(s.id)).map(s=>`<tr>
            <td><strong>${s.nombre}</strong><br><span style="font-size:11px;color:var(--text3)">${s.descripcion}</span></td>
            <td><span class="price-tag">${DB.formatPrecio(s.precio)}</span></td>
            <td>${s.duracion} min</td>
            <td><div class="actions"><button class="btn btn-sm btn-danger" onclick="quitarServicio('${cons.id_consultorio}','${s.id}')">${ic('trash',12)} Quitar</button></div></td>
          </tr>`).join('')||`<tr><td colspan="4" style="text-align:center;color:var(--text3);padding:18px">Sin servicios registrados</td></tr>`}
          </tbody></table>
        </div>
        <div style="font-weight:700;font-size:13px;margin-bottom:10px">Disponibles para agregar</div>
        <div class="grid-3">${DB.servicios.filter(s=>!(cons.servicios_ids||[]).includes(s.id)).map(s=>`
          <div class="card card-hover" style="padding:13px" onclick="agregarServicio('${cons.id_consultorio}','${s.id}')">
            <div style="font-weight:600;font-size:13px;margin-bottom:3px">${s.nombre}</div>
            <div style="font-size:12px;color:var(--text3)">${DB.formatPrecio(s.precio)} · ${s.duracion} min</div>
            <button class="btn btn-primary btn-sm" style="margin-top:7px">${ic('plus',12)} Agregar</button>
          </div>`).join('')||'<div style="color:var(--text3);font-size:13px">Todos los servicios ya están agregados.</div>'}
        </div>
      </div>
      <!-- TAGS -->
      <div id="tab-tags" style="display:none">
        <div class="section-header"><div class="section-title" style="font-size:16px">Etiquetas</div>
          <button class="btn btn-primary btn-sm" onclick="openModalNuevoTag('${cons.id_consultorio}')">${ic('plus',13)} Nueva etiqueta</button>
        </div>
        <div style="margin-bottom:18px">
          <div style="font-weight:600;font-size:13px;margin-bottom:8px">Etiquetas activas</div>
          <div class="tag-list">
            ${DB.getTagsByIds(cons.tags_ids||[]).map(t=>`<div style="display:flex;align-items:center;gap:4px">
              <span class="tag tag-${t.estilo}" ${t.colorCustom?`style="background:${t.colorCustom}18;color:${t.colorCustom};border-color:${t.colorCustom}44"`:''}>
                ${t.nombre}</span>
              <button onclick="quitarTag('${cons.id_consultorio}','${t.id}')" style="border:none;background:none;cursor:pointer;color:var(--text3);display:flex;padding:2px">${ic('x',11)}</button>
            </div>`).join('')||'<span style="color:var(--text3);font-size:13px">Sin etiquetas</span>'}
          </div>
        </div>
        <div style="font-weight:600;font-size:13px;margin-bottom:8px">Disponibles</div>
        <div class="tag-list">${DB.tags.filter(t=>!(cons.tags_ids||[]).includes(t.id)).map(t=>`
          <span class="tag tag-${t.estilo}" style="cursor:pointer;${t.colorCustom?`background:${t.colorCustom}18;color:${t.colorCustom};border-color:${t.colorCustom}44`:''}" onclick="agregarTag('${cons.id_consultorio}','${t.id}')" title="Clic para agregar">+ ${t.nombre}</span>`).join('')}
        </div>
      </div>
    </div>
  </div></div>`;
}
window.showSvTab=function(tab,btn){['servicios','tags'].forEach(t=>{document.getElementById(`tab-${t}`).style.display=t===tab?'':'none';});document.querySelectorAll('#tabs-sv .tab').forEach(t=>t.classList.remove('active'));if(btn)btn.classList.add('active');};
window.cambiarEspPrincipal=function(consId,esp){const c=DB.getConsultorioById(consId);if(c){c.especialidad_principal=esp;App.showToast('Especialidad actualizada','success');}};
window.agregarServicio=function(consId,sId){const c=DB.getConsultorioById(consId);if(!c.servicios_ids)c.servicios_ids=[];if(!c.servicios_ids.includes(sId)){c.servicios_ids.push(sId);App.showToast('Servicio agregado','success');App.navigate('servicios-esp');}};
window.quitarServicio=function(consId,sId){const c=DB.getConsultorioById(consId);c.servicios_ids=(c.servicios_ids||[]).filter(id=>id!==sId);App.showToast('Servicio eliminado','info');App.navigate('servicios-esp');};
window.agregarTag=function(consId,tId){const c=DB.getConsultorioById(consId);if(!c.tags_ids)c.tags_ids=[];if(!c.tags_ids.includes(tId)){c.tags_ids.push(tId);App.showToast('Etiqueta agregada','success');App.navigate('servicios-esp');setTimeout(()=>showSvTab('tags'),100);}};
window.quitarTag=function(consId,tId){const c=DB.getConsultorioById(consId);c.tags_ids=(c.tags_ids||[]).filter(id=>id!==tId);App.showToast('Etiqueta removida','info');App.navigate('servicios-esp');setTimeout(()=>showSvTab('tags'),100);};

// ══════════════════════════════════════════════════════
// ESTADÍSTICAS (donut)
// ══════════════════════════════════════════════════════
function renderEstadisticas(){
  const user=App.getUser();const cons=DB.consultorios.find(c=>c.id_consultorio===user?.id_consultorio)||DB.consultorios[0];
  const stats=DB.getStatsCons(cons.id_consultorio);
  const total=stats.citas_mes||1;
  const slices=[{label:'Completadas',val:stats.completadas,color:'#00876A'},{label:'Confirmadas',val:stats.confirmadas,color:'#0070C0'},{label:'Pendientes',val:stats.pendientes,color:'#C05F00'},{label:'Canceladas',val:stats.canceladas,color:'#FF6B6B'}];
  const r=60,cx=80,cy=80,stroke=22,circ=2*Math.PI*r;
  let offset=0;
  const svgSlices=slices.map(s=>{const pct=s.val/total;const dash=circ*pct;const sl=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${s.color}" stroke-width="${stroke}" stroke-dasharray="${dash} ${circ-dash}" stroke-dashoffset="${-offset}" transform="rotate(-90 ${cx} ${cy})"/>`;offset+=dash;return sl;}).join('');
  return `<div class="page"><div class="sidebar-layout">${renderConsSidebar('estadisticas')}
    <div>
      <div class="section-header"><div class="section-title">Estadísticas</div><span class="badge badge-blue">Tiempo real</span></div>
      <div class="stat-grid">
        <div class="stat-card"><div class="stat-icon blue">${ic('list',20)}</div><div><div class="stat-val">${stats.citas_mes}</div><div class="stat-lbl">Total citas</div></div></div>
        <div class="stat-card"><div class="stat-icon green">${ic('check',20)}</div><div><div class="stat-val">${stats.completadas}</div><div class="stat-lbl">Completadas</div></div></div>
        <div class="stat-card"><div class="stat-icon orange">${ic('clock',20)}</div><div><div class="stat-val">${stats.pendientes}</div><div class="stat-lbl">Pendientes</div></div></div>
        <div class="stat-card"><div class="stat-icon red">${ic('x',20)}</div><div><div class="stat-val">${stats.canceladas}</div><div class="stat-lbl">Canceladas</div></div></div>
      </div>
      <div class="card"><div class="card-body">
        <div style="font-weight:700;margin-bottom:16px">Distribución por estado</div>
        ${stats.citas_mes===0?`<div style="text-align:center;color:var(--text3);padding:28px">${ic('chart',40)}<br><span style="font-size:13px;display:block;margin-top:8px">Sin datos todavía</span></div>`:`
        <div class="donut-wrap">
          <svg width="160" height="160" viewBox="0 0 160 160">
            <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--border)" stroke-width="${stroke}"/>
            ${svgSlices}
            <text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="central" font-size="14" font-weight="800" fill="var(--text)">${total}</text>
            <text x="${cx}" y="${cy+16}" text-anchor="middle" font-size="9" fill="var(--text3)">total</text>
          </svg>
          <div class="donut-legend">${slices.map(s=>`<div class="donut-legend-item">
            <div class="donut-dot" style="background:${s.color}"></div>
            <span style="flex:1">${s.label}</span><strong>${s.val}</strong>
            <span style="color:var(--text3);font-size:11px;width:36px;text-align:right">${Math.round(s.val/total*100)}%</span>
          </div>`).join('')}</div>
        </div>`}
      </div></div>
    </div>
  </div></div>`;
}

// ══════════════════════════════════════════════════════
// GALERÍA — file input real con preview
// ══════════════════════════════════════════════════════
function renderGaleria(){
  const user=App.getUser();const cons=DB.consultorios.find(c=>c.id_consultorio===user?.id_consultorio)||DB.consultorios[0];
  if(!cons.pagado) return renderPasarelaPago({consId:cons.id_consultorio,redirect:'galeria'});
  return `<div class="page"><div class="sidebar-layout">${renderConsSidebar('galeria')}
    <div>
      <div class="section-header"><div><div class="section-title">Galería e imágenes</div><div class="section-sub">Tarjeta profesional y galería del consultorio</div></div></div>
      <!-- Tarjeta profesional -->
      <div class="card" style="margin-bottom:14px">
        <div class="table-title">Tarjeta profesional</div>
        <div class="card-body">
          ${cons.tarjeta_profesional?`
            <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">
              <img src="${cons.tarjeta_profesional}" style="height:90px;border-radius:8px;border:1px solid var(--border);object-fit:cover" alt="Tarjeta profesional">
              <div>
                <div style="font-weight:600;font-size:13px;margin-bottom:4px">${ic('check',14)} Tarjeta cargada</div>
                <div style="display:flex;gap:8px;flex-wrap:wrap">
                  <label class="btn btn-outline btn-sm" style="cursor:pointer">
                    ${ic('upload',13)} Reemplazar
                    <input type="file" accept="image/*" style="display:none" onchange="previewTarjeta('${cons.id_consultorio}',this)">
                  </label>
                  <button class="btn btn-danger btn-sm" onclick="eliminarTarjeta('${cons.id_consultorio}')">${ic('trash',12)} Eliminar</button>
                </div>
              </div>
            </div>`:`
            <div id="tarjeta-preview-${cons.id_consultorio}">
              <div class="file-drop-zone">
                ${ic('upload',32,'file-drop-icon')}
                <div style="font-weight:600;margin-top:8px">Cargar tarjeta profesional</div>
                <div style="font-size:12px;margin-top:4px">Haz clic o arrastra una imagen (JPG, PNG, PDF)</div>
                <input type="file" accept="image/*" onchange="previewTarjeta('${cons.id_consultorio}',this)">
              </div>
            </div>`}
        </div>
      </div>
      <!-- Galería -->
      <div class="card">
        <div class="table-title">Galería del consultorio
          <label class="btn btn-primary btn-sm" style="cursor:pointer">
            ${ic('plus',13)} Agregar imagen
            <input type="file" accept="image/*" multiple style="display:none" onchange="previewGaleria('${cons.id_consultorio}',this)">
          </label>
        </div>
        <div class="card-body">
          <div id="galeria-grid-${cons.id_consultorio}">
            ${cons.galeria&&cons.galeria.length>0?`<div class="galeria-grid">${cons.galeria.map((url,i)=>`
              <div class="galeria-item">
                <img src="${url}" alt="Foto ${i+1}">
                <button class="galeria-del" onclick="eliminarFotoGaleria('${cons.id_consultorio}',${i})">${ic('trash',11)}</button>
              </div>`).join('')}</div>`:`
            <div class="file-drop-zone" style="border:2px dashed var(--border)">
              ${ic('image',36,'file-drop-icon')}
              <div style="font-weight:600;margin-top:8px">Sin imágenes</div>
              <div style="font-size:12px;margin-top:4px">Agrega fotos de tu consultorio para atraer más pacientes</div>
              <label class="btn btn-primary btn-sm" style="margin-top:10px;cursor:pointer">
                ${ic('upload',13)} Seleccionar imágenes
                <input type="file" accept="image/*" multiple style="display:none" onchange="previewGaleria('${cons.id_consultorio}',this)">
              </label>
            </div>`}
          </div>
        </div>
      </div>
    </div>
  </div></div>`;
}

window.previewTarjeta=function(consId,input){
  const file=input.files[0]; if(!file) return;
  const reader=new FileReader();
  reader.onload=function(e){
    const c=DB.getConsultorioById(consId);
    c.tarjeta_profesional=e.target.result;
    App.showToast('Tarjeta cargada correctamente','success');
    App.navigate('galeria');
  };
  reader.readAsDataURL(file);
};

window.eliminarTarjeta=function(consId){
  const c=DB.getConsultorioById(consId);c.tarjeta_profesional=null;
  App.showToast('Tarjeta eliminada','info');App.navigate('galeria');
};

window.previewGaleria=function(consId,input){
  const files=Array.from(input.files);if(!files.length) return;
  const c=DB.getConsultorioById(consId);if(!c.galeria)c.galeria=[];
  let loaded=0;
  files.forEach(file=>{
    const reader=new FileReader();
    reader.onload=function(e){
      c.galeria.push(e.target.result);
      loaded++;
      if(loaded===files.length){App.showToast(`${files.length} imagen(es) agregada(s)`,'success');App.navigate('galeria');}
    };
    reader.readAsDataURL(file);
  });
};

window.eliminarFotoGaleria=function(consId,idx){
  const c=DB.getConsultorioById(consId);c.galeria.splice(idx,1);
  App.showToast('Imagen eliminada','info');App.navigate('galeria');
};

// ══════════════════════════════════════════════════════
// PASARELA DE PAGO
// ══════════════════════════════════════════════════════
function renderPasarelaPago(params={}){
  const consId=params.consId;const cons=DB.getConsultorioById(consId)||DB.consultorios[0];
  return `<div class="page" style="max-width:540px">
    <div class="section-header"><div class="section-title">Activar plan MediCitas Pro</div></div>
    <div class="pasarela-card">
      <div class="pasarela-icon">${ic('credit',28)}</div>
      <div style="font-size:17px;font-weight:800;margin-bottom:3px">MediCitas Pro</div>
      <div style="font-size:13px;color:var(--text3);margin-bottom:18px">Consultorio: ${cons?.nombre_consultorio}</div>
      <div style="font-size:30px;font-weight:800;color:var(--text);margin-bottom:18px">$90.000<span style="font-size:13px;font-weight:500;color:var(--text3)">/mes</span></div>
      <div class="form-group"><label class="form-label">Número de tarjeta</label><input class="form-control" id="pg-card" placeholder="0000 0000 0000 0000" maxlength="19" oninput="formatCard(this)" style="font-family:monospace;letter-spacing:2px"></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Vencimiento</label><input class="form-control" id="pg-exp" placeholder="MM/AA" maxlength="5"></div>
        <div class="form-group"><label class="form-label">CVV</label><input class="form-control" id="pg-cvv" placeholder="***" maxlength="3" type="password"></div>
      </div>
      <div class="form-group"><label class="form-label">Nombre en la tarjeta</label><input class="form-control" id="pg-name" placeholder="Como aparece en la tarjeta"></div>
      <div style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:10px 12px;font-size:12px;color:var(--text3);margin-bottom:14px">${ic('info',13)} Entorno de prueba — No se realizan cargos reales.</div>
      <button class="btn btn-primary btn-lg btn-block" onclick="procesarPago('${consId}','${params.redirect||'dashboard-consultorio'}',this)" id="pg-btn">${ic('lock',15)} Pagar $90.000 — Activar plan</button>
      <button class="btn btn-ghost btn-sm btn-block" style="margin-top:8px" onclick="App.navigate('dashboard-consultorio')">Cancelar</button>
    </div>
  </div>`;
}
window.formatCard=function(el){let v=el.value.replace(/\D/g,'');let f='';for(let i=0;i<v.length&&i<16;i++){if(i>0&&i%4===0)f+=' ';f+=v[i];}el.value=f;};
window.procesarPago=function(consId,redirect,btn){
  const card=document.getElementById('pg-card')?.value;const name=document.getElementById('pg-name')?.value;
  if(!card||card.replace(/\s/g,'').length<12||!name){App.showToast('Completa los datos de la tarjeta','error');return;}
  btnLoad(btn,true);
  setTimeout(()=>{DB.marcarPagado(consId);App.showToast('Pago exitoso. Plan MediCitas Pro activado.','success');App.navigate(redirect||'dashboard-consultorio');},1800);
};

// ══════════════════════════════════════════════════════
// REGISTRO CONSULTORIO
// ══════════════════════════════════════════════════════
function renderRegistroConsultorio(){
  return `<div class="page" style="max-width:660px">
    <div class="section-header"><div><div class="section-title">Registrar mi consultorio</div><div class="section-sub">Crea tu perfil y activa tu visibilidad</div></div></div>
    <div class="card"><div class="card-body">
      <div class="alert alert-info"><div class="alert-icon">${ic('info',15)}</div><div class="alert-body">Después del registro podrás activar el plan MediCitas Pro ($90.000/mes) para aparecer en el directorio.</div></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Nombre del profesional <span class="req">*</span></label><input class="form-control" id="rc-nombre-prof" placeholder="Dr. Nombre Apellido"></div>
        <div class="form-group"><label class="form-label">Nombre del consultorio <span class="req">*</span></label><input class="form-control" id="rc-nombre-cons" placeholder="Consultorio Médico..."></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Especialidad <span class="req">*</span></label>
          <select class="form-control" id="rc-esp"><option value="">Selecciona...</option>${DB.especialidades.map(e=>`<option value="${e.nombre}">${e.nombre}</option>`).join('')}</select></div>
        <div class="form-group"><label class="form-label">Municipio</label>
          <select class="form-control" id="rc-municipio"><option>Bucaramanga</option><option>Floridablanca</option><option>Girón</option><option>Piedecuesta</option></select></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Teléfono / WhatsApp <span class="req">*</span></label><input class="form-control" id="rc-tel" placeholder="300 000 0000"></div>
        <div class="form-group"><label class="form-label">Correo electrónico <span class="req">*</span></label><input class="form-control" type="email" id="rc-email" placeholder="correo@ejemplo.com"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Contraseña <span class="req">*</span></label><input class="form-control" type="password" id="rc-pass" placeholder="Mínimo 6 caracteres"></div>
        <div class="form-group"><label class="form-label">Confirmar contraseña <span class="req">*</span></label><input class="form-control" type="password" id="rc-pass2" placeholder="Repetir"></div>
      </div>
      <div class="form-group"><label class="form-label">Barrio / Sector</label><input class="form-control" id="rc-barrio" placeholder="Ej: Cabecera del Llano"></div>
      <div class="form-group"><label class="form-label">Dirección</label><input class="form-control" id="rc-dir" placeholder="Cra 33 # 42-60"></div>
      <button class="btn btn-primary btn-lg btn-block" style="margin-top:8px" id="btn-reg-cons" onclick="registrarConsultorio(this)">${ic('plus',15)} Crear cuenta de consultorio</button>
    </div></div>
  </div>`;
}
window.registrarConsultorio=function(btn){
  const np=document.getElementById('rc-nombre-prof')?.value?.trim();
  const nc=document.getElementById('rc-nombre-cons')?.value?.trim();
  const esp=document.getElementById('rc-esp')?.value;
  const tel=document.getElementById('rc-tel')?.value?.trim();
  const email=document.getElementById('rc-email')?.value?.trim();
  const pass=document.getElementById('rc-pass')?.value;
  const pass2=document.getElementById('rc-pass2')?.value;
  if(!np||!nc||!esp||!tel||!email||!pass){App.showToast('Completa todos los campos obligatorios','error');return;}
  if(pass!==pass2){App.showToast('Las contraseñas no coinciden','error');return;}
  if(pass.length<6){App.showToast('Contraseña mínimo 6 caracteres','error');return;}
  if(DB.usuarios.find(u=>u.email===email)){App.showToast('Ya existe una cuenta con ese correo','error');return;}
  btnLoad(btn,true);
  setTimeout(()=>{
    const espObj=DB.especialidades.find(e=>e.nombre===esp);
    const cons=DB.addConsultorio({nombre_profesional:np,nombre_consultorio:nc,especialidad_principal:esp,especialidad_id:espObj?.id||1,municipio:document.getElementById('rc-municipio')?.value||'Bucaramanga',barrio:document.getElementById('rc-barrio')?.value?.trim()||'',direccion:document.getElementById('rc-dir')?.value?.trim()||'',telefono_contacto:tel,whatsapp:tel,email,horario_resumen:'Lun-Vie 8am-6pm',precio_min:50000,precio_max:100000,descripcion:'',foto_url:'',lat:7.1193,lng:-73.1227,calificacion:0,resenas:0});
    DB.addUser({nombre:np,email,password:pass,rol:'consultorio',telefono:tel,avatar:np.split(' ').filter(w=>w).map(w=>w[0]).join('').slice(0,2).toUpperCase(),id_consultorio:cons.id_consultorio});
    App.login(email,pass);
    App.showToast(`Bienvenido, ${np.split(' ')[0]}!`,'success');
    App.navigate('pasarela-pago',{consId:cons.id_consultorio});
  },600);
};

// ══════════════════════════════════════════════════════
// ADMIN PANEL
// ══════════════════════════════════════════════════════
function renderAdmin(){
  return `<div class="page">
    <div style="display:grid;grid-template-columns:220px 1fr;gap:18px;align-items:start">
      <div class="sidebar">
        <div class="sidebar-title">Administración</div>
        <button class="sidebar-item active" id="adm-btn-dashboard" onclick="adminTab('dashboard')">${ic('chart',16)} Dashboard</button>
        <button class="sidebar-item" id="adm-btn-consultorios" onclick="adminTab('consultorios')">${ic('stethoscope',16)} Consultorios</button>
        <button class="sidebar-item" id="adm-btn-usuarios" onclick="adminTab('usuarios')">${ic('user',16)} Usuarios</button>
        <button class="sidebar-item" id="adm-btn-planes" onclick="adminTab('planes')">${ic('credit',16)} Planes</button>
        <button class="sidebar-item" id="adm-btn-pagos" onclick="adminTab('pagos')">${ic('credit',16)} Pagos</button>
        <button class="sidebar-item" id="adm-btn-tags" onclick="adminTab('tags')">${ic('tag',16)} Etiquetas</button>
        <button class="sidebar-item" id="adm-btn-especialidades" onclick="adminTab('especialidades')">${ic('grid',16)} Especialidades</button>
        <hr class="divider">
        <button class="sidebar-item" onclick="App.navigate('home')">${ic('arrow_l',15)} Volver al sitio</button>
      </div>
      <div id="admin-content"></div>
    </div>
  </div>`;
}
function initAdmin(){ adminTab('dashboard'); }
window.adminTab=function(tab){
  document.querySelectorAll('[id^="adm-btn-"]').forEach(b=>b.classList.remove('active'));
  const btn=document.getElementById(`adm-btn-${tab}`);if(btn)btn.classList.add('active');
  const el=document.getElementById('admin-content');if(!el)return;
  switch(tab){
    case 'dashboard':     el.innerHTML=renderAdminDashboard();  break;
    case 'consultorios':  el.innerHTML=renderAdminCons();       break;
    case 'usuarios':      el.innerHTML=renderAdminUsuarios();   break;
    case 'planes':        el.innerHTML=renderAdminPlanes();     break;
    case 'pagos':         el.innerHTML=renderAdminPagos();      break;
    case 'tags':          el.innerHTML=renderAdminTags();       break;
    case 'especialidades':el.innerHTML=renderAdminEsp();        break;
  }
};

function renderAdminDashboard(){return `<div>
  <div class="section-header"><div class="section-title">Dashboard</div><span class="badge badge-blue">Tiempo real</span></div>
  <div class="stat-grid">
    <div class="stat-card"><div class="stat-icon blue">${ic('stethoscope',20)}</div><div><div class="stat-val">${DB.consultorios.length}</div><div class="stat-lbl">Consultorios</div></div></div>
    <div class="stat-card"><div class="stat-icon green">${ic('check',20)}</div><div><div class="stat-val">${DB.consultorios.filter(c=>c.pagado).length}</div><div class="stat-lbl">Con plan activo</div></div></div>
    <div class="stat-card"><div class="stat-icon orange">${ic('list',20)}</div><div><div class="stat-val">${DB.citas.length}</div><div class="stat-lbl">Citas totales</div></div></div>
    <div class="stat-card"><div class="stat-icon red">${ic('credit',20)}</div><div><div class="stat-val">${DB.formatPrecio(DB.consultorios.filter(c=>c.pagado).length*90000)}</div><div class="stat-lbl">MRR</div></div></div>
  </div>
  <div class="card"><div class="card-body"><div style="font-weight:700;margin-bottom:12px">Resumen</div>
    <div style="display:flex;flex-direction:column;gap:0">
      ${[['Consultorios con plan activo',`${DB.consultorios.filter(c=>c.pagado).length} / ${DB.consultorios.length}`],['Usuarios registrados',DB.usuarios.length],['Citas pendientes',DB.citas.filter(c=>c.estado==='pendiente').length],['Especialidades',DB.especialidades.length],['Etiquetas',DB.tags.length],['Calificaciones recibidas',DB.calificaciones.length]].map(([l,v])=>`
      <div style="display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid var(--border);font-size:13px"><span>${l}</span><strong>${v}</strong></div>`).join('')}
    </div>
  </div></div>
</div>`;}

function renderAdminCons(){return `<div>
  <div class="section-header"><div class="section-title" style="font-size:16px">Consultorios</div>
    <button class="btn btn-primary btn-sm" onclick="openModalNuevoConsultorio()">${ic('plus',13)} Nuevo</button>
  </div>
  <div class="filter-bar">
    <input type="text" id="ac-texto" placeholder="Buscar..." oninput="filterAdminCons()" style="flex:1">
    <select id="ac-pago" onchange="filterAdminCons()"><option value="">Todos</option><option value="true">Con plan</option><option value="false">Sin plan</option></select>
  </div>
  <div class="table-wrap"><table class="data-table"><thead><tr><th>Profesional</th><th>Especialidad</th><th>Municipio</th><th>Plan</th><th>Acciones</th></tr></thead>
  <tbody id="admin-cons-tbody">${renderAdminConsRows()}</tbody></table></div>
</div>`;}

function renderAdminConsRows(lista){const rows=lista||DB.consultorios;return rows.map(c=>`<tr>
  <td><strong>${c.nombre_profesional}</strong><br><span style="font-size:11px;color:var(--text3)">${c.nombre_consultorio}</span></td>
  <td style="font-size:13px">${c.especialidad_principal}</td>
  <td style="font-size:13px">${c.municipio}</td>
  <td>${c.pagado?`<span class="badge badge-green">${ic('check',11)} Pagado</span>`:`<span class="badge badge-gray">Sin pagar</span>`}</td>
  <td><div class="actions">
    <button class="btn btn-sm btn-outline" onclick="openEditConsultorio('${c.id_consultorio}')">${ic('edit',12)}</button>
    ${!c.pagado?`<button class="btn btn-sm btn-success" id="btn-pag-${c.id_consultorio}" onclick="adminMarcarPagado('${c.id_consultorio}',this)">${ic('check',12)} Marcar pagado</button>`:''}
    <button class="btn btn-sm btn-danger" onclick="eliminarConsultorioAdmin('${c.id_consultorio}')">${ic('trash',12)}</button>
  </div></td>
</tr>`).join('');}

window.filterAdminCons=function(){const texto=document.getElementById('ac-texto')?.value?.toLowerCase()||'';const pago=document.getElementById('ac-pago')?.value;let lista=DB.consultorios;if(texto)lista=lista.filter(c=>c.nombre_profesional.toLowerCase().includes(texto)||c.nombre_consultorio.toLowerCase().includes(texto));if(pago!==undefined&&pago!=='')lista=lista.filter(c=>String(c.pagado)===pago);const tb=document.getElementById('admin-cons-tbody');if(tb)tb.innerHTML=renderAdminConsRows(lista);};
window.adminMarcarPagado=function(id,btn){btnLoad(btn,true);setTimeout(()=>{DB.marcarPagado(id);adminTab('consultorios');App.showToast('Consultorio marcado como pagado','success');},500);};
window.eliminarConsultorioAdmin=function(id){if(!confirm('¿Eliminar este consultorio?'))return;const i=DB.consultorios.findIndex(c=>c.id_consultorio===id);if(i>-1)DB.consultorios.splice(i,1);adminTab('consultorios');App.showToast('Eliminado','info');};

function renderAdminUsuarios(){const rc={paciente:'badge-blue',consultorio:'badge-green',admin:'badge-red'};return `<div>
  <div class="section-header"><div class="section-title" style="font-size:16px">Usuarios</div><button class="btn btn-primary btn-sm" onclick="openModalNuevoUsuario()">${ic('plus',13)} Nuevo</button></div>
  <div class="filter-bar">
    <input type="text" id="au-texto" placeholder="Buscar..." oninput="filterAdminUsuarios()" style="flex:1">
    <select id="au-rol" onchange="filterAdminUsuarios()"><option value="">Todos los roles</option><option value="paciente">Paciente</option><option value="consultorio">Consultorio</option><option value="admin">Admin</option></select>
  </div>
  <div class="table-wrap"><table class="data-table"><thead><tr><th>Usuario</th><th>Email</th><th>Rol</th><th>Registro</th><th>Estado</th><th></th></tr></thead>
  <tbody id="admin-usuarios-tbody">${renderAdminUsuariosRows()}</tbody></table></div>
</div>`;}
function renderAdminUsuariosRows(lista){const rc={paciente:'badge-blue',consultorio:'badge-green',admin:'badge-red'};const rows=lista||DB.usuarios;return rows.map(u=>`<tr>
  <td><div style="display:flex;align-items:center;gap:8px"><div class="user-avatar" style="width:28px;height:28px;font-size:10px">${u.avatar}</div><strong>${u.nombre}</strong></div></td>
  <td style="font-size:12px">${u.email}</td>
  <td><span class="badge ${rc[u.rol]}">${u.rol}</span></td>
  <td style="font-size:12px">${DB.formatFecha(u.fechaRegistro)}</td>
  <td><span class="badge ${u.activo?'badge-green':'badge-gray'}">${u.activo?'Activo':'Inactivo'}</span></td>
  <td><button class="btn btn-sm btn-ghost" onclick="toggleUsuario(${u.id})">${u.activo?'Deshabilitar':'Habilitar'}</button></td>
</tr>`).join('');}
window.filterAdminUsuarios=function(){const texto=document.getElementById('au-texto')?.value?.toLowerCase()||'';const rol=document.getElementById('au-rol')?.value||'';let l=DB.usuarios;if(texto)l=l.filter(u=>u.nombre.toLowerCase().includes(texto)||u.email.toLowerCase().includes(texto));if(rol)l=l.filter(u=>u.rol===rol);const tb=document.getElementById('admin-usuarios-tbody');if(tb)tb.innerHTML=renderAdminUsuariosRows(l);};
window.toggleUsuario=function(id){const u=DB.usuarios.find(u=>u.id===id);if(u){u.activo=!u.activo;adminTab('usuarios');App.showToast(u.activo?'Usuario habilitado':'Deshabilitado','info');}};

function renderAdminPlanes(){return `<div>
  <div class="section-header"><div class="section-title" style="font-size:16px">Planes</div><button class="btn btn-primary btn-sm" onclick="openModalNuevoPlan()">${ic('plus',13)} Nuevo plan</button></div>
  <div id="planes-admin-grid">${renderPlanesAdminGrid()}</div>
  <div class="table-wrap" style="margin-top:18px"><div class="table-title">Suscripciones activas</div>
    <table class="data-table"><thead><tr><th>Consultorio</th><th>Plan</th><th>Inicio</th><th>Vencimiento (30 días)</th><th>Monto</th></tr></thead>
    <tbody>${DB.suscripciones.map(s=>`<tr>
      <td><strong>${s.nombre_consultorio}</strong></td><td><span class="badge badge-blue">${s.plan_nombre}</span></td>
      <td>${DB.formatFecha(s.fecha_inicio)}</td><td>${DB.formatFecha(s.fecha_fin)}</td><td><strong>${DB.formatPrecio(s.monto)}</strong></td>
    </tr>`).join('')}</tbody></table>
  </div>
</div>`;}
function renderPlanesAdminGrid(){return DB.planes.map(p=>`<div class="plan-card ${p.destacado?'featured':''}" style="margin-bottom:12px">
  ${p.destacado?`<div class="plan-badge">Plan único</div>`:''}
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
    <div style="font-size:17px;font-weight:800">${p.nombre}</div>
    <div style="display:flex;gap:6px">
      <button class="btn btn-sm btn-outline" onclick="openEditPlan('${p.id}')">${ic('edit',13)} Editar</button>
      <button class="btn btn-sm btn-danger" onclick="eliminarPlan('${p.id}')">${ic('trash',13)}</button>
    </div>
  </div>
  <div class="plan-price">${DB.formatPrecio(p.precio)}<span>/mes · ${p.duracion_dias||30} días</span></div>
  <p style="font-size:13px;color:var(--text3);margin:8px 0">${p.descripcion}</p>
  <div class="plan-features">${(p.features||[]).map(f=>`<div class="plan-feature">${ic('check',13)} ${f}</div>`).join('')}</div>
</div>`).join('');}
window.eliminarPlan=function(id){if(!confirm('¿Eliminar este plan?'))return;const i=DB.planes.findIndex(p=>p.id===id);if(i>-1)DB.planes.splice(i,1);adminTab('planes');App.showToast('Plan eliminado','info');};

function renderAdminPagos(){return `<div>
  <div class="section-header"><div class="section-title" style="font-size:16px">Historial de pagos</div></div>
  <div class="table-wrap"><table class="data-table"><thead><tr><th>Consultorio</th><th>Monto</th><th>Estado</th><th>Método</th><th>Fecha</th></tr></thead>
  <tbody>${DB.pagos.map(p=>`<tr>
    <td><strong>${p.nombre_consultorio}</strong></td><td><strong>${DB.formatPrecio(p.monto)}</strong></td>
    <td>${p.estado==='aprobado'?`<span class="badge badge-green">${ic('check',11)} Aprobado</span>`:p.estado==='pendiente'?`<span class="badge badge-orange">Pendiente</span>`:`<span class="badge badge-red">Rechazado</span>`}</td>
    <td style="font-size:12px">${p.metodo}</td><td style="font-size:12px">${p.fecha!=='—'?DB.formatFecha(p.fecha):'—'}</td>
  </tr>`).join('')}</tbody></table></div>
</div>`;}

function renderAdminTags(){return `<div>
  <div class="section-header"><div class="section-title" style="font-size:16px">Etiquetas</div><button class="btn btn-primary btn-sm" onclick="openModalNuevoTagAdmin()">${ic('plus',13)} Nueva</button></div>
  <div class="table-wrap"><table class="data-table"><thead><tr><th>Etiqueta</th><th>Estilo</th><th>Descripción</th><th></th></tr></thead>
  <tbody id="admin-tags-tbody">${renderAdminTagsRows()}</tbody></table></div>
</div>`;}
function renderAdminTagsRows(){return DB.tags.map(t=>`<tr>
  <td><span class="tag tag-${t.estilo}" ${t.colorCustom?`style="background:${t.colorCustom}18;color:${t.colorCustom};border-color:${t.colorCustom}44"`:''}>
    ${t.nombre}</span></td>
  <td><span class="badge badge-gray">${t.colorCustom?'custom':t.estilo}</span></td>
  <td style="font-size:12px;color:var(--text3)">${t.descripcion}</td>
  <td><button class="btn btn-sm btn-danger" onclick="eliminarTagAdmin('${t.id}')">${ic('trash',12)}</button></td>
</tr>`).join('');}
window.eliminarTagAdmin=function(id){const i=DB.tags.findIndex(t=>t.id===id);if(i>-1){DB.tags.splice(i,1);adminTab('tags');App.showToast('Eliminada','info');}};

function renderAdminEsp(){return `<div>
  <div class="section-header"><div class="section-title" style="font-size:16px">Especialidades</div><button class="btn btn-primary btn-sm" onclick="openModalNuevaEsp()">${ic('plus',13)} Nueva</button></div>
  <div class="table-wrap"><table class="data-table"><thead><tr><th>Especialidad</th><th>Categoría</th><th>Color</th><th>Descripción</th><th></th></tr></thead>
  <tbody id="admin-esp-tbody">${renderAdminEspRows()}</tbody></table></div>
</div>`;}
function renderAdminEspRows(){return DB.especialidades.map(e=>`<tr>
  <td style="display:flex;align-items:center;gap:8px"><div style="color:${e.color}">${DB.getEspIconoSVG(e.icono,17)}</div><strong>${e.nombre}</strong></td>
  <td><span class="badge badge-blue">${e.categoria}</span></td>
  <td><div style="display:flex;align-items:center;gap:6px"><div style="width:15px;height:15px;border-radius:4px;background:${e.color}"></div><span style="font-size:12px;font-family:monospace">${e.color}</span></div></td>
  <td style="font-size:12px;color:var(--text3)">${e.descripcion}</td>
  <td><div class="actions">
    <button class="btn btn-sm btn-outline" onclick="openEditEsp(${e.id})">${ic('edit',12)}</button>
    <button class="btn btn-sm btn-danger" onclick="eliminarEspAdmin(${e.id})">${ic('trash',12)}</button>
  </div></td>
</tr>`).join('');}
window.eliminarEspAdmin=function(id){if(!confirm('¿Eliminar especialidad?'))return;DB.deleteEspecialidad(id);adminTab('especialidades');App.showToast('Eliminada','info');};

// ══════════════════════════════════════════════════════
// PLANES / SOBRE NOSOTROS / CONTACTO / CANVAS
// ══════════════════════════════════════════════════════
function renderPlanes(){return `<div class="page"><div style="text-align:center;margin-bottom:32px"><div class="section-title" style="font-size:28px;margin-bottom:6px">Plan MediCitas Pro</div><div class="section-sub" style="font-size:14px">Todo lo que necesitas para gestionar tu consultorio digital</div></div>
  <div style="max-width:460px;margin:0 auto">${DB.planes.map(p=>`<div class="plan-card featured" style="text-align:center">
    <div class="plan-badge">El plan completo</div>
    <div style="font-size:12px;color:var(--text3);margin-bottom:5px">${p.nombre}</div>
    <div class="plan-price">${DB.formatPrecio(p.precio)}<span>/mes · ${p.duracion_dias||30} días</span></div>
    <p style="font-size:13px;color:var(--text2);margin:10px 0">${p.descripcion}</p>
    <div class="plan-features">${(p.features||[]).map(f=>`<div class="plan-feature">${ic('check',13)} ${f}</div>`).join('')}</div>
    <button class="btn btn-primary btn-lg btn-block" style="margin-top:16px" onclick="App.navigate('registro-consultorio')">${ic('plus',15)} Registrar mi consultorio</button>
    <button class="btn btn-wa btn-sm btn-block" style="margin-top:8px" onclick="App.openWhatsApp('3204924227','Hola, quiero suscribir mi consultorio.')">${ic('wa',14)} Consultar por WhatsApp</button>
  </div>`).join('')}</div>
</div>`;}

function renderSobreNosotros(){return `<div class="page" style="max-width:880px">
  <div style="text-align:center;margin-bottom:32px"><div style="width:68px;height:68px;border-radius:16px;background:linear-gradient(135deg,#0070C0,#00B09B);display:flex;align-items:center;justify-content:center;margin:0 auto 14px;color:#fff">${ic('stethoscope',34)}</div>
    <div class="section-title" style="font-size:26px;margin-bottom:7px">Sobre MediCitas</div>
    <div class="section-sub" style="font-size:14px;max-width:520px;margin:0 auto">Mejoramos el acceso a la salud en Bucaramanga a través de tecnología que conecta pacientes con los mejores profesionales.</div>
  </div>
  <div class="grid-2" style="margin-bottom:28px">
    <div class="card"><div class="card-body"><div style="color:var(--primary);margin-bottom:9px">${ic('shield',26)}</div><div style="font-weight:700;font-size:14px;margin-bottom:5px">Nuestra misión</div><p style="font-size:13px;color:var(--text2);line-height:1.65">Conectar a los pacientes de Bucaramanga con los mejores profesionales de la salud, facilitando el agendamiento de citas de forma rápida y segura.</p></div></div>
    <div class="card"><div class="card-body"><div style="color:var(--accent);margin-bottom:9px">${ic('eye',26)}</div><div style="font-weight:700;font-size:14px;margin-bottom:5px">Nuestra visión</div><p style="font-size:13px;color:var(--text2);line-height:1.65">Ser la plataforma de referencia en el sector salud del nororiente colombiano, promoviendo la digitalización de consultorios médicos.</p></div></div>
  </div>
  <div class="section-header"><div class="section-title" style="font-size:17px">Nuestro equipo</div></div>
  <div class="team-grid">
    ${[{n:'Andrea Portilla',r:'CEO & Fundadora',i:'AP'},{n:'Fernando Montañez',r:'Desarrollo',i:'FM'}].map(m=>`<div class="team-card"><div class="team-avatar">${m.i}</div><div style="font-weight:700;font-size:14px">${m.n}</div><div style="font-size:12px;color:var(--text3);margin-top:3px">${m.r}</div></div>`).join('')}
  </div>
  <div style="text-align:center;margin-top:28px"><button class="btn btn-primary btn-lg" onclick="App.navigate('modelo-canvas')">${ic('grid',15)} Ver modelo Canvas</button></div>
</div>`;}

function renderContacto(){return `<div class="page" style="max-width:700px">
  <div class="section-header"><div><div class="section-title">Contáctanos</div><div class="section-sub">Estamos para ayudarte</div></div></div>
  <div class="grid-2" style="margin-bottom:20px">
    <div class="card card-hover" onclick="App.openWhatsApp('3204924227','Hola, necesito información sobre MediCitas.')"><div class="card-body" style="text-align:center;padding:22px"><div style="color:#25D366;margin-bottom:8px">${ic('wa',34)}</div><div style="font-weight:700;margin-bottom:3px">WhatsApp</div><div style="font-size:13px;color:var(--text3)">+57 320 492 4227</div></div></div>
    <div class="card"><div class="card-body" style="text-align:center;padding:22px"><div style="color:var(--primary);margin-bottom:8px">${ic('mail',34)}</div><div style="font-weight:700;margin-bottom:3px">Correo electrónico</div><div style="font-size:13px;color:var(--text3)">hola@medicitas.co</div></div></div>
  </div>
  <div class="card"><div class="card-body">
    <div style="font-weight:700;margin-bottom:14px">Envíanos un mensaje</div>
    <div class="form-row"><div class="form-group"><label class="form-label">Nombre <span class="req">*</span></label><input class="form-control" id="ct-nombre" placeholder="Tu nombre"></div>
      <div class="form-group"><label class="form-label">Correo electrónico</label><input class="form-control" id="ct-email" placeholder="correo@ejemplo.com"></div></div>
    <div class="form-group"><label class="form-label">Tipo de consulta</label>
      <select class="form-control" id="ct-tipo"><option>Soy paciente, tengo una pregunta</option><option>Quiero registrar mi consultorio</option><option>Tengo un problema técnico</option><option>Otro</option></select></div>
    <div class="form-group"><label class="form-label">Mensaje <span class="req">*</span></label><textarea class="form-control" id="ct-mensaje" rows="4" placeholder="Escribe tu mensaje aquí..."></textarea></div>
    <button class="btn btn-primary btn-lg" id="btn-contacto" onclick="enviarContacto(this)">${ic('mail',15)} Enviar mensaje</button>
  </div></div>
</div>`;}
window.enviarContacto=function(btn){
  const n=document.getElementById('ct-nombre')?.value?.trim();const m=document.getElementById('ct-mensaje')?.value?.trim();
  if(!n||!m){App.showToast('Completa los campos obligatorios','error');return;}
  btnLoad(btn,true);
  setTimeout(()=>{App.openWhatsApp('3204924227',`Hola MediCitas, soy ${n}.\n${m}`);btnLoad(btn,false);},400);
};

function renderModeloCanvas(){
  const cells=[
    {title:'Socios clave',items:['Consultorios médicos y odontológicos','Pasarelas de pago (PSE, Nequi, Daviplata)','Google Maps API','WhatsApp Business API','Entidades de salud Bucaramanga']},
    {title:'Actividades clave',items:['Desarrollo y mantenimiento de la plataforma','Onboarding de consultorios','Marketing digital y posicionamiento','Soporte técnico','Verificación de profesionales']},
    {title:'Propuesta de valor',items:['Agendamiento de citas 24/7','Directorio médico verificado','Visibilidad digital para consultorios','Gestión integral de citas','Comunicación directa paciente-consultorio']},
    {title:'Relación con clientes',items:['Autoservicio mediante la plataforma','Notificaciones automáticas','Soporte WhatsApp prioritario','Portal de estadísticas']},
    {title:'Segmentos de clientes',items:['Pacientes Bucaramanga y AMB','Consultorios médicos pequeños y medianos','Especialistas independientes','Clínicas y centros de salud']},
    {title:'Recursos clave',items:['Plataforma web / app','Base de datos de profesionales verificados','Equipo de desarrollo','Reputación y confianza de marca']},
    {title:'Canales',items:['Sitio web MediCitas','WhatsApp Business','Redes sociales','Referidos de pacientes','Google Ads y SEO local']},
    {title:'Estructura de costos',items:['Desarrollo y hosting','Marketing y adquisición','Soporte al usuario','APIs externas','Equipo operativo']},
    {title:'Fuentes de ingresos',items:['Suscripción mensual: $90.000/mes','Futuros: planes premium, publicidad','Comisiones por cita (futuro)']},
  ];
  return `<div class="page">
    <div class="section-header"><div><div class="section-title">Modelo Canvas</div><div class="section-sub">Modelo de negocio MediCitas — Bucaramanga</div></div>
      <button class="btn btn-ghost" onclick="App.navigate('sobre-nosotros')">${ic('arrow_l',14)} Nosotros</button>
    </div>
    <div style="overflow-x:auto">
      <div style="display:grid;grid-template-columns:repeat(5,1fr);grid-template-rows:auto auto;gap:10px;min-width:780px">
        ${cells.slice(0,5).map(c=>`<div class="canvas-cell"><h4>${c.title}</h4><ul>${c.items.map(i=>`<li>${i}</li>`).join('')}</ul></div>`).join('')}
        <div class="canvas-cell"><h4>${cells[5].title}</h4><ul>${cells[5].items.map(i=>`<li>${i}</li>`).join('')}</ul></div>
        <div class="canvas-cell"><h4>${cells[6].title}</h4><ul>${cells[6].items.map(i=>`<li>${i}</li>`).join('')}</ul></div>
        <div class="canvas-cell" style="grid-column:3/span 2"><h4>${cells[7].title}</h4><ul>${cells[7].items.map(i=>`<li>${i}</li>`).join('')}</ul></div>
        <div class="canvas-cell"><h4>${cells[8].title}</h4><ul>${cells[8].items.map(i=>`<li>${i}</li>`).join('')}</ul></div>
      </div>
    </div>
  </div>`;
}
