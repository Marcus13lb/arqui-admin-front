import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MenuItem, MessageService } from 'primeng/api';
import { Response } from 'src/app/interfaces/response';
import { WebService } from 'src/app/services/web.service';
import { homeBreadCrumb } from 'src/app/utils/constants';
import { fieldValidator, formValidator } from 'src/app/utils/formValidator';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.scss']
})
export class WebComponent {
  items: MenuItem[] = [
    {
      label: 'Web',
      routerLink: '/web'
    }
  ]
  homeItem = homeBreadCrumb
  formWeb : FormGroup
  formValidator = formValidator
  fieldValidator = fieldValidator
  updateLoading: boolean = false
  list: any[] = []

  constructor(private formBuilder: FormBuilder, private webService: WebService, private messageService: MessageService, private loader: NgxUiLoaderService){
    this.formWeb = this.formBuilder.group({
      slogan: ['', [Validators.required]],
      services_description: ['', [Validators.required]],
      projects_description: ['', [Validators.required]],
      facebook: ['', [Validators.required]],
      instagram: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required]],
      ubicacion_url: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      sobre_nosotros: ['', [Validators.required]],
    });

    this.get()
  }

  get = () => {
    this.loader.start();
    this.webService.getWEbConf().subscribe({
      next: (response: Response) => {
        this.list = response.result;
        
        for(let item of this.list){
          if(this.formWeb.controls[item.clave]){
            this.formWeb.controls[item.clave].setValue(item.valor);
          }
        }

        this.loader.stop();
      },
      error: (err:HttpErrorResponse) => {
        this.list = [];
        this.loader.stop();
      }
    })
  }

  update = () => {
    if(this.formWeb.valid){
      this.updateLoading = true;
      this.webService.updateWebConf(this.formWeb.value).subscribe({
        next: (response: Response) => {
          this.get();
          this.messageService.add({key: 'admin', severity:'success', summary:'Éxito', detail: 'Elemento agregado'});
          this.updateLoading = false;
        },
        error: (err:HttpErrorResponse) => {
          let error: Response = err.error;
          this.updateLoading = false;
          if(Array.isArray(error.message)){
            error.message.forEach(m => {
              this.messageService.add({key: 'admin', severity:'error', summary:'Error', detail: m?.msg || 'Error en el servidor'});
            })
          } else {
            this.messageService.add({key: 'admin', severity:'error', summary:'Error', detail: error.message || 'Error en el servidor'});
          }
        }
      })
    }
  }
}
