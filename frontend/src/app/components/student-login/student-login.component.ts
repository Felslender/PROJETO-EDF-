import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { NavbarService } from 'src/app/services/navbar/navbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent {
  // Formulário reativo para coletar os dados de login do estudante
  formulary: FormGroup;

  // Variáveis de estado para controle de erros e valores do formulário
  showLoginError = false;
  loginFormValues: any = {
    email: '',
    senha: ''
  }

  // Construtor do componente, onde são injetados os serviços e dependências necessários
  constructor(private fb: FormBuilder, private api: ApiService, private navbarService: NavbarService, private router: Router) {
    // Configuração inicial do serviço de barra de navegação
    this.navbarService.showNavBar = false;

    // Inicialização do formulário reativo com validadores
    this.formulary = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        senha: ['', Validators.required],
      })
  }

  // Variável para controlar a visibilidade da senha no formulário
  showPassword: boolean = false;

  // Função para alternar a visibilidade da senha no formulário
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Função para efetuar o login do estudante
  login() {
    if (this.formulary.valid) {
      // Se o formulário for válido, prepara os dados e envia para o backend
      this.loginFormValues.email = this.formulary.get('email')?.value;
      this.loginFormValues.senha = this.formulary.get('senha')?.value;

      let data: any = {
        email: this.loginFormValues.email,
        senha: this.loginFormValues.senha
      }

      // Chamada à API para autenticar o usuário
      this.api.loginUser(data).subscribe(
        (response) => {
          
          // Se houver um token na resposta, armazena no armazenamento local e redireciona para o perfil
          if (response.token) {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/profile']);
          }

          // Verifica se o status é 401 (Unauthorized) e exibe mensagem de erro
          if (response.status == 401) {
            this.showLoginError = true;
          }

        },
        (error) => {
          console.error('Student-login.component.ts - Erro:', error.status);
          if (error.status == 401) {
            this.showLoginError = true;
          }
        }
      );
    } else {
      // Se o formulário não for válido, exibe mensagens de erro
      for (const controlName of Object.keys(this.formulary.controls)) {
        const control = this.formulary.get(controlName);
        if (control?.hasError('required') && control.value === '') {
          control.setErrors({ emptyRequiredField: true });
        }
      }
    }
  }
}
