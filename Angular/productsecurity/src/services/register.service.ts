import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, map, tap } from "rxjs";
import { LoginDto } from '../models/login-dto';
import { Token } from '../models/token';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private url: string = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  register(registerDto: User): Observable<any> {
    return this.http.post<any>(`${this.url}/register`, registerDto);
  }


  login(loginDto: LoginDto): Observable<Token> {
    return this.http.post<Token>(`${this.url}/login`, loginDto);
}


  getToken(){
    return localStorage.getItem('accessToken');
}



  isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('token');
    }
    return false;
  }


}
