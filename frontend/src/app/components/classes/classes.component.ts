import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { NavbarService } from 'src/app/services/navbar/navbar.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
})
export class ClassesComponent{
  modulos: any[] = [];
  showInfo: boolean = false;
  facilitators: any[] = [];
  constructor(public navbarService: NavbarService, private api: ApiService, private router: Router) {
    // Configuração inicial do serviço de barra de navegação
    this.navbarService.fixedNavBar = false;
    this.navbarService.showNavBar = true;
  }
  
  ngAfterViewInit() {
    this.api.getClasses().subscribe(
      (response) => {
        this.modulos = response;
      },
      (error) => {
        console.error('classes.component.ts - Erro:', error);
      }
    );;
  }
  // Função para alternar o valor de showInfo
  toggleInfo(idClass: number) {
    console.log(idClass);
    this.showInfo = !this.showInfo;

    this.api.getClassInfo(idClass).subscribe(
      (response) => {
        this.facilitators = response.facilitadores;
      },
      (error) => {
        console.log('classes.component.ts - Erro:', error);
      }
    )
  }

  toVisit(idClass: number) {
    this.router.navigate(['/visits', idClass]);

  }
}
