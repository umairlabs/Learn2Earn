import { Component, HostListener, ViewChild, OnDestroy, NgZone, ChangeDetectorRef, ElementRef } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IonContent, IonGrid, IonRow, IonCol, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  callOutline, mailOutline, arrowForward, checkmarkCircle, locationOutline,
  phonePortraitOutline, globeOutline, businessOutline, megaphoneOutline,
  colorPaletteOutline, searchOutline, brushOutline, pieChartOutline, cashOutline,
  rocketOutline, statsChartOutline, hardwareChipOutline, schoolOutline,
  codeSlashOutline, trendingUpOutline, shieldCheckmarkOutline, diamondOutline,
  flashOutline, layersOutline
} from 'ionicons/icons';
import { Router, RouterLink } from '@angular/router';

gsap.registerPlugin(ScrollTrigger);

import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ShowcaseItem, JourneyStep } from '../../shared/models/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  standalone: true,
  imports: [
    IonContent, IonGrid, IonRow, IonCol, IonButton, IonIcon, HeaderComponent, FooterComponent, RouterLink
  ]
})
export class HomePage implements OnDestroy {
  @ViewChild(IonContent) public content!: IonContent;
  @ViewChild('heroVisual') public heroVisual!: ElementRef;

  private observer: IntersectionObserver | null = null;

  public scrolled = false;
  public canLoadModel = false;
  public isModelVisible = false;
  private animationsInitialized = false;

  public showcaseItems: ShowcaseItem[] = [
    {
      title: 'Build Digital Products',
      description: 'We turn ambitious ideas into world-class software. From MVP to enterprise scale, we engineer for excellence.',
      icon: 'rocket-outline',
      accent: 'rgba(244, 160, 36, 0.1)'
    },
    {
      title: 'Scale Your Business',
      description: 'Optimize operations and reach global audiences through strategic tech integration and high-conversion platforms.',
      icon: 'stats-chart-outline',
      accent: 'rgba(56, 128, 255, 0.1)'
    },
    {
      title: 'AI & Automation',
      description: 'Harness the power of intelligent systems to eliminate bottlenecks and future-proof your digital infrastructure.',
      icon: 'hardware-chip-outline',
      accent: 'rgba(45, 211, 111, 0.1)'
    },
  ];

