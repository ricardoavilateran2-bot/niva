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
  document.head.appendChild(st);

  function inicia(){
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
