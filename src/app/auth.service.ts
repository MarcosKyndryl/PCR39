import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // Esto asegura que el servicio sea un singleton en toda la aplicación
})
export class AuthService {
  private apiUrl = 'https://us-central1-ci-xhispdf-dev.cloudfunctions.net/verify_login';  // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const payload = { usuario: username, contraseña: password };
    return this.http.post(this.apiUrl, payload);
  }
}
