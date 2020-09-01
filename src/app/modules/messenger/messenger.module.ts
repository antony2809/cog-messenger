import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessengerComponent } from './views/messenger/messenger.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RoomListComponent } from './components/room-list/room-list.component';
import { ChatComponent } from './components/chat/chat.component';

@NgModule({
  declarations: [MessengerComponent, RoomListComponent, ChatComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: MessengerComponent,
      },
    ]),
  ],
})
export class MessengerModule {}
