import { UserLocation } from '../domain/user-location.interface';
import { weatherLookupService } from './api-weather-lookup-api';

describe('apiWeatherLookupApi', () => {
  let weatherService: weatherLookupService;

  beforeEach(() => {
    weatherService = new weatherLookupService();
  });

  it('should be defined', () => {
    expect(weatherService).toBeDefined();
  });

  it('should return api-weather-lookup-api', async () => {
    const userLocation =  await weatherService.fetchWeatherData({
      coords: {
        latitude: 0,
        longitude: 0,
      },
    });

    expect(userLocation).toBeDefined();
  });
  it('should map weather to category', async () => {
    const userLocation = await weatherService.fetchWeatherData({
      coords: {
        latitude: 0,
        longitude: 0,
      },
    });

    console.log(userLocation);

    const weatherCategory =  weatherService['mapWeatherToCategory'](29);

    expect(weatherCategory).toEqual('Warm');
  });
});
