import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private jwtHelper: JwtHelperService) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isTokenExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }

  getUserRole(): number | null {
    const token = this.getToken();
    if (token) {
      const decoded = this.jwtHelper.decodeToken(token);
      localStorage.setItem('nameProfile', decoded.nomePreferencia);
      localStorage.setItem('idProfile', decoded.userId);
      return decoded.role;
    }
    return null;
  }

  hasRequiredRole(expectedRoles: number[]): boolean {
    const userRole = this.getUserRole();
    return userRole !== null && expectedRoles.includes(userRole);
  }
}
