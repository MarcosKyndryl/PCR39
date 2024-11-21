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
  tipos = ['Todos','INFO_LAB', 'INFO_IMA', 'ORD_LAB', 'ORD_IMA', 'REC_MED', 'DES_MED'];
  selectedTipo = '';
  desde: string = '';
  hasta: string = '';

  ejecuciones: any[] = []; // Datos originales
  ejecucionesFiltradas: any[] = []; // Datos filtrados
  ejecucionesPaginadas: any[] = []; // Datos visibles en la página actual

  // Paginación :D
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
      const cumpleTipo = this.selectedTipo ? ejec.tipo === this.selectedTipo : true;
      const cumpleDesde = this.desde ? new Date(ejec.fecha) >= new Date(this.desde) : true;
      const cumpleHasta = this.hasta ? new Date(ejec.fecha) <= new Date(this.hasta) : true;
      return cumpleTipo && cumpleDesde && cumpleHasta;
    });
    this.paginaActual = 1; // Reinicia la paginación
    this.actualizarPaginacion();
  }

  limpiarFiltros() {
    this.selectedTipo = '';
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
}
