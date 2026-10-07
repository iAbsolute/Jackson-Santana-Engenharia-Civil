# Auditoria e proposta de redesign — Portfólio Jackson Santana

## Etapa 1 — Diagnóstico sem rodeios

### Design e UX

| Antes | Depois nesta branch |
| --- | --- |
| Hero genérico e foto ocupando quase toda a primeira dobra mobile | Proposta de valor específica, prova profissional e foto dimensionada como apoio |
| Carrosséis automáticos escondem conteúdo e repetem cards no HTML | Grade estável, escaneável e sem conteúdo duplicado |
| Hierarquia baseada em títulos grandes, mas pouca priorização de evidências | Hierarquia orientada a recrutamento: proposta, projetos, competências, trajetória e contato |
| Dourado sobre preto sem sistema completo de estados | Tokens de cor com contraste, foco visível, light/dark mode e estados consistentes |
| Interação dos cards depende de clique em `div` | Botões semânticos, diálogo nativo e navegação de galeria por teclado |

### Código, arquitetura e qualidade

- HTML anterior com mais de mil linhas, base de conteúdo escondida no DOM e blocos duplicados para marquee.
- Metadados limitados a título e viewport; não havia description, canonical, Open Graph, theme-color ou favicon.
- Modal sem `role="dialog"`, sem gestão de foco e com botões de fechar sem nome acessível.
- Imagens secundárias sem `loading="lazy"`; dependência de Font Awesome apenas para ícones básicos.
- JavaScript concentrava scroll, menu, modal, carrossel e lightbox sem modelo de dados explícito.
- A nova versão mantém HTML/CSS/JS puros, separa os estudos de caso em dados estruturados, usa `<dialog>`, respeita `prefers-reduced-motion` e elimina dependências de ícones.

### Conversão e storytelling

- O texto anterior dizia que Jackson busca aprendizado, mas não deixava claro por que deveria ser contratado.
- Projetos listavam ferramentas e escopo, porém não estruturavam problema, atuação e resultado.
- A nova narrativa abre com a proposta “projeto, obra e decisão”, apresenta provas concretas (48 km, 2+ anos, 9º período) e transforma cada projeto em estudo de caso.
- CTAs passam a seguir intenção: explorar projetos, validar perfil no LinkedIn e iniciar contato por e-mail ou WhatsApp.

## Etapa 2 — Design system

### Paleta

| Papel | Dark | Light |
| --- | --- | --- |
| Background | `#0B1016` | `#F5F7F8` |
| Superfície | `#151F2B` | `#FFFFFF` |
| Superfície suave | `#192532` | `#EAF0F3` |
| Texto principal | `#F4F7F9` | `#101820` |
| Texto secundário | `#AEBBC7` | `#536473` |
| Bordas | `#2A3948` | `#CED9DF` |
| Acento cobre | `#E69A46` | `#B86116` |
| Foco | `#76B8E8` | `#155F91` |

O cobre comunica materialidade e construção; o azul técnico aparece apenas em foco e linhas de desenho, sem cair no clichê corporativo azul dominante.

### Tipografia

- Títulos: **Manrope**, pesos 600–800. Escala fluida de `2.35rem` a `6.5rem`.
- Corpo: **IBM Plex Sans**, pesos 400–600. Corpo base de `1rem`, lead entre `1.05rem` e `1.25rem`.
- Metadados: mínimo de `0.72rem`, sempre com contraste e espaçamento adequados.

### Componentes

- Cards: superfície sólida, borda de 1 px, raio de 16 px e elevação apenas no hover.
- Botões: altura mínima de 48 px, raio de 10 px e foco de 3 px.
- Tags: pílulas compactas com borda; comunicam stack e norma sem competir com o título.
- Navegação: fixa, translúcida somente após scroll e menu mobile com estado `aria-expanded`.
- Modal: diálogo nativo, conteúdo dividido em contexto, atuação e impacto; galeria operável por teclado.

## Etapa 3 — Estrutura e fluxo

1. **Hero:** define especialidade, posicionamento e disponibilidade em poucos segundos.
2. **Projetos selecionados:** antecipa a principal evidência que recrutadores e clientes procuram.
3. **Competências:** traduz software em capacidade aplicada, evitando uma “nuvem de logos”.
4. **Perfil:** conecta postura profissional à prática de obra.
5. **Trajetória:** valida progressão, responsabilidades e formação.
6. **Contato:** encerra com uma ação direta e contextualizada.

### Modelo de card orientado a valor

```html
<article class="project-card">
  <div class="tags"><span>Stack</span><span>Norma/área</span></div>
  <h3>Nome do projeto</h3>
  <p><strong>Desafio:</strong> problema técnico ou de negócio.</p>
  <p class="project-result"><span>Entrega</span> Resultado, métrica ou artefato verificável.</p>
  <button type="button" data-project="id">Ver estudo de caso</button>
</article>
```

## Decisões que podem ser aprovadas separadamente

- Identidade visual e light/dark mode.
- Nova ordem das seções.
- Copy do hero e proposta de valor.
- Cards em formato de estudo de caso.
- Timeline simplificada.
- Modal acessível com galeria.
