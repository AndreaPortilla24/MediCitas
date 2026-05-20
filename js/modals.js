/* ═══════════════════════════════════════════════════════
   MediCitas — Modals v3
   Color picker personalizado, btnLoad en todos los forms
   ═══════════════════════════════════════════════════════ */

function renderModals() {
  const wrap = document.getElementById('modals-container');
  if (!wrap) return;
  wrap.innerHTML = `
    ${modalLogin()}
    ${modalRegister()}
    ${modalCita()}
    ${modalEditConsultorio()}
    ${modalNuevoConsultorio()}
    ${modalNuevoServicio()}
    ${modalNuevoTag()}
    ${modalNuevoTagAdmin()}
    ${modalNuevoPlan()}
    ${modalEditPlan()}
    ${modalNuevoUsuario()}
    ${modalCitaConsultorio()}
    ${modalConfirmCancelar()}
    ${modalConfirmRechazar()}
    ${modalEditEsp()}
    ${modalNuevaEsp()}
  `;
}

const HORAS_JORNADA = ['07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30'];

// ── TAG ESTILO HELPER ─────────────────────────────────
function tagEstiloRadios(name, checked='blue') {
  return `<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:6px">
    ${[{k:'blue',l:'Azul'},{k:'green',l:'Verde'},{k:'orange',l:'Naranja'},{k:'red',l:'Rojo'},{k:'purple',l:'Morado'},{k:'gray',l:'Gris'},{k:'custom',l:'Personalizado'}].map(o=>`
      <label style="display:flex;align-items:center;gap:5px;cursor:pointer;font-size:13px;font-weight:500">
        <input type="radio" name="${name}" value="${o.k}" ${o.k===checked?'checked':''} style="cursor:pointer">
        ${o.l}
      </label>`).join('')}
  </div>`;
}

// ══════════════════════════════════════════════════════
// LOGIN
// ══════════════════════════════════════════════════════
function modalLogin() {
  return `
  <div id="modal-login" class="modal-overlay" style="display:none" onclick="if(event.target===this)closeModalById('modal-login')">
    <div class="modal modal-lg">
      <div class="modal-header">
        <div><div class="modal-title">Iniciar sesión en MediCitas</div><div class="modal-sub">Accede a tu cuenta para gestionar tus citas</div></div>
        <button class="modal-close" onclick="closeModalById('modal-login')">${ic('x',14)}</button>
      </div>
      <div class="modal-body" style="display:grid;grid-template-columns:1fr 1fr;gap:24px">
        <div>
          <div class="form-group"><label class="form-label">Correo electrónico</label>
            <input class="form-control" type="email" id="login-email" placeholder="correo@ejemplo.com" onkeydown="if(event.key==='Enter')doLogin()">
          </div>
          <div class="form-group"><label class="form-label">Contraseña</label>
            <input class="form-control" type="password" id="login-password" placeholder="••••••••" onkeydown="if(event.key==='Enter')doLogin()">
          </div>
          <div style="text-align:right;margin:-6px 0 14px"><span style="font-size:12px;color:var(--primary);cursor:pointer">¿Olvidaste tu contraseña?</span></div>
          <button class="btn btn-primary btn-block btn-lg" onclick="doLogin()" id="login-btn">${ic('arrow_r',15)} Ingresar</button>
          <div style="text-align:center;margin-top:12px;font-size:13px;color:var(--text3)">
            ¿No tienes cuenta? <span style="color:var(--primary);cursor:pointer;font-weight:600" onclick="closeModalById('modal-login');showModal('register')">Regístrate gratis</span>
          </div>
        </div>
        <div style="background:var(--surface2);border-radius:var(--radius-sm);padding:16px;border:1px solid var(--border)">
          <div style="font-weight:700;font-size:13px;margin-bottom:10px;color:var(--text2)">Usuarios de prueba</div>
          ${[{rol:'Paciente',email:'andres@paciente.com',pass:'paciente123',color:'badge-blue'},{rol:'Consultorio',email:'admin@clinicasanpablo.com',pass:'consultorio123',color:'badge-green'},{rol:'Admin',email:'admin@medicitas.co',pass:'admin2024',color:'badge-red'}].map(u=>`
            <div style="background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:10px 12px;margin-bottom:8px;cursor:pointer;transition:border .15s" onclick="prefillLogin('${u.email}','${u.pass}')" onmouseover="this.style.borderColor='var(--primary)'" onmouseout="this.style.borderColor='var(--border)'">
              <div style="display:flex;align-items:center;gap:7px;margin-bottom:3px"><span class="badge ${u.color}">${u.rol}</span><span style="font-size:11px;color:var(--text3)">Clic para rellenar</span></div>
              <div style="font-size:12px;color:var(--text2)">${u.email}</div>
              <div style="font-size:12px;color:var(--text3);font-family:monospace">${u.pass}</div>
            </div>`).join('')}
        </div>
      </div>
    </div>
  </div>`;
}

window.prefillLogin = function(email, pass) {
  document.getElementById('login-email').value = email;
  document.getElementById('login-password').value = pass;
};

window.doLogin = function() {
  const email = document.getElementById('login-email')?.value?.trim();
  const pass  = document.getElementById('login-password')?.value;
  const btn   = document.getElementById('login-btn');
  if (!email || !pass) { App.showToast('Completa todos los campos', 'error'); return; }
  btnLoad(btn, true);
  setTimeout(() => {
    const user = App.login(email, pass);
    btnLoad(btn, false);
    if (user) {
      closeModalById('modal-login');
      App.showToast(`Bienvenido, ${user.nombre.split(' ')[0]}`, 'success');
      if (user.rol === 'consultorio') App.navigate('dashboard-consultorio');
      else if (user.rol === 'admin') App.navigate('admin');
    } else {
      App.showToast('Credenciales incorrectas', 'error');
    }
  }, 450);
};

// ══════════════════════════════════════════════════════
// REGISTER
// ══════════════════════════════════════════════════════
function modalRegister() {
  return `
  <div id="modal-register" class="modal-overlay" style="display:none" onclick="if(event.target===this)closeModalById('modal-register')">
    <div class="modal">
      <div class="modal-header">
        <div><div class="modal-title">Crear cuenta de paciente</div><div class="modal-sub">Regístrate para solicitar citas en línea</div></div>
        <button class="modal-close" onclick="closeModalById('modal-register')">${ic('x',14)}</button>
      </div>
      <div class="modal-body">
        <div class="form-row">
          <div class="form-group"><label class="form-label">Nombre <span class="req">*</span></label><input class="form-control" id="reg-nombre" placeholder="Tu nombre"></div>
          <div class="form-group"><label class="form-label">Apellido <span class="req">*</span></label><input class="form-control" id="reg-apellido" placeholder="Tu apellido"></div>
        </div>
        <div class="form-group"><label class="form-label">Correo electrónico <span class="req">*</span></label><input class="form-control" type="email" id="reg-email" placeholder="correo@ejemplo.com"></div>
        <div class="form-group"><label class="form-label">Teléfono / WhatsApp <span class="req">*</span></label><input class="form-control" type="tel" id="reg-tel" placeholder="300 000 0000"></div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Contraseña <span class="req">*</span></label><input class="form-control" type="password" id="reg-pass" placeholder="Mínimo 6 caracteres"></div>
          <div class="form-group"><label class="form-label">Confirmar <span class="req">*</span></label><input class="form-control" type="password" id="reg-pass2" placeholder="Repetir contraseña"></div>
        </div>
        <div style="font-size:12px;color:var(--text3);background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:10px 12px">Al registrarte aceptas los términos de uso y política de privacidad de MediCitas.</div>
      </div>
      <div class="modal-footer" style="justify-content:space-between">
        <button class="btn btn-ghost" onclick="closeModalById('modal-register');showModal('login')">Ya tengo cuenta</button>
        <button class="btn btn-primary" onclick="doRegister()" id="reg-btn">${ic('check',14)} Crear cuenta</button>
      </div>
    </div>
  </div>`;
}

