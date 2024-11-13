import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router para la navegación
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  styleUrls: ['./navigation.component.css'],
  imports: [RouterModule, RouterLink, RouterLinkActive],  // Importa RouterModule para usar routerLink
  templateUrl: './navigation.component.html',
  encapsulation: ViewEncapsulation.None 
})
export class NavigationComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('isLoggedIn'); // Elimina el estado de inicio de sesión
    this.router.navigate(['/']);           // Redirige a la página de inicio
  }
}
