import { Component, ViewChild, NgZone, ChangeDetectorRef, OnInit } from '@angular/core';
import { IonContent, IonGrid, IonRow, IonCol, IonButton, IonIcon } from '@ionic/angular/standalone';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { addIcons } from 'ionicons';
import {
    flashOutline, globeOutline, heartOutline, laptopOutline,
    timeOutline, cafeOutline, arrowForward
} from 'ionicons/icons';
import { Benefit, Job } from '../../shared/models/interfaces';

gsap.registerPlugin(ScrollTrigger);

@Component({
    selector: 'app-careers',
    templateUrl: './careers.page.html',
    styleUrls: ['./careers.page.scss'],
    standalone: true,
    imports: [
        IonContent, IonGrid, IonRow, IonCol, IonButton, IonIcon,
        HeaderComponent, FooterComponent
    ]
})
export class CareersPage implements OnInit {
    @ViewChild(IonContent) public content!: IonContent;
    public scrolled = false;

    public benefits: Benefit[] = [
        { title: 'Remote Work', icon: 'globe-outline', desc: 'Work from anywhere in the world with flexible hours.' },
        { title: 'Modern Gear', icon: 'laptop-outline', desc: 'We provide the latest Macbook Pro and high-end peripherals.' },
        { title: 'Health & Wellness', icon: 'heart-outline', desc: 'Comprehensive health insurance for you and your family.' },
        { title: 'Learning Budget', icon: 'flash-outline', desc: 'Annual budget for courses, books, and certifications.' }
    ];

    public jobs: Job[] = [
        { title: 'Senior Angular Developer', location: 'Remote / Hybrid', type: 'Full-time' },
        { title: 'UI/UX Designer', location: 'Remote', type: 'Full-time' },
        { title: 'Node.js Backend Engineer', location: 'Hybrid', type: 'Contract' },
        { title: 'Technical Instructor (Web)', location: 'Remote', type: 'Full-time' }
    ];

    constructor(
        private ngZone: NgZone,
        private cdRef: ChangeDetectorRef
    ) {
        addIcons({ flashOutline, globeOutline, heartOutline, laptopOutline, timeOutline, cafeOutline, arrowForward });
    }

    public ngOnInit() {
        console.log('CareersPage: ngOnInit. Benefits count:', this.benefits.length);
    }

    public scrollToOpenings() {
        const el = document.getElementById('openings');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    }

    public ionViewDidEnter() {
        this.initPage();
    }

    private async initPage() {
        console.log('CareersPage: initPage called');
        try {
            // KILL all existing triggers to prevent duplicates
            ScrollTrigger.getAll().forEach(t => t.kill());

            if (!this.content) {
                console.error('CareersPage: IonContent ViewChild is MISSING');
                this.forceShowSections();
                return;
            }

            // CRITICAL for Ionic: Get the actual scrollable element inside ion-content
            const scrollElement = await this.content.getScrollElement();
            console.log('CareersPage: scrollElement found:', !!scrollElement);

            if (!scrollElement) {
                console.error('CareersPage: Failed to get scroll element');
                this.forceShowSections();
                return;
            }

            // Ensure the element is ready and layout is settled
            setTimeout(() => {
                console.log('CareersPage: initializing animations');
                this.initAnimations(scrollElement);
                ScrollTrigger.refresh();
                this.cdRef.detectChanges();

                // Secondary refresh to catch layout shifts
                setTimeout(() => {
                    console.log('CareersPage: Secondary refresh');
                    ScrollTrigger.refresh();
                }, 1000);

                // THIRD refresh for slow loading icons/assets in production
                setTimeout(() => {
                    console.log('CareersPage: Third refresh');
                    ScrollTrigger.refresh();
                }, 3000);
            }, 150);

        } catch (error) {
            console.error('CareersPage: CRITICAL ERROR in initPage:', error);
            this.forceShowSections();
        }

        // PRODUCTION FAIL-SAFE:
        // Always force visibility after 3s as final backup
        setTimeout(() => {
            console.log('CareersPage: Checking visibility fail-safe');
            this.forceShowSections();
        }, 3000);
    }

    private forceShowSections() {
        console.log('CareersPage: Forcing sections visibility');
        this.ngZone.run(() => {
            gsap.to(['.benefit-card', '.job-card', '.culture-content', '.img-box', '.cta-inner'], {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
                duration: 0.5,
                stagger: 0.05,
                overwrite: 'auto',
                ease: 'none'
            });
            this.cdRef.detectChanges();
        });
    }

    private initAnimations(scroller: HTMLElement) {
        ScrollTrigger.defaults({
            scroller: scroller,
            invalidateOnRefresh: true
        });

        ScrollTrigger.create({
            start: 'top -1',
            onUpdate: (self) => {
                this.scrolled = self.scroll() > 0;
            }
        });

        // Hero title animation
        gsap.fromTo('.careers-hero h1',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.2 }
        );

        // Benefits cards reveal
        gsap.fromTo('.benefit-card',
            { scale: 0.9, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: '.benefits-grid',
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                },
                scale: 1,
                opacity: 1,
                stagger: 0.1,
                duration: 0.8,
                ease: 'back.out(1.7)'
            }
        );

        // Job cards reveal
        gsap.fromTo('.job-card',
            { x: 30, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: '.jobs-list',
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                },
                x: 0,
                opacity: 1,
                stagger: 0.2,
                duration: 0.8,
                ease: 'power2.out'
            }
        );

        // Culture content reveal
        gsap.fromTo('.culture-content',
            { x: -50, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: '.culture-section',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                x: 0,
                opacity: 1,
                duration: 1.2
            }
        );

        // Culture images reveal
        gsap.fromTo('.img-box',
            { scale: 0.8, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: '.culture-section',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                scale: 1,
                opacity: 1,
                stagger: 0.1,
                duration: 1.5,
                ease: 'expo.out'
            }
        );

        // CTA reveal
        gsap.fromTo('.cta-inner',
            { scale: 0.95, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: '.cta-section',
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                },
                scale: 1,
                opacity: 1,
                duration: 1.2,
                ease: 'back.out(1.7)'
            }
        );
    }

}
