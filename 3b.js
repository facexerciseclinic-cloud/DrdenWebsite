// ============================================
// 3B BIOHACK LANDING PAGE — CREATIVE INTERACTIONS
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // 1. HERO PARTICLE CANVAS — DNA-like floating particles
    // ============================================
    const heroCanvas = document.getElementById('heroCanvas');
    if (heroCanvas) {
        const ctx = heroCanvas.getContext('2d');
        let particles = [];
        let mouseX = 0, mouseY = 0;

        function resizeCanvas() {
            const hero = heroCanvas.parentElement;
            heroCanvas.width = hero.offsetWidth;
            heroCanvas.height = hero.offsetHeight;
        }

        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * heroCanvas.width;
                this.y = Math.random() * heroCanvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.6;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.color = Math.random() > 0.7 ? '#E6B030' : (Math.random() > 0.5 ? '#a78bfa' : '#60a5fa');
                this.pulseSpeed = Math.random() * 0.02 + 0.005;
                this.pulseOffset = Math.random() * Math.PI * 2;
            }
            update(time) {
                this.x += this.speedX;
                this.y += this.speedY;
                const dx = this.x - mouseX;
                const dy = this.y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    const force = (120 - dist) / 120 * 0.8;
                    this.x += (dx / dist) * force;
                    this.y += (dy / dist) * force;
                }
                this.currentOpacity = this.opacity + Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.15;
                if (this.x < -10 || this.x > heroCanvas.width + 10 || this.y < -10 || this.y > heroCanvas.height + 10) this.reset();
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = Math.max(0, this.currentOpacity);
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        function initParticles() {
            const count = Math.min(Math.floor(heroCanvas.width * heroCanvas.height / 8000), 120);
            particles = [];
            for (let i = 0; i < count; i++) particles.push(new Particle());
        }

        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = 'rgba(230, 176, 48, ' + (0.08 * (1 - dist / 100)) + ')';
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles(time) {
            ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
            particles.forEach(p => { p.update(time); p.draw(); });
            drawConnections();
            requestAnimationFrame(animateParticles);
        }

        heroCanvas.parentElement.addEventListener('mousemove', (e) => {
            const rect = heroCanvas.parentElement.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        });

        resizeCanvas();
        initParticles();
        animateParticles(0);
        window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });
    }

    // ============================================
    // 2. VVIP GOLD PARTICLE RAIN
    // ============================================
    const vvipCanvas = document.getElementById('vvipCanvas');
    if (vvipCanvas) {
        const vCtx = vvipCanvas.getContext('2d');
        let goldParticles = [];

        function resizeVVIP() {
            const section = vvipCanvas.parentElement;
            vvipCanvas.width = section.offsetWidth;
            vvipCanvas.height = section.offsetHeight;
        }

        class GoldParticle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * vvipCanvas.width;
                this.y = -10;
                this.size = Math.random() * 3 + 1;
                this.speed = Math.random() * 1 + 0.3;
                this.opacity = Math.random() * 0.4 + 0.1;
                this.wobble = Math.random() * 2 - 1;
                this.wobbleSpeed = Math.random() * 0.02 + 0.005;
                this.angle = 0;
                this.glow = Math.random() > 0.85;
            }
            update() {
                this.y += this.speed;
                this.angle += this.wobbleSpeed;
                this.x += Math.sin(this.angle) * this.wobble;
                if (this.y > vvipCanvas.height + 10) this.reset();
            }
            draw() {
                vCtx.beginPath();
                vCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                if (this.glow) { vCtx.shadowBlur = 10; vCtx.shadowColor = 'rgba(230, 176, 48, 0.5)'; }
                vCtx.fillStyle = 'rgba(230, 176, 48, ' + this.opacity + ')';
                vCtx.fill();
                vCtx.shadowBlur = 0;
            }
        }

        function initGold() {
            const count = Math.min(Math.floor(vvipCanvas.width / 15), 60);
            goldParticles = [];
            for (let i = 0; i < count; i++) {
                const p = new GoldParticle();
                p.y = Math.random() * vvipCanvas.height;
                goldParticles.push(p);
            }
        }

        function animateGold() {
            vCtx.clearRect(0, 0, vvipCanvas.width, vvipCanvas.height);
            goldParticles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animateGold);
        }

        const vvipObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    resizeVVIP(); initGold(); animateGold();
                    vvipObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        vvipObserver.observe(vvipCanvas.parentElement);
        window.addEventListener('resize', () => { resizeVVIP(); initGold(); });
    }

    // ============================================
    // 3. MAGNETIC CURSOR GLOW (desktop only)
    // ============================================
    const cursorGlow = document.getElementById('cursorGlow');
    if (cursorGlow && window.matchMedia('(min-width: 768px)').matches) {
        let cursorVisible = false;
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
            if (!cursorVisible) { cursorGlow.classList.add('active'); cursorVisible = true; }
        });
        document.addEventListener('mouseleave', () => { cursorGlow.classList.remove('active'); cursorVisible = false; });
    }

    // ============================================
    // 4. PILLAR TAB SWITCHING (enhanced)
    // ============================================
    const tabs = document.querySelectorAll('.bb-pillar-tab');
    const panels = document.querySelectorAll('.bb-pillar-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.pillar;
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            panels.forEach(p => {
                p.classList.remove('active');
                if (p.dataset.panel === target) {
                    p.classList.add('active');
                    const cards = p.querySelectorAll('.bb-detail-card, .bb-panel-info');
                    cards.forEach((card, i) => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, i * 100 + 50);
                    });
                }
            });
        });
    });

    // ============================================
    // 5. SCROLL REVEAL (enhanced with stagger)
    // ============================================
    const revealSelectors = [
        '.bb-step-card', '.bb-philo-card', '.bb-booster-card',
        '.bb-vvip-card', '.bb-detail-card', '.bb-panel-info',
        '.bb-synergy-card', '.bb-rules-wrapper', '.bb-vvip-cond',
        '.bb-pricing-box', '.bb-condition-box', '.bb-step-reward'
    ];
    const revealElements = document.querySelectorAll(revealSelectors.join(', '));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const parent = entry.target.parentElement;
                const cls = entry.target.className.split(' ')[0];
                const siblings = parent.querySelectorAll(':scope > .' + cls);
                const index = Array.from(siblings).indexOf(entry.target);
                setTimeout(() => { entry.target.classList.add('bb-revealed'); }, index * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(el);
    });

    const revealStyle = document.createElement('style');
    revealStyle.textContent = '.bb-revealed { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(revealStyle);

    // ============================================
    // 6. SMOOTH SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ============================================
    // 7. JOURNEY TIMELINE — Progressive line fill
    // ============================================
    const timeline = document.querySelector('.bb-journey-timeline');
    if (timeline) {
        const tlStyle = document.createElement('style');
        tlStyle.textContent = '.bb-journey-timeline::after { height: var(--tl-prog, 0%); }';
        document.head.appendChild(tlStyle);

        function updateTimeline() {
            const rect = timeline.getBoundingClientRect();
            const viewTop = window.innerHeight * 0.6;
            if (rect.top < viewTop) {
                const progress = Math.min(1, Math.max(0, (viewTop - rect.top) / rect.height));
                timeline.style.setProperty('--tl-prog', (progress * 100) + '%');
            }
        }
        window.addEventListener('scroll', updateTimeline, { passive: true });
        updateTimeline();
    }

    // Step markers + cards stagger
    const steps = document.querySelectorAll('.bb-step');
    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const marker = entry.target.querySelector('.bb-step-marker');
                const card = entry.target.querySelector('.bb-step-card');
                if (marker) setTimeout(() => { marker.style.opacity = '1'; marker.style.transform = 'scale(1)'; }, 100);
                if (card) setTimeout(() => { card.classList.add('bb-revealed'); }, 200);
                stepObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -30px 0px' });

    steps.forEach(step => {
        const marker = step.querySelector('.bb-step-marker');
        if (marker) {
            marker.style.opacity = '0';
            marker.style.transform = 'scale(0.3)';
            marker.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        }
        stepObserver.observe(step);
    });

    // ============================================
    // 8. SYNERGY FLOW — Sequential reveal
    // ============================================
    const flowItems = document.querySelectorAll('.bb-flow-step, .bb-flow-arrow');
    if (flowItems.length > 0) {
        const flowObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    flowItems.forEach((el, i) => {
                        setTimeout(() => { el.classList.add('bb-flow-revealed'); }, i * 200);
                    });
                    flowObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        const synergyFlow = document.querySelector('.bb-synergy-flow');
        if (synergyFlow) flowObserver.observe(synergyFlow);
    }

    // ============================================
    // 9. 3D CARD TILT on mouse move
    // ============================================
    const tiltCards = document.querySelectorAll('.bb-vvip-card, .bb-booster-card, .bb-step-card--final');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const rotateX = ((e.clientY - rect.top) - rect.height / 2) / (rect.height / 2) * -5;
            const rotateY = ((e.clientX - rect.left) - rect.width / 2) / (rect.width / 2) * 5;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });

    // ============================================
    // 10. HERO ORB PARALLAX on scroll
    // ============================================
    const orbs = document.querySelectorAll('.bb-hero-orb');
    if (orbs.length > 0) {
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            orbs.forEach((orb, i) => {
                orb.style.transform = `translateY(${scrollY * (i + 1) * 0.12}px)`;
            });
        }, { passive: true });
    }

    // ============================================
    // 11. SECTION HEADER ANIMATIONS
    // ============================================
    const sectionHeaders = document.querySelectorAll('.section-header');
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                ['section-badge', 'section-title', 'section-description'].forEach((cls, i) => {
                    const el = entry.target.querySelector('.' + cls);
                    if (el) setTimeout(() => {
                        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, i * 150);
                });
                headerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    sectionHeaders.forEach(header => {
        ['section-badge', 'section-title', 'section-description'].forEach(cls => {
            const el = header.querySelector('.' + cls);
            if (el) { el.style.opacity = '0'; el.style.transform = 'translateY(20px)'; }
        });
        headerObserver.observe(header);
    });

    // ============================================
    // 12. VVIP HEADER ANIMATION
    // ============================================
    const vvipHeader = document.querySelector('.bb-vvip-header');
    if (vvipHeader) {
        const vEls = [vvipHeader.querySelector('.bb-vvip-crown'), vvipHeader.querySelector('h2'), vvipHeader.querySelector('.bb-vvip-subtitle'), vvipHeader.querySelector('.bb-vvip-desc')];
        const crown = vEls[0];
        if (crown) { crown.style.opacity = '0'; crown.style.transform = 'translateY(20px) scale(0.5)'; }
        vEls.slice(1).forEach(el => { if (el) { el.style.opacity = '0'; el.style.transform = 'translateY(20px)'; } });

        const vhObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    vEls.forEach((el, i) => {
                        if (el) setTimeout(() => {
                            el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
                            el.style.opacity = '1'; el.style.transform = 'translateY(0) scale(1)';
                        }, i * 150);
                    });
                    vhObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        vhObs.observe(vvipHeader);
    }

    // ============================================
    // 13. CTA SECTION ANIMATION
    // ============================================
    const ctaSection = document.querySelector('.bb-cta');
    if (ctaSection) {
        const ctaEls = [ctaSection.querySelector('h2'), ctaSection.querySelector('p'), ctaSection.querySelector('.bb-cta-actions')];
        ctaEls.forEach(el => { if (el) { el.style.opacity = '0'; el.style.transform = 'translateY(30px) scale(0.95)'; } });

        const ctaObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    ctaEls.forEach((el, i) => {
                        if (el) setTimeout(() => {
                            el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
                            el.style.opacity = '1'; el.style.transform = 'translateY(0) scale(1)';
                        }, i * 200);
                    });
                    ctaObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        ctaObs.observe(ctaSection);
    }

    // ============================================
    // 14. BOOSTER CREDIT COUNTER ANIMATION
    // ============================================
    const boosterRewards = document.querySelectorAll('.bb-booster-reward strong');
    if (boosterRewards.length > 0) {
        const counterObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const text = entry.target.textContent;
                    const match = text.match(/(\d[\d,]*)/);
                    if (match) {
                        const target = parseInt(match[1].replace(/,/g, ''));
                        const suffix = text.replace(match[1], '').trim();
                        const startTime = performance.now();
                        function animate(now) {
                            const progress = Math.min((now - startTime) / 1200, 1);
                            const eased = 1 - Math.pow(1 - progress, 3);
                            entry.target.textContent = Math.floor(target * eased).toLocaleString() + ' ' + suffix;
                            if (progress < 1) requestAnimationFrame(animate);
                        }
                        entry.target.textContent = '0 ' + suffix;
                        requestAnimationFrame(animate);
                    }
                    counterObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        boosterRewards.forEach(el => counterObs.observe(el));
    }

    // ============================================
    // 15. SYNERGY ICON SPIN on hover
    // ============================================
    const synergyIcon = document.querySelector('.bb-synergy-icon');
    if (synergyIcon) {
        synergyIcon.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        synergyIcon.addEventListener('mouseenter', () => { synergyIcon.style.transform = 'rotate(360deg) scale(1.15)'; });
        synergyIcon.addEventListener('mouseleave', () => { synergyIcon.style.transform = 'rotate(0deg) scale(1)'; });
    }

    // ============================================
    // 16. HERO BADGE DNA ICON SPIN
    // ============================================
    const heroBadge = document.querySelector('.bb-hero-badge i');
    if (heroBadge) {
        const s = document.createElement('style');
        s.textContent = '@keyframes bbDNASpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
        document.head.appendChild(s);
        heroBadge.style.animation = 'bbDNASpin 3s linear infinite';
    }

    // ============================================
    // 17. SCROLL PROGRESS BAR
    // ============================================
    const progressBar = document.createElement('div');
    progressBar.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#E6B030,#7c3aed,#2563eb,#059669);z-index:99999;transition:width 0.1s linear;width:0;pointer-events:none;';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollH = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.width = (window.pageYOffset / scrollH * 100) + '%';
    }, { passive: true });

});
