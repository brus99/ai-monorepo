import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WeatherLookupComponent } from './weather-lookup/weather-lookup.component';
import { ImageInputComponent } from './image-input/image-input.component';
import { DataActionComponent } from './data-action-component/data-action.component';

@Component({
  standalone: true,
  imports: [ImageInputComponent, WeatherLookupComponent, DataActionComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
}
