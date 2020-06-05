import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Municipio } from '../../../models/municipio';
import {MunicipioService} from '../../../services/municipio.service';
import swal from 'sweetalert';

import { ProvinciaService } from '../../../services/provincia.service';
import { Provincia } from '../../../models/provincia';

@Component({
  selector: 'app-editmunicipio',
  templateUrl: './editmunicipio.component.html',
  styleUrls: ['./editmunicipio.component.css'],
  providers:[MunicipioService, ProvinciaService]
})
export class EditmunicipioComponent implements OnInit {

  public provincia:Provincia;
  public provincias: Provincia[];

  constructor(
    public dialogRef: MatDialogRef<EditmunicipioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Municipio,
    private municipioService: MunicipioService,
    private provinciaService: ProvinciaService
  ){}

  ngOnInit(): void {
    this.getProvincias();
  }

  //traer el listado de provincias
  getProvincias() {
    //this.provincia = new Provincia('', '');
    this.provinciaService.getProvincias().subscribe(
      res => {
        this.provincias = res['provincias'];
        //console.log(this.provincias);
      },
      err => console.log(err)
    );

  }

  editMunicipio() {
    this.municipioService.updateMunicipio(this.data.id,this.data).subscribe(
      res => {             
      },
      err => console.log(err)
    );    
  }
  onNoClick(): void {
    
    this.dialogRef.close();    
  }

}
