import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Service } from './models/service.model';
import { DataService } from './services/data.service';
import { HeaderComponent } from './components/header/header.component';
import { LocationBarComponent } from './components/location-bar/location-bar.component';
import { ServiceCardComponent } from './components/service-card/service-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, LocationBarComponent, ServiceCardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'drill4job-app';
  services: Service[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.services = this.dataService.getServices();
  }
}

