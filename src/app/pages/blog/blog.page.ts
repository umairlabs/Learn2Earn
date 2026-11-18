import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { IonicModule, IonContent } from '@ionic/angular';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { addIcons } from 'ionicons';
import { searchOutline, chevronForwardOutline, timeOutline, personOutline } from 'ionicons/icons';
import { BlogPost } from '../../shared/models/interfaces';

gsap.registerPlugin(ScrollTrigger);

@Component({
    selector: 'app-blog',
    templateUrl: './blog.page.html',
    styleUrls: ['./blog.page.scss'],
    standalone: true,
    imports: [IonicModule, HeaderComponent, FooterComponent]
})
export class BlogPage implements AfterViewInit {
    @ViewChild(IonContent) public content!: IonContent;
    public scrolled = false;

    public categories = ['All', 'Technology', 'Education', 'Software', 'Business'];
    public selectedCategory = 'All';

    public posts: BlogPost[] = [
        {
            title: 'The Future of AI in Modern Education',
            category: 'Technology',
            date: 'Feb 12, 2026',
            author: 'John Doe',
            delay: 0,
            image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1000'
        },
        {
            title: 'Choosing the Right Tech Stack for Your Startup',
            category: 'Software',
            date: 'Feb 10, 2026',
            author: 'Jane Smith',
            delay: 0.1,
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000'
        },
        {
            title: 'How to Master Ionic Angular in 2026',
            category: 'Education',
            date: 'Feb 08, 2026',
            author: 'Sam Wilson',
            delay: 0.2,
            image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1000'
        },
        {
            title: 'Sustainable Growth Strategies for Software Houses',
            category: 'Business',
            date: 'Feb 05, 2026',
            author: 'Eva Green',
            delay: 0.3,
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000'
        },
        {
            title: 'Microservices vs Monolith: A Detailed Guide',
            category: 'Software',
            date: 'Feb 02, 2026',
            author: 'Mike Ross',
            delay: 0.4,
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000'
        },
        {
            title: 'The Rise of Low-Code Platforms',
            category: 'Technology',
            date: 'Jan 30, 2026',
            author: 'Sarah Connor',
            delay: 0.5,
            image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000'
        }
    ];

    constructor() {
        addIcons({ searchOutline, chevronForwardOutline, timeOutline, personOutline });
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

        gsap.from('.blog-hero h1', { y: 50, opacity: 0, duration: 1.2, ease: 'power4.out' });

        gsap.from('.post-card', {
            scrollTrigger: {
                trigger: '.blog-grid',
                start: 'top 85%',
            },
            y: 40,
            opacity: 0,
            stagger: 0.1,
            duration: 1,
            ease: 'power3.out'
        });
    }

}
