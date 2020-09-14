import { TestBed } from '@angular/core/testing';

import { NavbarCloseService } from './navbar-close.service';

describe('NavbarCloseService', () => {
  let service: NavbarCloseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarCloseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
