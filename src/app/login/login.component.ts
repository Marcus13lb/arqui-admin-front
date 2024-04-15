import { Component } from '@angular/core';
import { fieldValidator, formValidator } from '../utils/formValidator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Response } from 'src/app/interfaces/response';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroup;
  loading: boolean = false;
  formValidator = formValidator;
  fieldValidator = fieldValidator;
  env = environment;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, 
    private messageService: MessageService, private router: Router) {
    this.form = this.formBuilder.group({
      user: [null, [Validators.required]],
      pw: [null, [Validators.required]],
      recordar: [false, ]
    });

    if(localStorage.getItem('user')){
      this.form.controls['recordar'].setValue(true);
      this.form.controls['user'].setValue(localStorage.getItem('user'));
    }
  }

  ngOnInit(): void {
    
  }

  login = () => {
    if(this.form.valid){
      this.auth.login(this.form.value).subscribe(response => {
        localStorage.setItem('token', response.result);
        this.router.navigate(['']);
      },
      (error: HttpErrorResponse) => {
        let e : Response = error.error;
        this.messageService.add({severity:'error', key:'login', summary: 'App', detail: e.message ? e.message : 'Error en el servidor'});
      })
    }
  }

}
