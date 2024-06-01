import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherLookupComponent } from '../weather-lookup/weather-lookup.component';
import { ImageInputComponent } from '../image-input/image-input.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { CardUiComponent } from '../card-ui/card-ui.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, HomePageComponent, WeatherLookupComponent, ImageInputComponent, NgbAccordionModule, CardUiComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {}
