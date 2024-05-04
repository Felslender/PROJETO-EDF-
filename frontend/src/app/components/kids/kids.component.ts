import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar/navbar.service';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-kids',
  templateUrl: './kids.component.html',
  styleUrls: ['./kids.component.css'],
})
export class KidsComponent implements OnInit {
  // Construtor do componente, onde são injetados os serviços e dependências necessários
  constructor(private router: Router, private navbarService: NavbarService, private api: ApiService) {
    // Configuração inicial do serviço de barra de navegação
    this.navbarService.showNavBar = true;
    this.navbarService.fixedNavBar = false;
  }

  // Função para navegar para a página de criação de uma nova criança
  newKidPage() {
    this.router.navigate(['/newkids']);
  }

  // Lista de nomes de crianças (inicializada com valores padrão)
  names: string[] = [];

  // Método executado durante a inicialização do componente
  ngOnInit() {
    // Chamada à API para obter a lista de crianças
    this.api.getKids().subscribe(
      (response) => {
        // Mapeamento da resposta para extrair os nomes das crianças
        this.names = response.map((item: any) => item.nome);
      },
      (error) => {
        console.error('Kids.component.ts - Erro:', error);
      }
    );
  }

  // Função para adicionar novos nomes de crianças à lista existente
  addKids(newNames: string[]) {
    this.names = this.names.concat(newNames);
  }
}
