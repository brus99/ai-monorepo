import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardUiComponent } from '../card-ui/card-ui.component';
import { CardItemUiComponent } from '../card-item-ui/card-item-ui.component';

@Component({
  standalone: true,
  imports: [CommonModule, CardUiComponent, CardItemUiComponent],
  templateUrl: './weather-lookup.component.html',
  styleUrl: './weather-lookup.component.css',
  selector: 'app-weather-lookup',
})
export class WeatherLookupComponent implements OnInit {
  constructor() {
    this.latitude = 0;
    this.longitude = 0;
  }
  
  ngOnInit() {
    this.getUserLocation();
  }

  public latitude: number;
  public longitude: number;
  public isLocationLoaded = false;

  public async getUserLocation(): Promise<GeolocationPosition> {

    // could pass latlong data from UI instead
    let userLocation: GeolocationPosition = {} as GeolocationPosition;

    try {
      if("geolocation" in navigator) {
        await navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
          userLocation = position;
          this.latitude = userLocation.coords.latitude;
          this.longitude = userLocation.coords.longitude;
          this.isLocationLoaded = true;
        });
      } 
  } catch (error) {
      throw new Error('Error getting user location');
  }
    return userLocation;
  }
}
