import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { BookingService } from '../../services/booking.service';
import { LocationService } from '../../services/location.service';
import { Booking, BookingStatus, Location, Provider } from '../../models/booking.model';

@Component({
  selector: 'app-booking-flow',
  templateUrl: './booking-flow.component.html',
  styleUrls: ['./booking-flow.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class BookingFlowComponent implements OnInit, OnDestroy {
  currentBooking: Booking | null = null;
  availableProviders: Provider[] = [];
  currentLocation: Location | null = null;
  bookingStatus: BookingStatus = BookingStatus.PENDING;
  selectedService: any = null;
  
  private subscriptions: Subscription[] = [];

  constructor(
    private bookingService: BookingService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    // Subscrever às mudanças de estado
    this.subscriptions.push(
      this.bookingService.currentBooking$.subscribe(booking => {
        this.currentBooking = booking;
      })
    );

    this.subscriptions.push(
      this.bookingService.availableProviders$.subscribe(providers => {
        this.availableProviders = providers;
      })
    );

    this.subscriptions.push(
      this.bookingService.bookingStatus$.subscribe(status => {
        this.bookingStatus = status;
      })
    );

    this.subscriptions.push(
      this.locationService.currentLocation$.subscribe(location => {
        this.currentLocation = location;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // Iniciar solicitação de serviço
  startBooking(service: any): void {
    this.selectedService = service;
    
    if (!this.currentLocation) {
      this.locationService.getCurrentPosition().then(location => {
        this.createBooking(service, location);
      }).catch(error => {
        console.error('Erro ao obter localização:', error);
        // Fallback para localização padrão
        const defaultLocation: Location = {
          latitude: -25.969248,
          longitude: 32.573924,
          address: 'Maputo, Moçambique',
          city: 'Maputo',
          district: 'KaMpfumo'
        };
        this.createBooking(service, defaultLocation);
      });
    } else {
      this.createBooking(service, this.currentLocation);
    }
  }

  private createBooking(service: any, location: Location): void {
    const price = this.bookingService.calculateDynamicPrice(
      service.id, 
      location, 
      new Date()
    );

    const bookingData = {
      serviceId: service.id,
      location: location,
      price: price,
      description: `Serviço de ${service.name}`,
      estimatedDuration: 60
    };

    this.bookingService.createBooking(bookingData).subscribe();
  }

  // Selecionar prestador
  selectProvider(provider: Provider): void {
    this.bookingService.assignProvider(provider.id);
  }

  // Cancelar serviço
  cancelBooking(): void {
    this.bookingService.cancelBooking();
    this.selectedService = null;
  }

  // Obter texto do status
  getStatusText(): string {
    switch (this.bookingStatus) {
      case BookingStatus.PENDING:
        return 'Preparando solicitação...';
      case BookingStatus.SEARCHING_PROVIDER:
        return 'Buscando prestadores disponíveis...';
      case BookingStatus.PROVIDER_ASSIGNED:
        return 'Prestador selecionado!';
      case BookingStatus.PROVIDER_ARRIVING:
        return 'Prestador a caminho...';
      case BookingStatus.IN_PROGRESS:
        return 'Serviço em andamento...';
      case BookingStatus.COMPLETED:
        return 'Serviço concluído!';
      case BookingStatus.CANCELLED:
        return 'Serviço cancelado';
      default:
        return 'Status desconhecido';
    }
  }

  // Obter cor do status
  getStatusColor(): string {
    switch (this.bookingStatus) {
      case BookingStatus.PENDING:
      case BookingStatus.SEARCHING_PROVIDER:
        return 'text-yellow-600';
      case BookingStatus.PROVIDER_ASSIGNED:
      case BookingStatus.PROVIDER_ARRIVING:
        return 'text-blue-600';
      case BookingStatus.IN_PROGRESS:
        return 'text-orange-600';
      case BookingStatus.COMPLETED:
        return 'text-green-600';
      case BookingStatus.CANCELLED:
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  }
}
