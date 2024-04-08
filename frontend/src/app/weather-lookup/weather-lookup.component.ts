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
}
