import { Component, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss']
})
export class FormErrorsComponent implements OnInit {

  errorList: string[] = [];
  @Input() set errors(errors: ValidationErrors) {
    this.errorList = [...this.turnErrorsIntoArray(errors || {})];
  } 

  constructor() { }

  ngOnInit(): void {
  }

  private turnErrorsIntoArray(errors: ValidationErrors) {
    const errorList = []
    Object.keys(errors).forEach(errorKey => {
      const error = errors[errorKey];
      if(typeof(error.message) == "string") {
        errorList.push(... error.message.split("/n")
                                .filter(message => !!message)
                                .map(str => str.trim()));
      }
    })
    return errorList;
  }

}
