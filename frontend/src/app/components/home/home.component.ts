import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar/navbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  selectedOption: string = '';
  showSideBar: boolean = false;

  
  constructor(
    private router: Router,
    public navbarService: NavbarService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    // Configuração inicial do serviço de barra de navegação
    this.navbarService.fixedNavBar = true;
    this.navbarService.showNavBar = false;
  }

  // Função para rolar até a seção desejada
  scrollTo() {
    const divId = this.navbarService.getDivId();
    if (divId) {
      const divElement = this.elementRef.nativeElement.querySelector(`#${divId}`);

      if (divElement) {
        divElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  // Método executado durante a inicialização do componente
  ngOnInit() {
    this.scrollTo();
    this.navbarService.notify$.subscribe((divId) => {
      this.scrollTo();
    });
  }

  // Função para navegar para a seção 'home'
  more() {
    this.router.navigate(['/home']);
    this.navbarService.setDivId('panel-3');
    this.navbarService.notify('panel-3');
  }

  // Função para alternar a exibição da barra lateral
  toggleSidebar() {
    this.showSideBar = !this.showSideBar;
    const menuIcon = this.el.nativeElement.querySelector('.ham-icon');

    if (this.showSideBar) {
      this.renderer.removeClass(menuIcon, 'animate-icon');

      setTimeout(() => {
        this.renderer.setProperty(menuIcon, 'src', '../../../assets/navbar/x.svg');
      }, 100);
    } else {
      this.renderer.removeClass(menuIcon, 'x-icon');
      this.renderer.addClass(menuIcon, 'animate-icon');
      setTimeout(() => {
        this.renderer.setProperty(menuIcon, 'src', '../../../assets/register/User/menu-lateral.svg');
      }, 100);
    }
  }

  // Função para redirecionar com base na opção do menu de navegação
  navBarRedirect(option: string) {
    this.selectedOption = option;

    // Lógica de redirecionamento com base na opção selecionada
    if (option == 'home') {
      this.router.navigate(['/home']);
      this.navbarService.setDivId('panel-1');
      this.navbarService.notify('panel-1');
    } else if (option == 'profile') {
      this.router.navigate(['/profile']);
    } else if (option == 'kids') {
      this.router.navigate(['/kids']);
      this.navbarService.toggleRightContainerFunction();
    } else if (option == 'about') {
      this.router.navigate(['/home']);
      this.navbarService.setDivId('panel-2');
      this.navbarService.notify('panel-2');
    } else if (option == 'working') {
      this.router.navigate(['/home']);
      this.navbarService.setDivId('panel-4');
      this.navbarService.notify('panel-4');
    } else if (option == 'material') {
      this.router.navigate(['/home']);
      this.navbarService.setDivId('panel-5');
      this.navbarService.notify('panel-5');
    } else if (option == 'us') {
      this.router.navigate(['/home']);
      this.navbarService.setDivId('panel-3');
      this.navbarService.notify('panel-3');
    }
  }
}
