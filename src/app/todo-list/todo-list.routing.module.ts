import {RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { TodoListComponent } from "./todo-list.component";

const routes: Routes = [
  { path: '', component: TodoListComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
  providers: [],

})
export class TodoListRoutingModule {}


