import { Injectable } from '@angular/core';
import { Observable, of, Subject, throwError, UnaryFunction } from 'rxjs';
import { IntermediaryModels } from '../../models/intermediary.models';
import { pipe } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IntermediaryService {

  toastSubject: Subject<IntermediaryModels.Toast> = new Subject();

  constructor() { 
  }

  pipedToast<T>(successMessage: string, errorMessage?: string) {
    return pipe(map((value:T) => {
      this.showSuccedToast(successMessage);
      return value;
    }), catchError(error => {
      errorMessage = errorMessage || typeof(error) == "string" ? error : '';
      errorMessage && this.showErrorToast(errorMessage);
      return throwError(error);
    }))
  }

  showSuccedToast(message: string, header?: string) {
    this.showToast(message, "success", header);
  }

  showErrorToast(message: string, header?: string) {
    this.showToast(message, "error")
  }

  private showToast(message: string, type: IntermediaryModels.Toast['type'], header?: string) {
    this.toastSubject.next({
      message,
      type,
      header
    });
  }


}