window.doRegister = function() {
  const nombre   = document.getElementById('reg-nombre')?.value?.trim();
  const apellido = document.getElementById('reg-apellido')?.value?.trim();
  const email    = document.getElementById('reg-email')?.value?.trim();
  const tel      = document.getElementById('reg-tel')?.value?.trim();
  const pass     = document.getElementById('reg-pass')?.value;
  const pass2    = document.getElementById('reg-pass2')?.value;
  if (!nombre || !apellido || !email || !tel || !pass) { App.showToast('Completa todos los campos obligatorios', 'error'); return; }
  if (pass !== pass2) { App.showToast('Las contraseñas no coinciden', 'error'); return; }
  if (pass.length < 6) { App.showToast('Contraseña mínimo 6 caracteres', 'error'); return; }
  if (DB.usuarios.find(u => u.email === email)) { App.showToast('Ya existe una cuenta con ese correo', 'error'); return; }
  const btn = document.getElementById('reg-btn');
  btnLoad(btn, true);
  setTimeout(() => {
    DB.addUser({ nombre:`${nombre} ${apellido}`, email, password:pass, telefono:tel, rol:'paciente', avatar:`${nombre[0]}${apellido[0]}`.toUpperCase() });
    btnLoad(btn, false);
    closeModalById('modal-register');
    App.login(email, pass);
    App.showToast(`Cuenta creada. Bienvenido, ${nombre}!`, 'success');
  }, 500);
};

// ══════════════════════════════════════════════════════
// MODAL CITA — solo horas disponibles
// ══════════════════════════════════════════════════════
function modalCita() {
  return `
  <div id="modal-cita" class="modal-overlay" style="display:none" onclick="if(event.target===this)closeModalById('modal-cita')">
    <div class="modal">
      <div class="modal-header">
        <div><div class="modal-title" id="cita-modal-title">Solicitar cita</div><div class="modal-sub" id="cita-modal-sub"></div></div>
        <button class="modal-close" onclick="closeModalById('modal-cita')">${ic('x',14)}</button>
      </div>
      <div class="modal-body">
        <div id="cita-cons-info" style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:12px;margin-bottom:14px;display:none"></div>
        <div id="cita-cons-select-wrap" class="form-group">
          <label class="form-label">Consultorio <span class="req">*</span></label>
          <select class="form-control" id="cita-consultorio" onchange="onChangeCitaCons()">
            <option value="">Selecciona un consultorio</option>
            ${DB.consultorios.filter(c=>c.pagado).map(c=>`<option value="${c.id_consultorio}">${c.nombre_profesional} — ${c.especialidad_principal}</option>`).join('')}
          </select>
        </div>
        <div class="form-group"><label class="form-label">Servicio (opcional)</label>
          <select class="form-control" id="cita-servicio"><option value="">Seleccionar servicio</option></select>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Nombre completo <span class="req">*</span></label><input class="form-control" id="cita-nombre" placeholder="Tu nombre completo"></div>
          <div class="form-group"><label class="form-label">Teléfono / WhatsApp <span class="req">*</span></label><input class="form-control" type="tel" id="cita-tel" placeholder="300 000 0000"></div>
        </div>
        <div class="form-group"><label class="form-label">Correo electrónico</label><input class="form-control" type="email" id="cita-email" placeholder="correo@ejemplo.com"></div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Fecha preferida <span class="req">*</span></label>
            <input class="form-control" type="date" id="cita-fecha" onchange="updateHorasDisponibles()">
          </div>
          <div class="form-group"><label class="form-label">Hora disponible <span class="req">*</span></label>
            <select class="form-control" id="cita-hora"><option value="">Selecciona fecha primero</option></select>
          </div>
        </div>
        <div class="form-group"><label class="form-label">Motivo de la consulta <span class="req">*</span></label>
          <textarea class="form-control" id="cita-motivo" rows="3" placeholder="Describe brevemente el motivo..."></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="closeModalById('modal-cita')">Cancelar</button>
        <button class="btn btn-primary" onclick="enviarCita()" id="cita-btn">${ic('calendar',14)} Enviar solicitud</button>
      </div>
    </div>
  </div>`;
}

window.openModalCita = function(consId, servId) {
  if (!App.isLoggedIn()) { App.showToast('Debes iniciar sesión para solicitar una cita', 'warning'); App.showModal('login'); return; }
  const cons = DB.getConsultorioById(consId);
  const user = App.getUser();
  document.getElementById('modal-cita').style.display = 'flex';
  const selWrap = document.getElementById('cita-cons-select-wrap');
  const info    = document.getElementById('cita-cons-info');
  const select  = document.getElementById('cita-consultorio');
  if (cons) {
    select.value = consId;
    selWrap.style.display = 'none';
    info.style.display = '';
    info.innerHTML = `<div style="display:flex;align-items:center;gap:10px"><div class="spec-avatar" style="width:38px;height:38px;font-size:13px;flex-shrink:0">${cons.iniciales}</div><div><div style="font-weight:700;font-size:14px">${cons.nombre_profesional}</div><div style="font-size:13px;color:var(--primary)">${cons.especialidad_principal} · ${cons.barrio}, ${cons.municipio}</div></div></div>`;
    const svSelect = document.getElementById('cita-servicio');
    const svs = DB.servicios.filter(s => (cons.servicios_ids||[]).includes(s.id));
    svSelect.innerHTML = '<option value="">Seleccionar servicio (opcional)</option>' + svs.map(s=>`<option value="${s.id}" ${s.id===servId?'selected':''}>${s.nombre} — ${DB.formatPrecio(s.precio)}</option>`).join('');
  } else {
    selWrap.style.display = '';
    info.style.display = 'none';
  }
  if (user) {
    document.getElementById('cita-nombre').value = user.nombre || '';
    document.getElementById('cita-tel').value    = user.telefono || '';
    document.getElementById('cita-email').value  = user.email || '';
  }
  const tom = new Date(); tom.setDate(tom.getDate() + 1);
  document.getElementById('cita-fecha').min   = tom.toISOString().split('T')[0];
  document.getElementById('cita-fecha').value = '';
  document.getElementById('cita-hora').innerHTML = '<option value="">Selecciona fecha primero</option>';
  document.getElementById('cita-modal-title').textContent = 'Solicitar cita';
  document.getElementById('cita-modal-sub').textContent   = cons ? `en ${cons.nombre_consultorio}` : '';
};

window.onChangeCitaCons = function() {
  const consId = document.getElementById('cita-consultorio')?.value;
  const cons   = DB.getConsultorioById(consId); if (!cons) return;
  const svSelect = document.getElementById('cita-servicio');
  svSelect.innerHTML = '<option value="">Seleccionar servicio (opcional)</option>' +
    DB.servicios.filter(s=>(cons.servicios_ids||[]).includes(s.id)).map(s=>`<option value="${s.id}">${s.nombre} — ${DB.formatPrecio(s.precio)}</option>`).join('');
  updateHorasDisponibles();
};

window.updateHorasDisponibles = function() {
  const consId = document.getElementById('cita-consultorio')?.value;
  const fecha  = document.getElementById('cita-fecha')?.value;
  const select = document.getElementById('cita-hora');
  if (!consId || !fecha) { select.innerHTML = '<option value="">Selecciona fecha primero</option>'; return; }
  const ocupadas = DB.getHorasOcupadas(consId, fecha);
  const libres   = HORAS_JORNADA.filter(h => !ocupadas.includes(h));
  select.innerHTML = libres.length === 0
    ? '<option value="">Sin horarios disponibles para esta fecha</option>'
    : '<option value="">Selecciona una hora</option>' + libres.map(h=>`<option value="${h}">${h}</option>`).join('');
};

window.enviarCita = function() {
  const consId  = document.getElementById('cita-consultorio')?.value;
  const nombre  = document.getElementById('cita-nombre')?.value?.trim();
  const tel     = document.getElementById('cita-tel')?.value?.trim();
  const email   = document.getElementById('cita-email')?.value?.trim();
  const fecha   = document.getElementById('cita-fecha')?.value;
  const hora    = document.getElementById('cita-hora')?.value;
  const motivo  = document.getElementById('cita-motivo')?.value?.trim();
  const servId  = document.getElementById('cita-servicio')?.value || '';
  if (!consId || !nombre || !tel || !fecha || !hora || !motivo) { App.showToast('Completa todos los campos obligatorios (*)', 'error'); return; }
  const cons = DB.getConsultorioById(consId);
  const user = App.getUser();
  const btn  = document.getElementById('cita-btn');
  btnLoad(btn, true);
  setTimeout(() => {
    DB.addCita({ id_consultorio:consId, nombre_consultorio:cons?.nombre_consultorio||'', id_paciente:user?.id||null, nombre_paciente:nombre, telefono_paciente:tel, email_paciente:email, fecha_solicitada:fecha, hora_solicitada:hora, motivo, servicio_id:servId });
    btnLoad(btn, false);
    closeModalById('modal-cita');
    App.showToast('Solicitud enviada. El consultorio confirmará pronto.', 'success');
    if (DB.notificaciones.consultorio) DB.notificaciones.consultorio.unshift({ id:`n_${Date.now()}`, tipo:'solicitud', titulo:'Nueva solicitud de cita', mensaje:`${nombre} solicitó cita para el ${fecha} a las ${hora}.`, fecha:'Ahora', leida:false });
    if (user?.rol === 'paciente') setTimeout(() => App.navigate('mis-citas'), 1200);
  }, 600);
};

// ══════════════════════════════════════════════════════
// CONFIRM CANCELAR CITA
// ══════════════════════════════════════════════════════
function modalConfirmCancelar() {
  return `
  <div id="modal-confirm-cancelar" class="modal-overlay" style="display:none" onclick="if(event.target===this)closeModalById('modal-confirm-cancelar')">
    <div class="modal modal-sm">
      <div class="modal-header"><div class="modal-title">Cancelar cita</div><button class="modal-close" onclick="closeModalById('modal-confirm-cancelar')">${ic('x',14)}</button></div>
      <div class="modal-body">
        <div class="alert alert-warning"><div class="alert-icon">${ic('warn',16)}</div><div class="alert-body"><div class="alert-title">¿Deseas cancelar esta cita?</div>Esta acción no se puede deshacer. El consultorio será notificado.</div></div>
        <input type="hidden" id="cc-cita-id">
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="closeModalById('modal-confirm-cancelar')">No, mantener</button>
        <button class="btn btn-danger" id="btn-confirm-cancelar" onclick="doCancelarCita(this)">Sí, cancelar</button>
      </div>
    </div>
  </div>`;
}

window.doCancelarCita = function(btn) {
  const id = document.getElementById('cc-cita-id')?.value; if (!id) return;
  btnLoad(btn, true);
  setTimeout(() => {
    DB.updateCitaEstado(id, 'cancelada');
    btnLoad(btn, false);
    closeModalById('modal-confirm-cancelar');
    App.showToast('Cita cancelada', 'info');
    filterMC && filterMC('todas');
  }, 400);
};

// ══════════════════════════════════════════════════════
// CONFIRM RECHAZAR CITA (con motivo)
// ══════════════════════════════════════════════════════
function modalConfirmRechazar() {
  return `
  <div id="modal-confirm-rechazar" class="modal-overlay" style="display:none" onclick="if(event.target===this)closeModalById('modal-confirm-rechazar')">
    <div class="modal modal-sm">
      <div class="modal-header"><div class="modal-title">Cancelar / rechazar solicitud</div><button class="modal-close" onclick="closeModalById('modal-confirm-rechazar')">${ic('x',14)}</button></div>
      <div class="modal-body">
        <div class="alert alert-warning" style="margin-bottom:12px"><div class="alert-icon">${ic('warn',15)}</div><div class="alert-body">La solicitud quedará como cancelada y el paciente será notificado.</div></div>
        <input type="hidden" id="cr-cita-id">
        <div class="form-group"><label class="form-label">Motivo (se enviará al paciente)</label>
          <textarea class="form-control" id="cr-motivo" rows="3" placeholder="Ej: Sin disponibilidad para esa fecha. Por favor reagende..."></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="closeModalById('modal-confirm-rechazar')">Volver</button>
        <button class="btn btn-danger" id="btn-confirm-rechazar" onclick="doRechazarCita(this)">${ic('x',13)} Confirmar cancelación</button>
      </div>
    </div>
  </div>`;
}

window.doRechazarCita = function(btn) {
  const id    = document.getElementById('cr-cita-id')?.value; if (!id) return;
  const notas = document.getElementById('cr-motivo')?.value?.trim() || '';
  btnLoad(btn, true);
  setTimeout(() => {
    DB.updateCitaEstado(id, 'cancelada', notas);
    btnLoad(btn, false);
    closeModalById('modal-confirm-rechazar');
    renderBandejaRows && renderBandejaRows();
    App.showToast('Solicitud cancelada', 'info');
  }, 400);
};

// ══════════════════════════════════════════════════════
// EDIT CONSULTORIO
// ══════════════════════════════════════════════════════
function modalEditConsultorio() {
  return `
  <div id="modal-edit-cons" class="modal-overlay" style="display:none" onclick="if(event.target===this)closeModalById('modal-edit-cons')">
    <div class="modal modal-lg">
      <div class="modal-header"><div class="modal-title" id="edit-cons-title">Editar consultorio</div><button class="modal-close" onclick="closeModalById('modal-edit-cons')">${ic('x',14)}</button></div>
      <div class="modal-body">
        <input type="hidden" id="edit-cons-id">
        <div class="form-row">
          <div class="form-group"><label class="form-label">Nombre del profesional <span class="req">*</span></label><input class="form-control" id="ec-nombre-prof"></div>
          <div class="form-group"><label class="form-label">Nombre del consultorio <span class="req">*</span></label><input class="form-control" id="ec-nombre-cons"></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Municipio</label>
            <select class="form-control" id="ec-municipio"><option>Bucaramanga</option><option>Floridablanca</option><option>Girón</option><option>Piedecuesta</option></select>
          </div>
          <div class="form-group"><label class="form-label">Barrio</label><input class="form-control" id="ec-barrio"></div>
        </div>
        <div class="form-group"><label class="form-label">Dirección</label><input class="form-control" id="ec-direccion"></div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Teléfono</label><input class="form-control" id="ec-telefono"></div>
          <div class="form-group"><label class="form-label">WhatsApp</label><input class="form-control" id="ec-whatsapp"></div>
        </div>
        <div class="form-group"><label class="form-label">Correo electrónico</label><input class="form-control" type="email" id="ec-email"></div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Precio mínimo (COP)</label><input class="form-control" type="number" id="ec-precio-min"></div>
          <div class="form-group"><label class="form-label">Precio máximo (COP)</label><input class="form-control" type="number" id="ec-precio-max"></div>
        </div>
        <div class="form-group"><label class="form-label">Horario de atención</label><input class="form-control" id="ec-horario" placeholder="Lun-Vie 8am-6pm | Sáb 9am-1pm"></div>
        <div class="form-group"><label class="form-label">Descripción</label><textarea class="form-control" id="ec-descripcion" rows="3"></textarea></div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="closeModalById('modal-edit-cons')">Cancelar</button>
        <button class="btn btn-primary" id="btn-save-cons" onclick="guardarEditConsultorio(this)">${ic('check',14)} Guardar cambios</button>
      </div>
    </div>
  </div>`;
}

