import { Component } from '@angular/core';

@Component({
  selector: 'app-location-bar',
  standalone: true,
  templateUrl: './location-bar.component.html',
  styleUrls: ['./location-bar.component.css']
})
export class LocationBarComponent {
  location: string = 'Maputo, Mozambique';
  radius: string = 'raio 5km';

  changeLocation() {
    // Logic to change location
    console.log('Change location clicked');
  }
}

