import { Component, AfterViewInit, OnDestroy, ViewChild, NgZone } from '@angular/core';
import { NgClass } from '@angular/common';
import { IonContent, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonModal } from '@ionic/angular/standalone';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { addIcons } from 'ionicons';
import { Service, Expert } from '../../shared/models/interfaces';
import {
    phonePortraitOutline, globeOutline, businessOutline, megaphoneOutline,
    colorPaletteOutline, searchOutline, brushOutline, pieChartOutline,
    cashOutline, arrowForward, constructOutline, settingsOutline, shieldCheckmarkOutline, barChartOutline,
    sparklesOutline, chatbubblesOutline, checkmarkCircleOutline, closeOutline, bulbOutline, layersOutline, hardwareChipOutline, trendingUpOutline, chatboxEllipses,
    rocketOutline
} from 'ionicons/icons';

gsap.registerPlugin(ScrollTrigger);

@Component({
    selector: 'app-services',
    templateUrl: './services.page.html',
    styleUrls: ['./services.page.scss'],
    standalone: true,
    imports: [NgClass, IonContent, IonGrid, IonRow, IonCol, IonButton, IonIcon, HeaderComponent, FooterComponent, AlertComponent]
})
export class ServicesPage implements AfterViewInit, OnDestroy {
    @ViewChild(IonContent) public content!: IonContent;
    public scrolled = false;
    public isModalOpen = false;
    public expandedServiceIndex: number | null = null;

    public toggleSeeMore(index: number, event: Event) {
        event.stopPropagation();
        if (this.expandedServiceIndex === index) {
            this.expandedServiceIndex = null;
        } else {
            this.expandedServiceIndex = index;
        }
    }

    public serviceExperts: Expert[] = [
        {
            name: 'Kashif Javaid',
            email: 'chaudhrykashif5@gmail.com',
            phone: '+92 347 0706932'
        },
        {
            name: 'Bilal Raza',
            email: 'mbilalraza400@gmail.com',
            phone: '+92 342 8336400'
        }
    ];

    public services: Service[] = [
        {
            title: 'AI Automation',
            icon: 'hardware-chip-outline',
            description: 'We design intelligent systems that quietly transform how organizations operate by automating complex processes and enabling data-driven decisions, helping businesses scale with clarity and precision through advanced machine learning, cloud-native architecture, and enterprise-grade AI infrastructure.',
            techDescription: 'Python,TensorFlow,PyTorch,Cloud-Native Architecture',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000'
        },
        {
            title: 'AI Voice Agents',
            icon: 'chatbubbles-outline',
            description: 'We create voice experiences that feel natural, responsive, and deeply human, delivering seamless customer engagement and operational efficiency at scale by combining speech intelligence, conversational design, and large language models powered by OpenAI.',
            techDescription: 'NLP Pipelines,Twilio Integrations,OpenAI',
            image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=1000'
        },
        {
            title: 'OpenAI & Custom LLM Solutions',
            icon: 'bulb-outline',
            description: 'We develop strategic AI platforms tailored to your organization’s knowledge and workflows, turning intelligence into long-term competitive advantage through secure enterprise architectures, OpenAI APIs, and custom large language models.',
            techDescription: 'Secure,Scalable LLM Systems,OpenAI APIs,LangChain,Vector Databases',
            image: 'https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=1000'
        },
        {
            title: 'Generative AI',
            icon: 'sparkles-outline',
            description: 'We empower organizations to create, iterate, and innovate at unprecedented speed with advanced generative AI systems that produce intelligent content, code, and creative assets using multimodal AI, diffusion models, and scalable cloud infrastructure.',
            techDescription: 'GPT-Based Models,Diffusion AI,Multimodal Systems,Cloud GPU Infrastructure',
            image: 'https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fit=crop&q=80&w=1000'
        },
        {
            title: 'Mobile App Development',
            icon: 'phone-portrait-outline',
            description: 'We craft high-performance mobile products defined by elegance, simplicity, and scalability, leveraging modern cross-platform and native technologies to deliver refined user experiences built for global growth.',
            techDescription: 'React Native,Angular,Ionic,Java,Kotlin',
            image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000'
        },
        {
            title: 'Web App Development',
            icon: 'globe-outline',
            description: 'We engineer sophisticated web platforms that balance performance, security, and strategic value, using cloud-first architectures designed for resilience, speed, and long-term scalability.',
            techDescription: 'Angular,React,Next.js,Node.js',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000'
        },
        {
            title: 'UI/UX & Product Design',
            icon: 'color-palette-outline',
            description: 'We approach design as strategy, creating thoughtful, human-centered digital experiences that drive clarity, engagement, and measurable impact through research, systems thinking, and precision execution.',
            techDescription: 'Figma,Advanced Design Systems,User Behavior Analytics,Impactful Product Experiences',
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1000'
        },
        {
            title: 'Enterprise Software & ERP',
            icon: 'business-outline',
            description: 'We design enterprise software ecosystems that bring structure, intelligence, and visibility to complex organizations, enabling leadership teams to make confident, data-driven decisions through secure and scalable architectures tailored to their operational DNA.',
            techDescription: 'Ionic,Angular,Capacitor,Node.js,Django,PostgreSQL',
            image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1000'
        },
        {
            title: 'Digital Growth & Marketing',
            icon: 'trending-up-outline',
            description: 'We partner with ambitious organizations to define and execute sustainable growth strategies that prioritize long-term value, brand authority, and measurable performance by blending data, technology, and strategic insight.',
            techDescription: 'SEO,Paid Media,AI-Powered Analytics,Automation',
            image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=80&w=1000'
        },
        {
            title: 'Cross-Platform App Development',
            icon: 'layers-outline',
            description: 'We build unified digital products that deliver consistent, high-performance experiences across devices and markets, guided by an engineering philosophy rooted in speed, stability, and simplicity.',
            techDescription: 'Flutter,React Native,Ionic,Capacitor',
            image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=1000'
        },
        {
            title: 'SaaS Product Development',
            icon: 'rocket-outline',
            description: 'We collaborate with visionary founders and enterprises to design and scale category-defining SaaS platforms, emphasizing secure architecture, scalable infrastructure, and long-term competitive advantage.',
            techDescription: 'Microservices,Secure APIs,Scalable Infrastructure',
            image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000'
        }
    ];

