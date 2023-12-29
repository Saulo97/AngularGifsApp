import { Component, Input } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrl: './busqueda.component.css'
})
export class BusquedaComponent {
@Input() busqueda: string ='';
  constructor(private gifsService : GifsService){}
  buscar() {
    if(this.busqueda.trim().length===0){
      return
    }
    this.gifsService.buscarGif(this.busqueda)
    this.busqueda =''

  }

}
