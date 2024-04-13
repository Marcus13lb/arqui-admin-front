import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Response } from 'src/app/interfaces/response';
import { ServicesService } from 'src/app/services/services.service';
import { homeBreadCrumb } from 'src/app/utils/constants';
import { fieldValidator, formValidator } from 'src/app/utils/formValidator';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

// Luego, extiende Day.js con los plugins
dayjs.extend(utc);
dayjs.extend(timezone);

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  list: any[] = [];
  formAdd : FormGroup;
  formEdit : FormGroup;
  elementDelete: any = null;
  elementAddShow: boolean = false;
  elementEditShow: boolean = false;
  elementAddLoading: boolean = false;
  elementEditLoading: boolean = false;
  formValidator = formValidator;
  fieldValidator = fieldValidator;
  items: MenuItem[] = [
    {
      label: 'Servicios',
      routerLink: '/services'
    }
  ];
  homeItem = homeBreadCrumb
  
  
  constructor(private serviceService: ServicesService, private formBuilder: FormBuilder, private messageService: MessageService, 
    private confirmationService: ConfirmationService, private loader: NgxUiLoaderService) {
    this.formAdd = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      icono: ['fa-check', [Validators.required]],
    });
    this.formEdit = this.formBuilder.group({
      id: [null, [Validators.required]],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      icono: ['fa-check', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.get();
  }

  get = () => {
    this.loader.start();
    this.serviceService.get().subscribe({
      next: (response: Response) => {
        this.list = response.result;
        this.list.forEach(el => {
          el.fecha_creacion = dayjs.utc(el.fecha_creacion).tz("America/Asuncion").format('YYYY-MM-DD HH:mm:ss')
        })
        this.loader.stop();
      },
      error: (err:HttpErrorResponse) => {
        this.list = [];
        this.loader.stop();
      }
    })
  }


  add = () => {
    if(this.formAdd.valid){
      this.elementAddLoading = true;
      this.serviceService.post(this.formAdd.value).subscribe({
        next: (response: Response) => {
          this.get();
          this.messageService.add({key: 'conf', severity:'success', summary:'Éxito', detail: 'Elemento agregado'});
          this.elementAddShow = false;
          this.elementAddLoading = false;
          this.formAdd.reset();
        },
        error: (err:HttpErrorResponse) => {
          let error: Response = err.error;
          this.elementAddLoading = false;
          if(Array.isArray(error.message)){
            error.message.forEach(m => {
              this.messageService.add({key: 'conf', severity:'error', summary:'Error', detail: m?.msg || 'Error en el servidor'});
            })
          } else {
            this.messageService.add({key: 'conf', severity:'error', summary:'Error', detail: error.message || 'Error en el servidor'});
          }
        }
      })
    }
  }

  edit = () => {
    if(this.formEdit.valid){
      this.elementEditLoading = true;
      this.serviceService.put(this.formEdit.value).subscribe({
        next: (response: Response) => {
          this.get();
          this.messageService.add({key: 'conf', severity:'success', summary:'Éxito', detail: 'Elemento editado'});
          this.elementEditShow = false;
          this.elementEditLoading = false;
          this.formEdit.reset();
        },
        error: (err:HttpErrorResponse) => {
          let error: Response = err.error;
          this.elementEditLoading = false;
          if(Array.isArray(error.message)){
            error.message.forEach(m => {
              this.messageService.add({key: 'conf', severity:'error', summary:'Error', detail: m?.msg || 'Error en el servidor'});
            })
          } else {
            this.messageService.add({key: 'conf', severity:'error', summary:'Error', detail: error.message || 'Error en el servidor'});
          }
        }
      })
    }
  }

  delete = (id:number) => {
    this.serviceService.delete(id).subscribe({
      next: (response: Response) => {
        this.get();
      }, 
      error: (err:HttpErrorResponse) => {
        let error: Response = err.error;
        if(Array.isArray(error.message)){
          error.message.forEach(m => {
            this.messageService.add({key: 'conf', severity:'error', summary:'Error', detail: m?.msg || 'Error en el servidor'});
          })
        } else {
          this.messageService.add({key: 'conf', severity:'error', summary:'Error', detail: error.message || 'Error en el servidor'});
        }
      }
    })
  } 

  setEdit(element:any){
    this.formEdit.controls['nombre'].setValue(element.nombre);
    this.formEdit.controls['descripcion'].setValue(element.descripcion);
    this.formEdit.controls['icono'].setValue(element.icono);
    this.formEdit.controls['id'].setValue(element.id);
    this.elementEditShow = true;
  }

  confirm(event: Event, element:any) {
    this.confirmationService.confirm({
      key: 'conf-pop',
      target: event.target ? event.target : undefined,
      message: '¿Eliminar elemento?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
        this.delete(element.id);
      }
    });
  }
}
