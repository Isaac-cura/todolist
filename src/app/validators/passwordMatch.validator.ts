import { AbstractControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

export function match(
    passwordControlName: string, errorName: string = "passwordNotMatch") {
        let subscription: Subscription;
        return (control: AbstractControl, b) => {
            const passwordControl = control?.parent?.get(passwordControlName);
            if(!subscription && passwordControl) {
                subscription = controlChange(passwordControl, control);
            }
            if(passwordControl?.value == control.value) {
                return null;
            }
            return {[errorName]: true}
        }
}

function controlChange(primaryControl: AbstractControl, currentControl: AbstractControl): Subscription {
    return primaryControl.valueChanges.subscribe(value => {
        if(currentControl.touched) {
            currentControl.patchValue(currentControl.value);
        }
    })
}