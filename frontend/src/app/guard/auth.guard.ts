import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authService.getToken();
    if (token && !this.authService.isTokenExpired(token)) {
      const expectedRoles = (route.data as { expectedRoles: number[] }).expectedRoles;

      if (this.authService.hasRequiredRole(expectedRoles)) {
        // O usuário tem a role esperada, permita o acesso
        return true;
      } else {
        // Usuário não tem a role necessária, redirecione para outra rota
        this.router.navigate(['login']); // Você deve criar uma rota 'unauthorized'
        return false;
      }
    } else {
      // Token expirado ou inexistente, redirecione para a página de login
      this.router.navigate(['login']); // Substitua 'login' pela rota de login
      
      return false;
    }
  }
}
