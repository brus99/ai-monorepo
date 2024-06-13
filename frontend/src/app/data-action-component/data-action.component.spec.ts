import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataActionComponent } from './data-action.component';
import * as fs from 'fs';

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
  it('should call processData', async () => {
    const imageData = fs.readFileSync('assets/mcqueen.jpeg');
    const formData = new FormData();

    const blob = new Blob([imageData], { type: 'image/jpeg' });


    formData.append('image-0', blob, 'mcqueen.jpeg');


    const res = await component.processData(formData);
    console.log(res);
    return res;

  },30000);
});
