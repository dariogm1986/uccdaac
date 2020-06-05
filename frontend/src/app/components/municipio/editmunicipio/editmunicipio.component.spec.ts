import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmunicipioComponent } from './editmunicipio.component';

describe('EditmunicipioComponent', () => {
  let component: EditmunicipioComponent;
  let fixture: ComponentFixture<EditmunicipioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditmunicipioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmunicipioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
