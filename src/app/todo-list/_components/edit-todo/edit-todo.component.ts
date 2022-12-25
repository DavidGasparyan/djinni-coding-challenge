import {Component, EventEmitter, Input, Output, Renderer2, ViewChild} from '@angular/core';
import {IToDo} from "../../../interfaces/todo.interface";
import {TodoService} from "../../../services/todo.service";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent {
  @Input() data: IToDo;
  @Output() editingEvent = new EventEmitter<boolean>();

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

    this.name.setValue(this.data.name);
  }

  get name () {
    return this.todoForm.get('name') as FormControl;
  }

  private getName() {
    return this.name?.value || '';
  }

  edit() {
    if (this.todoForm.valid) {
      const id = Number(this.data.id);
      const updateToDo: Partial<IToDo> = {
        name: this.getName(),
      }

      this._todoService.update(id, updateToDo);
      this.todoForm.reset();
      this.formDirective.resetForm();
      this.stopEditing();
    }
  }

  stopEditing() {
    this.editingEvent.emit(false);
  }
}
