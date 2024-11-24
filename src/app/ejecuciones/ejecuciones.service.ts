import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EjecucionesService {
  private apiUrl = 'https://us-central1-ci-xhispdf-dev.cloudfunctions.net/ejecuciones2';

  constructor(private http: HttpClient) {}

  /**
   * 
   * @param filtros
   * @returns
   */
  obtenerEjecuciones(filtros: any): Observable<any> {
    return this.http.post(this.apiUrl, filtros);
  }
}
