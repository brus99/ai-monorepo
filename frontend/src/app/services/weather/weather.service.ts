import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  public longitude = 0; 
  public latitude = 0;



  public async getUserLocation(): Promise<GeolocationPosition> {
// could pass latlong data from UI instead

    try {
      if("geolocation" in navigator) {
        await navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
          console.log(position);  
          return position;
        });
      } 
    } catch (error) {
        throw new Error('Error getting user location');
    }
    return {} as GeolocationPosition;
    }
  }