    private isMobile = false;

    constructor(private ngZone: NgZone) {
        addIcons({ chatboxEllipses, phonePortraitOutline, globeOutline, businessOutline, megaphoneOutline, colorPaletteOutline, searchOutline, brushOutline, pieChartOutline, cashOutline, arrowForward, constructOutline, settingsOutline, shieldCheckmarkOutline, barChartOutline, sparklesOutline, chatbubblesOutline, checkmarkCircleOutline, closeOutline, bulbOutline, layersOutline, hardwareChipOutline, trendingUpOutline, rocketOutline });
        this.isMobile = window.innerWidth < 768;
    }

    public async openContactAlert(event: Event) {
        event.stopPropagation();
        this.isModalOpen = true;
    }

    public closeModal() {
        this.isModalOpen = false;
    }

    public async ngAfterViewInit() {
        const scrollElement = await this.content.getScrollElement();
        setTimeout(() => {
            this.initAnimations(scrollElement);
            ScrollTrigger.refresh();
        }, 200);
    }

    public ngOnDestroy() {
        ScrollTrigger.getAll().forEach(t => t.kill());
    }

    private initAnimations(scroller: HTMLElement) {
        ScrollTrigger.defaults({ scroller: scroller });

        // Header scroll state - run outside NgZone for performance
        this.ngZone.runOutsideAngular(() => {
            ScrollTrigger.create({
                start: 'top -1',
                onUpdate: (self) => {
                    const scrolled = self.scroll() > 0;
                    if (scrolled !== this.scrolled) {
                        this.ngZone.run(() => { this.scrolled = scrolled; });
                    }
                }
            });

            // Hero animation - lighter on mobile
            gsap.from('.services-hero h1', {
                y: this.isMobile ? 30 : 50,
                opacity: 0,
                duration: this.isMobile ? 0.8 : 1.2,
                ease: this.isMobile ? 'power2.out' : 'power4.out'
            });

            // Batch service card animations
            const cards = gsap.utils.toArray('.premium-service-card');
            if (cards.length > 0) {
                gsap.fromTo(cards,
                    { y: 40, opacity: 0 },
                    {
                        scrollTrigger: {
                            trigger: '.services-list',
                            start: 'top 85%',
                            once: true // Only animate once
                        },
                        y: 0,
                        opacity: 1,
                        stagger: this.isMobile ? 0.08 : 0.12,
                        duration: this.isMobile ? 0.6 : 0.8,
                        ease: 'power2.out',
                        clearProps: 'transform' // Keep opacity for content visibility
                    }
                );
            }

            // Process steps - use x animation only on desktop
            const steps = gsap.utils.toArray('.process-step');
            if (steps.length > 0) {
                gsap.from(steps, {
                    scrollTrigger: {
                        trigger: '.process-section',
                        start: 'top 80%',
                        once: true
                    },
                    x: this.isMobile ? 0 : -30,
                    y: this.isMobile ? 20 : 0,
                    opacity: 0,
                    stagger: this.isMobile ? 0.1 : 0.15,
                    duration: this.isMobile ? 0.5 : 0.7,
                    ease: 'power2.out'
                });
            }
        });
    }

}
