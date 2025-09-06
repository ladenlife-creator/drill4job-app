import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Location } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private currentLocationSubject = new BehaviorSubject<Location | null>(null);
  private isLocationEnabledSubject = new BehaviorSubject<boolean>(false);

  public currentLocation$ = this.currentLocationSubject.asObservable();
  public isLocationEnabled$ = this.isLocationEnabledSubject.asObservable();

  constructor() {
    this.initializeLocation();
  }

  // Inicializar serviço de localização
  private initializeLocation(): void {
    if (navigator.geolocation) {
      this.getCurrentPosition();
    } else {
      console.warn('Geolocation is not supported by this browser.');
    }
  }

  // Obter localização atual
  getCurrentPosition(): Promise<Location> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: Location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address: 'Localização atual', // Seria obtida via reverse geocoding
            city: 'Maputo',
            district: 'KaMpfumo'
          };
          
          this.currentLocationSubject.next(location);
          this.isLocationEnabledSubject.next(true);
          resolve(location);
        },
        (error) => {
          console.error('Error getting location:', error);
          this.isLocationEnabledSubject.next(false);
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutos
        }
      );
    });
  }

  // Calcular distância entre duas coordenadas (Haversine formula)
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Raio da Terra em km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distância em km
    return distance;
  }

  // Calcular tempo estimado de viagem
  calculateEstimatedTime(distance: number, averageSpeed: number = 30): number {
    // averageSpeed em km/h, retorna tempo em minutos
    return Math.round((distance / averageSpeed) * 60);
  }

  // Obter endereço via reverse geocoding (simulado)
  getAddressFromCoordinates(latitude: number, longitude: number): Promise<string> {
    return new Promise((resolve) => {
      // Em produção, usar API de geocoding (Google Maps, OpenStreetMap)
      setTimeout(() => {
        resolve(`Rua ${Math.floor(Math.random() * 100)}, Maputo, Moçambique`);
      }, 1000);
    });
  }

  // Verificar se a localização está dentro da área de cobertura
  isLocationInCoverageArea(location: Location): boolean {
    // Simular verificação de área de cobertura
    // Em produção, verificar contra polígonos de cobertura
    const maputoCenter = { latitude: -25.969248, longitude: 32.573924 };
    const distance = this.calculateDistance(
      location.latitude, 
      location.longitude,
      maputoCenter.latitude,
      maputoCenter.longitude
    );
    
    return distance <= 50; // 50km de raio de cobertura
  }

  // Obter localizações próximas
  getNearbyLocations(radius: number = 5): Observable<Location[]> {
    return new Observable(observer => {
      const currentLocation = this.currentLocationSubject.value;
      if (!currentLocation) {
        observer.error('Current location not available');
        return;
      }

      // Simular locais próximos
      const nearbyLocations: Location[] = [
        {
          latitude: currentLocation.latitude + 0.01,
          longitude: currentLocation.longitude + 0.01,
          address: 'Avenida Julius Nyerere, Maputo',
          city: 'Maputo',
          district: 'KaMpfumo'
        },
        {
          latitude: currentLocation.latitude - 0.01,
          longitude: currentLocation.longitude - 0.01,
          address: 'Rua da Marginal, Maputo',
          city: 'Maputo',
          district: 'KaMpfumo'
        }
      ];

      observer.next(nearbyLocations);
      observer.complete();
    });
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }

  // Watch position para tracking em tempo real
  watchPosition(): Observable<Location> {
    return new Observable(observer => {
      if (!navigator.geolocation) {
        observer.error('Geolocation not supported');
        return;
      }

      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const location: Location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address: 'Localização atual',
            city: 'Maputo',
            district: 'KaMpfumo'
          };
          observer.next(location);
        },
        (error) => {
          observer.error(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 1000 // 1 segundo
        }
      );

      // Cleanup function
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    });
  }
}
