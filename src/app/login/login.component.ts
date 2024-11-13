import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';  // Variable para almacenar el mensaje de error

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        if (response.success) {
          localStorage.setItem('isLoggedIn', 'true');  // Guarda el estado de login
          this.router.navigate(['/parametrizar']);     // Redirige después del login
        } else {
          this.errorMessage = response.message;  // Almacena el mensaje de error del backend
        }
      },
      (error) => {
        // Si el error tiene un cuerpo de respuesta con un mensaje, muéstralo
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          console.error('Error en el login:', error);
          this.errorMessage = 'contraseña Incorrecta por favor, intenta de nuevo.';
        }
      }
    );
  }
}
