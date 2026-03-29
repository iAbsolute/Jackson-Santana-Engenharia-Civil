/* =========================================================================
   SCRIPT.JS - LÓGICA E INTERAÇÕES DO PORTFÓLIO (Minimalista Civil)
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. EFEITO NA NAVEGAÇÃO AO ROLAR (SCROll) ---
    // Deixa o menu transparente com fundo sólido e menor ao rolar
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // --- 2. MENU MOBILE RESPONSIVO ---
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const desktopNav = document.querySelector('.desktop-nav');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            desktopNav.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            // Alterna o ícone de hambúrguer para um X
            if (desktopNav.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });

        // Fechar o menu automaticamente caso o usuário clique em um link no mobile
        const navLinks = document.querySelectorAll('.nav-link, .nav-cta');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    desktopNav.classList.remove('active');
                    mobileToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
                }
            });
        });
    }


    // --- 3. OBSERVAÇÃO DE SCROLL (FADE UP TRANQUILO E FORMAL) ---
    // Suavamente apresenta os blocos de conteúdo ao invés de aparecerem derrepente
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Gatilho dispara logo que 10% entra na tela
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Parar de observar depois de exibir a primeira vez:
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.observe-fade-up');
    fadeElements.forEach(el => scrollObserver.observe(el));


    // --- 4. DESTAQUE DO MENU ATIVO ---
    // Ilumina de 'Cobre/Ouro' a seção em que o usuário está atualmente na página
    const sections = document.querySelectorAll('.section');
    const menuLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentLevel = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Se já passou -200px da secao atual, ele entende que entramos ativamente nela
            if (scrollY >= (sectionTop - 150)) {
                currentLevel = section.getAttribute('id');
            }
        });

        menuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentLevel)) {
                link.classList.add('active');
            }
        });
    });


    // --- 5. SISTEMA DO MODAL E GALERIA (CARROSSEL DE IMAGENS) ---
    const modalOverlay = document.getElementById('general-modal');
    const closeBtn = document.querySelector('.modal-close-icon');

    const modalTitleElem = document.getElementById('modal-main-title');
    const modalSubElem = document.getElementById('modal-subtitle');
    const modalDescElem = document.getElementById('modal-desc');
    const modalHeaderLogo = document.getElementById('modal-header-logo');
    const modalHeaderLogoContainer = document.getElementById('modal-header-logo-container');
    
    // Variáveis Relacionadas ao Carrossel de Imagens no Modal
    const carouselArea = document.getElementById('modal-carousel-area');
    const activeImageElem = document.getElementById('carousel-active-image');
    const btnPrev = document.getElementById('carousel-prev');
    const btnNext = document.getElementById('carousel-next');
    const indicatorsArea = document.getElementById('carousel-indicators');

    // Variáveis Lightbox (Fullscreen)
    const lightboxOverlay = document.getElementById('lightbox-overlay');
    const lightboxImg = document.getElementById('lightbox-img');
    const btnFullscreen = document.getElementById('btn-fullscreen');
    const lightboxCloseBtn = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    let currentImageArray = [];
    let currentImageIndex = 0;

    // Função Interna para Atualizar a Visão da Imagem e Lightbox
    const renderCarouselState = () => {
        if (currentImageArray.length > 0) {
            // Atualiza a fonte da imagem (com fade para n ficar quebrado)
            activeImageElem.style.opacity = 0;
            if (lightboxOverlay.classList.contains('active')) {
                lightboxImg.style.opacity = 0;
            }

            setTimeout(() => {
                activeImageElem.src = currentImageArray[currentImageIndex];
                activeImageElem.style.opacity = 1;
                
                if (lightboxOverlay.classList.contains('active')) {
                    lightboxImg.src = currentImageArray[currentImageIndex];
                    lightboxImg.style.opacity = 1;
                }
            }, 150); // micro retardo
            
            // Atualiza bolinhas (indicators)
            const dots = indicatorsArea.querySelectorAll('.carousel-dot');
            dots.forEach((dot, index) => {
                if (index === currentImageIndex) dot.classList.add('active');
                else dot.classList.remove('active');
            });
        }
    };

    // Navegação Botões Setas do Carrossel e do Lightbox
    const goNextImage = (e) => {
        if(e) e.stopPropagation();
        if(currentImageArray.length > 0) {
            currentImageIndex = (currentImageIndex + 1) % currentImageArray.length; // Volta pro início
            renderCarouselState();
        }
    };

    const goPrevImage = (e) => {
        if(e) e.stopPropagation();
        if(currentImageArray.length > 0) {
            currentImageIndex = (currentImageIndex - 1 + currentImageArray.length) % currentImageArray.length; // Vai pro final se tivar no início
            renderCarouselState();
        }
    };

    btnNext.addEventListener('click', goNextImage);
    btnPrev.addEventListener('click', goPrevImage);
    lightboxNext.addEventListener('click', goNextImage);
    lightboxPrev.addEventListener('click', goPrevImage);

    // Eventos do Lightbox
    btnFullscreen.addEventListener('click', () => {
        if(currentImageArray.length > 0) {
            lightboxImg.src = currentImageArray[currentImageIndex];
            lightboxOverlay.classList.add('active');
            
            // Oculta setas do lightbox se só tiver 1 imagem
            if(currentImageArray.length <= 1) {
                lightboxNext.style.display = 'none';
                lightboxPrev.style.display = 'none';
            } else {
                lightboxNext.style.display = 'block';
                lightboxPrev.style.display = 'block';
            }
        }
    });

    const closeLightbox = () => {
        lightboxOverlay.classList.remove('active');
    };

    lightboxCloseBtn.addEventListener('click', closeLightbox);

    lightboxOverlay.addEventListener('click', (e) => {
        // Se clicar fora da imagem ou botões, fecha
        if (e.target === lightboxOverlay) {
            closeLightbox();
        }
    });

    // Função de ABRE o Modal
    const triggerButtons = document.querySelectorAll('.clickable-modal');
    
    triggerButtons.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Qual ID precisamos buscar lá no nosso "Data Store"?
            const refId = card.getAttribute('data-modal');
            const dataSource = document.getElementById(refId);

            if (dataSource) {
                // 1. Coleta Textos
                modalTitleElem.textContent = dataSource.getAttribute('data-title');
                modalSubElem.textContent = dataSource.getAttribute('data-subtitle');
                modalDescElem.innerHTML = dataSource.innerHTML; // Puxa todo interior em HTML (<p>, etc)
                
                // 1.5 Coleta e Montagem da Logo (Opcional p/ Histórico)
                const logoData = dataSource.getAttribute('data-logo');
                if (logoData && logoData.trim() !== "") {
                    modalHeaderLogo.src = logoData;
                    modalHeaderLogoContainer.style.display = 'flex';
                } else {
                    modalHeaderLogo.src = '';
                    modalHeaderLogoContainer.style.display = 'none';
                }

                // 2. Coleta Imagens (Verifica se Existe)
                const imgData = dataSource.getAttribute('data-images');
                if (imgData && imgData.trim() !== "") {
                    // Prepara Array transformando a string com "," num array de urls
                    currentImageArray = imgData.split(',').map(url => url.trim());
                    currentImageIndex = 0; 
                    
                    // Mostra o componente do carrossel
                    carouselArea.style.display = 'flex';
                    
                    // Esconde botões caso só exista 1 foto (não precisa navegar)
                    if(currentImageArray.length <= 1) {
                        btnNext.style.display = 'none';
                        btnPrev.style.display = 'none';
                        indicatorsArea.innerHTML = ''; 
                    } else {
                        btnNext.style.display = 'flex';
                        btnPrev.style.display = 'flex';
                        
                        // Cria os pontinhos dinâmicos
                        indicatorsArea.innerHTML = '';
                        currentImageArray.forEach((_, index) => {
                            const dot = document.createElement('div');
                            dot.classList.add('carousel-dot');
                            if(index === 0) dot.classList.add('active');
                            
                            // Permite clique na bolinha
                            dot.addEventListener('click', () => {
                                currentImageIndex = index;
                                renderCarouselState();
                            });
                            indicatorsArea.appendChild(dot);
                        });
                    }

                    // Força primeira renderização das fotos
                    renderCarouselState();

                } else {
                    // Limpa array e desabilita Carrossel (Como ocorre na sessão Trajetória que não precisa)
                    currentImageArray = [];
                    carouselArea.style.display = 'none';
                }

                // 3. Exibe o painel escuro fixo 
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Tranca o scroll atrás pra não bagunçar
            }
        });
    });

    // Função de FECHA o Modal
    const closeModal = () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto'; // Libera o fundo

        // Retardar a limpeza dos dados pra que seja invisível e limpo
        setTimeout(() => {
            modalTitleElem.textContent = '';
            modalSubElem.textContent = '';
            modalDescElem.innerHTML = '';
            modalHeaderLogo.src = '';
            activeImageElem.src = '';
            currentImageArray = [];
        }, 300);
    };

    closeBtn.addEventListener('click', closeModal);

    // Fechar caso usuário clique fora do bloco da caixa (No overlay translúcido)
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Eventos Globais de Teclado
    window.addEventListener('keydown', (e) => {
        // Tecla ESC para fechar
        if (e.key === 'Escape') {
            if (lightboxOverlay.classList.contains('active')) {
                closeLightbox(); // Fecha só a imagem full se tiver aberta
            } else if (modalOverlay.classList.contains('active')) {
                closeModal(); // Ou fecha o modal todo
            }
        }

        // Setas direcionais do teclado para navegação de fotos
        if (modalOverlay.classList.contains('active') && currentImageArray.length > 1) {
            if (e.key === 'ArrowRight') {
                goNextImage();
            } else if (e.key === 'ArrowLeft') {
                goPrevImage();
            }
        }
    });
});
