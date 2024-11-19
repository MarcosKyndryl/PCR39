import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Define un tipo para las columnas permitidas
type Columna = 'tipo' | 'fecha' | 'hora' | 'log';

@Component({
  selector: 'app-ejecuciones',
  templateUrl: './ejecuciones.component.html',
  standalone: true,
  styleUrl: './ejecuciones.component.css',
  imports: [FormsModule, CommonModule]
})
export class EjecucionesComponent {
  tipos = ['INFO_LAB', 'INFO_IMA', 'ORD_LAB', 'ORD_IMA', 'REC_MED', 'DES_MED'];
  selectedTipo = '';
  desde: string = '';
  hasta: string = '';
  filtroFecha = '';
  filtroHora = '';

  ejecuciones = [
    { tipo: 'INFO_LAB', fecha: '2024-08-22', hora: '09:00 A.M.', log: 'INFO_082224_0900.txt' },
    { tipo: 'ORD_LAB', fecha: '2024-08-23', hora: '11:30 A.M.', log: 'ORD_082324_1130.txt' },
    { tipo: 'INFO_IMA', fecha: '2024-08-21', hora: '08:15 A.M.', log: 'INFO_082124_0815.txt' }
  ];

  ejecucionesFiltradas = [...this.ejecuciones];

  ordenColumna: Columna = 'fecha'; // Columna actual
  ordenAscendente: boolean = true;

  buscarEjecuciones() {
    this.ejecucionesFiltradas = this.ejecuciones.filter((ejec) => {
      const cumpleTipo = this.selectedTipo ? ejec.tipo === this.selectedTipo : true;
      const cumpleDesde = this.desde ? new Date(ejec.fecha) >= new Date(this.desde) : true;
      const cumpleHasta = this.hasta ? new Date(ejec.fecha) <= new Date(this.hasta) : true;
      const cumpleFiltroFecha = this.filtroFecha
        ? ejec.fecha.includes(this.filtroFecha)
        : true;
      const cumpleFiltroHora = this.filtroHora
        ? ejec.hora.includes(this.filtroHora)
        : true;

      return cumpleTipo && cumpleDesde && cumpleHasta && cumpleFiltroFecha && cumpleFiltroHora;
    });
    this.ordenarColumna(this.ordenColumna); // Mantener el orden actual al buscar
  }

  ordenarColumna(columna: Columna) {
    if (this.ordenColumna === columna) {
      this.ordenAscendente = !this.ordenAscendente;
    } else {
      this.ordenColumna = columna;
      this.ordenAscendente = true;
    }

    this.ejecucionesFiltradas.sort((a, b) => {
      const valorA = a[columna];
      const valorB = b[columna];
      if (columna === 'fecha') {
        return this.ordenAscendente
          ? new Date(valorA).getTime() - new Date(valorB).getTime()
          : new Date(valorB).getTime() - new Date(valorA).getTime();
      } else {
        return this.ordenAscendente
          ? valorA.localeCompare(valorB)
          : valorB.localeCompare(valorA);
      }
    });
  }

  limpiarFiltros() {
    this.selectedTipo = '';
    this.desde = '';
    this.hasta = '';
    this.filtroFecha = '';
    this.filtroHora = '';
    this.ejecucionesFiltradas = [...this.ejecuciones];
    this.ordenColumna = 'fecha';
    this.ordenAscendente = true;
  }
}
