const cases = {
  rodoviario: {
    category: "Infraestrutura viária · 2025", title: "Projeto Rodoviário Casa Nova",
    challenge: "Conceber um traçado de 48 km entre Casa Nova (BA) e o entroncamento do KM 25 em Petrolina (PE), compatível com o fluxo convencional e com o transporte de componentes eólicos.",
    action: "Modelei o eixo no Civil 3D, trabalhei o modelo digital do terreno e apliquei critérios geométricos do DNIT para curvas, superelevação, superlargura e greide.",
    outcome: "Traçado georreferenciado pronto para refinamento do greide e otimização dos volumes de corte e aterro, com decisões técnicas documentadas para as próximas etapas.",
    tags: ["Civil 3D", "DNIT", "MDT", "Terraplenagem"], images: ["img/Projetos/civil1.png", "img/Projetos/civil2.png", "img/Projetos/civil3.png"], alt: "Prancha e modelo do projeto rodoviário Casa Nova"
  },
  eletrico: {
    category: "Projetos complementares · BIM", title: "Instalações elétricas em BIM",
    challenge: "Desenvolver instalações elétricas residenciais de baixa tensão com dimensionamento, coordenação espacial e documentação consistentes.",
    action: "Modelei eletrodutos e circuitos no Revit, dimensionei cargas e demanda, equilibrei fases e detalhei quadros e dispositivos de proteção conforme a NBR 5410.",
    outcome: "Modelo coordenado com arquitetura e estrutura, plantas executivas e quantitativos automáticos para reduzir interferências e apoiar orçamento e execução.",
    tags: ["Revit", "NBR 5410", "BIM", "Quantitativos"], images: ["img/Projetos/elet1.png", "img/Projetos/elet2.png", "img/Projetos/elet3.png", "img/Projetos/elet4.png"], alt: "Modelo BIM e pranchas do projeto elétrico"
  },
  hidro: {
    category: "Instalações prediais · 2025", title: "Residência — Hidrossanitário",
    challenge: "Dimensionar água fria e esgoto sanitário para uma residência de dois pavimentos, incluindo pressurização e detalhamento de pontos críticos.",
    action: "Produzi plantas, cortes e perspectivas isométricas por ambiente, além do detalhamento do barrilete e cavalete, seguindo NBR 5626, NBR 8160 e NBR 10844.",
    outcome: "Documentação executiva coordenada, bomba pressurizadora de 9 mca especificada e levantamento quantitativo extraído do modelo.",
    tags: ["Revit MEP", "NBR 5626", "NBR 8160", "Quantitativos"], images: ["img/Projetos/hidro.png", "img/Projetos/hidro (2).png", "img/Projetos/hidro (3).png", "img/Projetos/hidro (5).png", "img/Projetos/hidro (8).png"], alt: "Modelo e detalhamentos do projeto hidrossanitário"
  },
  coordenacao: {
    category: "Gestão de projetos", title: "Coordenação multidisciplinar",
    challenge: "Organizar simultaneamente as frentes de edificações, elétrica, hidrossanitária e orçamento, mantendo escopo, prazo e qualidade contratual.",
    action: "Conduzi briefing, relacionamento com o cliente, distribuição de atividades, cronograma no Microsoft Project e verificação de colisões entre disciplinas.",
    outcome: "Fluxo de produção integrado, acompanhamento objetivo de prazos e entregáveis técnicos compatibilizados com o contrato.",
    tags: ["MS Project", "Clash Detection", "Coordenação", "Orçamento"], images: ["img/Projetos/coord.png", "img/Projetos/coord2.png"], alt: "Cronograma e documentos da coordenação multidisciplinar"
  }
};

const root = document.documentElement;
const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");
const themeButton = document.querySelector("[data-theme-toggle]");
const dialog = document.querySelector("[data-case-dialog]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const storedTheme = localStorage.getItem("portfolio-theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
root.dataset.theme = storedTheme || preferredTheme;

themeButton.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;
  localStorage.setItem("portfolio-theme", nextTheme);
  document.querySelector('meta[name="theme-color"]').content = nextTheme === "dark" ? "#0b1016" : "#f5f7f8";
});

menuButton.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!expanded));
  menuButton.querySelector(".sr-only").textContent = expanded ? "Abrir menu" : "Fechar menu";
  nav.classList.toggle("is-open", !expanded);
});

nav.addEventListener("click", (event) => {
  if (!event.target.matches("a")) return;
  nav.classList.remove("is-open"); menuButton.setAttribute("aria-expanded", "false");
  menuButton.querySelector(".sr-only").textContent = "Abrir menu";
});

window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 18), { passive: true });
const revealElements = document.querySelectorAll(".reveal");
if (prefersReducedMotion.matches) revealElements.forEach((element) => element.classList.add("is-visible"));
else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));
}

const sections = document.querySelectorAll("main section[id]");
const navLinks = [...nav.querySelectorAll("a")];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      const active = link.getAttribute("href") === `#${entry.target.id}`;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "location"); else link.removeAttribute("aria-current");
    });
  });
}, { rootMargin: "-38% 0px -55%", threshold: 0 });
sections.forEach((section) => sectionObserver.observe(section));

let activeCase = null;
let activeImageIndex = 0;
const dialogImage = dialog.querySelector("[data-dialog-image]");
const galleryCount = dialog.querySelector("[data-gallery-count]");
const galleryPrev = dialog.querySelector("[data-gallery-prev]");
const galleryNext = dialog.querySelector("[data-gallery-next]");

function renderGallery() {
  dialogImage.src = activeCase.images[activeImageIndex];
  dialogImage.alt = `${activeCase.alt} — imagem ${activeImageIndex + 1} de ${activeCase.images.length}`;
  galleryCount.textContent = `${activeImageIndex + 1} / ${activeCase.images.length}`;
  const singleImage = activeCase.images.length < 2;
  galleryPrev.hidden = singleImage; galleryNext.hidden = singleImage;
}
function moveGallery(step) { activeImageIndex = (activeImageIndex + step + activeCase.images.length) % activeCase.images.length; renderGallery(); }

document.querySelectorAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () => {
    activeCase = cases[button.dataset.project]; activeImageIndex = 0;
    dialog.querySelector("[data-dialog-category]").textContent = activeCase.category;
    dialog.querySelector("[data-dialog-title]").textContent = activeCase.title;
    dialog.querySelector("[data-dialog-challenge]").textContent = activeCase.challenge;
    dialog.querySelector("[data-dialog-action]").textContent = activeCase.action;
    dialog.querySelector("[data-dialog-outcome]").textContent = activeCase.outcome;
    dialog.querySelector("[data-dialog-tags]").replaceChildren(...activeCase.tags.map((tag) => { const span = document.createElement("span"); span.textContent = tag; return span; }));
    renderGallery(); dialog.showModal();
  });
});
galleryPrev.addEventListener("click", () => moveGallery(-1)); galleryNext.addEventListener("click", () => moveGallery(1));
dialog.querySelector("[data-dialog-close]").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener("keydown", (event) => {
  if (!activeCase || activeCase.images.length < 2) return;
  if (event.key === "ArrowLeft") moveGallery(-1); if (event.key === "ArrowRight") moveGallery(1);
});
