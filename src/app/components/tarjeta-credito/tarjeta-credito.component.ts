import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  listaTarjetas: any[] = [
    { titular: 'Juan Perez', numeroTarjeta: '12312312312312', fechaExpiracion: '11/12', cvv: '123'},
    { titular: 'Miguel Gonzales', numeroTarjeta: '423423423423434', fechaExpiracion: '12/22', cvv: '433'},
    { titular: 'Adriana Diaz', numeroTarjeta: '543453453453434', fechaExpiracion: '02/26', cvv: '873'}
  ];

  form: FormGroup;
  
  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]], // Cuando ponemos mas de una validaciones tenemos que poner un array
      fechaExpiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    })
  }

  agregarTarjeta(){
    console.log(this.form);
    const tarjeta: any = {
      titular: this.form.get('titular')?.value, // el ? hace referencia a los datos nulos, despues lo vemos bien
      numeroTarjeta: this.form.get('numeroTarjeta')?.value, // el ? hace referencia a los datos nulos, despues lo vemos bien
      fechaExpiracion: this.form.get('fechaExpiracion')?.value, // el ? hace referencia a los datos nulos, despues lo vemos bien
      cvv: this.form.get('cvv')?.value, // el ? hace referencia a los datos nulos, despues lo vemos bien
    }
    console.log(tarjeta);
    this.listaTarjetas.push(tarjeta);
    this.form.reset();
  }

  ngOnInit(): void {
  }

}
