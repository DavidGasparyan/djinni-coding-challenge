import { Injectable } from '@angular/core';
import {
  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private readonly _snackBar: MatSnackBar
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          // this.handleServerSideError(err);
          return throwError(()=> new HttpErrorResponse(err));
        })
      );
  }

  private handleServerSideError(error: HttpErrorResponse) {
    switch (error.status) {

      case 400: //  means the request could not be understood by the server.
        this._snackBar.open("Bad Request, please try again later .");
        break;
      case 401: // means lacks valid authentication credentials for the target resource.
        this._snackBar.open("Unauthorized, please try again later.");
        break;
      case 403: //  means you are not allowed access to the target resource.
        this._snackBar.open("Forbidden access is denied");
        break;
      case 500: // means there's an issue or temporary glitch with the application's programming
        this._snackBar.open("Internal server error, please try again later.");
        break;
    }
  }
}
