import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list.component';
import { TodoListRoutingModule } from "./todo-list.routing.module";
import {TodoComponent} from "./_components/todo/todo.component";



@NgModule({
  declarations: [
    TodoListComponent,
    TodoComponent,
  ],
  imports: [
    CommonModule,
    TodoListRoutingModule,
  ],
  exports: [
    TodoListComponent
  ],
})
export class TodoListModule { }
