import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyImagesComponent } from './property-images.component';

describe('PropertyImagesComponent', () => {
  let component: PropertyImagesComponent;
  let fixture: ComponentFixture<PropertyImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
