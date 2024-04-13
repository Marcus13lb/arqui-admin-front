import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment.development';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private authService: AuthService, private router: Router, private auth: AuthService){
    this.authService.getUser().subscribe((data:any) => {
      this.currentUser = data;
    })
  }
  env = environment;
  currentUser: any = null;
  sidebar: boolean = false;
  showCerrarSesion: boolean = false;
  sidebarItems: any[] = [
    {
      perm: null,
      nombre: 'Inicio',
      icon: 'pi pi-home',
      f : () => {
        this.router.navigateByUrl('/home')
      }
    },
    {
      perm: null,
      nombre: 'Web',
      icon: 'pi pi-globe',
      f : () => {
        this.router.navigateByUrl('/web')
      }
    },
    {
      perm: null,
      nombre: 'Proyectos',
      icon: 'pi pi-star',
      f : () => {
        this.router.navigateByUrl('/projects')
      }
    },
    {
      perm: null,
      nombre: 'Servicios',
      icon: 'pi pi-flag',
      f : () => {
        this.router.navigateByUrl('/services')
      }
    },
  ]

  openSidebar = () => {
    this.sidebar = !this.sidebar;
  }

  logout = () => {
    this.auth.removeUser();
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
