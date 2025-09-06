export interface Booking {
  id: string;
  clientId: string;
  providerId?: string;
  serviceId: number;
  status: BookingStatus;
  location: Location;
  scheduledTime: Date;
  estimatedDuration: number; // em minutos
  price: number;
  currency: string;
  description: string;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export enum BookingStatus {
  PENDING = 'pending',
  SEARCHING_PROVIDER = 'searching_provider',
  PROVIDER_ASSIGNED = 'provider_assigned',
  PROVIDER_ARRIVING = 'provider_arriving',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  district: string;
}

export interface Provider {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  rating: number;
  totalJobs: number;
  specialties: number[]; // IDs dos serviços
  location: Location;
  isOnline: boolean;
  isAvailable: boolean;
  currentBookingId?: string;
  vehicleInfo?: VehicleInfo;
}

export interface VehicleInfo {
  type: string;
  model: string;
  licensePlate: string;
  color: string;
}

export interface Review {
  id: string;
  bookingId: string;
  reviewerId: string;
  revieweeId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}
