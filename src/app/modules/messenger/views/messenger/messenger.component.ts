import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponsiveService } from '../../../shared/services/responsive.service';
import { RoomService } from 'src/app/modules/shared/services/room.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessengerComponent implements OnInit {
  isSmallScreen$: Observable<boolean>;

  constructor(
    private responsiveService: ResponsiveService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.isSmallScreen$ = this.responsiveService.isSmallScreen;
    this.roomService.generateRooms();
  }
}
