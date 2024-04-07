import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherLookupComponent } from './weather-lookup.component';

describe('WeatherLookupComponent', () => {
  let component: WeatherLookupComponent;
  let fixture: ComponentFixture<WeatherLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherLookupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