window.openEditConsultorio = function(consId) {
  const c = DB.getConsultorioById(consId); if (!c) return;
  document.getElementById('modal-edit-cons').style.display = 'flex';
  document.getElementById('edit-cons-id').value        = consId;
  document.getElementById('edit-cons-title').textContent= `Editar: ${c.nombre_consultorio}`;
  document.getElementById('ec-nombre-prof').value      = c.nombre_profesional||'';
  document.getElementById('ec-nombre-cons').value      = c.nombre_consultorio||'';
  document.getElementById('ec-municipio').value        = c.municipio||'Bucaramanga';
  document.getElementById('ec-barrio').value           = c.barrio||'';
  document.getElementById('ec-direccion').value        = c.direccion||'';
  document.getElementById('ec-telefono').value         = c.telefono_contacto||'';
  document.getElementById('ec-whatsapp').value         = c.whatsapp||'';
  document.getElementById('ec-email').value            = c.email||'';
  document.getElementById('ec-precio-min').value       = c.precio_min||'';
  document.getElementById('ec-precio-max').value       = c.precio_max||'';
  document.getElementById('ec-horario').value          = c.horario_resumen||'';
  document.getElementById('ec-descripcion').value      = c.descripcion||'';
};

window.guardarEditConsultorio = function(btn) {
  const id = document.getElementById('edit-cons-id').value;
  const c  = DB.getConsultorioById(id); if (!c) return;
  btnLoad(btn, true);
  setTimeout(() => {
    c.nombre_profesional  = document.getElementById('ec-nombre-prof').value.trim();
    c.nombre_consultorio  = document.getElementById('ec-nombre-cons').value.trim();
    c.municipio           = document.getElementById('ec-municipio').value;
    c.barrio              = document.getElementById('ec-barrio').value.trim();
    c.direccion           = document.getElementById('ec-direccion').value.trim();
    c.telefono_contacto   = document.getElementById('ec-telefono').value.trim();
    c.whatsapp            = document.getElementById('ec-whatsapp').value.trim();
    c.email               = document.getElementById('ec-email').value.trim();
    c.precio_min          = parseInt(document.getElementById('ec-precio-min').value)||c.precio_min;
    c.precio_max          = parseInt(document.getElementById('ec-precio-max').value)||c.precio_max;
    c.horario_resumen     = document.getElementById('ec-horario').value.trim();
    c.descripcion         = document.getElementById('ec-descripcion').value.trim();
    c.iniciales           = c.nombre_profesional.split(' ').filter(w=>w).map(w=>w[0]).join('').slice(0,2).toUpperCase();
    btnLoad(btn, false);
    closeModalById('modal-edit-cons');
    App.showToast('Consultorio actualizado', 'success');
    const user = App.getUser();
    setTimeout(() => App.navigate(user?.rol==='admin' ? 'admin' : 'dashboard-consultorio'), 200);
  }, 500);
};

// ══════════════════════════════════════════════════════
// NUEVO CONSULTORIO (admin)
// ══════════════════════════════════════════════════════
function modalNuevoConsultorio() {
  return `
  <div id="modal-nuevo-cons" class="modal-overlay" style="display:none" onclick="if(event.target===this)closeModalById('modal-nuevo-cons')">
    <div class="modal modal-lg">
      <div class="modal-header"><div class="modal-title">Nuevo consultorio</div><button class="modal-close" onclick="closeModalById('modal-nuevo-cons')">${ic('x',14)}</button></div>
      <div class="modal-body">
        <div class="form-row">
          <div class="form-group"><label class="form-label">Nombre del profesional <span class="req">*</span></label><input class="form-control" id="nc-nombre-prof" placeholder="Dr. Nombre Apellido"></div>
          <div class="form-group"><label class="form-label">Nombre del consultorio <span class="req">*</span></label><input class="form-control" id="nc-nombre-cons" placeholder="Consultorio Médico..."></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Especialidad <span class="req">*</span></label>
            <select class="form-control" id="nc-especialidad"><option value="">Selecciona...</option>${DB.especialidades.map(e=>`<option value="${e.nombre}">${e.nombre}</option>`).join('')}</select>
          </div>
          <div class="form-group"><label class="form-label">Municipio</label>
            <select class="form-control" id="nc-municipio"><option>Bucaramanga</option><option>Floridablanca</option><option>Girón</option><option>Piedecuesta</option></select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Teléfono</label><input class="form-control" id="nc-telefono"></div>
          <div class="form-group"><label class="form-label">WhatsApp</label><input class="form-control" id="nc-whatsapp"></div>
        </div>
        <div class="form-group"><label class="form-label">Email</label><input class="form-control" type="email" id="nc-email"></div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Precio mínimo</label><input class="form-control" type="number" id="nc-precio-min" placeholder="50000"></div>
          <div class="form-group"><label class="form-label">Precio máximo</label><input class="form-control" type="number" id="nc-precio-max" placeholder="100000"></div>
        </div>
        <div class="form-group"><label class="form-label">Plan pagado</label>
          <select class="form-control" id="nc-pagado"><option value="false">Sin plan</option><option value="true">Con plan activo</option></select>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="closeModalById('modal-nuevo-cons')">Cancelar</button>
        <button class="btn btn-primary" id="btn-crear-cons" onclick="crearConsultorio(this)">${ic('plus',13)} Crear</button>
      </div>
    </div>
  </div>`;
}

window.openModalNuevoConsultorio = function() { document.getElementById('modal-nuevo-cons').style.display='flex'; };
window.crearConsultorio = function(btn) {
  const np=document.getElementById('nc-nombre-prof').value.trim();
  const nc=document.getElementById('nc-nombre-cons').value.trim();
  const esp=document.getElementById('nc-especialidad').value;
  if(!np||!nc||!esp){App.showToast('Completa los campos obligatorios','error');return;}
  btnLoad(btn,true);
  setTimeout(()=>{
    const espObj=DB.especialidades.find(e=>e.nombre===esp);
    const pagado=document.getElementById('nc-pagado').value==='true';
    const c=DB.addConsultorio({nombre_profesional:np,nombre_consultorio:nc,especialidad_principal:esp,especialidad_id:espObj?.id||1,municipio:document.getElementById('nc-municipio').value,telefono_contacto:document.getElementById('nc-telefono').value,whatsapp:document.getElementById('nc-whatsapp').value,email:document.getElementById('nc-email').value,precio_min:parseInt(document.getElementById('nc-precio-min').value)||50000,precio_max:parseInt(document.getElementById('nc-precio-max').value)||100000,barrio:'',direccion:'',horario_resumen:'',descripcion:'',lat:7.1193,lng:-73.1227,calificacion:0,resenas:0});
    if(pagado) DB.marcarPagado(c.id_consultorio);
    btnLoad(btn,false);
    closeModalById('modal-nuevo-cons');
    App.showToast('Consultorio creado','success');
    setTimeout(()=>adminTab('consultorios'),200);
  },500);
};

