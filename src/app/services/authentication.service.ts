import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {Student} from "../models/student/student";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authSubject = new BehaviorSubject<boolean>(false);
  private apiUrl = 'http://87.106.247.67:8080';

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router
  ) {
    this.init();
  }

  async init() {
    const token = await this.storageService.getToken();
    if (token) this.authSubject.next(true);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(async (response: any) => {
        await this.storageService.setToken(response.token);
        await this.storageService.setRole(response.role);
        this.authSubject.next(true);
        console.log("Utilisateur connecté avec succés: ", response)
        this.router.navigate([await this.getRole() === 'ADMIN' ? '/tabs/admin/dashboard' : '/tabs/student/profile'])
          .catch(error => console.error('Erreur de redirection:', error));
      })
    );
  }

  register(student: Partial<Student>): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, student).pipe(
      tap(async (response: any) => {
        await this.storageService.setToken(response.token);
        await this.storageService.setRole(response.role);
        this.authSubject.next(true);
        console.log("Utilisateur enregistré avec succés: ", response)
        this.router.navigate([await this.getRole() === 'ADMIN' ? '/tabs/admin/dashboard' : '/tabs/student/profile'])
          .catch(error => console.error('Erreur de redirection:', error));
      })
    );
  }

  async logout() {
    await this.storageService.removeToken();
    await this.storageService.removeRole();
    this.authSubject.next(false);
    await this.router.navigate(['/authentication']);
  }

  getToken(): Promise<string | null> {
    return this.storageService.getToken();
  }

  getRole(): Promise<string | null> {
    return this.storageService.getRole();
  }

  isAuthenticated(): Observable<boolean> {
    return this.authSubject.asObservable();
  }
}
