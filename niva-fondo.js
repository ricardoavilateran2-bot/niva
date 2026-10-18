/* NIVA OS — fondo de constelación compartido (2026-10-16).
   El mismo fondo del inicio y de la pantalla principal, para todos los módulos.
   Uso: <script src="./niva-fondo.js" defer></script> en el <head>.
   Pinta un canvas fijo detrás de todo (z-index:-1) y deja transparente el fondo del body. */
(function(){
  if(window.__nivaFondo) return; window.__nivaFondo = true;
  var st = document.createElement('style');
  st.textContent =
    'html{background:radial-gradient(70% 60% at 50% 30%,#0F2242,#060D1A 85%) fixed #060D1A !important;min-height:100%}' +
    'body{background:transparent !important}' +
    '.bg-pattern,.bg-grid{display:none !important}' +
    'body>header,body>.bar,.wrap>.bar{background:rgba(8,17,32,.72) !important;-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)}' +
    '#niva-cons{position:fixed;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none}' +
    '@media print{#niva-cons{display:none}html{background:#fff !important}}';
  // Secciones y botones de cada módulo con el mismo vidrio azul y borde dorado de la pantalla principal.
  // Los selectores llevan "html " delante para ganarle a los estilos de la página sin pisar sus estados (.sel, .on…).
  var pag = (location.pathname.split('/').pop() || 'index.html').replace('.html','');
  var SECCIONES = {
    crm:'.bj-lista,.bj-detalle,.repsec,.sagrupo,.bienvenida', hoy:'.panel,.meta,.guia,.mis', scouting:'.dkpi',
    captaciones:'.form-card', cierres:'.form-card,.repsec', renovaciones:'.dkpi,.chart-card,.repsec',
    admin:'.stat,.sagrupo,.repsec,.dkpi,.chart-card', buscador:'.card', valuacion:'.card,.kpi', propuestas:'.card'
  }[pag];
  var BOTONES = {
    crm:'.card,.kbcard,.lfila,.vermas', hoy:'.it,.atajos a,.proxcita', scouting:'.lead', agenda:'.dia,.cc,.vista',
    inventario:'.row', ofrezco:'.card', captaciones:'.caprow,.prow', cierres:'.cierrerow,.cierrepend',
    admin:'.caprow,.proprow,.aserow,.leadrow,.cierrow', buscador:'.r'
  }[pag];
  var pre = function(s){ return s.split(',').map(function(x){ return 'html '+x; }).join(','); };
  var vidrio = 'background:linear-gradient(165deg,rgba(30,50,86,.82),rgba(15,30,54,.72));border:1px solid rgba(201,168,76,.28);' +
    'box-shadow:inset 0 1px 0 rgba(255,255,255,.07),0 14px 30px -18px rgba(0,0,0,.85);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-radius:14px}';
  if(SECCIONES) st.textContent += pre(SECCIONES)+'{'+vidrio;
  if(BOTONES) st.textContent += pre(BOTONES)+'{'+vidrio.replace('}',';cursor:pointer;transition:transform .2s,border-color .2s,box-shadow .2s}') +
    pre(BOTONES.split(',').map(function(x){ return x+':hover'; }).join(','))+'{background:linear-gradient(165deg,rgba(36,60,102,.88),rgba(15,30,54,.78));border-color:rgba(232,201,106,.75);transform:translateY(-2px);' +
      'box-shadow:inset 0 1px 0 rgba(255,255,255,.1),0 18px 36px -18px rgba(0,0,0,.9),0 0 22px -6px rgba(201,168,76,.35)}' +
    (pag==='inventario' ? 'html .row{margin-bottom:8px;padding:9px 10px}' : '') +
    (pag==='captaciones' ? 'html .ptabla{background:none;border:0;overflow:visible}html .prow{margin-bottom:8px}html .prow:last-child{border-bottom:1px solid rgba(201,168,76,.28)}' : '');
  // Encabezado único (2026-10-18): "← NIVA OS" siempre a la izquierda y el nombre del módulo grande a su lado.
  // Se esconden los encabezados viejos de cada página y los botones de acción de arriba bajan como botón flotante.
  var MOD = {
    admin:['Administrador','#niva-backfab,.asidebar .alogo'], agenda:['Mi agenda','body>header:not(.niva-top)'], buscador:['Buscador','body>.top'],
    captaciones:['Captaciones','.niva-backfab,.page>header'], cierres:['Cierres','.niva-backfab,.page>header'],
    crm:['CRM','#niva-backfab,#sbar .slogo'], docs:['Documentos','#niva-backfab,body>.top-bar'], hoy:['Arranca tu día','body>header:not(.niva-top)'],
    inventario:['Inventario NIVA','body>header:not(.niva-top)'], ofrezco:['Ofrezco WhatsApp','body>header:not(.niva-top)'], propuestas:['Propuestas','body>header:not(.niva-top)'],
    renovaciones:['Renovaciones','.niva-backfab,.page>header',['./admin.html','Administrador']],
    scouting:['Scouting','.page>header'], valuacion:['Opinión de Valor','body>.top']
  }[pag];
  var BAJAR = { crm:'#btn-nuevo', propuestas:'#nueva' }[pag];
  if(MOD) st.textContent += MOD[1]+'{display:none !important}' +
    '.niva-top{position:relative !important;z-index:20;display:flex !important;align-items:center !important;justify-content:flex-start !important;gap:14px !important;width:100% !important;max-width:none !important;margin:0 !important;padding:calc(14px + env(safe-area-inset-top)) 18px 14px !important;box-sizing:border-box;' +
      'background:rgba(8,17,32,.72);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border-bottom:1px solid rgba(201,168,76,.22)}' +
    '.niva-atras{flex:none;display:inline-flex;align-items:center;gap:6px;height:40px;padding:0 14px;border-radius:12px;text-decoration:none;' +
      'font:700 14px Inter,system-ui,sans-serif;color:#E8C96A;background:linear-gradient(165deg,rgba(30,50,86,.9),rgba(15,30,54,.8));border:1px solid rgba(201,168,76,.45)}' +
    '.niva-atras:hover{border-color:#E8C96A;color:#F3D98E}' +
    '.niva-titulo{margin:0;min-width:0;font:800 clamp(20px,5vw,26px)/1.1 Inter,system-ui,sans-serif;letter-spacing:-.02em;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
    '.niva-fab{position:fixed !important;left:auto !important;top:auto !important;right:18px !important;bottom:calc(18px + env(safe-area-inset-bottom)) !important;z-index:60 !important;' +
      'width:auto !important;height:auto !important;margin:0 !important;display:inline-flex !important;align-items:center;gap:8px;padding:14px 20px !important;border-radius:999px !important;' +
      'font:800 15px Inter,system-ui,sans-serif !important;color:#0F1E36 !important;background:linear-gradient(135deg,#E8C96A,#C9A84C) !important;border:0 !important;' +
      'box-shadow:0 12px 28px -8px rgba(0,0,0,.7),0 0 22px -6px rgba(201,168,76,.6) !important;cursor:pointer}' +
    '.niva-fab::after{content:none !important;display:none !important}';
  document.head.appendChild(st);

  function encabezado(){
    if(!MOD || document.querySelector('.niva-top')) return;
    var atras = MOD[2] || ['./index.html','NIVA OS'];
    var h = document.createElement('header'); h.className = 'niva-top';
    h.innerHTML = '<a class="niva-atras" href="'+atras[0]+'"><span aria-hidden="true">←</span> '+atras[1]+'</a><h1 class="niva-titulo"></h1>';
    h.querySelector('h1').textContent = MOD[0];
    document.body.insertBefore(h, document.body.firstChild);
    if(BAJAR){ var b = document.querySelector(BAJAR); if(b){ document.body.appendChild(b); b.classList.add('niva-fab'); } }
  }

  function inicia(){
    encabezado();
    var cv = document.createElement('canvas'); cv.id = 'niva-cons'; cv.setAttribute('aria-hidden','true');
    document.body.insertBefore(cv, document.body.firstChild);
    var c = cv.getContext('2d'), P = [], W = 0, H = 0, d = 1;
    var quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
    function arma(){
      d = Math.min(2, window.devicePixelRatio || 1);
      W = cv.width = Math.round(innerWidth*d); H = cv.height = Math.round(innerHeight*d);
      var n = innerWidth < 700 ? 40 : 70; P = [];
      for(var i = 0; i < n; i++) P.push({x:Math.random()*W, y:Math.random()*H, vx:(Math.random()-.5)*.25*d, vy:(Math.random()-.5)*.25*d, oro:Math.random() < .3});
    }
    function pinta(){
      if(document.hidden){ requestAnimationFrame(pinta); return; }
      if(Math.abs(W-innerWidth*d) > 2 || Math.abs(H-innerHeight*d) > 2) arma();
      c.clearRect(0,0,W,H); var lim = 130*d, i, j, a, b, dx, dy, dd, p;
      for(i = 0; i < P.length; i++){ p = P[i]; if(!quieto){ p.x += p.vx; p.y += p.vy; } if(p.x < 0 || p.x > W) p.vx *= -1; if(p.y < 0 || p.y > H) p.vy *= -1; }
      for(i = 0; i < P.length; i++) for(j = i+1; j < P.length; j++){
        a = P[i]; b = P[j]; dx = a.x-b.x; dy = a.y-b.y; dd = Math.sqrt(dx*dx+dy*dy);
        if(dd < lim){ c.strokeStyle = 'rgba('+(a.oro||b.oro ? '201,168,76' : '120,160,230')+','+(.28*(1-dd/lim)).toFixed(3)+')'; c.lineWidth = d; c.beginPath(); c.moveTo(a.x,a.y); c.lineTo(b.x,b.y); c.stroke(); }
      }
      for(i = 0; i < P.length; i++){ p = P[i]; c.fillStyle = p.oro ? '#E8C96A' : 'rgba(170,200,255,.8)'; c.beginPath(); c.arc(p.x, p.y, (p.oro ? 2.4 : 1.6)*d, 0, 7); c.fill(); }
      if(!quieto) requestAnimationFrame(pinta);
    }
    arma(); requestAnimationFrame(pinta);
  }
  if(document.body) inicia(); else document.addEventListener('DOMContentLoaded', inicia);
})();
