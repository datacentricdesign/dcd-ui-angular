import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstantThingsComponent } from './constant-things.component';

describe('ConstantThingsComponent', () => {
  let component: ConstantThingsComponent;
  let fixture: ComponentFixture<ConstantThingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstantThingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstantThingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
