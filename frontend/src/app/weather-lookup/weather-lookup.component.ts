import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-lookup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-lookup.component.html',
  styleUrl: './weather-lookup.component.css',
})
export class WeatherLookupComponent {}
