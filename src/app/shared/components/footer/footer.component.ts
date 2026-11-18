import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { locationOutline, callOutline, mailOutline, logoFacebook, logoGithub, logoX, briefcaseOutline, logoInstagram } from 'ionicons/icons';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: true,
    imports: [CommonModule, IonIcon, IonGrid, IonRow, IonCol, RouterModule]
})
export class FooterComponent {
    public currentYear = new Date().getFullYear();

    constructor() {
        addIcons({ logoFacebook, logoX, logoGithub, locationOutline, callOutline, mailOutline, briefcaseOutline });
    }
}
