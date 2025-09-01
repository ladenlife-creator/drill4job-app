import { Injectable } from '@angular/core';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getServices(): Service[] {
    return [
      {
        id: 1,
        name: 'Elétrica',
        icon: '⚡',
        price: 250,
        currency: 'MZN',
        rating: 4.8
      },
      {
        id: 2,
        name: 'Canalização',
        icon: '🔧',
        price: 200,
        currency: 'MZN',
        rating: 4.7
      },
      {
        id: 3,
        name: 'Solar',
        icon: '☀️',
        price: 500,
        currency: 'MZN',
        rating: 4.9
      },
      {
        id: 4,
        name: 'Eletrónica',
        icon: '📱',
        price: 150,
        currency: 'MZN',
        rating: 4.6
      },
      {
        id: 5,
        name: 'Ar Condicionado',
        icon: '❄️',
        price: 300,
        currency: 'MZN',
        rating: 4.5
      },
      {
        id: 6,
        name: 'Eletrodomésticos',
        icon: '🏠',
        price: 180,
        currency: 'MZN',
        rating: 4.7
      },
      {
        id: 7,
        name: 'Carpintaria',
        icon: '🔨',
        price: 220,
        currency: 'MZN',
        rating: 4.6
      },
      {
        id: 8,
        name: 'Pintura',
        icon: '🎨',
        price: 160,
        currency: 'MZN',
        rating: 4.4
      }
    ];
  }
}

