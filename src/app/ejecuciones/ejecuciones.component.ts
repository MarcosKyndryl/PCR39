import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule
import { CommonModule } from '@angular/common';  // Para otras directivas como ngIf y ngFor

@Component({
  selector: 'app-ejecuciones',
  templateUrl: './ejecuciones.component.html',
  standalone: true,
  styleUrl: './ejecuciones.component.css',
  imports: [FormsModule, CommonModule]  // Asegúrate de incluir FormsModule y CommonModule
})
export class EjecucionesComponent {
  tipos = ['INFO_LAB', 'INFO_IMA', 'ORD_LAB', 'ORD_IMA', 'REC_MED', 'DES_MED'];
  selectedTipo = '';
  desde: string = '';
  hasta: string = '';
  ejecuciones = [
    { fecha: '08/22/2024', hora: '09:00 A.M.', log: 'INFO_082224_0900.txt' }
  ];

  buscarEjecuciones() {
    console.log('Buscando ejecuciones:', this.selectedTipo, this.desde, this.hasta);
    // Lógica para buscar ejecuciones
  }
}
