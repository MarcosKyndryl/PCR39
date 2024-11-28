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
  items: any[] = [];  // Para almacenar las reglas obtenidas
  mensaje: string = '';
  cambiosRealizados: boolean = false;

  constructor(private reglasService: ReglasService) {}

  ngOnInit() {
    this.cargarReglas();  // Cargar las reglas cuando se inicializa el componente
  }

  cargarReglas() {
    this.reglasService.obtenerReglas().subscribe({
      next: (response) => {
        if (response.success) {
          this.items = response.data.map((item: any) => ({
            id: item.id,  // Incluir el 'id' si lo necesitas
            tipo: item.tipo,
            parametrosDisponibles: item.parametros || [],  // Parámetros de la base de datos
            parametrosSeleccionados: this.descomponerParametros(item.regla_nombre),
            nombreEjemplo: item.ejemplo,
            originalParametrosSeleccionados: this.descomponerParametros(item.regla_nombre),
            estado: item.estado  // Incluir 'estado' en cada ítem
          }));
        }
      },
      error: (err) => {
        console.error('Error al cargar reglas:', err);
        this.mensaje = 'Error al cargar las reglas.';
      },
    });
  }

  // Función para descomponer la regla_nombre en parámetros seleccionados
  descomponerParametros(reglaNombre: string): Record<string, boolean> {
    const seleccionados = reglaNombre.replace('.extension', '').split('_');  // Eliminar ".extension" si está presente
    const parametrosSeleccionados: Record<string, boolean> = {};
    seleccionados.forEach((param) => {
      parametrosSeleccionados[param] = true;
    });
    return parametrosSeleccionados;
  }

  // Actualiza el nombre de ejemplo basado en los parámetros seleccionados
  updateNombreEjemplo(item: any) {
    const paramsSeleccionados = item.parametrosDisponibles
      .filter((param: string) => item.parametrosSeleccionados[param])
      .join('_');

    // Aseguramos que el nombreEjemplo termine con ".extension"
    item.nombreEjemplo = `${item.tipo}_${paramsSeleccionados}.extension`;

    this.verificarCambios();
  }

  // Asegura que el regla_nombre siempre termine con "_extension"
  actualizarReglaNombre(item: any): string {
    let reglaNombre = `${item.tipo}_${Object.keys(item.parametrosSeleccionados).join('_')}`;

    // Si el reglaNombre no termina con "_extension", lo agregamos
    if (!reglaNombre.endsWith('_extension')) {
      reglaNombre = `${reglaNombre}_extension`;
    }

    return reglaNombre;
  }

  // Verifica si se realizaron cambios
  verificarCambios() {
    this.cambiosRealizados = this.items.some((item) => {
      return (
        JSON.stringify(item.parametrosSeleccionados) !== JSON.stringify(item.originalParametrosSeleccionados) ||
        item.estado !== item.originalEstado  // Comprobamos también si el estado ha cambiado
      );
    });
  }

  // Envía los cambios al backend para actualizarlos
  confirmarCambios() {
    if (!this.cambiosRealizados) return;

    const data = this.items.map((item) => ({
      tipo: item.tipo,
      parametrosSeleccionados: Object.keys(item.parametrosSeleccionados)
        .filter((key) => item.parametrosSeleccionados[key])
        .join('_'),
      nombreEjemplo: item.nombreEjemplo,
      estado: item.estado,  // Incluir 'estado' al enviar
      reglaNombre: this.actualizarReglaNombre(item)  // Incluir la regla con _extension
    }));

    this.reglasService.actualizarReglas(data).subscribe({
      next: (response) => {
        if (response.success) {
          this.mensaje = 'Reglas actualizadas correctamente.';
          this.cambiosRealizados = false;
          this.items.forEach((item) => {
            item.originalParametrosSeleccionados = { ...item.parametrosSeleccionados };
            item.originalEstado = item.estado;  // Guardamos el estado original
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
