const projects = {
  rodoviario: {
    code: "PRJ–01", kicker: "INFRAESTRUTURA VIÁRIA · DISCIPLINA DE ESTRADAS · 2025", title: "Projeto Rodoviário Casa Nova",
    description: "Projeto geométrico de uma rodovia com 48 km entre Casa Nova (BA) e o entroncamento do KM 25 em Petrolina (PE). O traçado considera o fluxo convencional e a logística de cargas especiais para componentes eólicos, com refinamento de greide e otimização de volumes de terraplenagem.",
    image: "https://raw.githubusercontent.com/iAbsolute/Jackson-Santana-Engenharia-Civil/main/img/Projetos/civil3.png",
    specs: [["TIPOLOGIA","Rodovia / infraestrutura"],["EXTENSÃO","48 km"],["FERRAMENTA","Autodesk Civil 3D"],["ESCOPO","Traçado, greide e terraplenagem"]]
  },
  eletrico: {
    code: "PRJ–02", kicker: "INSTALAÇÕES PREDIAIS · PROJETO PARA CLIENTE", title: "Instalações Elétricas em BIM",
    description: "Projeto de instalações elétricas de baixa tensão conforme a NBR 5410: modelagem, plantas, dimensionamento de eletrodutos e cargas, equilíbrio de fases e detalhamento de quadros e dispositivos de proteção. A metodologia BIM apoiou a compatibilização e a extração de quantitativos.",
    image: "https://raw.githubusercontent.com/iAbsolute/Jackson-Santana-Engenharia-Civil/main/img/Projetos/elet2.png",
    specs: [["TIPOLOGIA","Instalações elétricas"],["NORMA","NBR 5410"],["FERRAMENTA","Revit / BIM"],["ESCOPO","Modelagem, demanda e proteção"]]
  },
  hidro: {
    code: "PRJ–03", kicker: "SANEAMENTO PREDIAL · CAPACITAÇÃO PRÁTICA · 2025", title: "Residência Hidrossanitária",
    description: "Projeto para residência unifamiliar de dois pavimentos, incluindo água fria, esgoto sanitário, bomba pressurizadora de 9 mca, plantas, cortes, isométricos, barrilete e cavalete. A documentação foi estruturada para apoiar execução e levantamento quantitativo.",
    image: "https://raw.githubusercontent.com/iAbsolute/Jackson-Santana-Engenharia-Civil/main/img/Projetos/hidro%20(5).png",
    specs: [["TIPOLOGIA","Residencial / 2 pavimentos"],["NORMAS","NBR 5626 · 8160 · 10844"],["FERRAMENTA","Revit MEP"],["ESCOPO","Água fria e esgoto sanitário"]]
  },
  coordenacao: {
    code: "PRJ–04", kicker: "GESTÃO TÉCNICA · COORDENAÇÃO MULTIDISCIPLINAR", title: "Coordenação Multidisciplinar",
    description: "Coordenação de equipes e gestão simultânea de modelos de edificações, instalações elétricas e hidrossanitárias, além das matrizes de orçamento. O trabalho incluiu briefing, contato com cliente, controle de prazos, verificação de colisões e aderência ao contrato.",
    image: "https://raw.githubusercontent.com/iAbsolute/Jackson-Santana-Engenharia-Civil/main/img/Projetos/coord2.png",
    specs: [["TIPOLOGIA","Coordenação de projetos"],["DISCIPLINAS","Arquitetura · Elétrica · Hidro"],["FERRAMENTAS","BIM · MS Project · Excel"],["ESCOPO","Prazo, custos e clash detection"]]
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const loader = document.querySelector(".preloader");
  const loaderText = document.querySelector("#loader-text");
  let progress = 0;
  const finishLoader = () => {
    loader.classList.add("is-done");
    sessionStorage.setItem("portfolio-loaded", "true");
  };
  if (reduced || sessionStorage.getItem("portfolio-loaded")) finishLoader();
  else {
    const loadTimer = setInterval(() => {
      progress = Math.min(100, progress + Math.ceil(Math.random() * 18));
      loaderText.textContent = progress < 70 ? `LOCANDO EIXOS — ${String(progress).padStart(2,"0")}%` : progress < 100 ? `VERIFICANDO COTAS — ${progress}%` : "ESTRUTURA LIBERADA — 100%";
      if (progress === 100) { clearInterval(loadTimer); setTimeout(finishLoader, 420); }
    }, 120);
    setTimeout(finishLoader, 2600);
  }

  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#site-nav");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 45);
  onScroll(); window.addEventListener("scroll", onScroll, {passive:true});
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.textContent = open ? "FECHAR" : "MENU";
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => { nav.classList.remove("is-open"); menuButton.setAttribute("aria-expanded","false"); menuButton.textContent="MENU"; }));

  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add("is-visible"); revealObserver.unobserve(entry.target); }
  }), { threshold: .12 });
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  const words = ["ENGENHARIA CIVIL", "MODELAGEM BIM", "INFRAESTRUTURA", "GESTÃO DE OBRAS"];
  const typeTarget = document.querySelector("#typewriter");
  let wordIndex = 0, charIndex = words[0].length, deleting = true;
  if (!reduced) setInterval(() => {
    const word = words[wordIndex];
    if (deleting) { charIndex--; if (charIndex <= 0) { deleting = false; wordIndex = (wordIndex + 1) % words.length; } }
    else { charIndex++; if (charIndex >= words[wordIndex].length) deleting = true; }
    typeTarget.textContent = words[wordIndex].slice(0, Math.max(0,charIndex)) + (deleting ? "_" : "▌");
  }, 115);

  const cursor = document.querySelector(".cursor-coordinates");
  window.addEventListener("pointermove", event => {
    cursor.style.left = `${event.clientX}px`; cursor.style.top = `${event.clientY}px`;
    cursor.textContent = `X ${String(event.clientX).padStart(4,"0")} · Y ${String(event.clientY).padStart(4,"0")}`;
  }, {passive:true});

  const rail = document.querySelector(".project-rail");
  document.querySelectorAll("[data-view]").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll("[data-view]").forEach(btn => btn.classList.toggle("is-active", btn === button));
    rail.classList.toggle("is-blueprint", button.dataset.view === "blueprint");
  }));
  rail.addEventListener("keydown", event => {
    if (event.key === "ArrowRight") rail.scrollBy({left: Math.min(innerWidth*.7,780),behavior:"smooth"});
    if (event.key === "ArrowLeft") rail.scrollBy({left:-Math.min(innerWidth*.7,780),behavior:"smooth"});
  });

  const dialog = document.querySelector("#project-dialog");
  const closeDialog = () => dialog.close();
  document.querySelector(".dialog-close").addEventListener("click", closeDialog);
  dialog.addEventListener("click", event => { if (event.target === dialog) closeDialog(); });
  document.querySelectorAll(".project-panel").forEach(panel => panel.querySelector("button").addEventListener("click", () => {
    const data = projects[panel.dataset.project];
    document.querySelector("#dialog-code").textContent = data.code;
    document.querySelector("#dialog-kicker").textContent = data.kicker;
    document.querySelector("#dialog-title").textContent = data.title;
    document.querySelector("#dialog-description").textContent = data.description;
    const image = document.querySelector("#dialog-image"); image.src = data.image; image.alt = `Documento técnico de ${data.title}`;
    document.querySelector("#dialog-specs").innerHTML = data.specs.map(([term,value]) => `<div><dt>${term}</dt><dd>${value}</dd></div>`).join("");
    dialog.showModal();
  }));

  const sections = [...document.querySelectorAll("main section[id]")];
  const activeObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    nav.querySelectorAll("a").forEach(link => link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`));
  }), { rootMargin: "-35% 0px -55%" });
  sections.forEach(section => activeObserver.observe(section));
});

