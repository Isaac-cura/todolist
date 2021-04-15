import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Directive, ElementRef, ViewContainerRef } from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';
import { ErrorDictionary } from './errors.dictionary';
import { FormErrorsComponent } from '../../components/form-errors/form-errors/form-errors.component';

@Directive({
  selector: '[formControlName]'
})
export class FormControlErrorDirective {
  errorComponent: ComponentRef<FormErrorsComponent>;

  constructor(
    private target:ViewContainerRef,
    private element: ElementRef,
    private control: NgControl,
    private componentFactoryResolver: ComponentFactoryResolver
    ) {
  }

  ngOnInit() {
    this.startListeners(this.control);
    this.insertErrorFactory();
  }

  private insertErrorFactory() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(FormErrorsComponent);
    this.errorComponent = this.target.createComponent(factory);
  }

  private startListeners(control: NgControl) {
    control.valueChanges.subscribe(value => {
      this.transformErrors(control.errors);
      this.dispatchErrors(this.element, control.errors);
    })
  }

  private transformErrors(validationErrors: ValidationErrors) {
   for(let errorKey in validationErrors) {
     validationErrors[errorKey] = this.assignErrorMessage(errorKey, validationErrors[errorKey]);
   }
  }

  private assignErrorMessage(errorKey: string, error: any) {
    return {
      ...error,
      message: ErrorDictionary[errorKey]?.call(this, error)
    };
  }

  private dispatchErrors(element: ElementRef, errors: ValidationErrors) {
    this.errorComponent.instance.errors = errors;
    this.markAsError(element, errors ? 'red' : "");
  }
  
  private markAsError({nativeElement}: ElementRef, color: string) {
    nativeElement.style.borderColor= color;
  }



}
