import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Login } from '../../interfaces/login';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  ruta = inject(Router);
  accessServices = inject(LoginService);
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      username: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [Validators.min(3), Validators.max(20), Validators.required],
      ],
    });
  }
  enviar() {
    console.log('hola mundo');
    const user: Login = {
      username: this.form.controls['username'].value,
      password: this.form.controls['password'].value,
    };
    console.log(user);
    this.accessServices.loginOn(user).subscribe({
      next: (val) => {
        if (val.isSuccess) {
          console.log('conexion correcta');
          localStorage.setItem('authToken', val.token);
          this.ruta.navigate(['/person']);
        } else {
          console.log('intente de nuevo');
        }
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('PROCESO DE LOGIN COMPLETO');
      },
    });
  }
}
