import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.username === 'admin' && this.password === '123') {
      localStorage.setItem('isLoggedIn', 'true');  // Almacena que el usuario está logueado
      this.router.navigate(['/parametrizar']);     // Redirige después del login
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
}
