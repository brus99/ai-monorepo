import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataActionComponent } from './data-action.component';

describe('DataActionComponentComponent', () => {
  let component: DataActionComponent;
  let fixture: ComponentFixture<DataActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataActionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