// ══════════════════════════════════════════════════════
// NUEVO SERVICIO
// ══════════════════════════════════════════════════════
function modalNuevoServicio() {
  return `
  <div id="modal-nuevo-servicio" class="modal-overlay" style="display:none" onclick="if(event.target===this)closeModalById('modal-nuevo-servicio')">
    <div class="modal modal-sm">
      <div class="modal-header"><div class="modal-title">Nuevo servicio</div><button class="modal-close" onclick="closeModalById('modal-nuevo-servicio')">${ic('x',14)}</button></div>
      <div class="modal-body">
        <input type="hidden" id="ns-cons-id">
        <div class="form-group"><label class="form-label">Nombre <span class="req">*</span></label><input class="form-control" id="ns-nombre" placeholder="Ej: Consulta general"></div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Precio (COP) <span class="req">*</span></label><input class="form-control" type="number" id="ns-precio" placeholder="50000"></div>
          <div class="form-group"><label class="form-label">Duración (min)</label><input class="form-control" type="number" id="ns-duracion" placeholder="30"></div>
        </div>
        <div class="form-group"><label class="form-label">Descripción</label><input class="form-control" id="ns-descripcion" placeholder="Breve descripción"></div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="closeModalById('modal-nuevo-servicio')">Cancelar</button>
        <button class="btn btn-primary" id="btn-crear-serv" onclick="crearServicio(this)">${ic('plus',13)} Crear y agregar</button>
      </div>
    </div>
  </div>`;
}

window.openModalNuevoServicio = function(consId) { document.getElementById('ns-cons-id').value=consId; document.getElementById('modal-nuevo-servicio').style.display='flex'; };
window.crearServicio = function(btn) {
  const consId=document.getElementById('ns-cons-id').value;
  const nombre=document.getElementById('ns-nombre').value.trim();
  const precio=parseInt(document.getElementById('ns-precio').value);
  const duracion=parseInt(document.getElementById('ns-duracion').value)||30;
  const descripcion=document.getElementById('ns-descripcion').value.trim();
  if(!nombre||!precio){App.showToast('Completa nombre y precio','error');return;}
  btnLoad(btn,true);
  setTimeout(()=>{
    const cons=DB.getConsultorioById(consId);
    const s=DB.addServicio({nombre,especialidad_id:cons?.especialidad_id||1,precio,duracion,descripcion});
    if(cons){if(!cons.servicios_ids)cons.servicios_ids=[];cons.servicios_ids.push(s.id);}
    btnLoad(btn,false);
    closeModalById('modal-nuevo-servicio');
    App.showToast('Servicio creado y agregado','success');
    App.navigate('servicios-esp');
  },500);
};

// ══════════════════════════════════════════════════════
// NUEVO TAG — color picker personalizado
// ══════════════════════════════════════════════════════
function modalNuevoTag() {
  return `
  <div id="modal-nuevo-tag" class="modal-overlay" style="display:none" onclick="if(event.target===this)closeModalById('modal-nuevo-tag')">
    <div class="modal modal-sm">
      <div class="modal-header"><div class="modal-title">Nueva etiqueta</div><button class="modal-close" onclick="closeModalById('modal-nuevo-tag')">${ic('x',14)}</button></div>
      <div class="modal-body">
        <input type="hidden" id="nt-cons-id">
        <div class="form-group"><label class="form-label">Nombre <span class="req">*</span></label>
          <input class="form-control" id="nt-nombre" placeholder="Ej: Urgencias" maxlength="20" oninput="updateTagPreview()">
        </div>
        <div class="form-group"><label class="form-label">Estilo de color</label>
          ${tagEstiloRadios('nt-estilo','blue')}
          <div id="nt-custom-wrap" style="display:none;margin-top:8px">
            <label class="form-label" style="font-size:11px">Color personalizado</label>
            ${renderColorPicker('nt-color-custom','#0070C0','updateTagPreview()')}
          </div>
        </div>
        <div class="form-group"><label class="form-label">Vista previa</label>
          <div style="padding:8px 0"><span id="tag-preview-span" class="tag tag-blue">Nueva etiqueta</span></div>
        </div>
        <div class="form-group"><label class="form-label">Descripción</label><input class="form-control" id="nt-descripcion" placeholder="Breve descripción"></div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="closeModalById('modal-nuevo-tag')">Cancelar</button>
        <button class="btn btn-primary" id="btn-crear-tag" onclick="crearTag(this)">${ic('plus',13)} Crear y agregar</button>
      </div>
    </div>
  </div>`;
}

window.updateTagPreview = function() {
  const nombre   = document.getElementById('nt-nombre')?.value || 'Nueva etiqueta';
  const estilo   = document.querySelector('input[name="nt-estilo"]:checked')?.value || 'blue';
  const preview  = document.getElementById('tag-preview-span');
  const customW  = document.getElementById('nt-custom-wrap');
  if (!preview) return;
  if (estilo === 'custom') {
    if(customW) customW.style.display = '';
    const color = document.getElementById('nt-color-custom')?.value || '#0070C0';
    preview.className = 'tag';
    preview.style.cssText = `background:${color}18;color:${color};border:1px solid ${color}44`;
  } else {
    if(customW) customW.style.display = 'none';
    preview.className = `tag tag-${estilo}`;
    preview.style.cssText = '';
  }
  preview.textContent = nombre;
};

// Attach onchange to radios after modal renders
document.addEventListener('click', function(e) {
  if(e.target.name === 'nt-estilo') updateTagPreview();
});

window.openModalNuevoTag = function(consId) {
  document.getElementById('nt-cons-id').value = consId;
  document.getElementById('nt-nombre').value  = '';
  document.getElementById('nt-descripcion').value = '';
  const radios = document.querySelectorAll('input[name="nt-estilo"]');
  if(radios[0]) radios[0].checked = true;
  const cw = document.getElementById('nt-custom-wrap'); if(cw) cw.style.display='none';
  document.getElementById('modal-nuevo-tag').style.display = 'flex';
  setTimeout(updateTagPreview, 50);
};

window.crearTag = function(btn) {
  const consId      = document.getElementById('nt-cons-id').value;
  const nombre      = document.getElementById('nt-nombre').value.trim();
  const estilo      = document.querySelector('input[name="nt-estilo"]:checked')?.value || 'blue';
  const descripcion = document.getElementById('nt-descripcion').value.trim();
  const colorCustom = estilo === 'custom' ? (document.getElementById('nt-color-custom')?.value || '#0070C0') : null;
  if (!nombre) { App.showToast('Ingresa un nombre', 'error'); return; }
  btnLoad(btn, true);
  setTimeout(() => {
    const tag = DB.addTag({ nombre, estilo: estilo==='custom'?'gray':estilo, colorCustom, descripcion });
    const cons = DB.getConsultorioById(consId);
    if (cons) { if(!cons.tags_ids) cons.tags_ids=[]; cons.tags_ids.push(tag.id); }
    btnLoad(btn, false);
    closeModalById('modal-nuevo-tag');
    App.showToast('Etiqueta creada y agregada', 'success');
    App.navigate('servicios-esp');
    setTimeout(() => showSvTab && showSvTab('tags'), 200);
  }, 400);
};

