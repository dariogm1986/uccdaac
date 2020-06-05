import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable, from} from 'rxjs';
import { Municipio } from '../models/municipio';
import { Global } from './url'

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  public url: string;

    constructor(
        private _http:HttpClient
    ){
        this.url = Global.url;
        
    }
    getMunicipios():Observable<Municipio[]>{
      return this._http.get<Municipio[]>(this.url+'municipio');
    }
    getMunicipio(municipioID:string):Observable<Municipio>{
      return this._http.get<Municipio>(this.url+'municipio/'+municipioID);
    }
    createMunicipio(municipio:Municipio):Observable<Municipio>{
      return this._http.post<Municipio>(this.url+'municipio/create',municipio);      
    }
    deleteMunicipio(municipioID:string):Observable<Municipio>{
      return this._http.delete<Municipio>(this.url+'municipio/delete/'+municipioID);      
    }
    updateMunicipio(municipioID:string,municipio:Municipio ):Observable<Municipio>{
      return this._http.put<Municipio>(this.url+'municipio/update/'+municipioID,municipio);      
    }
  
}
