import { FormGroup } from "@angular/forms";

export function formValidator(form:FormGroup, field:string){
    return (form.get(field)?.dirty || form.get(field)?.touched) && form.get(field)?.invalid;
}

export function fieldValidator(form:FormGroup, field:string, validator: string){
    return form.get(field)?.hasError(validator);
}