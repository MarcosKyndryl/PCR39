import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EjecucionesService } from '../services/ejecuciones.service';

@Component({
  selector: 'app-ejecuciones',
  standalone: true,
  templateUrl: './ejecuciones.component.html',
  styleUrls: ['./ejecuciones.component.css'],
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers: [EjecucionesService],
})
export class EjecucionesComponent {
  tipos = ['Todos', 'INF_LAB', 'INF_IMA', 'ORD_LAB', 'ORD_IMA', 'REC_MED', 'DES_MED'];
  estados = ['Todos', 'Subido correctamente', 'En proceso']; // Etiquetas para el filtro de estado
  selectedTipo = 'Todos';
  desde: string = '';
  hasta: string = '';
  selectedEstado: string = 'Todos';
  nombreArchivo: string = '';

  ejecuciones: any[] = [];
  paginaActual = 1;
  itemsPorPagina = 10;
  totalPaginas = 0;
  totalRegistros = 0;

  cargando = false;
  error = false;
  errorMessage = '';

  constructor(private ejecucionesService: EjecucionesService) {}

  ngOnInit(): void {
    this.buscarEjecuciones();
  }

  /**
   * Realiza la búsqueda de ejecuciones según los filtros actuales y la página seleccionada.
   */
  buscarEjecuciones(): void {
    this.cargando = true;
    this.error = false;

    // Validar fechas antes de enviar los filtros
    if (this.desde && this.hasta && new Date(this.hasta) < new Date(this.desde)) {
      this.error = true;
      this.errorMessage = 'La fecha "Hasta" no puede ser menor que la fecha "Desde".';
      this.cargando = false;
      return;
    }

    // Convertir el estado seleccionado a su valor lógico o null
    let estado: boolean | null = null;
    if (this.selectedEstado === 'Subido correctamente') {
      estado = true;
    } else if (this.selectedEstado === 'En proceso') {
      estado = false;
    }

    const filtros = {
      tipo: this.selectedTipo === 'Todos' ? null : this.selectedTipo,
      desde: this.desde || null,
      hasta: this.hasta || null,
      estado: estado, // Enviar como booleano o null
      nombreArchivo: this.nombreArchivo || null,
      pagina: this.paginaActual,
      itemsPorPagina: this.itemsPorPagina,
    };

    this.ejecucionesService.obtenerEjecuciones(filtros).subscribe({
      next: (response) => {
        if (response.success) {
          this.ejecuciones = response.data;
          this.totalRegistros = response.total;
          this.totalPaginas = Math.ceil(this.totalRegistros / this.itemsPorPagina);

          // Ajustar página actual si está fuera del rango válido
          if (this.paginaActual > this.totalPaginas) {
            this.paginaActual = this.totalPaginas > 0 ? this.totalPaginas : 1;
          }
        } else {
          this.error = true;
          this.errorMessage = response.message || 'Error desconocido en la respuesta del servidor.';
        }
      },
      error: (err) => {
        this.error = true;
        this.errorMessage = err.message || 'Error al conectarse al servidor.';
      },
      complete: () => {
        this.cargando = false;
      },
    });
  }

  /**
   * Aplica los filtros y reinicia la paginación a la primera página.
   */
  aplicarFiltros(): void {
    this.paginaActual = 1; // Reinicia siempre a la página 1
    this.buscarEjecuciones();
  }

  /**
   * Cambia la página actual y realiza una nueva búsqueda.
   * @param nuevaPagina - Número de la nueva página
   */
  cambiarPagina(nuevaPagina: number): void {
    if (nuevaPagina > 0 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina; // Cambiar a la página seleccionada
      this.buscarEjecuciones();
    }
  }

  /**
   * Limpia todos los filtros y reinicia a la primera página.
   */
  limpiarFiltros(): void {
    this.selectedTipo = 'Todos';
    this.desde = '';
    this.hasta = '';
    this.selectedEstado = 'Todos';
    this.nombreArchivo = '';
    this.paginaActual = 1; // Reiniciar a la primera página
    this.buscarEjecuciones();
  }
}
