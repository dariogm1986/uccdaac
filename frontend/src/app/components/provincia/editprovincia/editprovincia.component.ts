import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Provincia } from '../../../models/provincia';
import {ProvinciaService} from '../../../services/provincia.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-editprovincia',
  templateUrl: './editprovincia.component.html',
  styleUrls: ['./editprovincia.component.css'],
  providers: [ProvinciaService]
})
export class EditprovinciaComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditprovinciaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Provincia,
    private provinciaService: ProvinciaService
  ){}

  ngOnInit(): void {
    //console.log(this.data);
  }

  editProvincia() {
    this.provinciaService.updateProvincia(this.data.id,this.data).subscribe(
      res => {             
      },
      err => console.log(err)
    );    
  }
  onNoClick(): void {
    
    this.dialogRef.close();    
  }

}
