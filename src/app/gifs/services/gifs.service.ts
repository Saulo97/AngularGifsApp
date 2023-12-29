import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, ResutlGIFResponse } from '../../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial:string[] = [];
  private apiKey : string = 'LmoDw370LGhEShCJ3UWKCrHe6e9udVUv'
  private _resultado:Gif[] = []
  private _servicioURL: string = 'https://api.giphy.com/v1/gifs'

  get resultado(){
    return [...this._resultado]
  }

  get historial(){
    return [...this._historial];
  }
  constructor( private http :HttpClient ){
    this._historial = JSON.parse(localStorage.getItem('historial')!)||[]
    this._resultado = JSON.parse(localStorage.getItem('ultimoResultado')!)||[]
  }

  buscarGif( query: string){
    query = query.trim().toLocaleLowerCase()
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial=this._historial.splice(0,10)

      localStorage.setItem('historial', JSON.stringify(this._historial))
    }
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q',query)

    this.http.get<ResutlGIFResponse>(`${this._servicioURL}/search`, {params})
        .subscribe((resp)=>{
          this._resultado = resp.data
          localStorage.setItem('ultimoResultado', JSON.stringify(this._resultado) )
        })

  }
}
