import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Service } from './models/service.model';
import { DataService } from './services/data.service';
import { HeaderComponent } from './components/header/header.component';
import { LocationBarComponent } from './components/location-bar/location-bar.component';
import { ServiceCardComponent } from './components/service-card/service-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, LocationBarComponent, ServiceCardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'drill4job-app';
  services: Service[] = [];
  filteredServices: Service[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'all';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.services = this.dataService.getServices();
    this.filteredServices = this.services;
  }

  onSearchChange() {
    this.filterServices();
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.filterServices();
  }

  filterServices() {
    this.filteredServices = this.services.filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory === 'all' || service.name.toLowerCase().includes(this.selectedCategory.toLowerCase());
      return matchesSearch && matchesCategory;
    });
  }

  getCategories(): string[] {
    return ['all', 'elétrica', 'canalização', 'solar', 'eletrónica', 'ar condicionado', 'eletrodomésticos', 'carpintaria', 'pintura'];
  }

  getCategoryLabel(category: string): string {
    const labels: { [key: string]: string } = {
      'all': 'Todos',
      'elétrica': 'Elétrica',
      'canalização': 'Canalização',
      'solar': 'Solar',
      'eletrónica': 'Eletrónica',
      'ar condicionado': 'Ar Condicionado',
      'eletrodomésticos': 'Eletrodomésticos',
      'carpintaria': 'Carpintaria',
      'pintura': 'Pintura'
    };
    return labels[category] || category;
  }

  onServiceClick(service: Service) {
    console.log('Service clicked:', service.name);
    // Aqui você pode implementar a navegação para o fluxo de booking
  }
}

