import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {IToDo} from "../../../interfaces/todo.interface";
import {TodoService} from "../../../services/todo.service";

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements OnInit{
  todoForm: FormGroup;

  @ViewChild('formDirective') private formDirective: NgForm;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _todoService: TodoService,
    private readonly _renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.todoForm = this._fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }

  get name () {
    return this.todoForm.get('name') as FormControl;
  }

  private getName() {
    return this.name?.value || '';
  }

  create() {
    if (this.todoForm.valid) {
      const todo: Partial<IToDo> = {
        name: this.getName(),
        isCompleted: false,
      }

      this._todoService.create(todo);
      this.todoForm.reset();
      this.formDirective.resetForm();
      this._renderer.selectRootElement('#inputElement').focus();
    }
  }
}
