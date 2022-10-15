import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AltaComponent } from 'src/app/Usuario/alta/alta.component';

import { AltaComponentProveedor } from './alta.component';

describe('AltaComponentProveedorponent', () => {
  let component: AltaComponentProveedor;
  let fixture: ComponentFixture<AltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaComponentProveedor ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaComponentProveedor);
    //component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
