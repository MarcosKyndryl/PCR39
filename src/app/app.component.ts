import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';  // Importar el componente de navegación

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [NavigationComponent, CommonModule,RouterOutlet]
})
export class AppComponent {
  showNavigation: boolean = true;

  constructor(private router: Router) {
    // Detectar cuando cambia la ruta
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Ocultar la navegación si la ruta es login
        this.showNavigation = !(event.url === '/' || event.url === '/login');
      }
    });
  }
}
