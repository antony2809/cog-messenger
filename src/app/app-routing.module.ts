import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessGuard } from './guards/access.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/messenger/messenger.module').then(
        (m) => m.MessengerModule
      ),
    canActivate: [AccessGuard],
    data: { url: 'main' },
  },
  {
    path: 'username-picker',
    loadChildren: () =>
      import('./modules/username-input/username-input.module').then(
        (m) => m.UsernameInputModule
      ),
    canActivate: [AccessGuard],
    data: { url: 'picker' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
