import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprovinciaComponent } from './editprovincia.component';

describe('EditprovinciaComponent', () => {
  let component: EditprovinciaComponent;
  let fixture: ComponentFixture<EditprovinciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditprovinciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditprovinciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
