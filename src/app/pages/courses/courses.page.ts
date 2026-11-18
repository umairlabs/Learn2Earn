import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { IonicModule, IonContent } from '@ionic/angular';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { addIcons } from 'ionicons';
import { bookOutline, timeOutline, statsChartOutline, peopleOutline, star, arrowForward } from 'ionicons/icons';
import { Course, Instructor } from '../../shared/models/interfaces';

gsap.registerPlugin(ScrollTrigger);

@Component({
    selector: 'app-courses',
    templateUrl: './courses.page.html',
    styleUrls: ['./courses.page.scss'],
    standalone: true,
    imports: [IonicModule, HeaderComponent, FooterComponent, AlertComponent]
})
export class CoursesPage implements AfterViewInit {
    @ViewChild(IonContent) public content!: IonContent;
    public scrolled = false;
    public isAlertOpen = false;

    public courses: Course[] = [
        { title: 'Full-Stack Web Development', level: 'Beginner', duration: '6 Months', rating: 4.9, students: 1200, icon: 'globe-outline', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800' },
        { title: 'Mobile App Mastery (Ionic)', level: 'Intermediate', duration: '4 Months', rating: 4.8, students: 850, icon: 'phone-portrait-outline', image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&q=80&w=800' },
        { title: 'UI/UX Design Systems', level: 'Beginner', duration: '3 Months', rating: 4.7, students: 600, icon: 'brush-outline', image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800' },
        { title: 'Data Science & Analytics', level: 'Advanced', duration: '8 Months', rating: 4.9, students: 450, icon: 'pie-chart-outline', image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&q=80&w=800' },
        { title: 'Cybersecurity Essentials', level: 'Beginner', duration: '5 Months', rating: 4.6, students: 300, icon: 'shield-checkmark-outline', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800' },
        { title: 'Digital Marketing Expert', level: 'Beginner', duration: '3 Months', rating: 4.8, students: 900, icon: 'megaphone-outline', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800' }
    ];

    public instructors: Instructor[] = [
        { name: 'Bilal Raza', role: 'Co-Founder, Managing Director & Head of HR', bio: 'Expert in AI and large-scale systems.', image: 'assets/bilal.webp' },
        { name: 'Kashif Zameer', role: 'Project Manager & Marketing Head', bio: 'Specialist in CSS, SVG, and Vue.js.', image: 'assets/kashif.webp' }
    ];

    constructor() {
        addIcons({ bookOutline, timeOutline, statsChartOutline, peopleOutline, star, arrowForward });
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

        gsap.fromTo('.courses-hero h1',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }
        );

        gsap.fromTo('.course-card',
            { y: 50, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: '.courses-grid',
                    start: 'top 85%',
                },
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 1,
                ease: 'power3.out'
            }
        );

        gsap.fromTo('.instructor-card',
            { scale: 0.95, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: '.instructors-section',
                    start: 'top 85%',
                },
                scale: 1,
                opacity: 1,
                stagger: 0.2,
                duration: 0.8,
                ease: 'back.out(1.7)'
            }
        );
    }

}
