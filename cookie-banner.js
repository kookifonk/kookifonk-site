// KookifonK — Cookie Banner (bloquant — choix obligatoire)
(function() {
  if (localStorage.getItem('kk_cookie_consent')) return;

  var style = document.createElement('style');
  style.textContent = '#kk-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(44,24,16,.6);z-index:9998;backdrop-filter:blur(3px);}#kk-cookie{position:fixed;bottom:0;left:0;right:0;background:#2C1810;color:#FDF8F0;padding:1.5rem 2rem;display:flex;align-items:center;justify-content:space-between;gap:1.5rem;z-index:9999;box-shadow:0 -4px 32px rgba(44,24,16,.4);flex-wrap:wrap;}#kk-cookie p{font-size:.88rem;color:rgba(253,248,240,.85);max-width:680px;font-family:"DM Sans",system-ui,sans-serif;line-height:1.6;}#kk-cookie p a{color:#D4873E;text-decoration:underline;}#kk-cookie p strong{color:#FDF8F0;}#kk-cookie-btns{display:flex;gap:.75rem;flex-shrink:0;}#kk-cookie button{font-family:"DM Sans",system-ui,sans-serif;font-size:.85rem;font-weight:600;padding:.65rem 1.5rem;border-radius:100px;cursor:pointer;border:2px solid transparent;transition:all .2s ease;}#kk-accept{background:#C4622D;color:#fff;border-color:#C4622D;}#kk-accept:hover{background:#A04820;}#kk-refuse{background:transparent;color:rgba(253,248,240,.8);border-color:rgba(253,248,240,.35);}#kk-refuse:hover{border-color:rgba(253,248,240,.8);color:#FDF8F0;}@media(max-width:600px){#kk-cookie{flex-direction:column;text-align:center;}#kk-cookie-btns{justify-content:center;width:100%;}#kk-cookie button{flex:1;}}';
  document.head.appendChild(style);

  var overlay = document.createElement('div');
  overlay.id = 'kk-overlay';
  document.body.appendChild(overlay);

  var banner = document.createElement('div');
  banner.id = 'kk-cookie';
  banner.innerHTML = '<p>🍪 <strong>Avant de continuer</strong> — Ce site utilise des cookies analytiques (Google Analytics) pour mesurer son audience. Ces cookies ne sont déposés qu\'avec votre accord. Les cookies fonctionnels sont toujours actifs. <a href="legal.html">En savoir plus</a>.</p><div id="kk-cookie-btns"><button id="kk-refuse">Refuser</button><button id="kk-accept">Accepter</button></div>';
  document.body.appendChild(banner);

  function dismiss(accepted) {
    localStorage.setItem('kk_cookie_consent', accepted ? 'accepted' : 'refused');
    overlay.style.transition = 'opacity .3s';
    overlay.style.opacity = '0';
    banner.style.transition = 'transform .3s ease';
    banner.style.transform = 'translateY(110%)';
    setTimeout(function(){
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      if (banner.parentNode) banner.parentNode.removeChild(banner);
    }, 350);
  }

  document.getElementById('kk-accept').addEventListener('click', function(){ dismiss(true); });
  document.getElementById('kk-refuse').addEventListener('click', function(){ dismiss(false); });
})();
