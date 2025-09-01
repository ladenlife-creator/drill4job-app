import { Component, Input } from '@angular/core';
import { Service } from '../../models/service.model';

@Component({
  selector: 'app-service-card',
  standalone: true,
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css']
})
export class ServiceCardComponent {
  @Input() service!: Service;

  onServiceClick() {
    console.log('Service clicked:', this.service.name);
  }

  getStars(): string[] {
    const fullStars = Math.floor(this.service.rating);
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    
    if (this.service.rating % 1 !== 0) {
      stars.push('☆');
    }
    
    return stars;
  }
}

