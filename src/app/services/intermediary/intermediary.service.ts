import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IntermediaryModels } from '../../models/intermediary.models';

@Injectable({
  providedIn: 'root'
})
export class IntermediaryService {

  toastSubject: Subject<IntermediaryModels.Toast> = new Subject();

  constructor() { 
    setTimeout(() => {
      this.toastSubject.next({
        type: "success",
        message: "Sesión iniciada con éxito"
      })      
    }, 6000);

  }
}
