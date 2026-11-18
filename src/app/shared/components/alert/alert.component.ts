import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonModal, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, callOutline, personCircleOutline, locationOutline } from 'ionicons/icons';

import { Expert } from '../../models/interfaces';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    standalone: true,
    imports: [IonModal, IonButton, IonIcon]
})
export class AlertComponent {
    @Input() isOpen = false;
    @Input() address?: string;
    @Input() experts: Expert[] = [
        {
            name: 'Shahzaib Malik',
            email: 'shahzaib@learn2earntech.com',
            phone: '+92 331 7193531'
        },
        {
            name: 'Bilal Raza',
            email: 'mbilalraza400@gmail.com',
            phone: '+92 342 8336400'
        }
    ];
    @Output() closed = new EventEmitter<void>();

    constructor() {
        addIcons({ mailOutline, callOutline, personCircleOutline, locationOutline });
    }

    dismiss() {
        this.closed.emit();
    }
}
