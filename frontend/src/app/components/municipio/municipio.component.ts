import { Component, OnInit, ViewChild } from '@angular/core';
import { Municipio } from '../../models/municipio';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator'
import { MunicipioService } from '../../services/municipio.service';
import { ExportarexcelService } from '../../services/exportarexcel.service';
import swal from 'sweetalert';
import * as jsPDF from 'jspdf';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { ProvinciaService } from '../../services/provincia.service';
import { Provincia } from '../../models/provincia';
import { EditmunicipioComponent } from '../municipio/editmunicipio/editmunicipio.component';

@Component({
  selector: 'app-municipio',
  templateUrl: './municipio.component.html',
  styleUrls: ['./municipio.component.css'],
  providers: [
    MunicipioService,
    ProvinciaService
  ]
})
export class MunicipioComponent implements OnInit {

  selected = new FormControl(0);
  displayedColumns: string[] = ['no', 'nome','provincia', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  searchKey: string;

  public municipio: Municipio;
  public municipioEdit: Municipio;
  public municipioEditaux: Municipio;
  public municipios: Municipio[];
  public selectedvalue:string;

  public provincia:Provincia;
  public provincias: Provincia[];

  constructor(
    private municipioService: MunicipioService,
    private provinciaService: ProvinciaService,
    private exportxls: ExportarexcelService,
    private dialog: MatDialog
  ) {
    this.municipios = [];
    this.municipioEdit = new Municipio('', '','');
    this.municipioEditaux = new Municipio('', '','');
  }

  ngOnInit(): void {
    this.getMunicipios();
    this.getProvincias();
  }

  //Muestra el listado de Municipios
  getMunicipios() {
    this.municipio = new Municipio('', '','');
    this.municipioService.getMunicipios().subscribe(
      res => {
        this.municipios = res['municipios'];
        this.dataSource = new MatTableDataSource(this.municipios);
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

  //crear un municipio
  createMunicipio(){
    this.municipioService.createMunicipio(this.municipio).subscribe(
      res => {
        this.getMunicipios();
        this.municipio = new Municipio('', '', '');
        swal({
          title: "Excelente!",
          text: "Municipio criado com sucesso!!",
          icon: "success"
        });
        //console.log(res);
      },
      err => {
        swal({
          title: "Error!",
          text: "Error al crear el Municipio Asegurese de que no existe!!",
          icon: "error"
        });
        //console.log(err);
      }
    );
  }

  //Eliminar un municipio
  deleteMunicipio(municipioID: string) {
    swal({
      title: "Está seguro(a)?",
      text: "Não poderá desfazer esta operação!",
      icon: "warning",
      buttons: ['Cancelar', 'Aceitar'],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.municipioService.deleteMunicipio(municipioID).subscribe(
            res => {
              swal("Poof! Sua operação se realizou com sucesso!", {
                icon: "success",
              });
              this.getMunicipios();
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
    this.exportxls.exportToExcel(this.dataSource.data, 'municipio')
  }
  exportarExcelFilter() {
    this.exportxls.exportToExcel(this.dataSource.filteredData, 'municipio')
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
    pdf.text('Municipio',350,20)
    pdf.fromHTML(document.getElementById('municipioTable'), 100, 15);
    pdf.save();
  }

  //Abrir el dialog para la funcion de editar
  openDialog(municipioID: string, nome_municipio: string, nome_provincia:string): void {
    this.municipioEdit = new Municipio(municipioID, nome_municipio, nome_provincia);
    this.municipioEditaux = new Municipio(municipioID, nome_municipio, nome_provincia);
    const dialogRef = this.dialog.open(EditmunicipioComponent, {
      width: '400px',
      data: this.municipioEdit
    });
    dialogRef.afterClosed().subscribe(result => {
      const probando: Municipio = result;      
      if(probando != undefined){
        if (!(JSON.stringify(probando) === JSON.stringify(this.municipioEditaux))) {
          swal({
            title: "Excelente!",
            text: "Municipio alterado com sucesso!!",
            icon: "success"
          });
          
        }
      } 
      this.getMunicipios();     
    });
  }

}
