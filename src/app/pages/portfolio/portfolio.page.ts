import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { IonicModule, IonContent } from '@ionic/angular';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { addIcons } from 'ionicons';
import { arrowForwardOutline, expandOutline, filterOutline, globeOutline, logoGooglePlaystore, logoApple } from 'ionicons/icons';
import { Project } from '../../shared/models/interfaces';

gsap.registerPlugin(ScrollTrigger);

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.page.html',
    styleUrls: ['./portfolio.page.scss'],
    standalone: true,
    imports: [IonicModule, HeaderComponent, FooterComponent]
})
export class PortfolioPage implements AfterViewInit {
    @ViewChild(IonContent) public content!: IonContent;
    public scrolled = false;

    public categories = ['All', 'Web App', 'Mobile App', 'Hybrid App'];
    public selectedCategory = 'All';

    get filteredProjects() {
        if (this.selectedCategory === 'All') {
            return this.projects;
        }
        return this.projects.filter(p => p.category === this.selectedCategory);
    }

    public setCategory(cat: string) {
        this.selectedCategory = cat;
        // Re-trigger animations after a tiny delay to allow DOM to update
        setTimeout(() => {
            gsap.from('.project-card', {
                y: 40,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power3.out',
                clearProps: 'all'
            });
            ScrollTrigger.refresh();
        }, 100);
    }

