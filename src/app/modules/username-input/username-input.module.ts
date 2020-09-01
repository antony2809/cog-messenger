import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { UsernameInputComponent } from './username-input.component';

@NgModule({
  declarations: [UsernameInputComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsernameInputComponent,
      },
    ]),
  ],
})
export class UsernameInputModule {}
