# Auditoria e reformulação — Jackson Santana | Engenharia Civil

## Diagnóstico UX/UI e visão de recrutador

### Teste dos 5 segundos

O site atual comunica “estudante de engenharia com muitas ferramentas”, mas ainda não comunica com força “profissional pronto para contribuir em projeto e obra”. A hero é correta, porém genérica; o recrutador precisa encontrar imediatamente o seu posicionamento, sua fase de formação, as frentes em que já atuou e uma evidência técnica concreta.

Na reformulação, a primeira tela passa a responder quatro perguntas sem esforço: quem é Jackson, em que área atua, que tipo de entrega domina e como examinar seus projetos.

### Fragilidades observadas

- Hero e cards seguem um padrão comum de template corporativo e não criam associação imediata com engenharia civil.
- “Fale Conosco” faz o candidato parecer uma empresa e enfraquece a relação direta com o recrutador.
- Marquees automáticos duplicam projetos e competências no HTML, aumentam ruído e retiram controle da navegação.
- As competências são apresentadas por software, não pelo resultado técnico que produzem.
- Conteúdos importantes ficam escondidos em modais longos; faltam metadados comparáveis entre projetos.
- O texto alterna entre afirmações fortes e descrições amplas sem hierarquia de evidência.
- Imagens de até vários megabytes e fundos pesados comprometem carregamento e percepção de rigor.
- Há inconsistências editoriais como “TYPECAD”, “sensoremamento”, “experiencia” e o tom institucional “conosco”.

### Como o portfólio técnico ganha força

Cada projeto foi reestruturado como uma prancha técnica, com tipologia, ferramenta, escopo, norma ou dimensão relevante. A competência deixa de ser um inventário de logos e passa a ser uma matriz que conecta ferramenta, aplicação e nível declarado. A trajetória resume responsabilidade concreta: orçamento, fiscalização, diário de obra, licitação, negociação, prazos e qualidade documental.

## Documento de reformulação

### Conceito e direção de arte

**Conceito:** “Do traço à execução”. O portfólio se comporta como um conjunto de pranchas e memoriais, não como uma landing page de produto.

**Paleta:** Papel técnico `#EDE9DF`; papel envelhecido `#DDD7CB`; concreto `#C9C3B8`; grafite estrutural `#151814`; azul prussiano `#153044`; terracota de marcação `#A24A2A`; aço `#687177`.

**Tipografia:** Barlow Condensed para títulos monumentais e IBM Plex Mono para carimbos, cotas e metadados. Texto corrido usa uma sans-serif de sistema para leitura rápida.

**Grid:** colunas largas com eixos aparentes de 9vw, linhas de nível, bordas de prancha e numeração sequencial. O grid não é apenas decorativo: orienta hierarquia, alinhamento e ritmo.

### Experiência de entrada

- `0,0–0,4 s`: fundo grafite; surgem os eixos horizontal e vertical.
- `0,4–1,2 s`: a marca de locação é construída no cruzamento e o contador informa “Locando eixos”.
- `1,2–2,0 s`: o texto muda para “Verificando cotas”; a malha já está definida.
- `2,0–2,4 s`: “Estrutura liberada”; a tela sobe como uma proteção retirada da prancha.
- A animação ocorre uma vez por sessão e é eliminada quando o visitante prefere movimento reduzido.
- Na hero, título monumental, retrato em tratamento monocromático e carimbo técnico identificam nome, disciplina e status. O campo “Disciplina” alterna por digitação entre Engenharia Civil, BIM, Infraestrutura e Gestão de Obras.

### Arquitetura das seções

1. **Hero / Prancha JS–001:** posicionamento, carimbo, retrato e rotas para projetos ou contato.
2. **Perfil:** texto curto de proposta profissional e três dados verificáveis: formação, experiência e foco.
3. **Projetos selecionados:** trilho horizontal controlado pelo visitante, com quatro painéis em escala editorial. Cada painel exibe código, tipologia, software, ano, escopo e um memorial detalhado.
4. **Matriz de competências:** AutoCAD, Revit, CypeCAD, Civil 3D, QGIS, Project e Excel ligados a aplicações reais e nível declarado.
5. **Trajetória:** cronologia direta de UNIVASF, Jardim Casa Alta, Engecol e Concretize Júnior, priorizando responsabilidades.
6. **Contato:** chamada pessoal, e-mail, WhatsApp e LinkedIn; sem formulário genérico ou linguagem de agência.

### Carrossel de projetos

O mostruário horizontal usa `scroll-snap`, aceita gesto, roda do mouse/trackpad e setas do teclado. Não existe autoplay. Cada projeto traz código de prancha, tipologia, disciplina, ferramenta, contexto/ano, dimensão ou norma e resumo de escopo. Ao abrir, o memorial apresenta os dados em formato comparável e uma imagem técnica em escala maior.

### Microinterações temáticas

1. Cursor de coordenadas X/Y apenas em dispositivos de ponteiro preciso.
2. Preloader de locação com eixos, marco central e validação de cotas.
3. Alternância “Original / Leitura técnica”, transformando as imagens em uma leitura monocromática azul de prancha.
4. Linhas de cota e níveis que acompanham imagens e elementos estruturais, com revelação progressiva no scroll.

### Critérios de acessibilidade e desempenho

- Respeito a `prefers-reduced-motion`.
- Navegação por teclado no trilho de projetos e no diálogo nativo.
- Contraste alto, focos preservados e textos alternativos descritivos.
- Sem bibliotecas de ícones ou frameworks pesados; HTML, CSS e JavaScript nativos.
- Imagens principais carregadas a partir dos ativos já existentes; recomenda-se comprimir os arquivos QGIS e fundos acima de 1 MB antes de recolocá-los em destaque.

