import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator'
import { ProvinciaService } from '../../services/provincia.service';
import { ExportarexcelService } from '../../services/exportarexcel.service';
import { Provincia } from '../../models/provincia';
import swal from 'sweetalert';
import * as jsPDF from 'jspdf';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { EditprovinciaComponent } from './editprovincia/editprovincia.component';

@Component({
  selector: 'app-provincia',
  templateUrl: './provincia.component.html',
  styleUrls: ['./provincia.component.css'],
  providers: [ProvinciaService]
})
export class ProvinciaComponent implements OnInit {

  selected = new FormControl(0);
  displayedColumns: string[] = ['no', 'nome', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  searchKey: string;
  provincia: Provincia;
  provinciaEdit: Provincia;
  provinciaEditaux: Provincia;
  provincias: Provincia[];

  constructor(
    private provinciaService: ProvinciaService,
    private exportxls: ExportarexcelService,
    private dialog: MatDialog
  ) {
    this.provincias = [];
    this.provinciaEdit = new Provincia('', '');
    this.provinciaEditaux = new Provincia('', '');
  }

  ngOnInit(): void {
    //cargar por defecto el listado de provincias
    this.getProvincias();
  }

  //Muestra el listado de Provincias
  getProvincias() {
    this.provincia = new Provincia('', '');
    this.provinciaService.getProvincias().subscribe(
      res => {
        this.provincias = res['provincias'];
        this.dataSource = new MatTableDataSource(this.provincias);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel = "Elementos por páginas";
        this.paginator._intl.nextPageLabel = "página seguinte";
        this.paginator._intl.previousPageLabel = "página anterior";
        this.paginator._intl.firstPageLabel = "primeira página";
        this.paginator._intl.lastPageLabel = "última página";
      },
      err => console.log(err)
    );

  }

  //Crear una provincia
  createProvincia() {
    this.provinciaService.createProvincia(this.provincia).subscribe(
      res => {
        this.getProvincias();
        this.provincia = new Provincia('', '');
        swal({
          title: "Excelente!",
          text: "Provincia criada com sucesso!!",
          icon: "success"
        });
        //console.log(res);
      },
      err => {
        swal({
          title: "Error!",
          text: "Error al crear la Provincia Asegurese de que no existe!!",
          icon: "error"
        });
        //console.log(err);
      }
    );
  }

  //Eliminar una provincia
  deleteProvincia(provinciaID: string) {
    swal({
      title: "Está seguro(a)?",
      text: "Não poderá desfazer esta operação!",
      icon: "warning",
      buttons: ['Cancelar', 'Aceitar'],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.provinciaService.deleteProvincia(provinciaID).subscribe(
            res => {
              swal("Poof! Sua operação se realizou com sucesso!", {
                icon: "success",
              });
              this.getProvincias();
            },
            err => console.log(err)
          );
        }
        else {
          swal("Tranqüilo(a),não ocorreu nada!!");
        }
      });
  }

  //limpiar filtro
  limpiar() {
    this.searchKey = "";
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  //filtrar
  Filtrar() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  //Exportar a excel y PDF
  exportarExcel() {
    this.exportxls.exportToExcel(this.dataSource.data, 'provincia')
  }
  exportarExcelFilter() {
    this.exportxls.exportToExcel(this.dataSource.filteredData, 'provincia')
  }
  exportarPDF() {
    const pdf = new jsPDF(
      {
        orientation: 'l',
        unit: 'pt',
        format: 'carta',
        posicion:2
      });
    pdf.setFontSize(16);
    pdf.setFontStyle('bold');
    pdf.text('Provincia',350,20)
    pdf.fromHTML(document.getElementById('provinciaTable'), 100, 15);
    pdf.save();
  }

  //Abrir el dialog para la funcion de editar
  openDialog(provinciaID: string, nome: string): void {
    this.provinciaEdit = new Provincia(provinciaID, nome);
    this.provinciaEditaux = new Provincia(provinciaID, nome);
    const dialogRef = this.dialog.open(EditprovinciaComponent, {
      width: '400px',
      data: this.provinciaEdit
    });
    dialogRef.afterClosed().subscribe(result => {
      const probando: Provincia = result;      
      if(probando != undefined){
        if (!(JSON.stringify(probando) === JSON.stringify(this.provinciaEditaux))) {
          swal({
            title: "Excelente!",
            text: "Provincia alterada com sucesso!!",
            icon: "success"
          });
          
        }
      } 
      this.getProvincias();     
    });
  }

}
