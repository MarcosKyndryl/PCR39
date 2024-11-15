import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { ReglasService } from '../services/reglas.service'; // Servicio para llamadas a la API

@Component({
  selector: 'app-parametrizar',
  templateUrl: './parametrizar.component.html',
  styleUrls: ['./parametrizar.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule], // Agrega FormsModule aquí
})
export class ParametrizarComponent implements OnInit {
  parametros = ['documento', 'encuentro', 'peticion', 'garante', 'fecha-Solicitud'];
  items: any[] = [];
  mensaje: string = '';
  cambiosRealizados: boolean = false;

  constructor(private reglasService: ReglasService) {}

  ngOnInit() {
    this.cargarReglas();
  }

  cargarReglas() {
    this.reglasService.obtenerReglas().subscribe({
      next: (response) => {
        if (response.success) {
          this.items = response.data.map((item: any) => ({
            tipo: item.tipo,
            parametrosSeleccionados: this.descomponerParametros(item.regla_nombre),
            nombreEjemplo: item.ejemplo,
            originalParametrosSeleccionados: this.descomponerParametros(item.regla_nombre),
          }));
        }
      },
      error: (err) => {
        console.error('Error al cargar reglas:', err);
        this.mensaje = 'Error al cargar las reglas.';
      },
    });
  }

  descomponerParametros(reglaNombre: string): Record<string, boolean> {
    const seleccionados = reglaNombre.split('_');
    const parametrosSeleccionados: Record<string, boolean> = {};
    this.parametros.forEach((param) => {
      parametrosSeleccionados[param] = seleccionados.includes(param);
    });
    return parametrosSeleccionados;
  }

  updateNombreEjemplo(item: any) {
    const paramsSeleccionados = this.parametros
      .filter((param) => item.parametrosSeleccionados[param])
      .join('_');
    item.nombreEjemplo = `${item.tipo}_${paramsSeleccionados}.pdf`;

    this.verificarCambios();
  }

  verificarCambios() {
    this.cambiosRealizados = this.items.some((item) => {
      return JSON.stringify(item.parametrosSeleccionados) !== JSON.stringify(item.originalParametrosSeleccionados);
    });
  }

  confirmarCambios() {
    if (!this.cambiosRealizados) return;

    const data = this.items.map((item) => ({
      tipo: item.tipo,
      parametrosSeleccionados: Object.keys(item.parametrosSeleccionados)
        .filter((key) => item.parametrosSeleccionados[key])
        .join('_'),
      nombreEjemplo: item.nombreEjemplo,
    }));

    this.reglasService.actualizarReglas(data).subscribe({
      next: (response) => {
        if (response.success) {
          this.mensaje = 'Reglas actualizadas correctamente.';
          this.cambiosRealizados = false;
          this.items.forEach((item) => {
            item.originalParametrosSeleccionados = { ...item.parametrosSeleccionados };
          });
        }
      },
      error: (err) => {
        console.error('Error al actualizar reglas:', err);
        this.mensaje = 'Error al actualizar las reglas.';
      },
    });
  }
}
