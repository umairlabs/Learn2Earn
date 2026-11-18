export interface Expert {
    name: string;
    email?: string;
    phone?: string;
}

export interface Service {
    title: string;
    icon: string;
    description: string;
    techDescription: string;
    image?: string;
}

export interface TeamMember {
    id: number;
    name: string;
    role: string;
    bio: string;
    email?: string;
    image: string;
    pos?: {
        x: number;
        y: number;
    };
    lineStyle?: {
        rotation: number;
        length: number;
    };
}

export interface Project {
    title: string;
    category: string;
    image: string;
    desc: string;
    liveUrl?: string;
    playStoreUrl?: string;
    appStoreUrl?: string;
    platforms: string[];
}

export interface Course {
    title: string;
    level: string;
    duration: string;
    rating: number;
    students: number;
    icon: string;
    image: string;
}

export interface Instructor {
    name: string;
    role: string;
    bio: string;
    image: string;
}

export interface Benefit {
    title: string;
    icon: string;
    desc: string;
}

export interface Job {
    title: string;
    location: string;
    type: string;
}

export interface ShowcaseItem {
    title: string;
    description: string;
    icon: string;
    accent: string;
}

export interface JourneyStep {
    id: string;
    title: string;
    description: string;
    icon: string;
}

export interface BlogPost {
    title: string;
    category: string;
    date: string;
    author: string;
    image?: string;
    delay?: number;
}
