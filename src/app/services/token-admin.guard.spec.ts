import { TestBed } from '@angular/core/testing';

import { TokenAdminGuard } from './token-admin.guard';

describe('TokenAdminGuard', () => {
  let guard: TokenAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TokenAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
