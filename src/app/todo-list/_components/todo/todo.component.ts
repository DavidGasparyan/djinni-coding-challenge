import { Component, Input } from '@angular/core';
import { IToDo } from "../../../interfaces/todo.interface";
import { TodoService } from "../../../services/todo.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  @Input() data!: IToDo;

  constructor(
    private readonly _todoService: TodoService,
  ) {
  }

  get isCompleted(): boolean {
    return this.data.isCompleted;
  }

  get name() {
    return this.data.name;
  }

  changeStatus() {
    this.data.isCompleted = !this.data.isCompleted;
    this.update(this.data);
  }

  remove() {
    this._todoService.delete(this.data);
  }

  update(todo: IToDo) {
    const id = todo.id;
    const data = todo;

    this._todoService.update(id, data);
  }
}