// ══════════════════════════════════════════════════════
// NUEVO TAG ADMIN — color picker
// ══════════════════════════════════════════════════════
function modalNuevoTagAdmin() {
  return `
  <div id="modal-nuevo-tag-admin" class="modal-overlay" style="display:none" onclick="if(event.target===this)closeModalById('modal-nuevo-tag-admin')">
    <div class="modal modal-sm">
      <div class="modal-header"><div class="modal-title">Nueva etiqueta del sistema</div><button class="modal-close" onclick="closeModalById('modal-nuevo-tag-admin')">${ic('x',14)}</button></div>
      <div class="modal-body">
        <div class="form-group"><label class="form-label">Nombre <span class="req">*</span></label>
          <input class="form-control" id="nta-nombre" placeholder="Nombre" oninput="updateTagAdminPreview()">
        </div>
        <div class="form-group"><label class="form-label">Estilo de color</label>
          ${tagEstiloRadios('nta-estilo','blue')}
          <div id="nta-custom-wrap" style="display:none;margin-top:8px">
            <label class="form-label" style="font-size:11px">Color personalizado</label>
            ${renderColorPicker('nta-color-custom','#0070C0','updateTagAdminPreview()')}
          </div>
        </div>
        <div class="form-group"><label class="form-label">Vista previa</label>
          <div style="padding:8px 0"><span id="tag-admin-preview" class="tag tag-blue">Etiqueta</span></div>
        </div>
        <div class="form-group"><label class="form-label">Descripción</label><input class="form-control" id="nta-descripcion" placeholder="Descripción"></div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="closeModalById('modal-nuevo-tag-admin')">Cancelar</button>
        <button class="btn btn-primary" id="btn-crear-tag-admin" onclick="crearTagAdmin(this)">${ic('plus',13)} Crear</button>
      </div>
    </div>
  </div>`;
}

window.openModalNuevoTagAdmin = function() {
  document.getElementById('modal-nuevo-tag-admin').style.display='flex';
  setTimeout(updateTagAdminPreview,50);
};
window.updateTagAdminPreview = function() {
  const nombre=document.getElementById('nta-nombre')?.value||'Etiqueta';
  const estilo=document.querySelector('input[name="nta-estilo"]:checked')?.value||'blue';
  const preview=document.getElementById('tag-admin-preview');
  const wrap=document.getElementById('nta-custom-wrap');
  if(!preview) return;
  if(estilo==='custom'){
    if(wrap) wrap.style.display='';
    const color=document.getElementById('nta-color-custom')?.value||'#0070C0';
    preview.className='tag';preview.style.cssText=`background:${color}18;color:${color};border:1px solid ${color}44`;
  } else {if(wrap) wrap.style.display='none';preview.className=`tag tag-${estilo}`;preview.style.cssText='';}
  preview.textContent=nombre;
};
document.addEventListener('click', function(e) { if(e.target.name==='nta-estilo') updateTagAdminPreview(); });

window.crearTagAdmin = function(btn) {
  const nombre=document.getElementById('nta-nombre').value.trim();
  const estilo=document.querySelector('input[name="nta-estilo"]:checked')?.value||'blue';
  const colorCustom=estilo==='custom'?(document.getElementById('nta-color-custom')?.value||'#0070C0'):null;
  const descripcion=document.getElementById('nta-descripcion').value.trim();
  if(!nombre){App.showToast('Ingresa un nombre','error');return;}
  btnLoad(btn,true);
  setTimeout(()=>{
    DB.addTag({nombre,estilo:estilo==='custom'?'gray':estilo,colorCustom,descripcion});
    btnLoad(btn,false);
    closeModalById('modal-nuevo-tag-admin');
    App.showToast('Etiqueta creada','success');
    adminTab('tags');
  },400);
};

// ══════════════════════════════════════════════════════
// NUEVO PLAN
// ══════════════════════════════════════════════════════
function modalNuevoPlan() {
  return `
  <div id="modal-nuevo-plan" class="modal-overlay" style="display:none" onclick="if(event.target===this)closeModalById('modal-nuevo-plan')">
    <div class="modal modal-sm">
      <div class="modal-header"><div class="modal-title">Nuevo plan</div><button class="modal-close" onclick="closeModalById('modal-nuevo-plan')">${ic('x',14)}</button></div>
      <div class="modal-body">
        <div class="form-group"><label class="form-label">Nombre del plan <span class="req">*</span></label><input class="form-control" id="np-nombre" placeholder="Ej: MediCitas Pro"></div>
        <div class="form-group"><label class="form-label">Precio mensual (COP) <span class="req">*</span></label><input class="form-control" type="number" id="np-precio" placeholder="90000"></div>
        <div class="form-group"><label class="form-label">Duración (días)</label><input class="form-control" type="number" id="np-dias" value="30"></div>
        <div class="form-group"><label class="form-label">Descripción</label><textarea class="form-control" id="np-desc" rows="2"></textarea></div>
        <div class="form-group"><label class="form-label">Características incluidas <span class="form-hint">(una por línea)</span></label>
          <textarea class="form-control" id="np-features" rows="5" placeholder="Perfil visible en el directorio&#10;Gestión de citas ilimitada"></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="closeModalById('modal-nuevo-plan')">Cancelar</button>
        <button class="btn btn-primary" id="btn-crear-plan" onclick="crearPlan(this)">${ic('plus',13)} Crear plan</button>
      </div>
    </div>
  </div>`;
}

window.openModalNuevoPlan = function() { document.getElementById('modal-nuevo-plan').style.display='flex'; };
window.crearPlan = function(btn) {
  const nombre=document.getElementById('np-nombre').value.trim();
  const precio=parseInt(document.getElementById('np-precio').value);
  if(!nombre||!precio){App.showToast('Completa nombre y precio','error');return;}
  btnLoad(btn,true);
  setTimeout(()=>{
    DB.planes.push({id:`plan_${Date.now()}`,nombre,precio,descripcion:document.getElementById('np-desc').value.trim(),features:document.getElementById('np-features').value.split('\n').map(f=>f.trim()).filter(Boolean),destacado:false,color:'#0070C0',duracion_dias:parseInt(document.getElementById('np-dias').value)||30});
    btnLoad(btn,false);
    closeModalById('modal-nuevo-plan');
    App.showToast('Plan creado','success');
    adminTab('planes');
  },400);
};

// ══════════════════════════════════════════════════════
// EDIT PLAN
// ══════════════════════════════════════════════════════
function modalEditPlan() {
  return `
  <div id="modal-edit-plan" class="modal-overlay" style="display:none" onclick="if(event.target===this)closeModalById('modal-edit-plan')">
    <div class="modal modal-sm">
      <div class="modal-header"><div class="modal-title">Editar plan</div><button class="modal-close" onclick="closeModalById('modal-edit-plan')">${ic('x',14)}</button></div>
      <div class="modal-body">
        <input type="hidden" id="ep-id">
        <div class="form-group"><label class="form-label">Nombre <span class="req">*</span></label><input class="form-control" id="ep-nombre"></div>
        <div class="form-group"><label class="form-label">Precio (COP) <span class="req">*</span></label><input class="form-control" type="number" id="ep-precio"></div>
        <div class="form-group"><label class="form-label">Duración (días)</label><input class="form-control" type="number" id="ep-dias"></div>
        <div class="form-group"><label class="form-label">Descripción</label><textarea class="form-control" id="ep-desc" rows="2"></textarea></div>
        <div class="form-group"><label class="form-label">Características (una por línea)</label><textarea class="form-control" id="ep-features" rows="6"></textarea></div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="closeModalById('modal-edit-plan')">Cancelar</button>
        <button class="btn btn-primary" id="btn-save-plan" onclick="guardarEditPlan(this)">${ic('check',13)} Guardar</button>
      </div>
    </div>
  </div>`;
}

