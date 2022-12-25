import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, throwError} from "rxjs";
import {IToDo} from "../interfaces/todo.interface";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private API_URL = 'http://localhost:3000/todos';
  private _headers = new HttpHeaders().set('Content-Type', 'application/json');
  private _todoList: IToDo[] = [];
  private _todoList$ = new BehaviorSubject<IToDo[]>(this._todoList);


  constructor(
    private readonly _http: HttpClient,
  ) {
  }

  get() {
    return this._http.get(this.API_URL)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('An error occurred:', error.error)
          return throwError(()=> new HttpErrorResponse(error));
        })
      )
      .subscribe((todos: IToDo[]) => {
        this._todoList = [ ...todos ];
        this._todoList$.next(this._todoList);
      })
  }

  create(todo: Partial<IToDo>)  {
    return this._http.post<IToDo>(this.API_URL, todo)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('An error occurred:', error.error)
          return throwError(()=> new HttpErrorResponse(error));
        })
      )
      .subscribe((todo: IToDo) => {
        this._todoList.push(todo);
        this._todoList$.next(this._todoList);
      })
  }

  update(id: any, data: Partial<IToDo>) {
    return this._http.put(`${this.API_URL}/${id}`, data, { headers: this._headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('An error occurred:', error.error)
          return throwError(()=> new HttpErrorResponse(error));
        })
      )
      .subscribe((updatedTodo: IToDo) => {
        console.log(updatedTodo)
        this._updateTodo(updatedTodo);
        this._todoList$.next(this._todoList);
      })
  }

  delete(todo: IToDo) {
    return this._http.delete(`${this.API_URL}/${todo.id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('An error occurred:', error.error)
          return throwError(()=> new HttpErrorResponse(error));
        })
      )
      .subscribe(() => {
        this._deleteTodo(todo);
        this._todoList$.next(this._todoList);
      })
  }

  private _updateTodo(updatedTodo: IToDo) {
    this._todoList = this._todoList.map((todo) => {
      if (todo.id === updatedTodo.id) {
        return { ... updatedTodo };
      }

      return todo;
    });
  }

  private _deleteTodo(deletedTodo: IToDo) {
    this._todoList = this._todoList.filter((todo => todo.id !== deletedTodo.id));
  }

  get todoList$() {
    return this._todoList$.asObservable();
  }
}
