import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WeatherLookupComponent } from './weather-lookup/weather-lookup.component';
import { ImageInputComponent } from './image-input/image-input.component';

@Component({
  standalone: true,
  imports: [ImageInputComponent, WeatherLookupComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
}
