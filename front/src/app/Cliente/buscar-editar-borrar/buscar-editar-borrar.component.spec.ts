import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarEditarBorrarCliente} from './buscar-editar-borrar.component';

describe('BuscarEditarBorrarComponent', () => {
  let component: BuscarEditarBorrarCliente;
  let fixture: ComponentFixture<BuscarEditarBorrarCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarEditarBorrarCliente ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarEditarBorrarCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
