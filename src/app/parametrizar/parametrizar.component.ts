import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parametrizar',
  templateUrl: './parametrizar.component.html',
  styleUrls: ['./parametrizar.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class ParametrizarComponent {
  parametros = ['documento', 'encuentro', 'peticion', 'garante', 'fecha Solicitud'];

  // Especificamos el tipo de `parametrosSeleccionados`
  items = [
    { tipo: 'INFO_LAB', parametrosSeleccionados: {} as Record<string, boolean>, nombreEjemplo: '' },
    { tipo: 'INFO_IMA', parametrosSeleccionados: {} as Record<string, boolean>, nombreEjemplo: '' },
    { tipo: 'ORD_LAB', parametrosSeleccionados: {} as Record<string, boolean>, nombreEjemplo: '' },
    { tipo: 'ORD_IMA', parametrosSeleccionados: {} as Record<string, boolean>, nombreEjemplo: '' },
    { tipo: 'REC_MED', parametrosSeleccionados: {} as Record<string, boolean>, nombreEjemplo: '' },
    { tipo: 'DES_MED', parametrosSeleccionados: {} as Record<string, boolean>, nombreEjemplo: '' }
  ];

  updateNombreEjemplo(item: any) {
    // Filtra los parámetros seleccionados y crea el nombre de ejemplo
    const paramsSeleccionados = this.parametros
      .filter(param => item.parametrosSeleccionados[param])
      .join('_');
    item.nombreEjemplo = `${item.tipo}_${paramsSeleccionados}`;
  }
}
