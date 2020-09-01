import { Injectable } from '@angular/core';
import * as faker from 'faker';
import { Room } from '../../../models/room';
import { v4 } from 'uuid';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from 'src/app/models/message';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private _rooms = new BehaviorSubject<Room[]>(null);
  private _currentRoom = new BehaviorSubject<Room>(null);

  get rooms(): Observable<Room[]> {
    return this._rooms.asObservable();
  }

  get currentRoom(): Observable<Room> {
    return this._currentRoom.asObservable();
  }

  selectRoom(room: Room): void {
    this._currentRoom.next(room);
  }

  generateRooms(): void {
    const rooms = [];
    for (let i = 0; i < 6; i++) {
      const room: Room = this.getRoom();
      rooms.push(room);
    }
    this._rooms.next(rooms);
    this._currentRoom.next(rooms.sort((a, b) => b.updated - a.updated)[0]);
  }

  get roomIds(): string[] {
    return this._rooms
      .getValue()
      .sort((a, b) => b.updated - a.updated)
      .map((room) => room.id);
  }

  createRoom(): void {
    let rooms = this._rooms.getValue();
    const room = this.getRoom();
    rooms = [...rooms, room];
    this._rooms.next(rooms);
    this._currentRoom.next(room);
  }

  removeRoom(): void {
    const currentRoom = this._currentRoom.getValue();
    let rooms = this._rooms.getValue();
    rooms = rooms.filter((room) => room.id !== currentRoom.id);
    console.log(rooms.length);
    this._rooms.next(rooms);
    this._currentRoom.next(rooms[0]);
  }

  addMessage(message: Message): void {
    const currentRoom = { ...this._currentRoom.getValue() };
    const rooms = this._rooms.getValue();
    const idx = this.roomIds.indexOf(currentRoom.id);
    currentRoom.messages = [...currentRoom.messages, message];
    rooms[idx].messages = [...rooms[idx].messages, message];
    rooms[idx].lastMessage = message.description;
    rooms[idx].updated = Date.now();
    this._currentRoom.next(currentRoom);
    this._rooms.next(rooms);
  }

  private getRoom(): Room {
    const username = faker.internet.userName();
    const userId = v4();
    const message = faker.lorem.sentence();
    const avatarUrl = faker.internet.avatar();
    const room: Room = {
      id: userId,
      updated: Date.now(),
      messages: [
        {
          sender: {
            avatarUrl,
            username,
            id: userId,
          },
          description: message,
          created: new Date(),
          id: v4(),
        },
      ],
      title: username,
      lastMessage: message,
      avatarUrl,
    };
    return room;
  }
}