    public projects: Project[] = [
        {
            title: 'Shipsanitor',
            category: 'Hybrid App',
            image: 'assets/shipsanitor.webp',
            desc: 'ShipSanitor is an AI-powered app that helps ship crews perform real-time inspections, create smart reports, and complete customizable checklists.',
            liveUrl: 'https://web.shipsanitor.com/',
            playStoreUrl: 'https://play.google.com/store/apps/details?id=com.shipsanitor&pcampaignid=web_share',
            appStoreUrl: 'https://apps.apple.com/us/app/shipsanitor/id6738053220',
            platforms: ['web', 'android', 'ios']
        },
        {
            title: 'Dalab Customer',
            category: 'Hybrid App',
            image: 'assets/dalab-customer.webp',
            desc: 'Dalab Customer is your go-to app for discovering local stores, ordering your favorite items, and getting them delivered straight to your doorstep.',
            playStoreUrl: 'https://play.google.com/store/apps/details?id=com.adeegcustomer.app&pcampaignid=web_share',
            appStoreUrl: 'https://apps.apple.com/us/app/dalab-customer/id6754509858',
            liveUrl: 'https://customer.dalabdelivery.com/',
            platforms: ['web', 'android', 'ios']
        },
        {
            title: 'Dalab Business',
            category: 'Hybrid App',
            image: 'assets/dalab-business.webp',
            desc: 'Dalab Business is Dalab Business is the all-in-one platform for local business owners to manage, grow, and automate their daily operations — all from a single, easy-to-use app.',
            playStoreUrl: 'https://play.google.com/store/apps/details?id=com.adeegDelivery.business&pcampaignid=web_share',
            appStoreUrl: 'https://apps.apple.com/us/app/dalab-business/id6754509858',
            liveUrl: 'https://business.dalabdelivery.com/',
            platforms: ['web', 'android', 'ios']
        },
        {
            title: 'Dalab Rider',
            category: 'Hybrid App',
            image: 'assets/dalab-rider.webp',
            desc: 'Dalab Rider is the official delivery partner app for the Dalab network — built for riders and walkers who want to earn by delivering orders efficiently and securely.',
            liveUrl: 'https://rider.dalabdelivery.com/',
            playStoreUrl: 'https://play.google.com/store/apps/details?id=com.adeeg.deliveryrider',
            appStoreUrl: 'https://apps.apple.com/us/app/dalab-rider/id6754508159',
            platforms: ['web', 'android', 'ios']
        },
        {
            title: 'Motherly',
            category: 'Web App',
            image: 'assets/motherly.webp',
            liveUrl: 'motherly.learn2earntech.com',
            desc: 'Motherly is a pregnancy care and wellness app built to support expecting mothers with everything they need day-to-day.Complete visual identity and product design for a SaaS startup.',
            platforms: ['web']
        },
        {
            title: 'Aldour',
            category: 'Web App',
            image: 'assets/aldour.webp',
            desc: 'Developer Alduor is the advanced version of Alduor, designed specifically for real estate developers and property managers.',
            liveUrl: 'https://developer.alduor.com',
            platforms: ['web']
        },
        {
            title: 'Be Positive',
            category: 'Web App',
            image: 'assets/be-positive.webp',
            liveUrl: 'https://bepositive.learn2earntech.com',
            desc: 'Be Positive - Blood Donation Emergency App',
            platforms: ['web']
        },
        {
            title: 'Security Mangement App Client',
            category: 'Web App',
            image: 'assets/security-management.webp',
            desc: 'A complete security management system.',
            liveUrl: 'https://tech-metaverse-admin.netlify.app/',
            platforms: ['web']
        },
        {
            title: 'Mobile App for Gym System',
            category: 'Web App',
            image: 'assets/gym.webp',
            liveUrl: 'https://learn2earn-gym.netlify.app',
            desc: 'A complete gym management system.',
            platforms: ['web']
        },
        {
            title: 'Medico',
            category: 'Web App',
            image: 'assets/medical-client.webp',
            desc: 'MyChart is a patient portal app that allows users to access online appointment scheduling, bill pay, and more.',
            liveUrl: 'https://learn2earn-medical.netlify.app',
            platforms: ['web']
        },
        {
            title: 'Pharmacy',
            category: 'Web App',
            image: 'assets/medical-store.webp',
            desc: 'MyChart is a pharmacy management system that allows users to access online appointment scheduling, bill pay, and more.',
            liveUrl: 'https://techpharmacy.netlify.app/',
            platforms: ['web']
        },
        {
            title: 'Resume Builder',
            category: 'Web App',
            image: 'assets/bot-job.webp',
            desc: 'Resume Builder is a web app that allows users to create and customize their resumes.',
            liveUrl: 'https://tech-jobbot.netlify.app',
            platforms: ['web']
        },
        {
            title: 'Hospital System',
            category: 'Web App',
            image: 'assets/hospital.webp',
            desc: 'This is  an advanced hospital management system designed to streamline healthcare operations.',
            liveUrl: 'https://tech-hospital-management.netlify.app',
            platforms: ['web']
        },
        {
            title: 'Handy Services',
            category: 'Web App',
            image: 'assets/handy-services.webp',
            desc: 'The All-in-one Restaurant POS for Fine-dines, Cafes, QSRs, Cloud kitchens, Bars & Bakeries. Manage billing, inventory and more.',
            liveUrl: 'https://tech-handy-services.netlify.app/',
            platforms: ['web']
        },
        {
            title: 'Admin ArMart',
            category: 'Web App',
            image: 'assets/ar-admin.webp',
            desc: 'Turn your smartphone or tablet into a powerful POS. Manage sales, inventory and employees with ease.',
            liveUrl: 'https://tech-admin-armart.netlify.app',
            platforms: ['web']
        },
        {
            title: 'Client ArMart',
            category: 'Web App',
            image: 'assets/ar-client.webp',
            desc: 'ArMart is an online shopping platform for customers to buy products.',
            liveUrl: 'https://tech-armart.netlify.app',
            platforms: ['web']
        },
        {
            title: 'Ayesha pharmacy',
            category: 'Web App',
            image: 'assets/ayesha-pharmacy.webp',
            desc: 'Ayesha pharmacy is an online pharmacy for customers to buy medicines.',
            liveUrl: 'https://ayeshapharmacy.netlify.app/#/home',
            platforms: ['web']
        },
        {
            title: 'Bitebuzz',
            category: 'Web App',
            image: 'assets/bitebuzz.webp',
            desc: 'Bitebuzz is a user-friendly food delivery application that connects users with nearby restaurants.',
            liveUrl: 'https://bitebuzz.learn2earntech.com',
            platforms: ['web']
        },
        {
            title: 'Metaverse',
            category: 'Web App',
            image: 'assets/metaverse.webp',
            desc: 'Metaverse is a robust security administration application for the Protection Corps security service.',
            liveUrl: 'http://metaverse.learn2earntech.com/',
            platforms: ['web']
        },
        {
            title: 'L2ESoftware',
            category: 'Web App',
            image: 'assets/l2esoftware.webp',
            desc: 'Learn2Earn Tech is a custom-built student and finance management software designed for educational institutes',
            liveUrl: 'http://l2esoftware.learn2earntech.com/',
            platforms: ['web']
        },
        {
            title: 'CashGrow',
            category: 'Web App',
            image: 'assets/cashgrow.webp',
            desc: 'Cashgrow app developed a dynamic network marketing app, Cashgrow, designed to empower users with financial growth opportunities.',
            liveUrl: 'https://cashgrow.learn2earntech.com/',
            platforms: ['web']
        },
        {
            title: 'Babafarid Smart Valley',
            category: 'Web App',
            image: 'assets/babafarid-valley.webp',
            desc: 'Babafarid Smart Valley is a real estate management system designed to empower users with financial growth opportunities.',
            liveUrl: 'https://babafaridproperty.netlify.app',
            platforms: ['web']
        },
        {
            title: 'Commission Shop',
            category: 'Web App',
            image: 'assets/commission-shop.webp',
            desc: 'Commission Shop is a real estate management system designed to empower users with financial growth opportunities.',
            liveUrl: 'https://commisionshop.learn2earntech.com',
            platforms: ['web']
        },
        {
            title: 'Opulentus',
            category: 'Web App',
            image: 'assets/opulentus .webp',
            desc: 'Opulentus is a custom Admin CMS Dashboard for Opulentus that allows the client to easily manage their website content without technical knowledge.',
            liveUrl: 'http://opulentus.learn2earntech.com',
            platforms: ['web']
        },
        {
            title: 'Trip Planner',
            category: 'Web App',
            image: 'assets/trip-planner.webp',
            desc: 'This app for the travel lovers. Using this app user can manage the book the trip to any where in the world or can post the plan to invite the others to come and be the part of their joureny.',
            liveUrl: 'https://learn2earn-travel.netlify.app',
            platforms: ['web']
        },
        {
            title: 'Free Now',
            category: 'Web App',
            image: 'assets/taxi-booking.webp',
            desc: 'FREE NOW is a licensed ride-hailing and multi-mobility app in 10 European countries. Book easily, pay in-app quickly and complete your trip safely!',
            liveUrl: 'https://learn2earn-taxi.netlify.app',
            platforms: ['web']
        },
        {
            title: 'Bank App',
            category: 'Web App',
            image: 'assets/bank.webp',
            desc: 'This app offers a fast, secure, and user-friendly mobile banking experience, designed to take care of its customers banking needs',
            liveUrl: 'https://learn2earn-team.netlify.app',
            platforms: ['web']
        },
        {
            title: 'Point of Sale (POS) App',
            category: 'Web App',
            image: 'assets/pos.webp',
            desc: 'This app offers a fast, secure, and user-friendly mobile banking experience, designed to take care of its customers banking needs',
            liveUrl: 'https://learn2ear-team-pos.netlify.app/',
            platforms: ['web']
        }

    ];

    constructor() {
        addIcons({ arrowForwardOutline, expandOutline, filterOutline, globeOutline, logoGooglePlaystore, logoApple });
    }

    public async ngAfterViewInit() {
        const scrollElement = await this.content.getScrollElement();
        setTimeout(() => {
            this.initAnimations(scrollElement);
            ScrollTrigger.refresh();
        }, 500);
    }

    private initAnimations(scroller: HTMLElement) {
        ScrollTrigger.defaults({ scroller: scroller });

        ScrollTrigger.create({
            start: 'top -1',
            onUpdate: (self) => { this.scrolled = self.scroll() > 0; }
        });

        gsap.from('.portfolio-hero h1', { y: 50, opacity: 0, duration: 1.2, ease: 'power4.out' });

        gsap.from('.project-card', {
            scrollTrigger: {
                trigger: '.project-grid',
                start: 'top 85%',
            },
            y: 60,
            opacity: 0,
            stagger: 0.15,
            duration: 1.2,
            ease: 'power3.out'
        });
    }

}
