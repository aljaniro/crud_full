import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  inject,
  model,
  OnInit,
  Signal,
  signal,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { Personas } from '../../interfaces/personas';
import { PersonasComponent } from '../../components/personas/personas.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink, PersonasComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export default class InicioComponent implements OnInit {
  servicesPerson = inject(PersonService);
  state: boolean = false;
  lista: Personas[] = this.servicesPerson.listaPerson();
  persons = input.required<Personas[]>;
  persona: Personas[] = [];
  prueba: Personas = {
    nombre: '',
    apellido: '',
    email: '',
    tipoDocumento: '',
    documento: 0,
    fechaNacimiento: new Date(),
  };
  constructor() {
    effect(() => {
      this.lista = this.servicesPerson.listaPerson();
    });
  }
  ngOnInit(): void {
    this.servicesPerson.getData().subscribe({
      next: (val) => {
        if (val) {
          this.persona = val;
        } else {
          console.log('lista vacia');
        }
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('completo');
      },
    });
  }
  data(item: Personas) {
    this.prueba = item;
    this.state = true;
    this.servicesPerson.changeState();
  }

  add() {
    this.state = false;
  }

  delete(id: any) {
    this.servicesPerson.deletePersona(id).subscribe({
      next: (val) => {
        if (val) {
          this.persona = val;
        } else {
          console.log('lista vacia');
        }
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('completo el delete');
      },
    });;
    console.log('PROCESO DE ELIMINAR COMPLETADO');
  }
}
