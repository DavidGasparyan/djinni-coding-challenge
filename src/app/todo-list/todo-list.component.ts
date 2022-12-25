import {Component, OnInit} from '@angular/core';
import {IToDo} from "../interfaces/todo.interface";
import {TodoService} from "../services/todo.service";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todoList: IToDo[] = [];

  constructor(
    private readonly _todoService: TodoService,
  ) {
  }

  ngOnInit() {
    this._todoService.get();

    this._todoService.todoList$
      .subscribe((todos: IToDo[]) => {
        this.todoList = [ ...todos ];
      })
  }
}
