document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Verificação de Segurança ---
    const modal = document.getElementById("resume-modal");
    if (!modal) {
        console.error("ERRO CRÍTICO: O HTML do Modal não foi encontrado! Verifique se você colou o código <div id='resume-modal'> no final do index.html");
        return; // Para o script para não dar mais erros
    }

    // --- 2. Animação de Scroll ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });
    document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));


    // --- 3. Elementos do Modal ---
    const modalTitle = document.getElementById("modal-title");
    const modalSubtitle = document.getElementById("modal-subtitle");
    const modalBody = document.getElementById("modal-body");
    const closeBtn = document.querySelector(".close-modal");
    
    // Carrossel Interno
    const modalCarouselContainer = document.getElementById("modal-carousel-container");
    const modalTrack = document.getElementById("modal-track");
    const modalPrevBtn = document.getElementById("modal-prev-btn");
    const modalNextBtn = document.getElementById("modal-next-btn");

    let modalCurrentIndex = 0;
    let modalImages = [];

    // --- 4. Clique nos Itens (Delegação) ---
    document.addEventListener('click', function(e) {
        // Procura se o clique foi dentro de um .clickable (seja na imagem, texto ou borda)
        const clickedItem = e.target.closest('.clickable');

        if (clickedItem) {
            // Pega os dados
            const title = clickedItem.getAttribute("data-title");
            const subtitle = clickedItem.getAttribute("data-subtitle");
            const details = clickedItem.getAttribute("data-details");
            const imagesAttr = clickedItem.getAttribute("data-images");
            
            // Preenche o Modal
            if(modalTitle) modalTitle.innerText = title;
            if(modalSubtitle) modalSubtitle.innerText = subtitle;
            if(modalBody) modalBody.innerHTML = details;

            // Configura Carrossel (se houver imagens)
            if(modalTrack) {
                modalTrack.innerHTML = "";
                modalCurrentIndex = 0;
                modalTrack.style.transform = `translateX(0)`;

                if (imagesAttr && imagesAttr.trim() !== "") {
                    modalImages = imagesAttr.split(',').map(img => img.trim());
                    modalImages.forEach(imgSrc => {
                        const imgElement = document.createElement("img");
                        imgElement.src = imgSrc;
                        imgElement.classList.add("modal-img");
                        modalTrack.appendChild(imgElement);
                    });
                    if(modalCarouselContainer) modalCarouselContainer.style.display = "block";
                    
                    // Esconde botões se tiver só 1 foto
                    if (modalImages.length <= 1) {
                        if(modalPrevBtn) modalPrevBtn.style.display = "none";
                        if(modalNextBtn) modalNextBtn.style.display = "none";
                    } else {
                        if(modalPrevBtn) modalPrevBtn.style.display = "flex";
                        if(modalNextBtn) modalNextBtn.style.display = "flex";
                    }
                } else {
                    if(modalCarouselContainer) modalCarouselContainer.style.display = "none";
                }
            }

            // Abre o Modal
            modal.classList.add("open");
        }
    });

    // --- 5. Navegação do Carrossel ---
    function updateModalCarousel() {
        if(modalCarouselContainer) {
            const width = modalCarouselContainer.offsetWidth;
            modalTrack.style.transform = `translateX(-${width * modalCurrentIndex}px)`;
        }
    }

    if(modalNextBtn) modalNextBtn.addEventListener('click', (e) => { e.stopPropagation(); modalCurrentIndex = (modalCurrentIndex < modalImages.length - 1) ? modalCurrentIndex + 1 : 0; updateModalCarousel(); });
    if(modalPrevBtn) modalPrevBtn.addEventListener('click', (e) => { e.stopPropagation(); modalCurrentIndex = (modalCurrentIndex > 0) ? modalCurrentIndex - 1 : modalImages.length - 1; updateModalCarousel(); });

    // --- 6. Fechar Modal ---
    function closeModal() { modal.classList.remove("open"); }
    
    if(closeBtn) closeBtn.addEventListener("click", closeModal);
    window.addEventListener("click", (e) => { if (e.target === modal) closeModal(); }); // Clica fora
    document.addEventListener('keydown', (e) => { if (e.key === "Escape") closeModal(); }); // Tecla ESC
    window.addEventListener('resize', updateModalCarousel);
});