window.openEditPlan = function(planId) { openEditPlanById(planId); };
window.openEditPlanById = function(planId) {
  const p=DB.planes.find(x=>x.id===planId); if(!p) return;
  document.getElementById('modal-edit-plan').style.display='flex';
  document.getElementById('ep-id').value       = planId;
  document.getElementById('ep-nombre').value   = p.nombre;
  document.getElementById('ep-precio').value   = p.precio;
  document.getElementById('ep-dias').value     = p.duracion_dias||30;
  document.getElementById('ep-desc').value     = p.descripcion||'';
  document.getElementById('ep-features').value = (p.features||[]).join('\n');
};
window.guardarEditPlan = function(btn) {
  const id=document.getElementById('ep-id').value;
  const p=DB.planes.find(x=>x.id===id); if(!p) return;
  btnLoad(btn,true);
  setTimeout(()=>{
    p.nombre       = document.getElementById('ep-nombre').value.trim();
    p.precio       = parseInt(document.getElementById('ep-precio').value)||p.precio;
    p.duracion_dias= parseInt(document.getElementById('ep-dias').value)||30;
    p.descripcion  = document.getElementById('ep-desc').value.trim();
    p.features     = document.getElementById('ep-features').value.split('\n').map(f=>f.trim()).filter(Boolean);
    btnLoad(btn,false);
    closeModalById('modal-edit-plan');
    App.showToast('Plan actualizado','success');
    adminTab('planes');
  },400);
};

// ══════════════════════════════════════════════════════
// NUEVO USUARIO (admin)
// ══════════════════════════════════════════════════════
function modalNuevoUsuario() {
  return `
  <div id="modal-nuevo-usuario" class="modal-overlay" style="display:none" onclick="if(event.target===this)closeModalById('modal-nuevo-usuario')">
    <div class="modal modal-sm">
      <div class="modal-header"><div class="modal-title">Nuevo usuario</div><button class="modal-close" onclick="closeModalById('modal-nuevo-usuario')">${ic('x',14)}</button></div>
      <div class="modal-body">
        <div class="form-group"><label class="form-label">Nombre completo <span class="req">*</span></label><input class="form-control" id="nu-nombre"></div>
        <div class="form-group"><label class="form-label">Correo electrónico <span class="req">*</span></label><input class="form-control" type="email" id="nu-email"></div>
        <div class="form-group"><label class="form-label">Contraseña <span class="req">*</span></label><input class="form-control" type="password" id="nu-pass" placeholder="Mínimo 6 caracteres"></div>
        <div class="form-group"><label class="form-label">Rol <span class="req">*</span></label>
          <select class="form-control" id="nu-rol"><option value="paciente">Paciente</option><option value="consultorio">Consultorio</option><option value="admin">Administrador</option></select>
        </div>
        <div class="form-group"><label class="form-label">Teléfono</label><input class="form-control" id="nu-tel" placeholder="300 000 0000"></div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="closeModalById('modal-nuevo-usuario')">Cancelar</button>
        <button class="btn btn-primary" id="btn-crear-user" onclick="crearUsuario(this)">${ic('plus',13)} Crear usuario</button>
      </div>
    </div>
  </div>`;
}

window.openModalNuevoUsuario = function() { document.getElementById('modal-nuevo-usuario').style.display='flex'; };
window.crearUsuario = function(btn) {
  const nombre=document.getElementById('nu-nombre').value.trim();
  const email=document.getElementById('nu-email').value.trim();
  const pass=document.getElementById('nu-pass').value;
  const rol=document.getElementById('nu-rol').value;
  const tel=document.getElementById('nu-tel').value.trim();
  if(!nombre||!email||!pass){App.showToast('Completa los campos obligatorios','error');return;}
  if(DB.usuarios.find(u=>u.email===email)){App.showToast('Email ya registrado','error');return;}
  btnLoad(btn,true);
  setTimeout(()=>{
    DB.addUser({nombre,email,password:pass,rol,telefono:tel,avatar:nombre.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()});
    btnLoad(btn,false);
    closeModalById('modal-nuevo-usuario');
    App.showToast('Usuario creado','success');
    adminTab('usuarios');
  },400);
};

// ══════════════════════════════════════════════════════
// CITA MANUAL (consultorio)
// ══════════════════════════════════════════════════════
function modalCitaConsultorio() {
  return `
  <div id="modal-cita-consultorio" class="modal-overlay" style="display:none" onclick="if(event.target===this)closeModalById('modal-cita-consultorio')">
    <div class="modal">
      <div class="modal-header"><div class="modal-title">Crear cita manual</div><button class="modal-close" onclick="closeModalById('modal-cita-consultorio')">${ic('x',14)}</button></div>
      <div class="modal-body">
        <div class="form-row">
          <div class="form-group"><label class="form-label">Paciente <span class="req">*</span></label><input class="form-control" id="cc-nombre" placeholder="Nombre del paciente"></div>
          <div class="form-group"><label class="form-label">Teléfono <span class="req">*</span></label><input class="form-control" id="cc-tel" placeholder="300 000 0000"></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Fecha <span class="req">*</span></label><input class="form-control" type="date" id="cc-fecha" onchange="updateHorasCC()"></div>
          <div class="form-group"><label class="form-label">Hora</label><select class="form-control" id="cc-hora"><option value="">Selecciona fecha primero</option></select></div>
        </div>
        <div class="form-group"><label class="form-label">Motivo</label><input class="form-control" id="cc-motivo" placeholder="Motivo de la consulta"></div>
        <div class="form-group"><label class="form-label">Estado inicial</label>
          <select class="form-control" id="cc-estado"><option value="pendiente">Pendiente</option><option value="confirmada">Confirmada</option></select>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="closeModalById('modal-cita-consultorio')">Cancelar</button>
        <button class="btn btn-primary" id="btn-crear-cita-cons" onclick="crearCitaConsultorio(this)">${ic('plus',13)} Crear cita</button>
      </div>
    </div>
  </div>`;
}

