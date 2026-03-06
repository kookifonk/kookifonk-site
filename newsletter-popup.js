(function() {
  // Ne pas afficher si déjà inscrit ou fermé récemment
  if (localStorage.getItem('kk_newsletter_done')) return;

  var popupShown = false;

  function createPopup() {
    if (popupShown) return;
    popupShown = true;

    var overlay = document.createElement('div');
    overlay.id = 'kk-popup-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(44,24,16,.55);z-index:9000;display:flex;align-items:center;justify-content:center;padding:1rem;backdrop-filter:blur(4px);';

    overlay.innerHTML = `
      <div id="kk-popup" style="background:#FDF8F0;border-radius:24px;max-width:440px;width:100%;padding:2.5rem 2rem;position:relative;box-shadow:0 24px 80px rgba(44,24,16,.25);text-align:center;font-family:'DM Sans',system-ui,sans-serif;">
        <button id="kk-popup-close" style="position:absolute;top:1rem;right:1rem;background:none;border:none;font-size:1.4rem;cursor:pointer;color:#A08070;line-height:1;">×</button>
        <div style="font-size:2.5rem;margin-bottom:1rem;">🍫</div>
        <h2 style="font-family:'Fraunces',Georgia,serif;font-size:1.6rem;font-weight:900;color:#2C1810;margin-bottom:.6rem;line-height:1.2;">-10% sur votre<br><em style="color:#C4622D;font-style:italic;">première commande</em></h2>
        <p style="font-size:.9rem;color:#6B5040;margin-bottom:1.5rem;line-height:1.6;">Rejoignez la communauté KookifonK — recettes exclusives, nouveautés en avant-première et conseils performance.</p>
        <div style="display:flex;gap:.5rem;margin-bottom:.75rem;">
          <input id="kk-popup-email" type="email" placeholder="votre@email.fr" style="flex:1;padding:.75rem 1rem;border:1.5px solid #E2CCAA;border-radius:100px;font-family:inherit;font-size:.9rem;background:#fff;outline:none;color:#2C1810;" />
          <button id="kk-popup-btn" style="background:#C4622D;color:#fff;border:none;border-radius:100px;padding:.75rem 1.25rem;font-family:inherit;font-size:.85rem;font-weight:700;cursor:pointer;white-space:nowrap;">J'en profite →</button>
        </div>
        <p id="kk-popup-msg" style="font-size:.78rem;color:#6B5040;min-height:1.2em;"></p>
        <p style="font-size:.7rem;color:#A08070;margin-top:.5rem;">Pas de spam · Désinscription en 1 clic</p>
      </div>
    `;

    document.body.appendChild(overlay);

    // Fermeture
    document.getElementById('kk-popup-close').addEventListener('click', closePopup);
    overlay.addEventListener('click', function(e) { if (e.target === overlay) closePopup(); });

    // Soumission
    document.getElementById('kk-popup-btn').addEventListener('click', submitEmail);
    document.getElementById('kk-popup-email').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') submitEmail();
    });
  }

  function closePopup() {
    var overlay = document.getElementById('kk-popup-overlay');
    if (overlay) overlay.remove();
    localStorage.setItem('kk_newsletter_done', '1');
  }

  function submitEmail() {
    var emailEl = document.getElementById('kk-popup-email');
    var msg = document.getElementById('kk-popup-msg');
    var btn = document.getElementById('kk-popup-btn');
    var email = emailEl.value.trim();

    if (!email || !email.includes('@')) {
      msg.style.color = '#C4622D';
      msg.textContent = '⚠️ Merci de saisir un email valide.';
      return;
    }

    btn.textContent = 'Envoi…';
    btn.disabled = true;

    fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': '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'
      },
      body: JSON.stringify({
        email: email,
        listIds: [6],
        updateEnabled: true,
        attributes: { SOURCE: 'popup_newsletter' }
      })
    })
    .then(function(r) {
      if (r.ok || r.status === 204 || r.status === 201) {
        msg.style.color = '#6B8F71';
        msg.textContent = '✅ Parfait ! Votre code -10% arrive par email.';
        btn.textContent = '✓ Inscrit !';
        localStorage.setItem('kk_newsletter_done', '1');
        setTimeout(closePopup, 2500);
      } else {
        return r.json().then(function(d) { throw new Error(d.message || r.status); });
      }
    })
    .catch(function(err) {
      msg.style.color = '#C4622D';
      msg.textContent = '❌ Erreur : ' + (err.message || 'réessayez.');
      btn.textContent = "J'en profite →";
      btn.disabled = false;
    });
  }

  // Déclencheur : 50% de scroll
  var triggered = false;
  window.addEventListener('scroll', function() {
    if (triggered) return;
    var scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    if (scrolled >= 0.5) {
      triggered = true;
      setTimeout(createPopup, 500);
    }
  });
})();
