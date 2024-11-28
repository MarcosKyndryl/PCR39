import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',

  })
  export class ReglasService {
    private apiUrl = 'https://us-central1-ci-xhispdf-dev.cloudfunctions.net/parametrizacion'; // Asegúrate de reemplazar con la URL real de tu API

    constructor(private http: HttpClient) {}

    obtenerReglas(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/obtener`);  // Endpoint para obtener las reglas
    }

    actualizarReglas(data: any[]): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/actualizar`, data);  // Endpoint para actualizar las reglas
    }
  }

