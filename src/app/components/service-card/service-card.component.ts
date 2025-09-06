import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Service } from '../../models/service.model';

@Component({
  selector: 'app-service-card',
  standalone: true,
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css']
})
export class ServiceCardComponent {
  @Input() service!: Service;
  @Output() serviceClick = new EventEmitter<Service>();

  onServiceClick() {
    console.log('Service clicked:', this.service.name);
    this.serviceClick.emit(this.service);
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

  getAvailabilityText(): string {
    // Simular disponibilidade baseada no rating
    if (this.service.rating >= 4.8) {
      return 'Disponível agora';
    } else if (this.service.rating >= 4.5) {
      return 'Disponível em 30min';
    } else {
      return 'Disponível em 1h';
    }
  }

  getAvailabilityColor(): string {
    if (this.service.rating >= 4.8) {
      return 'bg-green-400';
    } else if (this.service.rating >= 4.5) {
      return 'bg-yellow-400';
    } else {
      return 'bg-orange-400';
    }
  }
}

