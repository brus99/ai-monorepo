import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WeatherLookupComponent } from './weather-lookup/weather-lookup.component';

@Component({
  standalone: true,
  imports: [WeatherLookupComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
}
