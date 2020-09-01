import {
  Component,
  OnInit,
  ViewChild,
  NgZone,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { RoomService } from 'src/app/modules/shared/services/room.service';
import { Room } from 'src/app/models/room';
import { Observable, Subject } from 'rxjs';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { v4 } from 'uuid';
import { UserService } from 'src/app/modules/shared/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  @ViewChild('messengerList') messengerList: ElementRef<HTMLDivElement>;
  currentRoom$: Observable<Room>;
  message = new FormControl('', Validators.required);

  constructor(
    private roomService: RoomService,
    private ngZone: NgZone,
    private userService: UserService
  ) {}

  triggerResize(): void {
    this.ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  removeRoom(): void {
    this.roomService.removeRoom();
  }

  sendMessage(evt?: KeyboardEvent): void {
    if (evt) {
      evt.preventDefault();
    }

    if (this.message.value.length === 0) {
      return;
    }

    const message = this.message.value;
    const user = this.userService.currentUser;
    this.roomService.addMessage({
      sender: user,
      created: new Date(),
      description: message,
      id: v4(),
    });
    this.message.setValue('');
    setTimeout(() => {
      this.messengerList[
        '_elementRef'
      ].nativeElement.scrollTop = this.messengerList[
        '_elementRef'
      ].nativeElement.scrollHeight;
    }, 80);
  }

  ngOnInit(): void {
    this.currentRoom$ = this.roomService.currentRoom;
  }
}
