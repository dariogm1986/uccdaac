import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable, from} from 'rxjs';
import { Unidade } from '../models/unidade';
import { Global } from './url'
import { Provincia } from '../models/provincia';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  public url: string;

  constructor(
    private _http:HttpClient
  ){
    this.url = Global.url;
    
  }

  getProvincias():Observable<Provincia[]>{
    return this._http.get<Provincia[]>(this.url+'provincia');
  }
  getProvincia(provinciaID:string):Observable<Provincia>{
    return this._http.get<Provincia>(this.url+'provincia/'+provinciaID);
  }
  createProvincia(provincia:Provincia):Observable<Provincia>{
    return this._http.post<Provincia>(this.url+'provincia/create',provincia);      
  }
  deleteProvincia(provinciaID:string):Observable<Provincia>{
    return this._http.delete<Provincia>(this.url+'provincia/delete/'+provinciaID);      
  }
  updateProvincia(provinciaID:string,provincia:Provincia ):Observable<Provincia>{
    return this._http.put<Provincia>(this.url+'provincia/update/'+provinciaID,provincia);      
  }
  

}
