import {RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: 'todos',
    loadChildren: () => import('./todo-list/todo-list.module').then(m => m.TodoListModule),
  },
  { path: '', component: WelcomeComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
  providers: [],

})
export class AppRoutingModule {}


