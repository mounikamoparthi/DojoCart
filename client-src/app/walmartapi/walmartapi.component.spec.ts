import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalmartapiComponent } from './walmartapi.component';

describe('WalmartapiComponent', () => {
  let component: WalmartapiComponent;
  let fixture: ComponentFixture<WalmartapiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalmartapiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalmartapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