  public journeySteps: JourneyStep[] = [
    {
      id: '01',
      title: 'Discover',
      description: 'We begin with a deep dive into your vision, analyzing requirements and market potential to map out a strategic blueprint.',
      icon: 'search-outline'
    },
    {
      id: '02',
      title: 'Build',
      description: 'Our expert engineers translate designs into high-performance, robust software architectures using bleeding-edge stacks.',
      icon: 'code-slash-outline'
    },
    {
      id: '03',
      title: 'Launch',
      description: 'We execute seamless deployment strategies, ensuring your product enters the market with stability and impact.',
      icon: 'rocket-outline'
    },
    {
      id: '04',
      title: 'Scale',
      description: 'Continuous optimization and strategic growth support help your product evolve and dominate its global niche.',
      icon: 'trending-up-outline'
    }
  ];

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private cdRef: ChangeDetectorRef
  ) {
    addIcons({
      callOutline, mailOutline, arrowForward, checkmarkCircle, locationOutline,
      phonePortraitOutline, globeOutline, businessOutline, megaphoneOutline,
      colorPaletteOutline, searchOutline, brushOutline, pieChartOutline, cashOutline,
      rocketOutline, statsChartOutline, hardwareChipOutline, schoolOutline,
      codeSlashOutline, trendingUpOutline, shieldCheckmarkOutline, diamondOutline,
      flashOutline, layersOutline
    });
  }

  public navigateToServices() {
    this.router.navigate(['/services']);
  }

  public toggleFlip(event: any) {
    const card = event.currentTarget.closest('.flip-card');
    if (card) {
      card.classList.toggle('flipped');
    }
  }

  public ngOnDestroy() {
    this.cleanupScrollTriggers();
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  public ionViewDidEnter() {
    this.initPage();
  }

  public ionViewWillLeave() {
    this.cleanupScrollTriggers();
  }

  private cleanupScrollTriggers() {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    this.animationsInitialized = false;
  }

  private async initPage() {
    if (this.animationsInitialized) {
      return;
    }

    // CRITICAL for Ionic: Get the actual scrollable element inside ion-content
    const scrollElement = await this.content.getScrollElement();

    // Idle preload: Start loading 3D model when browser is idle
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        this.ngZone.run(() => {
          this.canLoadModel = true;
          this.cdRef.detectChanges();
        });
      }, { timeout: 2000 });
    }

    // Small wait to ensure layout is physically settled
    setTimeout(() => {
      // PRECISE LAZY LOADING for 3D model
      this.initModelObserver();

      // Run GSAP animations outside Angular zone for performance
      this.ngZone.runOutsideAngular(() => {
        this.initAnimations(scrollElement);
      });
      this.animationsInitialized = true;
      ScrollTrigger.refresh();
    }, 400);
  }

  private initModelObserver() {
    // Check if we should load the high-performance 3D model (Laptops/Desktops only)
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (!isDesktop) return;

    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.canLoadModel) {
          // Load immediately when condition is met (no artificial delay)
          this.ngZone.run(() => {
            this.canLoadModel = true;
            this.cdRef.detectChanges();
          });
          this.observer?.disconnect();
          this.observer = null;
        }
      });
    }, {
      root: null, // use the viewport
      rootMargin: '400px', // start loading 400px before it enters viewport
      threshold: 0.1
    });

    if (this.heroVisual) {
      this.observer.observe(this.heroVisual.nativeElement);
    }
  }

  private initAnimations(scroller: HTMLElement) {
    // Set global default for ScrollTrigger to use Ionic's scroller element
    ScrollTrigger.defaults({
      scroller: scroller
    });

    // 1) Entrance Timeline (Hero Section)
    const heroTl = gsap.timeline({
      defaults: { ease: 'expo.out', duration: 1.6 }
    });

    heroTl.fromTo('.hero-title',
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, delay: 0.2 }
    )
      .fromTo('.hero-description',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
        '-=1.2'
      )
      .fromTo('.cta-primary, .cta-secondary',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 1 },
        '-=1.0'
      )
      .fromTo('.hero-visual-col',
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.8, ease: 'power3.out' },
        '-=1.2'
      );

    // Ambient floating for hero visual - reduced CPU usage with longer duration
    gsap.to('.model-container', {
      y: '-=15',
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // 2) Stats Counter Animation - optimized with single batch
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length > 0) {
      const statArray = Array.from(stats);
      gsap.fromTo(statArray,
        { innerText: 0 },
        {
          scrollTrigger: {
            trigger: statArray[0],
            start: 'top 92%',
            toggleActions: 'play none none none'
          },
          innerText: (i: number, el: Element) => parseInt((el as HTMLElement).innerText.replace(/\D/g, '')),
          duration: 2.5,
          stagger: 0.1,
          snap: { innerText: 1 },
          ease: 'power2.out',
          onUpdate: function () {
            statArray.forEach((el, i) => {
              const targetEl = el as HTMLElement;
              const suffix = targetEl.innerText.replace(/[0-9]/g, '');
              targetEl.innerText = Math.floor(parseInt(targetEl.innerText)) + suffix;
            });
          }
        }
      );
    }

    // 3) Global Theme Transition
    gsap.to('.theme-wrapper', {
      scrollTrigger: {
        trigger: '.what-we-do-section',
        start: 'top 85%',
        end: 'top 20%',
        scrub: 1.2,
        invalidateOnRefresh: true,
      },
      '--theme-bg': '#0f0f0f',
      '--theme-text': '#ffffff',
      duration: 1
    });

    // 4) Showcase Reveal
    const showcaseBlocks = document.querySelectorAll('.showcase-block');
    if (showcaseBlocks.length > 0) {
      gsap.fromTo('.showcase-block',
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.showcase-grid',
            start: 'top 88%',
            toggleActions: 'play none none none'
          },
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1.2,
          ease: 'expo.out'
        }
      );
    }

    // 5) Journey Section Animations - combined into single ScrollTrigger batch
    gsap.to('.timeline-progress', {
      scrollTrigger: {
        trigger: '.journey-timeline-wrapper',
        start: 'top 75%',
        end: 'bottom 85%',
        scrub: 1.5,
      },
      width: '100%',
      ease: 'none'
    });

    gsap.fromTo('.journey-step',
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.journey-steps',
          start: 'top 85%',
        },
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1.3,
        ease: 'expo.out',
        onComplete: () => {
          // Batch toggle class creation after entrance animation
          const steps = document.querySelectorAll('.journey-step');
          steps.forEach((step) => {
            ScrollTrigger.create({
              trigger: step,
              start: 'top 60%',
              end: 'bottom 40%',
              toggleClass: 'active'
            });
          });
        }
      }
    );

    // 6) Why Choose Us Section
    gsap.fromTo('.benefit-card',
      { x: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.benefits-grid',
          start: 'top 90%',
        },
        x: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1.2,
        ease: 'expo.out'
      }
    );

    // Throttled parallax for Why Choose Us elements (max 30fps)
    const whyUsSection = document.querySelector('.why-us-section');
    if (whyUsSection) {
      let ticking = false;
      whyUsSection.addEventListener('mousemove', (e: any) => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 30;
            const yPos = (clientY / window.innerHeight - 0.5) * 30;

            gsap.to('.element-1', { x: xPos, y: yPos, duration: 1.2, ease: 'power2.out' });
            gsap.to('.element-2', { x: -xPos * 0.8, y: -yPos * 0.8, duration: 1.2, ease: 'power2.out' });
            gsap.to('.element-3', { x: xPos * 1.2, y: yPos * 1.2, duration: 1.4, ease: 'power2.out' });
            gsap.to('.element-4', { x: -xPos * 0.5, y: -yPos * 0.5, duration: 1.1, ease: 'power2.out' });
            gsap.to('.blob-1, .blob-2', { x: xPos * 0.5, y: yPos * 0.5, duration: 2, ease: 'power1.out' });
            ticking = false;
          });
          ticking = true;
        }
      });
    }

    // 7) Final CTA Reveal & Background Motion
    gsap.fromTo('.cta-inner',
      { scale: 0.95, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.cta-section',
          start: 'top 88%',
        },
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: 'expo.out'
      }
    );

    // Optimized infinite rotation - longer duration for less CPU usage
    gsap.to('.cta-glow-bg', {
      rotation: 360,
      duration: 60,
      repeat: -1,
      ease: 'none'
    });

    // 8) Header Consistency - optimized to only trigger when needed
    let lastScrolled = false;
    ScrollTrigger.create({
      start: 'top -1',
      onUpdate: (self) => {
        const isScrolled = self.scroll() > 0;
        if (isScrolled !== lastScrolled) {
          lastScrolled = isScrolled;
          this.ngZone.run(() => {
            this.scrolled = isScrolled;
          });
        }
      }
    });

  }

  @HostListener('window:scroll', ['$event'])
  public onScroll() {
    // ScrollTrigger handles performance

  }
}