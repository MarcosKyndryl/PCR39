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
  nombreArchivo: string = ''; // Nueva variable para el nombre de archivo

  ejecuciones: any[] = [];
  paginaActual = 1;
  itemsPorPagina = 10;
  totalPaginas = 0;
  totalRegistros = 0;

  cargando = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Cargar las ejecuciones con los filtros iniciales cuando la vista se carga
    this.buscarEjecuciones();
  }

  /**
   * Realiza la búsqueda al hacer clic en el botón o al cargar la vista
   */
  buscarEjecuciones() {
    this.cargando = true;

    // Convierte las fechas 'desde' y 'hasta' al formato adecuado (YYYY-MM-DD)
    const fechaDesde = this.desde ? new Date(this.desde).toISOString().split('T')[0] : '';
    const fechaHasta = this.hasta ? new Date(this.hasta).toISOString().split('T')[0] : '';

    const filtros = {
      tipo: this.selectedTipo === 'Todos' ? null : this.selectedTipo,
      desde: fechaDesde || null,
      hasta: fechaHasta || null,
      nombreArchivo: this.nombreArchivo || null, // Incluir filtro por nombre de archivo
      pagina: 1, // Siempre reiniciar a la primera página al presionar buscar
      itemsPorPagina: this.itemsPorPagina
    };

    this.http.post('https://us-central1-ci-xhispdf-dev.cloudfunctions.net/ejecuciones2', filtros).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.ejecuciones = response.data;
          this.totalRegistros = response.total;
          this.totalPaginas = Math.ceil(this.totalRegistros / this.itemsPorPagina);

          // Ajustar la página actual si es mayor que el total de páginas disponibles
          if (this.paginaActual > this.totalPaginas) {
            this.paginaActual = this.totalPaginas;
          }
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

  cambiarPagina(nuevaPagina: number) {
    if (nuevaPagina > 0 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
      this.buscarEjecuciones(); // Cambia a la función de búsqueda
    }
  }

  limpiarFiltros() {
    this.selectedTipo = 'Todos';
    this.desde = '';
    this.hasta = '';
    this.nombreArchivo = ''; // Limpiar el filtro de nombre de archivo
    this.paginaActual = 1; // Reinicia a la primera página
    this.buscarEjecuciones(); // Realiza la búsqueda con los filtros limpiados
  }
}
