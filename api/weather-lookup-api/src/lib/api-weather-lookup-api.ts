import { WeatherCategory } from '../domain/Weather-Category.interface'
import { DailyTemperatures } from '../domain/daily-temperatures.interface'

import axios from 'axios';
import { UserLocation } from '../domain/user-location.interface';



export class weatherLookupService {

  // may want to refactor this to be called by fetch weather data and just return the category, can do this later.
  public mapWeatherToCategory(temperature: number): WeatherCategory {
    switch(true) {
      case temperature < 0:
        return WeatherCategory.Freezing;
      case temperature < 10:
        return WeatherCategory.Cold;
      case temperature < 20:
        return WeatherCategory.Mild;
      case temperature < 30:
        return WeatherCategory.Warm;
      case temperature < 40:
        return WeatherCategory.Hot;
      case temperature >= 40:
        return WeatherCategory.VeryHot;
    }
  }

  public async fetchWeatherData(userLocation: UserLocation): Promise<DailyTemperatures> {
    try {
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${userLocation.coords.latitude}&longitude=${userLocation.coords.longitude}&daily=temperature_2m_max,temperature_2m_min&forecast_days=1`;

      const response = await axios.get(weatherUrl);

      const dailyTemperatures: DailyTemperatures = {
        maxTemperature: response.data.daily.temperature_2m_max,
        minTemperature: response.data.daily.temperature_2m_min,
        date: response.data.daily.time,
      };

      return dailyTemperatures;
    } catch (error) {
      throw new Error(`Error fetching weather data ${error.message}`);
    }
  }
}