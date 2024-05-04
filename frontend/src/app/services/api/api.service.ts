import { registerData, registerStudentForms } from '../../interfaces/request.interface'
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  sstatus = null;

  constructor(private http: HttpClient) { }
  loginUser(data: any): Observable< any > {
    const url = 'http://localhost:3000/Login';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, data, { headers })
  }

  registerStudent(data: registerData): Observable<any> {
    const url = 'http://localhost:3000/CadastrarAluno';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, data, { headers });
  }

  registerKids(data: any): Observable<any> {
    const url = 'http://localhost:3000/CadastrarCrianca';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post(url, data, { headers });
  }

  getKids(): Observable<any> {
    const url = 'http://localhost:3000/SuasCriancas';
    return this.get(url);
  }

  getProfileInfo(): Observable< any > {
    const url = 'http://localhost:3000/InfoAluno';
    return this.get(url);
  }

  getClasses(): Observable <any> {
    const url = 'http://localhost:3000/SuasTurmas';
    return this.get(url);
  }

  getClassInfo(idClass: number): Observable <any> {
    const url = 'http://localhost:3000/SuasTurmas/'+idClass+'/facilitadores';
    return this.get(url);
  }

  getAllVisits(idClass: number): Observable <any> {
    const url = 'http://localhost:3000/SuasTurmas/'+idClass+'/SuasAulas';
    return this.get(url);
  }

  get(url: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(url, { headers });
  }
}
