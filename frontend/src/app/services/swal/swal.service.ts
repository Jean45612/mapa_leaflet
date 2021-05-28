import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  eliminar(mensaje = "Desea eliminar el registro?") {
    return Swal.fire({
      title: mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      heightAuto:false
    }).then((result) => {
      if (result.value) {
        return true;
      } else {
        return false;
      }
    })
  }

  alerta(msj, icon, timer = 4000) {
    Swal.fire({
      title: msj,
      icon: icon,
      timer: timer,
      heightAuto:false
    });
  }
}
