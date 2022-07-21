import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgReduxModule } from '@angular-redux/store';
import { NgRedux, DevToolsExtension } from '@angular-redux/store';
import { rootReducer, ArchitectUIState } from './ThemeOptions/store';
import { ConfigActions } from './ThemeOptions/store/config.actions';
import { AppRoutingModule } from './app-routing.module';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';


import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
//view docs
import { NgxDocViewerModule } from 'ngx-doc-viewer';
// BOOTSTRAP COMPONENTS

//import {AngularFontAwesomeModule} from 'angular-font-awesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ChartsModule } from 'ng2-charts';

// LAYOUT

import { BaseLayoutComponent } from './Layout/base-layout/base-layout.component';
import { PagesLayoutComponent } from './Layout/pages-layout/pages-layout.component';
import { PageTitleComponent } from './Layout/Components/page-title/page-title.component';

// HEADER

import { HeaderComponent } from './Layout/Components/header/header.component';
import { SearchBoxComponent } from './Layout/Components/header/elements/search-box/search-box.component';
import { UserBoxComponent } from './Layout/Components/header/elements/user-box/user-box.component';

// SIDEBAR

import { SidebarComponent } from './Layout/Components/sidebar/sidebar.component';
import { LogoComponent } from './Layout/Components/sidebar/elements/logo/logo.component';

// FOOTER

import { FooterComponent } from './Layout/Components/footer/footer.component';



import { LoginBoxedComponent } from './auth/login/login-boxed.component';








import { UsersComponent } from './pages/admin/users/users.component';
import { RolesComponent } from './pages/admin/roles/roles.component';
import { MrolesComponent } from './modals/admin/mroles/mroles.component';
import { MusersComponent } from './modals/admin/musers/musers.component';
import { IpressComponent } from './pages/claims/ipress/ipress.component';
import { IafasComponent } from './pages/claims/iafas/iafas.component';
import { CollaboratorsComponent } from './pages/rrhh/collaborators/collaborators.component';
import { PortalComponent } from './pages/claims/portal/portal.component';
import { MedrolesComponent } from './modals/admin/medroles/medroles.component';
import { RegisterComponent } from './pages/claims/iafas/taps/register/register.component';
import { ListComponent } from './pages/claims/iafas/taps/list/list.component';
import { DashboardComponent } from './pages/claims/iafas/taps/dashboard/dashboard.component';
import { CausaComponent } from './modals/claims/list/causa/causa.component';
import { DetalleComponent } from './modals/claims/list/detalle/detalle.component';
import { ListcomocimientoComponent } from './modals/claims/list/listcomocimiento/listcomocimiento.component';
import { RespuestaReclamoComponent } from './modals/claims/list/respuesta-reclamo/respuesta-reclamo.component';
import { SolucionComponent } from './modals/claims/list/solucion/solucion.component';
import { ConocimientoComponent } from './modals/claims/popup/conocimiento/conocimiento.component';
import { ConveniosComponent } from './modals/claims/popup/convenios/convenios.component';
import { InvolucradoComponent } from './modals/claims/popup/involucrado/involucrado.component';
import { PersonalComponent } from './modals/claims/popup/personal/personal.component';
import { PreviewComponent } from './modals/claims/popup/preview/preview.component';
import { SearchComponent } from './modals/claims/popup/search/search.component';
import { CaracteristicasComponent } from './modals/claims/list/detalle/modal/caracteristicas/caracteristicas.component';
import { InfoclientComponent } from './modals/claims/list/detalle/modal/infoclient/infoclient.component';
import { RepresentanteComponent } from './modals/claims/list/detalle/modal/representante/representante.component';
import { DetalleInvolucradoComponent } from './modals/claims/list/detalle/modal/detalle-involucrado/detalle-involucrado.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgSelectModule } from '@ng-select/ng-select';
import { MedidasAdoptadasComponent } from './modals/claims/list/respuesta-reclamo/medidas-adoptadas/medidas-adoptadas.component';
import { ListIpresComponent } from './pages/claims/ipress/taps/list/list.component';
import { RegisterIpresComponent } from './pages/claims/ipress/taps/register/register.component';
import { ModalComponent } from './pages/claims/portal/modal/modal.component';
import { SendComponent } from './pages/report/send/send.component';
import { FilesComponent } from './modals/claims/list/detalle/modal/files/files.component';
import { DocsComponent } from './modals/claims/docs/docs.component';
import { PiecharComponent } from './components/piechar/piechar.component';
import { BarcharComponent } from './components/barchar/barchar.component';
import { DashboardIpressComponent } from './pages/claims/ipress/taps/dashboard/dashboard-ipress.component';
import { LoadingComponent } from './pages/loaging/loading';
import { SusaludComponent } from './pages/claims/susalud/susalud.component';

//ENCUESTA
//import { NgxSpinnerModule } from "ngx-spinner"
import { HomeComponent } from './pages/encuesta/home/home.component';
import { QuestionComponent } from './pages/encuesta/question/question.component';
import { AnswerComponent } from './pages/encuesta/answer/answer.component';
import { ResponseformComponent } from './pages/encuesta/responseform/responseform.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    // LAYOUT

    AppComponent,
    BaseLayoutComponent,
    PagesLayoutComponent,
    PageTitleComponent,
    HeaderComponent,
    SearchBoxComponent,
    UserBoxComponent,
    SidebarComponent,
    LogoComponent,
    FooterComponent,
    LoginBoxedComponent,
  






    UsersComponent,
    RolesComponent,
    MrolesComponent,
    MusersComponent,
    IpressComponent,
    IafasComponent,
    CollaboratorsComponent,
    PortalComponent,
    MedrolesComponent,
    RegisterComponent,
    ListComponent,
    DashboardComponent,
    DashboardIpressComponent,
    CausaComponent,
    DetalleComponent,
    ListcomocimientoComponent,
    RespuestaReclamoComponent,
    SolucionComponent,
    ConocimientoComponent,
    ConveniosComponent,
    InvolucradoComponent,
    PersonalComponent,
    PreviewComponent,
    SearchComponent,
    CaracteristicasComponent,
    InfoclientComponent,
    RepresentanteComponent,
    MedidasAdoptadasComponent,
    ListIpresComponent,
    RegisterIpresComponent,
    SendComponent,
    DetalleInvolucradoComponent,
    ModalComponent,
    FilesComponent,
    DocsComponent,
    PiecharComponent,
    BarcharComponent,
    LoadingComponent,
    SusaludComponent,

    //ENCUESTA
    HomeComponent,
    QuestionComponent,
    AnswerComponent,
    ResponseformComponent
        
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgReduxModule,
    CommonModule,
    //view  docs
    NgxDocViewerModule,
    LoadingBarRouterModule,

    // Angular Bootstrap Components

    PerfectScrollbarModule,
    NgbModule,
    //AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    //NgxSpinnerModule,

    // Charts

    ChartsModule,
    AngularEditorModule,
    NgSelectModule,
    AgGridModule.withComponents([]),

  ],
  providers: [
    {
      provide:
        PERFECT_SCROLLBAR_CONFIG,
      // DROPZONE_CONFIG,
      useValue:
        DEFAULT_PERFECT_SCROLLBAR_CONFIG,
      // DEFAULT_DROPZONE_CONFIG,
    },
    ConfigActions,
    DatePipe
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private ngRedux: NgRedux<ArchitectUIState>,
    private devTool: DevToolsExtension) {

    this.ngRedux.configureStore(
      rootReducer,
      {} as ArchitectUIState,
      [],
      [devTool.isEnabled() ? devTool.enhancer() : f => f]
    );

  }
}
