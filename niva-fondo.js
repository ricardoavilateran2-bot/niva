/* NIVA OS — fondo de constelación compartido (2026-10-16).
   El mismo fondo del inicio y de la pantalla principal, para todos los módulos.
   Uso: <script src="./niva-fondo.js" defer></script> en el <head>.
   Pinta un canvas fijo detrás de todo (z-index:-1) y deja transparente el fondo del body. */
(function(){
  if(window.__nivaFondo) return; window.__nivaFondo = true;
  var claro = document.documentElement.classList.contains('claro'); // tema blanco elegido en Configuración
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
  if(claro){
    var c = pre((SECCIONES||'')+(SECCIONES&&BOTONES?',':'')+(BOTONES||'')).replace(/html /g,'html.claro ');
    st.textContent +=
      'html{background:radial-gradient(70% 45% at 50% -5%,rgba(150,113,76,.07),rgba(251,249,246,0) 70%) fixed,#FBF9F6 !important;color-scheme:light}' +
      'body>header,body>.bar,.wrap>.bar{background:rgba(251,249,246,.82) !important;border-color:rgba(29,29,31,.08) !important}' +
      '.niva-top{background:rgba(251,249,246,.8) !important;border-bottom:1px solid rgba(29,29,31,.08) !important}' +
      '.niva-atras{color:#1D1D1F !important;background:#fff !important;border:1px solid rgba(60,45,30,.14) !important;box-shadow:0 1px 2px rgba(0,0,0,.05)}' +
      '.niva-atras:hover{border-color:#96714C !important}' +
      '.niva-titulo{color:#1D1D1F !important}' + 'html.claro :focus-visible{outline:2px solid #96714C;outline-offset:2px}' +
      (c ? c+'{background:#fff !important;border:1px solid rgba(60,45,30,.10) !important;box-shadow:0 1px 2px rgba(0,0,0,.04),0 6px 20px rgba(0,0,0,.05);-webkit-backdrop-filter:none;backdrop-filter:none}' : '') +
      (BOTONES ? pre(BOTONES.split(',').map(function(x){ return x+':hover'; }).join(',')).replace(/html /g,'html.claro ')+'{background:#fff !important;border-color:rgba(150,113,76,.75) !important;box-shadow:0 2px 4px rgba(0,0,0,.04),0 14px 32px rgba(0,0,0,.08)}' : '');
    st.textContent += 'html.claro{--gold:#B8946A;--gold2:#7A5A3A;--g-500:#B8946A;--g-400:#B08A62;--g-600:#7A5A3A;--g-100:rgba(150,113,76,.12);--ui-brand:#5A4632;--ui-accent:#B8946A;--ui-focus:#96714C;--n-950:#1D1D1F;--n-900:#2A2420;--n-800:#3B322B;--n-700:#5A4632;--navy:#2A2420;--navy2:#1D1D1F}' + '.niva-fab{background:#B8946A !important;color:#1D1D1F !important;box-shadow:0 12px 28px -10px rgba(60,45,30,.45) !important}';
  }
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

  // Pantalla de carga (2026-10-18): "NIVA OS." animado con el fondo elegido, hasta que el módulo esté listo.
  // Crema: las letras aparecen una por una y luego ondean. Constelación: las letras se arman con estrellas unidas por líneas.
  // Los módulos que cargan su sesión aparte (CRM) avisan con nivaListo(); los demás se quitan al terminar de cargar.
  var ESPERA = { crm:1 }[pag];
  var MINIMO = 900; // ms: deja ver la animación aunque el módulo cargue muy rápido
  st.textContent +=
    '#niva-carga{position:fixed;inset:0;z-index:100;display:grid;place-items:center;transition:opacity .4s ease;' + (claro ? 'background:radial-gradient(70% 45% at 50% 0%,rgba(150,113,76,.07),rgba(251,249,246,0) 70%),#FBF9F6' : 'background:radial-gradient(70% 60% at 50% 40%,rgba(15,34,66,.95),rgba(6,13,26,.98) 85%)') + '}' +
    '#niva-carga.fuera{opacity:0;pointer-events:none}' +
    '#niva-carga canvas{position:absolute;inset:0;width:100%;height:100%}' +
    '#niva-carga .nc-txt{position:relative;font:700 clamp(46px,13vw,84px)/1 Inter,system-ui,sans-serif;letter-spacing:-.045em;color:#1D1D1F;white-space:pre}' +
    '#niva-carga .nc-txt span{display:inline-block;animation:ncLetra .7s cubic-bezier(.2,.7,.2,1) both,ncOla 2.6s ease-in-out infinite;animation-delay:var(--d),calc(var(--d) + .9s)}' +
    '#niva-carga .nc-txt .nc-punto{color:#96714C;animation:ncPunto .7s cubic-bezier(.3,1.6,.5,1) both;animation-delay:var(--d)}' +
    '#niva-carga .nc-barra{display:block;width:120px;height:3px;margin:22px auto 0;border-radius:3px;overflow:hidden;background:' + (claro ? 'rgba(60,45,30,.10)' : 'rgba(255,255,255,.12)') + '}' +
    '#niva-carga .nc-barra:after{content:"";display:block;width:40%;height:100%;border-radius:3px;background:' + (claro ? '#B8946A' : '#E8C96A') + ';animation:ncBarra 1.1s ease-in-out infinite}' +
    '#niva-carga .nc-abajo{position:absolute;left:0;right:0;top:calc(50% + clamp(46px,13vw,84px) * .75)}' +
    '@keyframes ncLetra{from{opacity:0;transform:translateY(26px) scale(.96);filter:blur(10px)}to{opacity:1;transform:none;filter:none}}' +
    '@keyframes ncOla{0%,100%{transform:none}50%{transform:translateY(-4px)}}' +
    '@keyframes ncPunto{from{opacity:0;transform:translateY(-40px) scale(.2)}to{opacity:1;transform:none}}' +
    '@keyframes ncBarra{0%{transform:translateX(-100%)}100%{transform:translateX(250%)}}' +
    '@media (prefers-reduced-motion:reduce){#niva-carga .nc-txt span,#niva-carga .nc-barra:after{animation:none}}';

  // Constelación: puntos que vuelan desde toda la pantalla y forman "NIVA OS." unidos con líneas
  function letrasEstrella(c){
    var cv = document.createElement('canvas'); c.appendChild(cv);
    var g = cv.getContext('2d'), d = Math.min(2, window.devicePixelRatio || 1), W, H, P = [], t0 = performance.now(), vivo = true;
    var quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
    function arma(){
      W = cv.width = Math.round(innerWidth*d); H = cv.height = Math.round(innerHeight*d);
      var fs = Math.min(innerWidth*0.15, 120)*d, o = document.createElement('canvas'), og = o.getContext('2d');
      o.width = W; o.height = H; og.font = '800 '+fs+'px Inter,system-ui,sans-serif'; og.textAlign = 'center'; og.textBaseline = 'middle';
      var txt = 'NIVA OS', ancho = og.measureText(txt+'.').width, x0 = W/2 - ancho/2;
      og.textAlign = 'left'; og.fillStyle = '#fff'; og.fillText(txt, x0, H/2); var finTxt = x0 + og.measureText(txt).width; og.fillText('.', finTxt, H/2);
      var paso = Math.max(4, Math.round(fs/22)), dat = og.getImageData(0, 0, W, H).data, pts = [];
      for(var y = 0; y < H; y += paso) for(var x = 0; x < W; x += paso) if(dat[(y*W+x)*4+3] > 140) pts.push([x, y]);
      while(pts.length > 650){ paso++; pts = pts.filter(function(_, i){ return i % 2 === 0; }); }
      P = pts.map(function(q){ var punto = q[0] > finTxt;
        return { tx:q[0], ty:q[1], x:Math.random()*W, y:Math.random()*H, k:Math.random()*0.35, oro:punto || Math.random() < .22, punto:punto, f:Math.random()*6.28 }; });
      arma.lim = paso*2.3;
    }
    function pinta(ahora){
      if(!vivo) return;
      var t = quieto ? 2 : (ahora - t0)/1100, lim = arma.lim, i, j, a, b, dx, dy, dd;
      for(i = 0; i < P.length; i++){ a = P[i]; var e = Math.max(0, Math.min(1, (t - a.k)/(1 - .35))); e = 1 - Math.pow(1 - e, 3);
        var tw = e >= 1 ? Math.sin(ahora/600 + a.f)*0.6*d : 0;
        a.cx = a.x + (a.tx - a.x)*e + tw; a.cy = a.y + (a.ty - a.y)*e + tw; a.e = e; }
      g.clearRect(0, 0, W, H); g.lineWidth = d*.8;
      for(i = 0; i < P.length; i++) for(j = i+1; j < P.length; j++){ a = P[i]; b = P[j]; dx = a.cx-b.cx; if(dx > lim || dx < -lim) continue; dy = a.cy-b.cy; if(dy > lim || dy < -lim) continue;
        dd = Math.sqrt(dx*dx+dy*dy); if(dd < lim){ g.strokeStyle = 'rgba('+(a.oro&&b.oro ? '232,201,106' : '150,185,245')+','+(.45*(1-dd/lim)*Math.min(a.e,b.e)).toFixed(3)+')'; g.beginPath(); g.moveTo(a.cx,a.cy); g.lineTo(b.cx,b.cy); g.stroke(); } }
      for(i = 0; i < P.length; i++){ a = P[i]; g.fillStyle = a.punto ? '#E8C96A' : a.oro ? 'rgba(232,201,106,.95)' : 'rgba(225,235,255,.95)'; g.beginPath(); g.arc(a.cx, a.cy, (a.punto ? 1.9 : 1.4)*d, 0, 7); g.fill(); }
      requestAnimationFrame(pinta);
    }
    arma(); requestAnimationFrame(pinta);
    return function(){ vivo = false; };
  }

  function carga(){
    if(!MOD) return;
    var c = document.createElement('div'); c.id = 'niva-carga'; c.setAttribute('role','status'); c.setAttribute('aria-label','Cargando NIVA OS');
    var para = null;
    if(claro){
      var html = '', letras = 'NIVA OS';
      for(var i = 0; i < letras.length; i++) html += '<span style="--d:'+(i*0.07).toFixed(2)+'s">'+(letras[i] === ' ' ? '&nbsp;' : letras[i])+'</span>';
      html += '<span class="nc-punto" style="--d:.62s">.</span>';
      c.innerHTML = '<div><div class="nc-txt" aria-hidden="true">'+html+'</div><span class="nc-barra"></span></div>';
    } else {
      c.innerHTML = '<div class="nc-abajo"><span class="nc-barra"></span></div>';
    }
    document.body.appendChild(c);
    if(!claro) para = letrasEstrella(c);
    var hecho = false, inicio = Date.now();
    window.nivaListo = function(){
      if(hecho) return; hecho = true;
      setTimeout(function(){ c.classList.add('fuera'); setTimeout(function(){ if(para) para(); c.remove(); }, 450); }, Math.max(0, MINIMO - (Date.now() - inicio)));
    };
    if(!ESPERA){ if(document.readyState === 'complete') window.nivaListo(); else window.addEventListener('load', window.nivaListo); }
    setTimeout(window.nivaListo, 8000); // por si algo falla, nunca se queda pegada
  }

  function inicia(){
    encabezado();
    carga();
    if(claro) return; // en blanco no se dibuja la constelación
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
