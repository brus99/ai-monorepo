import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-lookup.component.html',
  styleUrl: './weather-lookup.component.css',
  selector: 'weather-lookup',
})
export class WeatherLookupComponent {
  constructor() {
    const userLocation = this.getUserLocation();
    this.latitude = 0;
    this.longitude = 0;
  }

  public latitude: number;
  public longitude: number;

  public async getUserLocation(): Promise<GeolocationPosition> {

    // could pass latlong data from UI instead
    let userLocation: GeolocationPosition = {} as GeolocationPosition;

    try {
      if("geolocation" in navigator) {
        await navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
          userLocation = position;
          this.latitude = userLocation.coords.latitude;
          this.longitude = userLocation.coords.longitude;
        });
      } 
  } catch (error) {
      throw new Error('Error getting user location');
  }
    return userLocation;
  }
}
