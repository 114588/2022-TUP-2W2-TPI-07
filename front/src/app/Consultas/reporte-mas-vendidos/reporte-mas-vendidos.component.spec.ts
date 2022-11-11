import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteMasVendidosComponent } from './reporte-mas-vendidos.component';

describe('ReporteMasVendidosComponent', () => {
  let component: ReporteMasVendidosComponent;
  let fixture: ComponentFixture<ReporteMasVendidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteMasVendidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteMasVendidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
