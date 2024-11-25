import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Importación correcta de FormsModule
import { CommonModule } from '@angular/common'; // Importación correcta de CommonModule

@Component({
  selector: 'app-ejecuciones',
  standalone: true,
  templateUrl: './ejecuciones.component.html',
  styleUrls: ['./ejecuciones.component.css'],
  imports: [FormsModule, CommonModule], // Asegúrate de incluir los módulos aquí
})
export class EjecucionesComponent {
  tipos = ['Todos', 'INF_LAB', 'INF_IMA', 'ORD_LAB', 'ORD_IMA', 'REC_MED', 'DES_MED'];
  selectedTipo = 'Todos';
  desde: string = '';
  hasta: string = '';

  ejecuciones: any[] = [];
  paginaActual = 1;
  itemsPorPagina = 10;
  totalPaginas = 0;
  totalRegistros = 0;

  cargando = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.actualizarTabla();
  }

  actualizarTabla() {
    this.cargando = true;

    const filtros = {
      tipo: this.selectedTipo === 'Todos' ? null : this.selectedTipo,
      desde: this.desde || null,
      hasta: this.hasta || null,
      pagina: this.paginaActual,
      itemsPorPagina: this.itemsPorPagina,
    };

    this.http.post('https://us-central1-ci-xhispdf-dev.cloudfunctions.net/ejecuciones2', filtros).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.ejecuciones = response.data;
          this.totalRegistros = response.total;
          this.totalPaginas = Math.ceil(this.totalRegistros / this.itemsPorPagina);
        } else {
          console.error('Error en la respuesta:', response.message);
        }
      },
      error: (error) => {
        console.error('Error al conectarse al servidor:', error);
      },
      complete: () => {
        this.cargando = false;
      },
    });
  }

  /**
   * Reinicia la tabla cuando cambia un filtro.
   */
  actualizarFiltros() {
    this.paginaActual = 1; // Reinicia a la primera página
    this.actualizarTabla(); // Recarga los datos
  }

  cambiarPagina(nuevaPagina: number) {
    if (nuevaPagina > 0 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
      this.actualizarTabla();
    }
  }

  limpiarFiltros() {
    this.selectedTipo = 'Todos';
    this.desde = '';
    this.hasta = '';
    this.paginaActual = 1; // Reinicia a la primera página
    this.actualizarTabla();
  }
}
