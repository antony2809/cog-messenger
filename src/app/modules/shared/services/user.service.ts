import { Injectable } from '@angular/core';
import { User } from '../../../models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import * as faker from 'faker';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user = new BehaviorSubject<User>(null);

  constructor() {
    this._initializeUser();
  }

  get currentUser(): User {
    return this._user.getValue();
  }

  get user(): Observable<User> {
    return this._user.asObservable();
  }

  createUser(username: string): void {
    const user = {
      id: btoa(username),
      username,
      avatarUrl: `https://eu.ui-avatars.com/api/?color=FFFFFF&name=${username
        .charAt(0)
        .toUpperCase()}&background=${faker.internet.color().replace('#', '')}`,
    };

    this._user.next(user);

    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  private _initializeUser() {
    if (localStorage.getItem('currentUser')) {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      this._user.next(user);
    }
  }
}
