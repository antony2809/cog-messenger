import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ResponsiveService {
  constructor(private breakpointObserver: BreakpointObserver) {}

  get isSmallScreen(): Observable<boolean> {
    return this.breakpointObserver
      .observe('(max-width: 599px)')
      .pipe(map((value) => value.matches));
  }
}
