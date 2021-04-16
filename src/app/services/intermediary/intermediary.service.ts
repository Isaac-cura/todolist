import { Injectable } from '@angular/core';
import { Observable, of, Subject, throwError, UnaryFunction } from 'rxjs';
import { IntermediaryModels } from '../../models/intermediary.models';
import { pipe, from } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationComponent } from '../../components/confirmation/confirmation.component';

@Injectable({
  providedIn: 'root'
})
export class IntermediaryService {

  toastSubject: Subject<IntermediaryModels.Toast> = new Subject();

  constructor(
    private modalService: NgbModal
  ) { 
  }

  showConfirmation(message: string, title?: string) {
    const modal = this.modalService.open(ConfirmationComponent);
    const confirmationComponent: ConfirmationComponent = modal.componentInstance;
    confirmationComponent.message = message;
    return from(modal.result).pipe(switchMap(confirm => {
      return confirm ? of(confirm) : throwError(false);
    }));
  }

  pipedToast<T>(
    successMessage: IntermediaryModels.ToastMessage<T>, 
    errorMessage?: IntermediaryModels.ToastMessage<any>) {
    return pipe(map((value:T) => {
      this.showSuccedToast(
        this.getToastMessage(successMessage, value)
      );
      return value;
    }), catchError(error => {
      errorMessage = this.getToastMessage(errorMessage, error);
      errorMessage && this.showErrorToast(errorMessage);
      return throwError(error);
    }))
  }
  
  private getToastMessage<T>(toastMessage: IntermediaryModels.ToastMessage<T>, value: T): string {
    const type = typeof(toastMessage);
    return type == "string" ? toastMessage : type == "function" ? (toastMessage as any)(value) : ""
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
