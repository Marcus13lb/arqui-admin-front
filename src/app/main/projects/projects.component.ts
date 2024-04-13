import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Response } from 'src/app/interfaces/response';
import { ProjectsService } from 'src/app/services/projects.service';
import { homeBreadCrumb } from 'src/app/utils/constants';
import { fieldValidator, formValidator } from 'src/app/utils/formValidator';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  list: any[] = []
  formAdd : FormGroup
  formEdit : FormGroup
  elementDelete: any = null
  elementAddShow: boolean = false
  elementEditShow: boolean = false
  elementAddLoading: boolean = false
  elementEditLoading: boolean = false
  formValidator = formValidator
  fieldValidator = fieldValidator
  items: MenuItem[] = [
    {
      label: 'Proyectos',
      routerLink: '/projects'
    }
  ]
  homeItem = homeBreadCrumb
  
  
  constructor(private projectService: ProjectsService, private formBuilder: FormBuilder, private messageService: MessageService, 
    private confirmationService: ConfirmationService, private loader: NgxUiLoaderService) {
    this.formAdd = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      fotos: ['', [Validators.required]],
    });
    this.formEdit = this.formBuilder.group({
      id: [null, [Validators.required]],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      fotos: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.get();
  }

  get = () => {
    this.loader.start();
    this.projectService.get().subscribe({
      next: (response: Response) => {
        this.list = response.result;
        this.list.forEach(el => {
          if(Array.isArray(el.fotos)){
            el.fotos = el.fotos.map((f:string) => `${environment.api}/public/${f}`)
          }
        })

        console.log(this.list)
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
      this.projectService.post(this.formAdd.value).subscribe({
        next: (response: Response) => {
          this.get();
          this.messageService.add({key: 'admin', severity:'success', summary:'Éxito', detail: 'Elemento agregado'});
          this.elementAddShow = false;
          this.elementAddLoading = false;
          this.formAdd.reset();
        },
        error: (err:HttpErrorResponse) => {
          let error: Response = err.error;
          this.elementAddLoading = false;
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

  edit = () => {
    if(this.formEdit.valid){
      this.elementEditLoading = true;
      this.projectService.put(this.formEdit.value).subscribe({
        next: (response: Response) => {
          this.get();
          this.messageService.add({key: 'admin', severity:'success', summary:'Éxito', detail: 'Elemento editado'});
          this.elementEditShow = false;
          this.elementEditLoading = false;
          this.formEdit.reset();
        },
        error: (err:HttpErrorResponse) => {
          let error: Response = err.error;
          this.elementEditLoading = false;
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

  delete = (id:number) => {
    this.projectService.delete(id).subscribe({
      next: (response: Response) => {
        this.get();
      }, 
      error: (err:HttpErrorResponse) => {
        let error: Response = err.error;
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

  setEdit(element:any){
    this.formEdit.controls['nombre'].setValue(element.nombre);
    this.formEdit.controls['descripcion'].setValue(element.descripcion);
    this.formEdit.controls['fotos'].setValue(element.fotos);
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

  setFotos(event:any, form: FormGroup){
    form.controls['fotos'].setValue(event);
  }

}
