import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  listaTarjetas: any[] = [];
  accion = 'Agregar';
  id: number | undefined; // la | nos permite definir 2 tipos de datos posibles para la variable. 

  form: FormGroup;
  
  constructor(private fb: FormBuilder, private toastr: ToastrService, private _tarjetaService: TarjetaService){
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]], // Cuando ponemos mas de una validaciones tenemos que poner un array
      fechaExpiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    })
  }

  ngOnInit(): void {
    this.obtenerTarjetas();

  }

  obtenerTarjetas(){
    this._tarjetaService.getListTarjetas().subscribe(data => {
      console.log(data);
      this.listaTarjetas = data;
    }, error => {
      console.log(error);
    })
  }

  guardarTarjeta(){
    const tarjeta: any = {
      titular: this.form.get('titular')?.value, // el ? hace referencia a los datos nulos, despues lo vemos bien
      numeroTarjeta: this.form.get('numeroTarjeta')?.value, // el ? hace referencia a los datos nulos, despues lo vemos bien
      fechaExpiracion: this.form.get('fechaExpiracion')?.value, // el ? hace referencia a los datos nulos, despues lo vemos bien
      cvv: this.form.get('cvv')?.value, // el ? hace referencia a los datos nulos, despues lo vemos bien
    }

    if(this.id == undefined) {

      this._tarjetaService.saveTarjeta(tarjeta).subscribe(data =>{
        this.toastr.success('La tarjeta fue registrada con exito!', 'Tarjeta registrada!');
        this.obtenerTarjetas();
        this.form.reset();
      }, error =>{
        this.toastr.error('Ocurrio un error','Error');
      })

    } else {
      tarjeta.id = this.id;
      //Editamos tarjeta
      this._tarjetaService.updateTarjeta(this.id, tarjeta).subscribe(data =>{
        this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.toastr.info('La tarjeta fue actualizada con exito', 'Tarjeta Actualizada');
        this.obtenerTarjetas();
      }, error => {
        console.log(error);
      })
    }
  }

  eliminarTarjeta(id: number){
    this._tarjetaService.deleteTarjeta(id).subscribe(data =>{
    this.toastr.error('La tarjeta fue eliminada con exito!', 'Tarjeta eliminada');
    this.obtenerTarjetas();
    }, error =>{
      console.log(error);
    })
  }

  editarTarjeta(tarjeta: any) {
    this.accion = 'Editar';
    this.id = tarjeta.id;

    this.form.patchValue({
      titular: tarjeta.titular,
      numeroTarjeta: tarjeta.numeroTarjeta,
      fechaExpiracion: tarjeta.fechaExpiracion,
      cvv: tarjeta.cvv
    })

  }




}
