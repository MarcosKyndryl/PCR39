import { Component,ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  styleUrls: ['./navigation.component.css'],
  imports: [RouterModule,RouterLink, RouterLinkActive],  // Importa RouterModule para usar routerLink
  templateUrl: './navigation.component.html',
  encapsulation: ViewEncapsulation.None 
})
export class NavigationComponent {}