window.openModalCitaConsultorio = function() {
  const tom=new Date();tom.setDate(tom.getDate()+1);
  document.getElementById('modal-cita-consultorio').style.display='flex';
  document.getElementById('cc-fecha').min=new Date().toISOString().split('T')[0];
  document.getElementById('cc-fecha').value=tom.toISOString().split('T')[0];
  updateHorasCC();
};
window.updateHorasCC = function() {
  const user=App.getUser();const cons=DB.consultorios.find(c=>c.id_consultorio===user?.id_consultorio)||DB.consultorios[0];
  const fecha=document.getElementById('cc-fecha')?.value;const select=document.getElementById('cc-hora');if(!fecha){select.innerHTML='<option>Selecciona fecha primero</option>';return;}
  const ocupadas=DB.getHorasOcupadas(cons.id_consultorio,fecha);const libres=HORAS_JORNADA.filter(h=>!ocupadas.includes(h));
  select.innerHTML=libres.length===0?'<option>Sin horarios disponibles</option>':'<option value="">Selecciona una hora</option>'+libres.map(h=>`<option>${h}</option>`).join('');
};
window.crearCitaConsultorio = function(btn) {
  const nombre=document.getElementById('cc-nombre').value.trim();const tel=document.getElementById('cc-tel').value.trim();
  const fecha=document.getElementById('cc-fecha').value;const hora=document.getElementById('cc-hora').value;
  const motivo=document.getElementById('cc-motivo').value.trim()||'Consulta médica';const estado=document.getElementById('cc-estado').value;
  if(!nombre||!tel||!fecha){App.showToast('Completa los campos obligatorios','error');return;}
  btnLoad(btn,true);
  setTimeout(()=>{
    const user=App.getUser();const cons=DB.consultorios.find(c=>c.id_consultorio===user?.id_consultorio)||DB.consultorios[0];
    DB.addCita({id_consultorio:cons.id_consultorio,nombre_consultorio:cons.nombre_consultorio,nombre_paciente:nombre,telefono_paciente:tel,email_paciente:'',fecha_solicitada:fecha,hora_solicitada:hora,motivo,estado,id_paciente:null});
    btnLoad(btn,false);
    closeModalById('modal-cita-consultorio');
    App.showToast('Cita creada','success');
    renderBandejaRows&&renderBandejaRows();
    if(window._calDate)renderCitasDia(window._calDate.year,window._calDate.month+1,window._calDate.day);
  },500);
};

// ══════════════════════════════════════════════════════
// EDIT ESPECIALIDAD — color picker personalizado
// ══════════════════════════════════════════════════════
function modalEditEsp() {
  return `
  <div id="modal-edit-esp" class="modal-overlay" style="display:none" onclick="if(event.target===this)closeModalById('modal-edit-esp')">
    <div class="modal modal-sm">
      <div class="modal-header"><div class="modal-title">Editar especialidad</div><button class="modal-close" onclick="closeModalById('modal-edit-esp')">${ic('x',14)}</button></div>
      <div class="modal-body">
        <input type="hidden" id="ee-id">
        <div class="form-group"><label class="form-label">Nombre <span class="req">*</span></label><input class="form-control" id="ee-nombre"></div>
        <div class="form-group"><label class="form-label">Categoría</label><input class="form-control" id="ee-categoria" placeholder="Medicina, Odontología, Salud mental..."></div>
        <div class="form-group"><label class="form-label">Color de la especialidad</label>
          <div id="ee-color-picker-wrap"></div>
        </div>
        <div class="form-group"><label class="form-label">Descripción</label><input class="form-control" id="ee-descripcion"></div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="closeModalById('modal-edit-esp')">Cancelar</button>
        <button class="btn btn-primary" id="btn-save-esp" onclick="guardarEditEsp(this)">${ic('check',13)} Guardar</button>
      </div>
    </div>
  </div>`;
}

window.openEditEsp = function(id) { openEditEspById(id); };
window.openEditEspById = function(id) {
  const e=DB.especialidades.find(x=>x.id===id); if(!e) return;
  document.getElementById('modal-edit-esp').style.display='flex';
  document.getElementById('ee-id').value          = id;
  document.getElementById('ee-nombre').value      = e.nombre;
  document.getElementById('ee-categoria').value   = e.categoria;
  document.getElementById('ee-descripcion').value = e.descripcion;
  const cpWrap = document.getElementById('ee-color-picker-wrap');
  if(cpWrap) cpWrap.innerHTML = renderColorPicker('ee-color', e.color||'#0070C0');
};
window.guardarEditEsp = function(btn) {
  const id=parseInt(document.getElementById('ee-id').value);
  btnLoad(btn,true);
  setTimeout(()=>{
    DB.updateEspecialidad(id,{nombre:document.getElementById('ee-nombre').value.trim(),categoria:document.getElementById('ee-categoria').value.trim(),color:document.getElementById('ee-color')?.value||'#0070C0',descripcion:document.getElementById('ee-descripcion').value.trim()});
    btnLoad(btn,false);
    closeModalById('modal-edit-esp');
    App.showToast('Especialidad actualizada','success');
    const tb1=document.getElementById('admin-esp-tbody');if(tb1)tb1.innerHTML=renderAdminEspRows();
  },400);
};

// ══════════════════════════════════════════════════════
// NUEVA ESPECIALIDAD — color picker
// ══════════════════════════════════════════════════════
function modalNuevaEsp() {
  return `
  <div id="modal-nueva-esp" class="modal-overlay" style="display:none" onclick="if(event.target===this)closeModalById('modal-nueva-esp')">
    <div class="modal modal-sm">
      <div class="modal-header"><div class="modal-title">Nueva especialidad</div><button class="modal-close" onclick="closeModalById('modal-nueva-esp')">${ic('x',14)}</button></div>
      <div class="modal-body">
        <div class="form-group"><label class="form-label">Nombre <span class="req">*</span></label><input class="form-control" id="ne-nombre" placeholder="Ej: Fisioterapia"></div>
        <div class="form-group"><label class="form-label">Categoría</label><input class="form-control" id="ne-categoria" placeholder="Medicina, Odontología..."></div>
        <div class="form-group"><label class="form-label">Color</label>
          ${renderColorPicker('ne-color','#0070C0')}
        </div>
        <div class="form-group"><label class="form-label">Descripción</label><input class="form-control" id="ne-descripcion" placeholder="Breve descripción"></div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="closeModalById('modal-nueva-esp')">Cancelar</button>
        <button class="btn btn-primary" id="btn-crear-esp" onclick="crearEspecialidad(this)">${ic('plus',13)} Crear</button>
      </div>
    </div>
  </div>`;
}

window.openModalNuevaEsp = function() { document.getElementById('modal-nueva-esp').style.display='flex'; };
window.crearEspecialidad = function(btn) {
  const nombre=document.getElementById('ne-nombre').value.trim();
  const categoria=document.getElementById('ne-categoria').value.trim()||'Medicina';
  const color=document.getElementById('ne-color')?.value||'#0070C0';
  const descripcion=document.getElementById('ne-descripcion').value.trim();
  if(!nombre){App.showToast('Ingresa un nombre','error');return;}
  btnLoad(btn,true);
  setTimeout(()=>{
    DB.addEspecialidad({nombre,categoria,color,descripcion,icono:'default'});
    btnLoad(btn,false);
    closeModalById('modal-nueva-esp');
    App.showToast('Especialidad creada','success');
    const tb1=document.getElementById('admin-esp-tbody');if(tb1)tb1.innerHTML=renderAdminEspRows();
    adminTab&&adminTab('especialidades');
  },400);
};

// ══════════════════════════════════════════════════════
// showModal override para casos especiales
// ══════════════════════════════════════════════════════
window.showModal = function(id, data={}) {
  closeModal();
  if(id==='confirm-cancelar'&&data.id){const el=document.getElementById('modal-confirm-cancelar');if(el){document.getElementById('cc-cita-id').value=data.id;el.style.display='flex';return;}}
  if(id==='confirm-rechazar'&&data.id){const el=document.getElementById('modal-confirm-rechazar');if(el){document.getElementById('cr-cita-id').value=data.id;el.style.display='flex';return;}}
  if(id==='edit-plan'&&data.planId){openEditPlanById&&openEditPlanById(data.planId);return;}
  if(id==='edit-esp'&&data.espId){openEditEspById&&openEditEspById(data.espId);return;}
  const el=document.getElementById(`modal-${id}`);if(el)el.style.display='flex';
};
