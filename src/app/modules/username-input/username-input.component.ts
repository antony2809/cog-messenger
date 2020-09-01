import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { RoomService } from '../shared/services/room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-username-input',
  templateUrl: './username-input.component.html',
  styleUrls: ['./username-input.component.scss'],
})
export class UsernameInputComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private roomService: RoomService,
    private router: Router
  ) {}

  get username(): AbstractControl {
    return this.form.get('username');
  }

  login() {
    const { username } = this.form.value;
    this.userService.createUser(username);
    this.router.navigate(['']);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });
  }
}
