import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Booking, BookingStatus, Location, Provider } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private currentBookingSubject = new BehaviorSubject<Booking | null>(null);
  private availableProvidersSubject = new BehaviorSubject<Provider[]>([]);
  private bookingStatusSubject = new BehaviorSubject<BookingStatus>(BookingStatus.PENDING);

  public currentBooking$ = this.currentBookingSubject.asObservable();
  public availableProviders$ = this.availableProvidersSubject.asObservable();
  public bookingStatus$ = this.bookingStatusSubject.asObservable();

  constructor() { }

  // Criar nova solicitação de serviço
  createBooking(bookingData: Partial<Booking>): Observable<Booking> {
    const booking: Booking = {
      id: this.generateId(),
      clientId: 'current-user-id', // Em produção, viria do auth service
      serviceId: bookingData.serviceId!,
      status: BookingStatus.PENDING,
      location: bookingData.location!,
      scheduledTime: bookingData.scheduledTime || new Date(),
      estimatedDuration: bookingData.estimatedDuration || 60,
      price: bookingData.price || 0,
      currency: 'MZN',
      description: bookingData.description || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.currentBookingSubject.next(booking);
    this.bookingStatusSubject.next(BookingStatus.SEARCHING_PROVIDER);
    
    // Simular busca por prestadores
    this.searchProviders(booking);
    
    return new Observable(observer => {
      observer.next(booking);
      observer.complete();
    });
  }

  // Buscar prestadores disponíveis
  private searchProviders(booking: Booking): void {
    // Simular API call para buscar prestadores
    setTimeout(() => {
      const mockProviders: Provider[] = [
        {
          id: '1',
          name: 'João Silva',
          email: 'joao@email.com',
          phone: '+258841234567',
          rating: 4.8,
          totalJobs: 150,
          specialties: [1, 2], // Elétrica, Canalização
          location: {
            latitude: -25.969248,
            longitude: 32.573924,
            address: 'Maputo, Moçambique',
            city: 'Maputo',
            district: 'KaMpfumo'
          },
          isOnline: true,
          isAvailable: true
        },
        {
          id: '2',
          name: 'Maria Santos',
          email: 'maria@email.com',
          phone: '+258841234568',
          rating: 4.9,
          totalJobs: 200,
          specialties: [1, 3], // Elétrica, Solar
          location: {
            latitude: -25.969248,
            longitude: 32.573924,
            address: 'Maputo, Moçambique',
            city: 'Maputo',
            district: 'KaMpfumo'
          },
          isOnline: true,
          isAvailable: true
        }
      ];

      this.availableProvidersSubject.next(mockProviders);
      this.bookingStatusSubject.next(BookingStatus.PROVIDER_ASSIGNED);
    }, 2000);
  }

  // Atribuir prestador ao serviço
  assignProvider(providerId: string): void {
    const currentBooking = this.currentBookingSubject.value;
    if (currentBooking) {
      currentBooking.providerId = providerId;
      currentBooking.updatedAt = new Date();
      this.currentBookingSubject.next(currentBooking);
      this.bookingStatusSubject.next(BookingStatus.PROVIDER_ARRIVING);
    }
  }

  // Atualizar status do serviço
  updateBookingStatus(status: BookingStatus): void {
    const currentBooking = this.currentBookingSubject.value;
    if (currentBooking) {
      currentBooking.status = status;
      currentBooking.updatedAt = new Date();
      this.currentBookingSubject.next(currentBooking);
      this.bookingStatusSubject.next(status);
    }
  }

  // Cancelar serviço
  cancelBooking(): void {
    this.updateBookingStatus(BookingStatus.CANCELLED);
    this.currentBookingSubject.next(null);
  }

  // Calcular preço dinâmico baseado na demanda
  calculateDynamicPrice(serviceId: number, location: Location, scheduledTime: Date): number {
    // Lógica simplificada - em produção seria mais complexa
    const basePrice = this.getBasePrice(serviceId);
    const demandMultiplier = this.getDemandMultiplier(location, scheduledTime);
    const distanceMultiplier = this.getDistanceMultiplier(location);
    
    return Math.round(basePrice * demandMultiplier * distanceMultiplier);
  }

  private getBasePrice(serviceId: number): number {
    const prices: { [key: number]: number } = {
      1: 250, // Elétrica
      2: 200, // Canalização
      3: 500, // Solar
      4: 150, // Eletrónica
      5: 300, // Ar Condicionado
      6: 180, // Eletrodomésticos
      7: 220, // Carpintaria
      8: 160  // Pintura
    };
    return prices[serviceId] || 200;
  }

  private getDemandMultiplier(location: Location, scheduledTime: Date): number {
    // Simular multiplicador baseado na demanda
    const hour = scheduledTime.getHours();
    const isWeekend = scheduledTime.getDay() === 0 || scheduledTime.getDay() === 6;
    
    if (isWeekend) return 1.2;
    if (hour >= 8 && hour <= 18) return 1.0;
    if (hour >= 19 && hour <= 22) return 1.3;
    return 1.5; // Horário noturno
  }

  private getDistanceMultiplier(location: Location): number {
    // Simular multiplicador baseado na distância do centro
    return 1.0; // Simplificado
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
