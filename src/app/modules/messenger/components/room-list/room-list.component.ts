import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from 'src/app/modules/shared/services/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { RoomService } from 'src/app/modules/shared/services/room.service';
import { Room } from 'src/app/models/room';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomListComponent implements OnInit {
  typesOfShoes: string[] = [
    'Boots',
    'Clogs',
    'Loafers',
    'Moccasins',
    'Sneakers',
  ];
  user$: Observable<User>;
  rooms$: Observable<Room[]>;
  currentRoom$: Observable<Room>;

  constructor(
    private userService: UserService,
    private roomService: RoomService,
    private router: Router
  ) {}

  selectRoom(room: Room): void {
    this.roomService.selectRoom(room);
  }

  newRoom(): void {
    this.roomService.createRoom();
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['username-picker']);
  }

  trackById(_: number, room: Room): string {
    return room.id;
  }

  ngOnInit(): void {
    this.user$ = this.userService.user;
    this.rooms$ = this.roomService.rooms.pipe(
      map((rooms) => rooms.sort((a, b) => b.updated - a.updated))
    );
    this.currentRoom$ = this.roomService.currentRoom;
  }
}
