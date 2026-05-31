/* ═══════════════════════════════════════════════════════════════════
   🎯 NAVBAR SCROLL EFFECT
   Muda o estilo da navbar quando o usuário faz scroll
   ═══════════════════════════════════════════════════════════════════ */

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


/* ═══════════════════════════════════════════════════════════════════
   📱 MOBILE MENU TOGGLE
   Gerencia a abertura e fechamento do menu em telas pequenas
   ═══════════════════════════════════════════════════════════════════ */

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenuBtn.classList.toggle('active');
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '60px';
  navLinks.style.left = '0';
  navLinks.style.right = '0';
  navLinks.style.flexDirection = 'column';
  navLinks.style.background = 'rgba(10,10,15,0.95)';
  navLinks.style.padding = '1rem';
  navLinks.style.gap = '0.5rem';
  navLinks.style.zIndex = '99';
});


/* ═══════════════════════════════════════════════════════════════════
   🔢 CONTADOR ANIMADO
   Anima os números de estatísticas ao fazer scroll até a seção
   ═══════════════════════════════════════════════════════════════════ */

const animateCounters = () => {
  const statCards = document.querySelectorAll('.stat-card[data-target]');

  statCards.forEach(card => {
    const target = parseInt(card.dataset.target);
    const counter = card.querySelector('.counter');
    let current = 0;
    const increment = target / 30;

    // Cria um Intersection Observer para detectar quando o elemento entra na viewport
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && counter.textContent === '0') {
        // Se o elemento é visível e o contador ainda não foi iniciado
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.floor(current);
            setTimeout(updateCounter, 30);
          } else {
            counter.textContent = target;
          }
        };
        updateCounter();
        observer.unobserve(card);
      }
    }, { threshold: 0.5 });

    observer.observe(card);
  });
};

animateCounters();


/* ═══════════════════════════════════════════════════════════════════
   🎨 FILTRO DE PROJETOS
   Filtra os projetos por categoria (Front-end, Back-end, Full Stack)
   ═══════════════════════════════════════════════════════════════════ */

const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove classe 'active' de todos os botões
    filterBtns.forEach(b => b.classList.remove('active'));

    // Adiciona classe 'active' ao botão clicado
    btn.classList.add('active');

    const filterValue = btn.getAttribute('data-filter');

    // Itera sobre cada card de projeto
    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');

      // Mostra ou esconde o card baseado no filtro
      if (filterValue === 'todos' || category === filterValue) {
        card.classList.remove('hidden');
        card.classList.add('show');
        // Re-aplica a animação
        setTimeout(() => {
          card.style.animation = 'fadeUp 0.6s ease both';
        }, 10);
      } else {
        card.classList.add('hidden');
        card.classList.remove('show');
      }
    });
  });
});


/* ═══════════════════════════════════════════════════════════════════
   👁️ SCROLL REVEAL
   Revela elementos suavemente conforme o usuário scrolla a página
   Usa Intersection Observer para otimização de performance
   ═══════════════════════════════════════════════════════════════════ */

const revealElements = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observa todos os elementos com classe 'reveal'
  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });
};

revealElements();


/* ═══════════════════════════════════════════════════════════════════
   📋 SMOOTH SCROLL PARA LINKS
   Scroll suave ao clicar nos links internos (#seção)
   ═══════════════════════════════════════════════════════════════════ */

const setupSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Verifica se o link tem um alvo válido
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();

        const target = document.querySelector(href);
        // Calcula a posição levando em conta a altura da navbar fixa
        const offsetTop = target.offsetTop - 80;

        // Executa o scroll suave
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });

        // Fecha o menu mobile se estiver aberto
        if (mobileMenuBtn.classList.contains('active')) {
          mobileMenuBtn.classList.remove('active');
          navLinks.style.display = 'none';
        }
      }
    });
  });
};

setupSmoothScroll();