/* Script para mostrar/esconder o Header */
document.addEventListener('scroll', function() {
    const header = document.querySelector('#header');
    
    // Se rolar mais que 100 pixels para baixo
    if (window.scrollY > 100) {
        header.classList.add('header-visible');
    } else {
        // Se estiver no topo
        header.classList.remove('header-visible');
    }

// --- 7. Menu Mobile (Hambúrguer) ---
    const menuIcon = document.getElementById("menu-icon");
    const navLinks = document.querySelector(".nav-links");
    const navLinksItems = document.querySelectorAll(".nav-links a");

    // Abrir / Fechar ao clicar no ícone
    if (menuIcon) {
        menuIcon.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            
            // Alterna o ícone entre 'Barras' e 'X' (opcional, visual legal)
            if (navLinks.classList.contains("active")) {
                menuIcon.classList.remove("fa-bars");
                menuIcon.classList.add("fa-times");
            } else {
                menuIcon.classList.remove("fa-times");
                menuIcon.classList.add("fa-bars");
            }
        });
    }

    // Fechar o menu automaticamente ao clicar em um link
    navLinksItems.forEach(item => {
        item.addEventListener("click", () => {
            if (navLinks.classList.contains("active")) {
                navLinks.classList.remove("active");
                menuIcon.classList.remove("fa-times");
                menuIcon.classList.add("fa-bars");
            }
        });
    });
});

/* --- LÓGICA DO LIGHTBOX COM CARROSSEL (TELA CHEIA) --- */

document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('fullscreen-overlay');
    const fullImg = document.getElementById('fullscreen-img');
    const closeBtn = document.getElementById('close-fullscreen');
    
    // Novas variáveis das setas
    const fsPrevBtn = document.getElementById('fs-prev-btn');
    const fsNextBtn = document.getElementById('fs-next-btn');
    
    let currentImageArray = [];
    let currentImageIndex = 0;

    // Função para abrir o Lightbox
    function openLightbox(src, imgElement) {
        fullImg.src = src;
        overlay.classList.add('active'); 

        // Verifica se a imagem clicada faz parte de um grupo (carrossel)
        const track = imgElement.closest('.modal-carousel-track');
        if (track) {
            // Pega todas as imagens que estão neste projeto
            const imgs = Array.from(track.querySelectorAll('img'));
            currentImageArray = imgs.map(img => img.src); // Cria uma lista com os links
            currentImageIndex = imgs.indexOf(imgElement); // Descobre qual é a atual

            // Só mostra as setas se tiver mais de 1 foto
            if (currentImageArray.length > 1) {
                fsPrevBtn.style.display = 'flex';
                fsNextBtn.style.display = 'flex';
            } else {
                fsPrevBtn.style.display = 'none';
                fsNextBtn.style.display = 'none';
            }
        } else {
            // Se for uma foto isolada
            currentImageArray = [src];
            currentImageIndex = 0;
            fsPrevBtn.style.display = 'none';
            fsNextBtn.style.display = 'none';
        }
    }

    // Função para fechar o Lightbox
    function closeLightbox() {
        overlay.classList.remove('active'); 
        setTimeout(() => {
            fullImg.src = ''; 
        }, 300);
    }

    // Funções de Passar Imagem
    function fsNextImage(e) {
        if (e) e.stopPropagation(); // Evita que feche ao clicar no botão
        if (currentImageArray.length > 1) {
            currentImageIndex = (currentImageIndex + 1) % currentImageArray.length;
            fullImg.src = currentImageArray[currentImageIndex];
        }
    }

    function fsPrevImage(e) {
        if (e) e.stopPropagation();
        if (currentImageArray.length > 1) {
            currentImageIndex = (currentImageIndex - 1 + currentImageArray.length) % currentImageArray.length;
            fullImg.src = currentImageArray[currentImageIndex];
        }
    }

    // 1. Detectar clique nas imagens do Popup
    document.body.addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG' && 
           (e.target.closest('.modal-content') || e.target.closest('.carousel-item'))) {
            // Passa o link e o elemento da imagem clicada
            openLightbox(e.target.src, e.target);
        }
    });

    // 2. Eventos de Clique (Botões e Fundo)
    if (fsNextBtn) fsNextBtn.addEventListener('click', fsNextImage);
    if (fsPrevBtn) fsPrevBtn.addEventListener('click', fsPrevImage);
    closeBtn.addEventListener('click', closeLightbox);
    
    overlay.addEventListener('click', function(e) {
        // Só fecha se clicar no fundo preto escuro
        if (e.target === overlay) {
            closeLightbox();
        }
    });

    // 3. Suporte ao Teclado (ESC para sair, Setas para passar)
    document.addEventListener('keydown', function(e) {
        if (overlay.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                fsNextImage();
            } else if (e.key === 'ArrowLeft') {
                fsPrevImage();
            }
        }
    });
});
