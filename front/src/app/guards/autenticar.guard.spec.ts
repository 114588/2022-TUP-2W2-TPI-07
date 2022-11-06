import { TestBed } from '@angular/core/testing';

import { AutenticarGuard } from './autenticar.guard';

describe('AutenticarGuard', () => {
  let guard: AutenticarGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AutenticarGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
