import { Component, AfterViewInit, OnDestroy, ViewChild, NgZone, inject } from '@angular/core';
import { IonContent, IonGrid, IonRow, IonCol, IonButton, IonIcon } from '@ionic/angular/standalone';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { addIcons } from 'ionicons';
import { rocketOutline, eyeOutline, heartOutline, trophyOutline, starOutline, leafOutline } from 'ionicons/icons';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { Expert, TeamMember } from '../../shared/models/interfaces';

gsap.registerPlugin(ScrollTrigger);

@Component({
    selector: 'app-about',
    templateUrl: './about.page.html',
    styleUrls: ['./about.page.scss'],
    standalone: true,
    imports: [IonContent, IonGrid, IonRow, IonCol, IonButton, IonIcon, HeaderComponent, FooterComponent, AlertComponent]
})
export class AboutPage implements AfterViewInit, OnDestroy {

    @ViewChild(IonContent) public content!: IonContent;

    public scrolled = false;
    public activeMember: TeamMember | null = null;

    isModalOpen = false;

    private scrollEl!: HTMLElement;
    private mouseRafId: number | null = null;
    private isMouseTicking = false;
    private scrollListener!: () => void;
    private animationsInitialized = false;

    private ngZone = inject(NgZone);

    constructor() {
        addIcons({ rocketOutline, eyeOutline, heartOutline, trophyOutline, starOutline, leafOutline });
        this.calculatePositions();
    }

