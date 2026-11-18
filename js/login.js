/* Página de login: mostrar ou ocultar a senha, validação acessível e um
   login de demonstração. Nenhum dado sai do navegador. */
(function () {
  function $(id) { return document.getElementById(id); }
  var form = $('login-form');
  if (!form) return;
  var pass = $('lg-pass'), toggle = $('lg-toggle'), status = $('lg-status'), submit = $('lg-submit');

  toggle.addEventListener('click', function () {
    var show = pass.type === 'password';
    pass.type = show ? 'text' : 'password';
    toggle.setAttribute('aria-pressed', show ? 'true' : 'false');
    toggle.textContent = show ? 'Ocultar' : 'Mostrar';
    toggle.setAttribute('aria-label', show ? 'Ocultar senha' : 'Mostrar senha');
  });

  var rules = [
    ['lg-email', function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Escreva um e-mail válido, como nome@exemplo.com.'; }],
    ['lg-pass', function (v) { return v.length >= 8 ? '' : 'A senha tem pelo menos 8 caracteres.'; }]
  ];
  function check(r) {
    var el = $(r[0]), msg = r[1](el.value);
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    $(r[0] + '-err').textContent = msg;
    return msg;
  }
  function say(kind, text) { status.className = 'form-status ' + kind; status.textContent = text; }

  rules.forEach(function (r) {
    $(r[0]).addEventListener('blur', function () { if (this.value || this.getAttribute('aria-invalid') === 'true') check(r); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var first = null;
    rules.forEach(function (r) { if (check(r) && !first) first = $(r[0]); });
    if (first) { say('bad', 'Confira os campos destacados.'); first.focus(); return; }
    submit.disabled = true;
    submit.textContent = 'Entrando…';
    setTimeout(function () {
      submit.disabled = false;
      submit.textContent = 'Entrar';
      say('ok', 'Login de demonstração concluído. No MemorySmith de verdade, você iria agora para os seus cadernos.');
    }, 900);
  });

  $('lg-forgot').addEventListener('click', function (e) {
    e.preventDefault();
    if (check(rules[0])) { say('bad', 'Escreva o seu e-mail acima para receber o link de nova senha.'); $('lg-email').focus(); return; }
    say('ok', 'Se houver uma conta com esse e-mail, enviaremos um link para criar uma nova senha.');
  });
})();
