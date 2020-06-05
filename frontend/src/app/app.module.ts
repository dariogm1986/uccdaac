import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './modules/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { UnidadeComponent } from './components/unidade/unidade.component';
import {EditunidadeComponent} from './components/unidade/editunidade/editunidade.component';
import {ExportarexcelService} from './services/exportarexcel.service';
import { ProvinciaComponent } from './components/provincia/provincia.component';
import { EditprovinciaComponent } from './components/provincia/editprovincia/editprovincia.component';
import { MunicipioComponent } from './components/municipio/municipio.component';
import { EditmunicipioComponent } from './components/municipio/editmunicipio/editmunicipio.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UnidadeComponent,
    EditunidadeComponent,
    ProvinciaComponent,
    EditprovinciaComponent,
    MunicipioComponent,
    EditmunicipioComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    DefaultModule,
    SharedModule,
    FlexLayoutModule,
    HttpClientModule
  ],   
  entryComponents: [
    EditunidadeComponent
  ],
  providers: [ExportarexcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