    // =========================
    // LIFECYCLE
    // =========================
    async ngAfterViewInit() {
        // Wait for Ionic content to be fully ready
        await this.content.scrollToTop(0);

        // Get scroll element with retry logic
        let retries = 0;
        const maxRetries = 10;

        while (!this.scrollEl && retries < maxRetries) {
            try {
                this.scrollEl = await this.content.getScrollElement();
            } catch (e) {
                retries++;
                await new Promise(r => setTimeout(r, 50));
            }
        }

        if (!this.scrollEl) {
            console.error('Failed to get scroll element');
            return;
        }

        // Setup scroll listener with NgZone for change detection (header uses OnPush)
        this.ngZone.runOutsideAngular(() => {
            const scrollHandler = () => {
                const newScrolled = this.scrollEl.scrollTop > 10;
                if (this.scrolled !== newScrolled) {
                    this.ngZone.run(() => {
                        this.scrolled = newScrolled;
                    });
                }
            };

            this.scrollEl.addEventListener('scroll', scrollHandler, { passive: true });
            this.scrollListener = () => this.scrollEl.removeEventListener('scroll', scrollHandler);

            // Set initial scrolled state
            scrollHandler();
        });

        // Setup GSAP ScrollTrigger with Ionic scroll container
        this.setupScrollTrigger();

        // Initialize animations after layout is painted
        this.ngZone.runOutsideAngular(() => {
            // Use double RAF to ensure paint is complete
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    this.ngZone.run(() => {
                        this.initAnimations();
                        this.initTeamAnimations();

                        // Delay heavy effects
                        setTimeout(() => {
                            this.initParticles();
                            this.initMouseInteraction();
                        }, 300);

                        // Refresh ScrollTrigger after everything is laid out
                        setTimeout(() => {
                            ScrollTrigger.refresh();
                            this.animationsInitialized = true;
                        }, 100);
                    });
                });
            });
        });
    }

    private setupScrollTrigger() {
        // Kill any existing ScrollTriggers to prevent duplicates
        ScrollTrigger.getAll().forEach(t => t.kill());

        // Setup scroller proxy for Ionic scroll container
        ScrollTrigger.scrollerProxy(this.scrollEl, {
            scrollTop: (value) => {
                if (value !== undefined) {
                    this.scrollEl.scrollTop = value;
                }
                return this.scrollEl.scrollTop;
            },
            getBoundingClientRect: () => ({
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            }),
            fixedMarkers: false
        });

        // Set default scroller
        ScrollTrigger.defaults({
            scroller: this.scrollEl
        });
    }

    ngOnDestroy() {
        // Clean up all GSAP animations
        ScrollTrigger.getAll().forEach(t => t.kill());
        gsap.killTweensOf('.about-hero h1, .about-hero p, .reveal-section, .value-card, .team-node, .grid-bg, .info-card');

        // Clean up mouse RAF
        if (this.mouseRafId) {
            cancelAnimationFrame(this.mouseRafId);
        }

        // Remove scroll listener
        if (this.scrollListener) {
            this.scrollListener();
        }

        this.animationsInitialized = false;
    }

    // =========================
    // ANIMATIONS (SAFE - No Blank Page)
    // =========================
    private initAnimations() {
        if (this.animationsInitialized) return;

        // HERO - use fromTo with immediateRender: false to prevent initial flash
        gsap.fromTo('.about-hero h1',
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                immediateRender: false
            }
        );

        gsap.fromTo('.about-hero p',
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                delay: 0.3,
                ease: 'power3.out',
                immediateRender: false
            }
        );

        // SECTIONS - reveal on scroll with immediateRender: false
        const sections = gsap.utils.toArray('.reveal-section');

        sections.forEach((section: any) => {
            gsap.fromTo(section,
                { y: 50, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%',
                        once: true,
                        scroller: this.scrollEl
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out',
                    immediateRender: false
                }
            );
        });

        // VALUES - staggered reveal
        gsap.fromTo('.value-card',
            { y: 40, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: '.values-grid',
                    start: 'top 80%',
                    once: true,
                    scroller: this.scrollEl
                },
                y: 0,
                opacity: 1,
                stagger: 0.15,
                duration: 0.6,
                ease: 'power2.out',
                immediateRender: false
            }
        );
    }

    private initTeamAnimations() {
        if (this.animationsInitialized) return;

        // Floating team nodes animation (continuous)
        gsap.to('.team-node', {
            y: '-=6',
            duration: 'random(3,5)',
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: { amount: 2 }
        });

        // Grid background parallax on scroll
        gsap.to('.grid-bg', {
            scrollTrigger: {
                trigger: '.team-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
                scroller: this.scrollEl
            },
            y: 40
        });
    }

    // =========================
    // PARTICLES (OPTIMIZED)
    // =========================
    private initParticles() {
        if (window.innerWidth < 1024) return;

        const container = document.querySelector('.ambient-particles');
        if (!container) return;

        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            particle.style.width = `${Math.random() * 3 + 1}px`;
            particle.style.height = particle.style.width;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.setProperty('--duration', `${Math.random() * 5 + 10}s`);
            particle.style.setProperty('--delay', `${Math.random() * -10}s`);

            container.appendChild(particle);
        }
    }

    // =========================
    // MOUSE INTERACTION
    // =========================
    private initMouseInteraction() {
        const section = document.querySelector('.team-section');
        const grid = document.querySelector('.grid-bg');

        if (!section || !grid) return;

        section.addEventListener('mousemove', (e: any) => {

            if (this.isMouseTicking) return;

            this.isMouseTicking = true;

            this.mouseRafId = requestAnimationFrame(() => {
                const rect = section.getBoundingClientRect();
                const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
                const mouseY = (e.clientY - rect.top) / rect.height - 0.5;

                gsap.to(grid, {
                    x: mouseX * -15,
                    y: mouseY * -15,
                    duration: 1,
                    ease: 'power2.out'
                });

                this.isMouseTicking = false;
            });
        });
    }

    // =========================
    // TEAM INTERACTION
    // =========================
    public setActiveMember(member: TeamMember | null) {
        this.activeMember = member;

        if (member) {
            gsap.fromTo('.info-card',
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.4 }
            );
        }
    }

    // =========================
    // MODAL
    // =========================
    public openContactAlert(event: Event) {
        event.stopPropagation();
        this.isModalOpen = true;
    }

    public closeModal() {
        this.isModalOpen = false;
    }

    // =========================
    // TEAM POSITIONS
    // =========================
    private calculatePositions() {
        const count = this.teamMembers.length;
        const startAngle = (5 / 8) * Math.PI * 2;

        this.teamMembers = this.teamMembers.map((member, index) => {
            let layoutIndex = index;
            if (index === 0) layoutIndex = 1;
            else if (index === 1) layoutIndex = 0;

            const angle = startAngle + (layoutIndex / count) * Math.PI * 2;

            const radiusX = 35;
            const radiusY = 32;

            const x = 50 + Math.cos(angle) * radiusX;
            const y = 50 + Math.sin(angle) * radiusY;

            const dx = 50 - x;
            const dy = 50 - y;

            return {
                ...member,
                pos: { x, y },
                lineStyle: {
                    rotation: Math.atan2(dy, dx) * (180 / Math.PI),
                    length: Math.sqrt(dx * dx + dy * dy)
                }
            };
        });
    }

    // =========================
    // DATA (FULL - UNCHANGED)
    // =========================
    public serviceExperts: Expert[] = [
        { name: 'Kashif', email: 'chaudhrykashif5@gmail.com', phone: '+92 347 0706932' },
        { name: 'Bilal', email: 'mbilalraza400@gmail.com', phone: '+92 342 8336400' }
    ];

    public teamMembers: TeamMember[] = [
        {
            id: 1,
            name: 'Shahzaib',
            role: 'CEO & Founder(2020)',
            bio: 'Visionary leader behind Learn2Earn, focused on innovation, growth, and empowering people through digital transformation.',
            email: 'Shahzaib@learn2earntechgmail.com',
            image: 'assets/shazaib.webp'
        },
        {
            id: 2,
            name: 'Bilal Raza',
            role: 'Co-Founder, Managing Director & Head of HR',
            bio: 'Leads operations and strategy while building a strong, motivated, and performance-driven team culture.',
            email: 'ahmad@learn2earn.com',
            image: 'assets/bilal.webp'
        },
        {
            id: 3,
            name: 'Kashif Javaid',
            role: 'Project Manager & Marketing Head',
            bio: 'Manages projects with precision and drives marketing strategies to expand brand reach and impact.',
            email: 'chaudharykashif5@gmail.com',
            image: 'assets/kashif.webp'
        },
        {
            id: 4,
            name: 'Hamza Malik',
            role: 'Full-Stack Engineer & Team Lead',
            bio: 'Guides the development team in building scalable, high-quality, and future-ready digital solutions.',
            image: 'assets/hamza.webp'
        },
        {
            id: 5,
            name: 'Ali Husnain',
            role: 'Backend & DevOps Engineer',
            bio: 'Ensures seamless delivery and performance of backend systems.',
            image: 'assets/ali.webp'
        },
        {
            id: 6,
            name: 'Raza Habib',
            role: 'Frontend Engineer',
            bio: 'Builds intuitive, responsive user interfaces that deliver seamless and engaging digital experiences for clients.',
            image: 'assets/raza.webp'
        },
        {
            id: 7,
            name: 'Mishal Fatima',
            role: 'Designer & Frontend Engineer',
            bio: 'Blends creative design with technical expertise to craft elegant experiences.',
            image: 'assets/mishal.webp'
        },
        {
            id: 8,
            name: 'Umair Zafar',
            role: 'Designer & Frontend Engineer',
            bio: 'Focused on building seamless, engaging, and user-centered digital products that elevate user satisfaction.',
            image: 'assets/umair1.webp'
        }
    ];
}