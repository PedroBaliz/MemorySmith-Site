# MemorySmith — Landing page

Site estático de apresentação do MemorySmith, um produto de cadernos em Markdown que ensinam a IA (Claude, ChatGPT, Grok) a escrever do jeito da pessoa, no lugar certo. Feito com HTML, CSS e JavaScript puros, sem framework.

## Como abrir

Abra o `index.html` no navegador. Para evitar restrições do navegador com arquivos locais, prefira um servidor simples:

```bash
python -m http.server 8000   # ou: npx serve .
```

Depois acesse http://localhost:8000. É preciso internet para carregar as fontes (Google Fonts) e o Three.js do fundo 3D.

## Estrutura

```
├── index.html            Página inicial: todas as seções do site
├── login.html            Página de login
├── css/
│   └── style.css         Todos os estilos: layout, temas claro/escuro, responsividade
├── js/
│   ├── a11y.js           Painel de acessibilidade e tema (usado nas duas páginas)
│   ├── main.js           Interações da página inicial
│   ├── login.js          Validação e demonstração do login
│   └── background.js     Fundo 3D com Three.js (modos Logo e Ondas)
└── assets/
    ├── logo.svg          Logo do cabeçalho, rodapé e favicon
    └── img/              Imagens do carrossel (SVG)
```

## Seções e recursos

| Recurso | Onde está |
|---|---|
| Cabeçalho fixo com menu, botão de tema e Entrar | topo das duas páginas |
| Hero com tela do produto que troca de cena a cada 7 s | `#hero` |
| Abas de capacidades (editor, planilha, BI, projetos, drive, busca) | `#capacidades` |
| Cartões explicativos (Orientação, pastas, modelos, trilha, Para quem, Seu de verdade) | várias seções |
| Comparação antes/depois com controle deslizante | seção Modelos de pasta |
| **Carrossel de imagens** com os modelos da comunidade | `#modelos` |
| Guia de conexão com abas por IA e botão Copiar | `#conectar` |
| **Perguntas com pesquisa e abas por tema** | `#faq` |
| **Contato com formulário validado** | `#contato` |
| **Página de login** | `login.html` |
| **Aba de acessibilidade** (tema, texto, fundo, animações, links) | botão azul no canto inferior direito |
| **Modo claro e escuro** | botão de sol/lua no cabeçalho e no painel |
| Rodapé com links | fim das duas páginas |

## Como o site foi construído, passo a passo

1. **Estrutura em HTML semântico.** Cada parte do site é uma `<section>` com um título `<h2>`, dentro de `<main>`, com `<header>` e `<footer>`. A página é toda em português (`lang="pt-BR"`).
2. **Identidade visual em variáveis CSS.** As cores, fontes e espaçamentos ficam em variáveis no `:root` de `css/style.css` (`--night`, `--paper`, `--blue`, `--orange`...). A página alterna faixas escuras (noite) e painéis claros (papel), um "momento" por rolagem.
3. **Layout responsivo.** CSS Grid e Flexbox, tamanhos com `clamp()` e regras `@media` para celular (720 px e menos), tablet e desktop.
4. **Interações em JavaScript puro** (`js/main.js`): troca de cenas do hero, abas de capacidades, controle antes/depois, guias de conexão e botão Copiar.
5. **Fundo 3D** (`js/background.js`): o logo desenhado em partículas com Three.js, que se desfaz ao rolar e se junta no final. Há também o modo Ondas.
6. **Acessibilidade** (`js/a11y.js`): painel com tema claro/escuro, quatro tamanhos de texto, fundo animado (Logo, Ondas ou Desligado), animações reduzidas e links sublinhados. As escolhas ficam salvas no `localStorage` e valem nas duas páginas. Um script curto no `<head>` aplica a escolha antes de desenhar a página, para o tema não piscar.
7. **Modo claro.** As variáveis de cor trocam de valor com `:root[data-theme="light"]`. As telas do produto (janela do app, planilha, painel, Kanban) continuam escuras, como prints de um app de tema escuro.
8. **Carrossel** (`#modelos`): quatro imagens SVG desenhadas na paleta do site, com botões, bolinhas, setas do teclado, deslizar com o dedo, troca automática a cada 6 s e botão de pausar.
9. **Perguntas com pesquisa**: busca que ignora acentos e maiúsculas e abas Todas, Produto, Privacidade e Conta.
10. **Formulários** (contato e login): rótulos ligados a cada campo, mensagens de erro embaixo do campo, foco levado ao primeiro erro e mensagem de resultado anunciada a leitores de tela. São demonstrações: nada é enviado a um servidor.
11. **Versões no GitHub**: cada etapa acima foi registrada num commit separado. Veja o histórico com `git log` ou na aba Commits do repositório.

## Acessibilidade (WCAG 2.2)

- Contraste verificado em todos os pares de texto e fundo, nos dois temas: o texto principal passa de 15:1 e nenhum texto fica abaixo de 4,5:1 (nível AA).
- Link "Pular para o conteúdo" e foco visível em todos os controles.
- Tudo funciona pelo teclado. O painel de acessibilidade fecha com `Esc`.
- Imagens com texto alternativo e elementos decorativos com `aria-hidden`.
- Carrossel com pausa (critério 2.2.2) e anúncio do slide atual.
- Respeita a preferência do sistema por menos movimento (`prefers-reduced-motion`).

## Paleta de cores

| Cor | Hex | Uso |
|---|---|---|
| Noite | `#0b1220` | Fundo do tema escuro |
| Papel | `#edefec` | Painéis claros |
| Tinta | `#0e1526` | Texto sobre fundos claros |
| Azul | `#0f56d7` / `#4c8dff` | Cor principal da marca, links, balões |
| Laranja | `#ff8a2b` / `#ff9a45` | Ações e destaques (botões, palavra em gradiente) |
| Verde | `#16a34a` / `#34c97a` | Confirmações e ligações entre notas |

## Dependências externas

- [Three.js r128](https://threejs.org/), via cdnjs, para o fundo 3D
- Google Fonts: Inter, Space Grotesk e JetBrains Mono
