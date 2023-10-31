import { TestBed } from '@angular/core/testing';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => {
  let guard: AdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminGuard); // Inject the AdminGuard
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation when authorized', () => {
    // Mock an ActivatedRouteSnapshot and RouterStateSnapshot if needed
    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

    // Implement your test logic here
    // For example:
    // const canActivate = guard.canActivate(route, state);
    // expect(canActivate).toBe(true);
  });

  it('should prevent activation when not authorized', () => {
    // Mock an ActivatedRouteSnapshot and RouterStateSnapshot if needed
    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

    // Implement your test logic here
    // For example:
    // const canActivate = guard.canActivate(route, state);
    // expect(canActivate).toBe(false);
  });
});
