import { ErrorHandler, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private _snackBar: MatSnackBar
  ) {}

  handleError(error: TypeError) {
    console.log("error", error);
    this.displayError(error);
  }

  private displayError(error: TypeError): void {
    this._snackBar.open(error.message);
  }

}
