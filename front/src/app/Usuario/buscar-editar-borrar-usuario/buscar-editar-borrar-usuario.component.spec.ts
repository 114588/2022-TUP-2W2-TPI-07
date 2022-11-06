import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarEditarBorrarUsuarioComponent } from './buscar-editar-borrar-usuario.component';

describe('BuscarEditarBorrarUsuarioComponent', () => {
  let component: BuscarEditarBorrarUsuarioComponent;
  let fixture: ComponentFixture<BuscarEditarBorrarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarEditarBorrarUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarEditarBorrarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
