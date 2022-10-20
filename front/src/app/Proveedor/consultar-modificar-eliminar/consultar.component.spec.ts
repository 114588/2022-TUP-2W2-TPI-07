import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarComponentProveedor } from "./consultar.component";

describe('ConsultarComponent', () => {
  let component: ConsultarComponentProveedor;
  let fixture: ComponentFixture<ConsultarComponentProveedor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarComponentProveedor ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarComponentProveedor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
