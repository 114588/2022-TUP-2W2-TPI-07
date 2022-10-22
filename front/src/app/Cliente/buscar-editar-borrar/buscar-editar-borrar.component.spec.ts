import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarEditarBorrarComponent } from './buscar-editar-borrar.component';

describe('BuscarEditarBorrarComponent', () => {
  let component: BuscarEditarBorrarComponent;
  let fixture: ComponentFixture<BuscarEditarBorrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarEditarBorrarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarEditarBorrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
