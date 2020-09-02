import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ResponsiveService {
  isSmallScreen: boolean;
  
  constructor(private breakpointObserver: BreakpointObserver) {}

  get isSmallScreen$(): Observable<boolean> {
    return this.breakpointObserver.observe('(max-width: 599px)').pipe(
      map((value) => value.matches),
      tap((isSmallScreen) => (this.isSmallScreen = isSmallScreen))
    );
  }
}
