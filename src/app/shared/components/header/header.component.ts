import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { callOutline, mailOutline, menuOutline, closeOutline } from 'ionicons/icons';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [CommonModule, IonIcon, RouterModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
    @Input() scrolled = false;
    isMenuOpen = false;

    constructor() {
        addIcons({ callOutline, mailOutline, menuOutline, closeOutline });
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

    closeMenu() {
        this.isMenuOpen = false;
    }
}
