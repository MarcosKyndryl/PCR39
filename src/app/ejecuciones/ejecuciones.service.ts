import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// hola excelente
@Injectable({
  providedIn: 'root',
})
export class EjecucionesService {
  private apiUrl = 'https://us-central1-ci-xhispdf-dev.cloudfunctions.net/ejecuciones'; // Reemplaza con la URL de tu Google Function

  constructor(private http: HttpClient) {}

  obtenerEjecuciones(): Observable<any> {
    return this.http.get(this.apiUrl); // Devuelve un Observable con los datos
  }
}
