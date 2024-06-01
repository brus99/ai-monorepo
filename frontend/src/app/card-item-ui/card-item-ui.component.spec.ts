import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardItemUiComponent } from './card-item-ui.component';

describe('CardItemUiComponent', () => {
  let component: CardItemUiComponent;
  let fixture: ComponentFixture<CardItemUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardItemUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardItemUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
