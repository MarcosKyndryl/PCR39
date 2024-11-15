import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReglasService {
  private apiUrl = 'https://us-central1-ci-xhispdf-dev.cloudfunctions.net/parametrizacion';

  constructor(private http: HttpClient) {}

  // Método para obtener las reglas
  obtenerReglas(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Método para actualizar las reglas
  actualizarReglas(data: any[]): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, data, { headers });
  }
}
