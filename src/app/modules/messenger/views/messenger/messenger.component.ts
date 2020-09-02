import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ResponsiveService } from '../../../shared/services/responsive.service';
import { RoomService } from 'src/app/modules/shared/services/room.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessengerComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  isSmallScreen$: Observable<boolean>;

  constructor(
    private responsiveService: ResponsiveService,
    private roomService: RoomService
  ) {}

  checkSidebarStatus(): void {
    if (this.responsiveService.isSmallScreen) {
      this.toggleSidebar();
    }
  }

  toggleSidebar(): void {
    this.sidenav.toggle();
  }

  ngOnInit(): void {
    this.isSmallScreen$ = this.responsiveService.isSmallScreen$;
    this.roomService.generateRooms();
  }
}
