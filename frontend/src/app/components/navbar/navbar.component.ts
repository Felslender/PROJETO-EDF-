import { Component, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  // Variáveis de estado do componente
  showSideBar: boolean = false;
  selectedOption: string = '';
  isSidebarVisible: boolean = false;

  // Construtor do componente, onde são injetados os serviços e dependências necessários
  constructor(
    private router: Router,
    public navbarService: NavbarService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  // Método chamado após a visualização dos elementos do componente
  ngAfterViewInit() {
    // Obtém o nome do perfil do armazenamento local e atualiza a exibição no elemento DOM
    let nameProfile = localStorage.getItem('nameProfile');
    const element = document.getElementById('nameProfile');

    if (element && nameProfile) {
      element.textContent = nameProfile;
    } else if (element) {
      element.textContent = 'Usuário';
    }
  }

  // Função para alternar a exibição da barra lateral
  toggleSidebar() {
    this.showSideBar = !this.showSideBar;
    const menuIcon = this.el.nativeElement.querySelector('.ham-icon');

    if (this.showSideBar) {
      this.renderer.removeClass(menuIcon, 'animate-icon');

      setTimeout(() => {
        this.renderer.setProperty(
          menuIcon,
          'src',
          '../../../assets/navbar/x.svg'
        );
      }, 100);
    } else {
      this.renderer.removeClass(menuIcon, 'x-icon');
      this.renderer.addClass(menuIcon, 'animate-icon');
      setTimeout(() => {
        this.renderer.setProperty(
          menuIcon,
          'src',
          '../../../assets/register/User/menu-lateral.svg'
        );
      }, 100);
    }
  }

  // Função para redirecionar com base na opção do menu de navegação
  navBarRedirect(option: string) {
    if (this.showSideBar) {
      this.toggleSidebar();
    }

    this.selectedOption = option;

    // Lógica de redirecionamento com base na opção selecionada
    if (option == 'home') {
      this.router.navigate(['/home']);
      this.navbarService.setDivId('container');
      this.navbarService.notify('container');
    } else if (option == 'profile') {
      this.router.navigate(['/profile']);
    } else if (option == 'kids') {
      this.router.navigate(['/kids']);
      this.navbarService.toggleRightContainerFunction();
    } else if (option == 'classes') {
      this.router.navigate(['/classes']);
    }
  }

  // Função para efetuar logout, limpando o armazenamento local e redirecionando para a página de login
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
