/* The interactive moments of the page: the hero's rotating scenarios, the
   playground, the before/after slider and the connect tabs. */
(function () {
  /* The page opens at its top: the browser does not bring back where the
     last visit stopped, unless the address names a section. */
  try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch (e) {}
  function toTop() {
    if (location.hash) return;
    var html = document.documentElement, prev = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    html.style.scrollBehavior = prev;
  }
  toTop();
  window.addEventListener('load', toTop);
  window.addEventListener('pageshow', toTop);

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ---------- hero: three moments of a real day ---------- */
  var scenes = [
    { f: 'dec', n: 14, who: 'Claude', tb: 'Claude escreveu em Decisões/', ts: 'ADR-014 · seguiu o modelo da pasta',
      doc: '<div class="meta"><span class="ok">aceita</span><span>17 nov 2026</span><span>infra</span><span>e-mail</span></div><h3>ADR-014 · Fornecedor de e-mail</h3><h4>Contexto</h4><p>O fornecedor A não entregava no Outlook. Três clientes reclamaram na mesma semana, como registrado em <a>Reunião 2026-11-12</a>.</p><h4>Decisão</h4><p>Migrar para o fornecedor B até o fim do mês.</p>',
      you: 'Registra que escolhemos o fornecedor B para os e-mails.',
      ai: 'Li a Orientação do caderno. Decisões viram ADR numerado. <em>Criei o ADR-014 em Decisões/</em>, com contexto e link para a reunião.' },
    { f: 'ent', n: 24, who: 'ChatGPT', tb: 'ChatGPT escreveu em Entrevistas/', ts: 'Carla · nome e data no título',
      doc: '<div class="meta"><span class="ok">entrevista</span><span>17 nov 2026</span><span>varejo</span></div><h3>2026-11-17 · Carla, Loja Norte</h3><h4>O que ouvimos</h4><p>Fecha o caixa numa planilha todo fim de dia e perde quase uma hora com isso.</p><h4>Ligações</h4><p>Reforça a hipótese <a>Onboarding guiado</a>.</p>',
      you: 'Conversei com a Carla, da Loja Norte. Ela fecha o caixa numa planilha.',
      ai: 'Entrevistas levam o nome e a data no título. <em>Criei a nota em Entrevistas/</em> e liguei à hipótese que ela reforça.' },
    { f: 'pai', n: 3, who: 'Grok', tb: 'Grok criou um painel', ts: 'Pipeline de vendas · funil e Kanban',
      doc: '<div class="meta"><span class="ok">painel</span><span>tabela Pipeline</span><span>212 linhas</span></div><h3>Pipeline de vendas</h3><h4>Funil</h4><p>Lead 120 · Proposta 54 · Negociação 41 · Fechado 38</p><h4>Kanban</h4><p>Cartões agrupados por etapa, atualizados junto com a tabela.</p>',
      you: 'Monta um painel do pipeline por etapa.',
      ai: 'Li a tabela Pipeline, com 212 linhas. <em>Criei o painel</em> com um funil e um Kanban por etapa.' }
  ];
  var base = { ent: 23, hip: 9, dec: 14, reu: 41, tab: 3, pai: 2 };
  var cur = 0;
  function showScene(i) {
    var s = scenes[i], doc = $('h-doc'), chat = $('h-chat'), toast = $('h-toast');
    [doc, chat, toast].forEach(function (el) { el.classList.add('out'); });
    setTimeout(function () {
      doc.innerHTML = s.doc;
      chat.innerHTML = '<small>' + s.who + '</small><div class="msg you">' + s.you + '</div><div class="msg ai">' + s.ai + '</div>';
      $('h-tb').textContent = s.tb; $('h-ts').textContent = s.ts;
      var rows = $('h-side').querySelectorAll('[data-f]');
      for (var k = 0; k < rows.length; k++) {
        var f = rows[k].dataset.f; rows[k].classList.toggle('on', f === s.f);
        rows[k].querySelector('b').textContent = f === s.f ? s.n : base[f];
      }
      var dots = $('h-dots').children;
      for (var d = 0; d < dots.length; d++) dots[d].classList.toggle('on', d === i);
      [doc, chat, toast].forEach(function (el) { el.classList.remove('out'); });
    }, 450);
  }
  if (!reduce) setInterval(function () { if (document.hidden) return; cur = (cur + 1) % scenes.length; showScene(cur); }, 7000);

  /* ---------- capabilities tabs ---------- */
  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest("[data-cap]");
    if (!t) return;
    var tabs = document.querySelectorAll("[data-cap]");
    for (var i = 0; i < tabs.length; i++) tabs[i].setAttribute("aria-selected", tabs[i] === t ? "true" : "false");
    var panes = document.querySelectorAll("[data-pane]");
    for (var j = 0; j < panes.length; j++) panes[j].hidden = panes[j].dataset.pane !== t.dataset.cap;
  });

  /* ---------- before / after ---------- */
  var ba = $('ba'), range = $('ba-range');
  range.addEventListener('input', function () { ba.style.setProperty('--x', range.value + '%'); });

  /* ---------- connect ---------- */
  var guides = {
    claude: [['Abra Configurações e depois Conectores', 'No Claude, na web ou no app.'], ['Adicione um conector personalizado', 'Dê o nome MemorySmith e cole o endereço ao lado.'], ['Entre com a sua conta MemorySmith', 'Autorize o acesso aos seus cadernos.'], ['Peça: “O que tem nos meus cadernos?”', 'O Claude lê a Orientação e começa a trabalhar.']],
    chatgpt: [['Abra Configurações e depois Conectores', 'Em alguns planos, ative antes o modo de desenvolvedor.'], ['Crie um conector', 'Cole o endereço ao lado e escolha a autenticação OAuth.'], ['Entre com a sua conta MemorySmith', 'Autorize o acesso aos seus cadernos.'], ['Ative o conector na conversa', 'E peça o seu primeiro registro.']],
    grok: [['Abra as configurações de conectores do Grok', 'Na web ou no app.'], ['Adicione um servidor MCP remoto', 'Dê o nome MemorySmith e cole o endereço ao lado.'], ['Entre com a sua conta MemorySmith', 'Autorize o acesso aos seus cadernos.'], ['Peça o seu primeiro registro', 'O Grok lê a Orientação antes de escrever.']],
    outro: [['Procure a opção de servidor MCP remoto', 'Muitos clientes aceitam um servidor pelo endereço.'], ['Cole o endereço ao lado', 'É o mesmo para qualquer cliente.'], ['Entre com a sua conta MemorySmith', 'Pelo mesmo login do Claude, do ChatGPT e do Grok.']]
  };
  function setClient(c) {
    var tabs = document.querySelectorAll('[data-c]');
    for (var i = 0; i < tabs.length; i++) tabs[i].setAttribute('aria-selected', tabs[i].dataset.c === c ? 'true' : 'false');
    $('c-steps').innerHTML = guides[c].map(function (s) { return '<li><div><b>' + esc(s[0]) + '</b><small>' + esc(s[1]) + '</small></div></li>'; }).join('');
  }
  document.addEventListener('click', function (e) { var t = e.target.closest && e.target.closest('[data-c]'); if (t) setClient(t.dataset.c); });
  setClient('claude');
  $('c-copy').addEventListener('click', function () {
    var btn = this, url = $('c-url');
    var done = function () { btn.textContent = 'Copiado'; setTimeout(function () { btn.textContent = 'Copiar'; }, 1600); };
    var fallback = function () { var r = document.createRange(); r.selectNodeContents(url); var s = window.getSelection(); s.removeAllRanges(); s.addRange(r); btn.textContent = 'Selecionado'; setTimeout(function () { btn.textContent = 'Copiar'; }, 1600); };
    try { navigator.clipboard.writeText(url.textContent).then(done, fallback); } catch (e) { fallback(); }
  });
})();
