import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Login } from '../../interfaces/login';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  accessServi = inject(LoginService)
  form:FormGroup
  constructor(private fb:FormBuilder){
    this.form=this.fb.group({
      username:['',[Validators.email,Validators.required]],
      password:['',[Validators.maxLength(20),Validators.minLength(3),Validators.required]]
      
    })
  }

  enviar(){
    const user:Login=({
      username:this.form.controls['username'].value,
      password:this.form.controls['password'].value,
      role:'visited',
      status:true
    })
    this.accessServi.register(user).subscribe({
      next:(val)=>{
        console.log("USUARIO AGREGADO: ",val)
      },
      error:(error)=>{
        console.log(error)
      },
      complete:()=>{
        console.log("PROCESO DE REGISTRO COMPLETO")
      }
    })
  }
}
