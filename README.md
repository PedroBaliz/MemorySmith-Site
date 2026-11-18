# MemorySmith — Landing page

Landing page estática do MemorySmith, organizada em HTML, CSS e JavaScript separados.

## Estrutura

```
memorysmith-site/
├── index.html          # Estrutura e conteúdo da página
├── css/
│   └── style.css       # Todos os estilos (layout, cores, responsividade)
├── js/
│   ├── main.js         # Interações: cenas do hero, abas, slider antes/depois, guias de conexão
│   └── background.js   # Fundo 3D com Three.js (modos "Logo" e "Ondas")
└── assets/
    └── logo.svg        # Logo usado no cabeçalho, rodapé e favicon
```

## Como rodar

Basta abrir o `index.html` no navegador. Para evitar restrições de arquivos locais, prefira um servidor simples:

```bash
# Python
python -m http.server 8000
# ou Node
npx serve .
```

Depois acesse http://localhost:8000.

## Dependências externas (via CDN)

- [Three.js r128](https://threejs.org/) — fundo 3D animado
- Google Fonts — Inter, Space Grotesk e JetBrains Mono

É preciso estar conectado à internet para carregar as fontes e o fundo 3D.