/* ═══════════════════════════════════════════════════════════════════
   💬 TOAST NOTIFICATION
   Função para exibir notificações flutuantes na tela
   ═══════════════════════════════════════════════════════════════════ */

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  // Remove a notificação após 3 segundos
  setTimeout(() => {
    toast.style.animation = 'slideInUp 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Adiciona feedback ao clicar em contato
document.querySelectorAll('.contact-card').forEach(card => {
  card.addEventListener('click', (e) => {
    const platform = card.querySelector('.contact-platform').textContent;

    // Copia o email para a área de transferência
    if (platform === 'EMAIL') {
      e.preventDefault();
      const email = card.querySelector('.contact-handle').textContent;
      navigator.clipboard.writeText(email);
      showToast('✓ Email copiado para a área de transferência!');
    }
  });
});


/* ═══════════════════════════════════════════════════════════════════
   ⌨️ EFEITO DE DIGITAÇÃO
   Anima o texto do hero com efeito de digitação
   ═══════════════════════════════════════════════════════════════════ */

const setupTypingAnimation = () => {
  const typingText = document.querySelector('.typing-text');

  if (typingText) {
    typingText.style.animation = 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite';
  }
};

setupTypingAnimation();


/* ═══════════════════════════════════════════════════════════════════
   🎯 PARALLAX EFFECT COM MOUSE
   Move os blobs de fundo conforme o mouse se move pela tela
   Cria um efeito visual imersivo e moderno
   ═══════════════════════════════════════════════════════════════════ */

const setupParallaxEffect = () => {
  const blobs = document.querySelectorAll('.blob1, .blob2, .blob3');

  document.addEventListener('mousemove', (e) => {
    // Calcula a posição do mouse como percentual da tela
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    // Move cada blob diferentemente baseado em seu índice
    blobs.forEach((blob, index) => {
      const moveX = x * (index + 1) * 5;
      const moveY = y * (index + 1) * 5;
      blob.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });
};

setupParallaxEffect();


/* ═══════════════════════════════════════════════════════════════════
   🎪 EASTER EGG - CONSOLE
   Digite viewSource() no console para ver dicas de desenvolvimento
   ═══════════════════════════════════════════════════════════════════ */

const setupConsoleMessages = () => {
  console.log(
    '%c🚀 Bem-vindo ao portfólio de Maicon Dias!',
    'color: #a855f7; font-size: 20px; font-weight: bold;'
  );
  console.log(
    '%cDigite: viewSource() para ver dicas incríveis',
    'color: #06b6d4; font-size: 14px;'
  );

  // Função para exibir dicas no console
  window.viewSource = () => {
    console.log(
      '%c💡 DICAS DE DESENVOLVIMENTO',
      'color: #10b981; font-size: 16px; font-weight: bold;'
    );
    console.log('1. Sempre use variáveis CSS para consistência visual');
    console.log('2. Performance importa: use will-change para animações pesadas');
    console.log('3. Intersection Observer > scroll listeners para eficiência');
    console.log('4. Mobile-first é a melhor abordagem');
    console.log('5. Teste seus projetos em vários dispositivos');
    console.log(
      '%c✨ Feito com ❤️ e muito ☕',
      'color: #ff7700; font-size: 14px; font-style: italic;'
    );
  };
};

setupConsoleMessages();


/* ═══════════════════════════════════════════════════════════════════
   📊 PERFORMANCE MONITORING
   Monitora o tempo de carregamento da página
   ═══════════════════════════════════════════════════════════════════ */

const setupPerformanceMonitoring = () => {
  window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

    console.log(
      `%c⏱️ Tempo de carregamento: ${pageLoadTime}ms`,
      'color: #7c3aed; font-weight: bold;'
    );
  });
};

setupPerformanceMonitoring();


/* ═══════════════════════════════════════════════════════════════════
   🌙 DETECÇÃO DE TEMA
   Detecta se o usuário prefere modo escuro
   ═══════════════════════════════════════════════════════════════════ */

const setupThemeDetection = () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (prefersDark) {
    console.log('%c🌙 Modo escuro detectado e aplicado', 'color: #06b6d4;');
  }
};

setupThemeDetection();


/* ═══════════════════════════════════════════════════════════════════
   🔄 INICIALIZAÇÃO
   Executa todas as funções de inicialização quando o DOM está pronto
   ═══════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c✅ Portfólio carregado com sucesso!', 'color: #10b981; font-weight: bold;');
});