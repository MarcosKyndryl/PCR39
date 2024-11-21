import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EjecucionesService } from './ejecuciones.service';

@Component({
  selector: 'app-ejecuciones',
  templateUrl: './ejecuciones.component.html',
  styleUrls: ['./ejecuciones.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class EjecucionesComponent implements OnInit {
  tipos = ['Todos', 'INF_LAB', 'INF_IMA', 'ORD_LAB', 'ORD_IMA', 'REC_MED', 'DES_MED'];
  selectedTipo = 'Todos'; // Establece "Todos" como valor predeterminado
  desde: string = '';
  hasta: string = '';

  ejecuciones: any[] = []; // Datos originales
  ejecucionesFiltradas: any[] = []; // Datos filtrados
  ejecucionesPaginadas: any[] = []; // Datos visibles en la página actual

  // Paginación
  paginaActual = 1;
  itemsPorPagina = 10;
  totalPaginas = 0;

  constructor(private ejecucionesService: EjecucionesService) {}

  ngOnInit() {
    this.cargarEjecuciones();
  }

  cargarEjecuciones() {
    this.ejecucionesService.obtenerEjecuciones().subscribe({
      next: (response) => {
        if (response.success) {
          this.ejecuciones = response.data;
          this.aplicarFiltros(); // Aplica los filtros y reinicia la paginación
        } else {
          console.error('Error al cargar ejecuciones:', response.message);
        }
      },
      error: (error) => {
        console.error('Error al conectarse a la API:', error);
      },
    });
  }

  refrescarTabla() {
    this.cargarEjecuciones();
  }

  aplicarFiltros() {
    this.ejecucionesFiltradas = this.ejecuciones.filter((ejec) => {
      const ejecFecha = this.parseFecha(ejec.fecha); // Convertimos la fecha del dato al formato Date
      const cumpleTipo = this.selectedTipo && this.selectedTipo !== 'Todos' ? ejec.tipo === this.selectedTipo : true;
      const cumpleDesde = this.desde ? ejecFecha >= new Date(this.desde) : true; // Convertimos `desde` al formato Date
      const cumpleHasta = this.hasta ? ejecFecha <= this.getFechaFinDia(this.hasta) : true; // Incluye el día completo
      return cumpleTipo && cumpleDesde && cumpleHasta;
    });
    this.paginaActual = 1; // Reinicia la paginación
    this.actualizarPaginacion();
  }

  limpiarFiltros() {
    this.selectedTipo = 'Todos'; // Restablece "Todos" como valor predeterminado
    this.desde = '';
    this.hasta = '';
    this.aplicarFiltros(); // Restablece la lista filtrada a la completa
  }

  actualizarPaginacion() {
    this.totalPaginas = Math.ceil(this.ejecucionesFiltradas.length / this.itemsPorPagina);
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    this.ejecucionesPaginadas = this.ejecucionesFiltradas.slice(inicio, fin);
  }

  cambiarPagina(nuevaPagina: number) {
    if (nuevaPagina > 0 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
      this.actualizarPaginacion();
    }
  }

  // Función para convertir fechas en formato dd/MM/yyyy a Date
  private parseFecha(fecha: string): Date {
    const [day, month, year] = fecha.split('/').map(Number);
    return new Date(year, month - 1, day); // En JavaScript los meses comienzan desde 0
  }

  // Función para obtener el final del día (23:59:59) para una fecha específica
  private getFechaFinDia(fecha: string): Date {
    const [year, month, day] = fecha.split('-').map(Number); // Formato YYYY-MM-DD del input date
    return new Date(year, month - 1, day, 23, 59, 59); // Último segundo del día
  }
}
