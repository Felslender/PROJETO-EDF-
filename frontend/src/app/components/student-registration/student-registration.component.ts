import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Importação de interfaces e serviços personalizados
import { registerStudentForms, registerData } from 'src/app/interfaces/request.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { NavbarService } from 'src/app/services/navbar/navbar.service';


@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css']
})

export class StudentRegistrationComponent implements OnInit {
  // Formulário reativo para coletar os dados do registro do estudante
  formulary: FormGroup;

  // Variáveis de controle de exibição do formulário, erros de e-mail e CPF duplicados
  showFormulary = true;
  emailCadastrado = false;
  cpfCadastrado = false;

  // Objeto para armazenar os valores do formulário
  formValues: registerStudentForms = {
    nomeCompleto: '',
    apelido: '',
    email: '',
    telefone: '',
    cpf: '',
    senha: '',
    confirmarSenha: '',
    dataNascimento: '',
    genero: '',
    estadoCivil: '',
    termosUso: false,
  };

  // Construtor do componente, onde são injetados os serviços e dependências necessários
  constructor(private fb: FormBuilder, private api: ApiService, private navbarService: NavbarService, private router: Router) {
    // Configuração inicial do serviço de barra de navegação
    this.navbarService.showNavBar = false;

    // Inicialização do formulário reativo com validadores
    this.formulary = this.fb.group(
      {
        nomeCompleto: ['', Validators.required],
        apelido: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        telefone: ['', [Validators.required]],
        cpf: ['', [Validators.required]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmarSenha: ['', Validators.required],
        dataNascimento: ['', Validators.required],
        genero: ['', Validators.required],
        estadoCivil: ['', Validators.required],
        termosUso: [false, Validators.required],
      },
      {
        validators: this.samePassword('senha', 'confirmarSenha'),
      }
    );
  }

  // Função para validar se as senhas são iguais
  samePassword(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup) => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ senhasDiferentes: true });
      } else {
        confirmPassword.setErrors(null);
      }
    };
  }

  // Variáveis para controlar a visibilidade da senha e da confirmação de senha no formulário
  showPassword: boolean = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  showConfirmPassword: boolean = false;
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Função para salvar temporariamente os valores do formulário no armazenamento local
  saveForms(): void {
    localStorage.setItem('formValues', JSON.stringify(this.formValues));
  }

  // Função para carregar os valores do formulário armazenados no armazenamento local
  loadForms(): void {
    const storedFormValues = localStorage.getItem('formValues');
    if (storedFormValues) {
      this.formValues = JSON.parse(storedFormValues);
      this.formulary.patchValue(this.formValues);
    }
  }

  // Função para realizar o registro do estudante
  register() {
    if (this.formulary.valid && this.formValues['termosUso']) {
      // Se o formulário for válido e os termos de uso aceitos, limpa os erros e envia os dados para o backend

      for (const controlName of Object.keys(this.formulary.controls)) {
        this.formulary.get(controlName)?.setErrors(null);
      }

      let data: registerData = {
       nome: this.formValues.nomeCompleto,
       nomePreferencia: this.formValues.apelido,
       cpf: this.formValues.cpf,
       celWhatsapp: this.formValues.telefone,
       email: this.formValues.email,
       sexo: this.formValues.genero,
       estadoCivil: this.formValues.estadoCivil,
       modalidade: '',
       senha: this.formValues.senha,
       confirmarSenha: this.formValues.confirmarSenha
      };

      // Chamada à API para registrar o estudante
      this.api.registerStudent(data).subscribe(
        (response) => {
          localStorage.removeItem('formValues');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Student-registration.component.ts - Erro:', error.error);

          // Verifica o status do erro e exibe mensagens apropriadas
          if (error.error.status === 13) {
            this.emailCadastrado = true;
          } else if (error.error.status === 14) {
            this.cpfCadastrado = true;
          }
        }
      );

    } else {
      // Se o formulário não for válido ou os termos de uso não forem aceitos, exibe mensagens de erro
      for (const controlName of Object.keys(this.formulary.controls)) {
        const control = this.formulary.get(controlName);
        if (control?.hasError('required') && control.value === '') {
          control.setErrors({ emptyRequiredField: true });
        }
      }
    }
  }

  // Método chamado durante a inicialização do componente
  ngOnInit() {
    
    // Carrega os valores do formulário armazenados anteriormente
    this.loadForms();

    // Lista de campos do formulário
    let fields = [
      "nomeCompleto",
      "apelido",
      "email",
      "telefone",
      "cpf",
      "senha",
      "confirmarSenha",
      "dataNascimento",
      "genero",
      "estadoCivil",
      "termosUso",
    ];

    // Associa a função de salvamento ao evento de alteração de valor de cada campo do formulário
    for (const field of fields) {
      this.formulary.get(field)?.valueChanges.subscribe((value) => {
        fields
          .filter((currentField) => currentField !== field)
          .forEach((currentField) => {
            this.formValues[currentField] =
              this.formulary.get(currentField)?.value;
          });

        this.formValues[field] = value;
        this.saveForms();
        this.emailCadastrado = false;
        this.cpfCadastrado = false;
      });
    }
  }
}