/* Acessibilidade: tema claro ou escuro, tamanho do texto, fundo animado,
   animações e links sublinhados. As escolhas ficam salvas no navegador e
   valem em todas as páginas do site (index.html e login.html). */
(function () {
  var KEY = 'ms-a11y', root = document.documentElement;
  var DEF = { theme: 'dark', font: '0', bg: 'logo', motion: 'auto', links: 'off' };
  var s = {};
  try { s = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) {}
  if (s.bg && s.bg !== 'off') s.bg = 'logo'; /* o antigo modo Ondas saiu do site */
  function get(k) { return s[k] != null ? String(s[k]) : DEF[k]; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }
  var mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  /* Menos movimento quando a pessoa pede no painel ou no sistema operacional. */
  function reduced() { return get('motion') === 'reduce' || !!(mq && mq.matches); }

  var groups = [
    ['theme', 'Tema', [['dark', 'Escuro'], ['light', 'Claro']]],
    ['font', 'Tamanho do texto', [['0', 'A', 'normal'], ['1', 'A+', 'grande'], ['2', 'A++', 'maior'], ['3', 'A+++', 'muito grande']]],
    ['bg', 'Fundo animado', [['logo', 'Ligado'], ['off', 'Desligado']]],
    ['motion', 'Animações', [['auto', 'Normais'], ['reduce', 'Reduzidas']]],
    ['links', 'Links', [['off', 'Padrão'], ['on', 'Sublinhados']]]
  ];

  /* Botão flutuante e painel, criados aqui para valerem em todas as páginas. */
  var fab = document.createElement('button');
  fab.type = 'button';
  fab.className = 'a11y-fab';
  fab.setAttribute('aria-label', 'Acessibilidade');
  fab.setAttribute('aria-expanded', 'false');
  fab.setAttribute('aria-controls', 'a11y-panel');
  fab.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="4" r="2.2"/><path d="M3.6 7.4c2.7.9 5.5 1.3 8.4 1.3s5.7-.4 8.4-1.3l.5 1.9c-2 .7-4.2 1.1-6.4 1.3v3.7l2.1 7.6-1.9.5-2.7-6.9-2.7 6.9-1.9-.5 2.1-7.6v-3.7c-2.2-.2-4.4-.6-6.4-1.3z"/></svg>';

  var panel = document.createElement('div');
  panel.className = 'a11y-panel';
  panel.id = 'a11y-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-labelledby', 'a11y-title');
  panel.hidden = true;
  panel.innerHTML =
    '<div class="a11y-head"><h2 id="a11y-title">Acessibilidade</h2><button type="button" class="a11y-x" aria-label="Fechar">×</button></div>' +
    groups.map(function (g) {
      return '<div class="a11y-g" role="group" aria-labelledby="a11y-' + g[0] + '"><span class="a11y-l" id="a11y-' + g[0] + '">' + g[1] + '</span><div class="seg">' +
        g[2].map(function (o) {
          return '<button type="button" data-set="' + g[0] + '" data-val="' + o[0] + '">' + o[1] + (o[2] ? '<span class="sr"> (texto ' + o[2] + ')</span>' : '') + '</button>';
        }).join('') + '</div></div>';
    }).join('') +
    '<button type="button" class="a11y-reset">Restaurar o padrão</button>';
  document.body.appendChild(fab);
  document.body.appendChild(panel);

  function apply() {
    root.dataset.theme = get('theme');
    root.dataset.font = get('font');
    root.dataset.bg = get('bg');
    root.dataset.motion = get('motion');
    root.dataset.links = get('links');
    var bs = document.querySelectorAll('[data-set]');
    for (var i = 0; i < bs.length; i++) bs[i].setAttribute('aria-pressed', get(bs[i].dataset.set) === bs[i].dataset.val ? 'true' : 'false');
    var light = get('theme') === 'light';
    var tb = document.querySelectorAll('[data-theme-toggle]');
    for (var j = 0; j < tb.length; j++) tb[j].setAttribute('aria-label', light ? 'Ativar o modo escuro' : 'Ativar o modo claro');
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', light ? '#fafbf8' : '#0b1220');
    /* O fundo 3D e os carrosséis escutam este aviso. */
    document.dispatchEvent(new CustomEvent('ms:a11y'));
  }
  function set(k, v) { s[k] = v; save(); apply(); }

  function open() {
    panel.hidden = false;
    fab.setAttribute('aria-expanded', 'true');
    (panel.querySelector('[aria-pressed="true"]') || panel.querySelector('button')).focus();
  }
  function close(back) {
    if (panel.hidden) return;
    panel.hidden = true;
    fab.setAttribute('aria-expanded', 'false');
    if (back) fab.focus();
  }

  fab.addEventListener('click', function () { if (panel.hidden) open(); else close(true); });
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;
    var b = t.closest('[data-set]');
    if (b) { set(b.dataset.set, b.dataset.val); return; }
    if (t.closest('[data-theme-toggle]')) { set('theme', get('theme') === 'light' ? 'dark' : 'light'); return; }
    if (t.closest('[data-a11y-open]')) { e.preventDefault(); open(); return; }
    if (t.closest('.a11y-x')) { close(true); return; }
    if (t.closest('.a11y-reset')) { s = {}; save(); apply(); return; }
    if (!panel.hidden && !t.closest('#a11y-panel') && !t.closest('.a11y-fab')) close(false);
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) close(true); });
  if (mq && mq.addEventListener) mq.addEventListener('change', function () { document.dispatchEvent(new CustomEvent('ms:a11y')); });

  window.MSA11y = { get: get, reduced: reduced };
  apply();
})();
