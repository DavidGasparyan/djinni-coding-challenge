import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list.component';
import { TodoListRoutingModule } from "./todo-list.routing.module";
import { TodoComponent } from "./_components/todo/todo.component";
import { CreateTodoComponent } from "./_components/create-todo/create-todo.component";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";



@NgModule({
  declarations: [
    TodoListComponent,
    TodoComponent,
    CreateTodoComponent,
  ],
  imports: [
    CommonModule,
    TodoListRoutingModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  exports: [
    TodoListComponent
  ],
})
export class TodoListModule { }
