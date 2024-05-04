import { Component } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar/navbar.service';
import { ApiService } from 'src/app/services/api/api.service';
import { profileData } from 'src/app/interfaces/request.interface';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css'],
})
export class StudentProfileComponent {
  // Variável para armazenar a largura da página
  widthPage = window.innerWidth;

  // Variável para controlar a exibição do contêiner direito
  showRightContainer = false;

  // Dados fictícios do perfil do estudante (serão substituídos pelos dados reais)
  dataInfo: profileData = {
    nome: '',
    email: '',
    genero: '',
    telefone: '',
    dataNascimento: '',
    cpf: '',
    estadoCivil: '',
  };

  // Construtor do componente, onde são injetados os serviços e dependências necessários
  constructor(public navbarService: NavbarService, private api: ApiService) {
    // Configuração inicial do serviço de barra de navegação
    this.navbarService.fixedNavBar = false;
    this.navbarService.showNavBar = true;
  }

  // Função para substituir os dados fictícios pelos dados reais obtidos da API
  replaceDataInfo() {
    for (const id in this.dataInfo) {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = this.dataInfo[id];
      }
    }
  }

  // Método chamado após a visualização dos elementos do componente
  ngAfterViewInit() {
    // Chamada à API para obter os dados reais do perfil do estudante
    this.api.getProfileInfo().subscribe((data: any) => {
      // Atribuição dos dados obtidos da API aos campos do objeto dataInfo
      this.dataInfo['nome'] = data['nome'];
      this.dataInfo['email'] = data['email'];
      this.dataInfo['telefone'] = data['celWhatsapp'];
      this.dataInfo['dataNascimento'] = data['dataNascimento'];
      this.dataInfo['cpf'] = data['cpf'];
      this.dataInfo['estadoCivil'] = data['estadoCivil'];

      // Tradução do código de gênero para uma string mais compreensível
      let genero = data['sexo'];

      if (genero.toLowerCase() === 'm') {
        this.dataInfo['genero'] = 'Masculino';
      } else if (genero.toLowerCase() === 'f') {
        this.dataInfo['genero'] = 'Feminino';
      } else {
        this.dataInfo['genero'] = 'Outro';
      }

      // Substituição dos dados fictícios pelos dados reais no DOM
      this.replaceDataInfo();
    });

  }

  // Método chamado durante a inicialização do componente
  ngOnInit() {
    // Verificação da largura da página e associação da função de verificação ao evento de redimensionamento da janela
    this.verifyWidthPage();

    window.addEventListener('resize', () => {
      this.widthPage = window.innerWidth;
      this.verifyWidthPage();
    });

    // Associação da função toggleRightContainer à mudança observável do serviço de barra de navegação
    this.navbarService.toggleRightObservable.subscribe(() => {
      this.toggleRightContainer();
    });
  }

  // Função para verificar a largura da página e atualizar a exibição do contêiner direito
  verifyWidthPage() {
    this.widthPage = window.innerWidth;

    if (this.widthPage < 768) {
      this.showRightContainer = false;
    }

    if (this.widthPage > 768) {
      this.showRightContainer = true;
    }
  }

  // Função para alternar a exibição do contêiner direito
  toggleRightContainer() {
    this.showRightContainer = true;
  }
}
