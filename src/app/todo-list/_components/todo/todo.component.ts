import {Component, Input, OnInit} from '@angular/core';
import { IToDo } from "../../../interfaces/todo.interface";
import { TodoService } from "../../../services/todo.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  @Input() data!: IToDo;
  isEditing = false;

  constructor(
    readonly todoService: TodoService,
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
    this.todoService.delete(this.data);
  }

  update(todo: IToDo) {
    const id = todo.id;
    const data = todo;

    this.todoService.update(id, data);
  }

  startEditing() {
   this.isEditing = true;
  }

  setEditingEvent(editingStatus: boolean) {
    this.isEditing = editingStatus;
  }
}
