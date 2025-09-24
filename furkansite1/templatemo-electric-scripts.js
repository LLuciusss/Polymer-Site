// JavaScript Document

/*

TemplateMo 596 Electric Xtra

https://templatemo.com/tm-596-electric-xtra

*/

// DOM içeriği tamamen yüklendikten sonra çalışacak kod bloğu
document.addEventListener('DOMContentLoaded', () => {

    // === Fonksiyon Tanımlamaları ===

    // 1. Floating particles oluşturur
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 15) + 's';

            // Rastgele turuncu veya mavi renk ataması
            if (Math.random() > 0.5) {
                particle.style.setProperty('--particle-color', '#00B2FF');
                const before = particle.style.getPropertyValue('--particle-color');
                particle.style.background = '#00B2FF';
            }

            particlesContainer.appendChild(particle);
        }
    }

    // 2. Navigasyon linklerinin görünürlüğünü günceller
    function updateActiveNav() {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-link');
        const scrollPosition = window.pageYOffset + 100;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => item.classList.remove('active'));
                const currentNav = document.querySelector(`.nav-link[href="#${section.id}"]`);
                if (currentNav) currentNav.classList.add('active');
            }
        });
    }

    // 3. Metin animasyonlarını yönetir (başlangıç ve bitiş)
    function wrapTextInSpans(element) {
        const text = element.textContent;
        element.innerHTML = text.split('').map((char, i) =>
            `<span class="char" style="animation-delay: ${i * 0.05}s">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');
    }

    function animateTextIn(textSet) {
        const glitchText = textSet.querySelector('.glitch-text');
        const subtitle = textSet.querySelector('.subtitle');
        wrapTextInSpans(glitchText);
        glitchText.setAttribute('data-text', glitchText.textContent);
        setTimeout(() => {
            subtitle.classList.add('visible');
        }, 800);
    }

    function animateTextOut(textSet) {
        const chars = textSet.querySelectorAll('.char');
        const subtitle = textSet.querySelector('.subtitle');
        chars.forEach((char, i) => {
            char.style.animationDelay = `${i * 0.02}s`;
            char.classList.add('out');
        });
        subtitle.classList.remove('visible');
    }

    // 4. Metin setlerini döndürür
    const textSets = document.querySelectorAll('.text-set');
    let currentIndex = 0;
    let isAnimating = false;

    function rotateText() {
        if (isAnimating) return;
        isAnimating = true;

        const currentSet = textSets[currentIndex];
        const nextIndex = (currentIndex + 1) % textSets.length;
        const nextSet = textSets[nextIndex];

        animateTextOut(currentSet);

        setTimeout(() => {
            currentSet.classList.remove('active');
            nextSet.classList.add('active');
            animateTextIn(nextSet);

            currentIndex = nextIndex;
            isAnimating = false;
        }, 600);
    }

    // === Etkinlik Dinleyicileri ve Başlangıç Koşulları ===

    // Navigasyon ve mobil menü
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Navbar kaydırma efekti
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        updateActiveNav();
    });

    // Başlangıçta aktif navigasyon güncellemesi
    updateActiveNav();

    // Yumuşak kaydırma
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Sekme (tab) işlevselliği
    const tabs = document.querySelectorAll('.tab-item');
    const panels = document.querySelectorAll('.content-panel');
    if (tabs.length > 0 && panels.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');
                tabs.forEach(t => t.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    // İletişim formu gönderimi
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mesajınız gönderildi! En kısa sürede size geri döneceğiz.');
            this.reset();
        });
    }

    // Bakiye yükleme formu gönderimi (Yeni kod)
    const topupForm = document.getElementById('topup-form');
    const paymentStatus = document.getElementById('payment-status');
    if (topupForm && paymentStatus) {
        topupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Kullanıcıdan alınan verileri al
            const amount = document.getElementById('amount').value;
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;

            // Basit bir onay mesajı göster
            // Gerçek bir uygulamada, burada sunucuya veri gönderilir ve ödeme işlemi başlatılır.
            paymentStatus.style.color = '#00B2FF'; // Mavi renk
            paymentStatus.textContent = `Sayın ${name}, ${amount} TL'lik bakiye yükleme talebiniz alındı. Ödeme işlemi için yönlendiriliyorsunuz...`;

            // Örnek: Gerçek hayatta burada bir ödeme sağlayıcısına yönlendirme olur
            // window.location.href = `https://odeme.com?amount=${amount}&email=${email}`;

            // Formu temizle
            topupForm.reset();
        });
    }

    // Parçacık ve metin animasyonlarını başlat
    createParticles();
    if (textSets.length > 0) {
        textSets[0].classList.add('active');
        animateTextIn(textSets[0]);

        setTimeout(() => {
            setInterval(rotateText, 5000); // Her 5 saniyede bir metin değiştir
        }, 4000);

        // Ekstra rasgele glitch efekti
        setInterval(() => {
            const glitchTexts = document.querySelectorAll('.glitch-text');
            glitchTexts.forEach(text => {
                if (Math.random() > 0.95) {
                    text.style.animation = 'none';
                    setTimeout(() => {
                        text.style.animation = '';
                    }, 200);
                }
            });
        }, 3000);
    }
});