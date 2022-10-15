import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BajaComponent } from 'src/app/Usuario/baja/baja.component';

import { BajaComponentProveedor } from './baja.component';

describe('BajaComponentProveedor', () => {
  let component: BajaComponentProveedor;
  let fixture: ComponentFixture<BajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BajaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
