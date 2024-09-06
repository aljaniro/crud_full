import {
  Component,
  effect,
  inject,
  Input,
  input,
  model,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PersonService } from '../../services/person.service';
import { Personas } from '../../interfaces/personas';

@Component({
  selector: 'app-personas',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './personas.component.html',
  styleUrl: './personas.component.css',
})
export class PersonasComponent implements OnInit {
  form: FormGroup;

  service = inject(PersonService);

  activo = this.service.estado();

  estado = input.required<boolean>();
  peopple = input.required<Personas>();
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required]],
      tipoDocumento: ['', [Validators.required]],
      documento: ['', [Validators.required]],
      fechaNacimiento: new Date(),
    });

    effect(() => {
      this.activo = this.service.estado();
    });
    effect(() => {
      const usuario = this.peopple();
      this.form.patchValue(usuario);
    });
  }

  ngOnInit(): void {}

  enviar() {
    console.log(this.peopple(), 'persona');
    console.log(this.estado(), 'este es el ultimo estado');
    const { id } = this.peopple();
    console.log(id, 'su id');
    const dato: Personas = {
      nombre: this.form.controls['nombre'].value,
      apellido: this.form.controls['apellido'].value,
      email: this.form.controls['email'].value,
      tipoDocumento: this.form.controls['tipoDocumento'].value,
      documento: this.form.controls['documento'].value,
      fechaNacimiento: new Date(),
    };
    if (this.estado() == false) {
      this.service.addperson(dato).subscribe({
        next: (val) => {
          console.log(val);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log('PROCESO CREATE COMPLETADO');
        },
      });
    } else {
      this.service.updatePerson(id, dato).subscribe({
        next: (val) => {
          console.log(val);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log('PROCESO UPDATE COMPLETADO');
        },
      });
      this.service.changeState();
    }
  }
}
