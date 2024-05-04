import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { kidData, registerKidForms } from 'src/app/interfaces/request.interface';
import { NavbarService } from 'src/app/services/navbar/navbar.service';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-kids-registration',
  templateUrl: './kids-registration.component.html',
  styleUrls: ['./kids-registration.component.css'],
})
export class KidsRegistrationComponent implements OnInit {
  // Variável para verificar se o CPF já está cadastrado
  cpfCadastrado = false;

  // Formulário reativo para coletar os dados de registro da criança
  kidsForms: FormGroup;

  // Objeto que armazena os dados da criança
  kidObject: registerKidForms = {
    nomeCompleto: '',
    cpf: '',
    grauPar: '',
    dataNascimento: '',
    genero: '',
    turma: '',
    escola: '',
  };

  // Construtor do componente, onde são injetados os serviços e dependências necessários
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private navbarService: NavbarService,
    private api: ApiService
  ) {
    // Configuração inicial do serviço de barra de navegação
    this.navbarService.showNavBar = false;
    this.navbarService.fixedNavBar = false;

    // Inicialização do formulário reativo com validadores
    this.kidsForms = this.fb.group({
      nomeCompleto: ['', Validators.required],
      cpf: ['', Validators.required],
      grauPar: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      genero: ['', Validators.required],
      turma: ['', Validators.required],
      escola: ['', Validators.required],
    });
  }

  // Função para salvar os dados da criança
  saveChildData() {
    if (this.kidsForms.valid) {
      // Se o formulário for válido, prepara os dados e envia para o backend
      this.kidObject = this.kidsForms.value;
      for (const controlName of Object.keys(this.kidsForms.controls)) {
        this.kidsForms.get(controlName)?.setErrors(null);
      }

      let data: kidData = {
        idAluno: localStorage.getItem('idProfile'),
        idEscola: this.kidObject.escola,
        idTurma: this.kidObject.turma,
        nome: this.kidObject.nomeCompleto,
        cpf: this.kidObject.cpf,
        dataNascimento: this.kidObject.dataNascimento,
        sexo: this.kidObject.genero,
        grauParentesco: this.kidObject.grauPar,
      };

      this.api.registerKids(data).subscribe(
        (response) => {
          this.router.navigate(['/kids']);
        },
        (error) => {
          if (error.error.status === 14) {
            this.cpfCadastrado = true;
          }
        }
      );
    } else {
      // Se o formulário não for válido, exibe mensagens de erro
      for (const controlName of Object.keys(this.kidsForms.controls)) {
        const control = this.kidsForms.get(controlName);
        if (control?.hasError('required')) {
          control.setErrors({ emptyRequiredField: true });
        }
      }
    }
  }

  // Função para cancelar o registro da criança e retornar à página de listagem de crianças
  cancelNewKid() {
    this.router.navigate(['/kids']);
  }

  // Método executado durante a inicialização do componente
  ngOnInit() {
    // Assinatura de alterações no valor do campo CPF para redefinir a flag de CPF cadastrado
    this.kidsForms.get('cpf')?.valueChanges.subscribe(() => {
      this.cpfCadastrado = false;
    });
  }
}
