import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EjecucionesService {
  private API_URL = 'https://us-central1-ci-xhispdf-dev.cloudfunctions.net/ejecuciones2'; // Reemplaza con tu endpoint real

  constructor(private http: HttpClient) {}

  /**
   * Obtiene las ejecuciones con filtros aplicados.
   * @param filtros Filtros a enviar al backend
   * @returns Observable con los datos filtrados
   */
  obtenerEjecuciones(filtros: any): Observable<any> {
    return this.http.post(this.API_URL, filtros);
  }
}
