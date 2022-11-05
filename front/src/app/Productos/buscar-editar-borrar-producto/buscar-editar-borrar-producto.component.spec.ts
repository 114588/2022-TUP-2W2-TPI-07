import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarEditarBorrarProductoComponent } from './buscar-editar-borrar-producto.component';

describe('BuscarEditarBorrarProductoComponent', () => {
  let component: BuscarEditarBorrarProductoComponent;
  let fixture: ComponentFixture<BuscarEditarBorrarProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarEditarBorrarProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarEditarBorrarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
