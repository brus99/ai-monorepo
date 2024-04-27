import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { DataActionComponent } from './data-action-component/data-action.component';
import { ImageInputComponent } from './image-input/image-input.component';
import { WeatherLookupComponent } from './weather-lookup/weather-lookup.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherLookupComponent,
    ImageInputComponent,
    DataActionComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent, HomePageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }