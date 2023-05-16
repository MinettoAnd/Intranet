import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BaseLayoutComponent } from "./Layout/base-layout/base-layout.component";
import { PagesLayoutComponent } from "./Layout/pages-layout/pages-layout.component";

// DEMO PAGES

// Pages

import { LoginBoxedComponent } from "./auth/login/login-boxed.component";

// Elements

// Components

// Tables

// Charts

import { UsersComponent } from "./pages/admin/users/users.component";
import { RolesComponent } from "./pages/admin/roles/roles.component";
import { IpressComponent } from "./pages/claims/ipress/ipress.component";
import { IafasComponent } from "./pages/claims/iafas/iafas.component";
import { PortalComponent } from "./pages/claims/portal/portal.component";
import { SusaludComponent } from "./pages/claims/susalud/susalud.component";
import { CollaboratorsComponent } from "./pages/rrhh/collaborators/collaborators.component";
import { SendComponent } from "./pages/report/send/send.component";
import { DefaultComponent } from "./pages/default/default.component";
import { AuthGuard } from "./guards/guards.guard";

//ENCUESTA
//import { HomeComponent } from "./pages/claims/encuesta/home/home.component";
import { HomeComponent } from "./pages/encuesta/home/home.component";
import { AnswerComponent } from "./pages/encuesta/answer/answer.component";
import { ResponseformComponent } from "./pages/encuesta/responseform/responseform.component";
import { ReporteComponent } from './pages/encuesta/reporte/reporte.component';
import { AttentionConsultationComponent } from "./pages/emergencies/attention-consultation/attention-consultation.component";

const routes: Routes = [
    {
        path: "",
        component: PagesLayoutComponent,
        children: [
            // User Pages
            { path: "", redirectTo: "auth/login", pathMatch: "full" },
            {
                path: "auth/login",
                component: LoginBoxedComponent,
                data: { extraParameter: "" },
            },
        ],
    },
    {
        path: "",
        component: BaseLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            // Dashboads
            {
                path: "default",
                component: DefaultComponent,
                data: { extraParameter: "" },
            },
            // Charts
            //new
            {
                path: "admin/users",
                component: UsersComponent,
                data: { extraParameter: "adminMenu" },
            },
            {
                path: "admin/roles",
                component: RolesComponent,
                data: { extraParameter: "adminMenu" },
            },

            {
                path: "claims/iafas",
                component: IafasComponent,
                data: { extraParameter: "claimsMenu" },
            },
            {
                path: "claims/ipress",
                component: IpressComponent,
                data: { extraParameter: "claimsMenu" },
            },
            {
                path: "claims/portal",
                component: PortalComponent,
                data: { extraParameter: "claimsMenu" },
            },
            {
                path: "claims/susalud",
                component: SusaludComponent,
                data: { extraParameter: "claimsMenu" },
            },                     

            {
                path: "rrhh",
                loadChildren: () => import('../app/pages/rrhh/rrhh.module').then(m => m.RrhhModule),
                // component: CollaboratorsComponent,
                data: { extraParameter: "recursosMenu" },
            },
            {
                path: "report/send",
                component: SendComponent,
                data: { extraParameter: "recursosMenu" },
            },
            {
                path: "encuesta/encuesta",
                component: HomeComponent,
                data: { extraParameter: "encuestaMenu" },
            },
            {
                path: "encuesta/answer",
                component: AnswerComponent,
                data: { extraParameter: "encuestaMenu" },
            },
            {
                path: "encuesta/resultadoencuesta",
                component: ResponseformComponent,
                data: { extraParameter: "encuestaMenu" },
            },
            {
                path: "encuesta/reportencuesta",
                component: ReporteComponent,
                data: { extraParameter: "encuestaMenu" },
            },
            {
                path: "emergencies",
                loadChildren: () => import('../app/pages/emergencies/emergencies.module').then(m => m.EmergenciesModule),
                data: { extraParameter: "emergenciaMenu" },
            },
            {
                path: "hospitalizacion",
                loadChildren: () => import('../app/pages/hospitalization/hospitalization.module').then(m => m.HospitalizationModule),
                data: { extraParameter: "hospitalizacionMenu" },
            },
            {
                path: "consultoriosExternos",
                loadChildren: () => import('../app/pages/external-consultation/external-consultation.module').then(m => m.ExternalConsultationModule),
                data: { extraParameter: "hospitalizacionMenu" },
            },
            {
                path: "comercial/ventas",
                loadChildren: () => import('../app/pages/comercial/comercial.module').then(m => m.ComercialModule),
                data: { extraParameter: "comercialMenu" },
            },
            {
                path: "comercial/programasSalud",
                loadChildren: () => import('../app/pages/comercial/comercial.module').then(m => m.ComercialModule),
                data: { extraParameter: "comercialMenu" },
            },
            {
                path: "suSaludIpress",
                loadChildren: () => import('../app/pages/su-salud-ipress/su-salud-ipress.module').then(m => m.SuSaludIpressModule),
                data: { extraParameter: "suSaludIpressMenu" },
            },
            {
                path: "facturacion",
                loadChildren: () => import('../app/pages/facturacion/facturacion.module').then(m => m.FacturacionModule),
                data: { extraParameter: "facturacionMenu" },
            },
            {
                path: "centroQuirurgico",
                loadChildren: () => import('../app/pages/centro-quirurgico/centro-quirurgico.module').then(m => m.CentroQuirurgicoModule),
                data: { extraParameter: "centroQuirurgicoMenu" },
            },
            {
                path: "laboratorio",
                loadChildren: () => import('../app/pages/laboratorio/laboratorio.module').then(m => m.LaboratorioModule),
                data: { extraParameter: "laboratorioMenu" },
            },
            {
                path: "imagenes",
                loadChildren: () => import('../app/pages/imagenes/imagenes.module').then(m => m.ImagenesModule),
                data: { extraParameter: "imagenesMenu" },
            },
            {
                path: "dashboard-general",
                loadChildren: () => import('../app/pages/dashboard-general/dashboard-general.module').then(m => m.DashboardGeneralModule),
                data: { extraParameter: "dashboardGeneralMenu" },
            },
            {
                path: "tesoreria",
                loadChildren: () => import('../app/pages/tesoreria/tesoreria.module').then(m => m.TesoreriaModule),
                data: { extraParameter: "facturacionMenu" },
            },
            {
                path: "documentosGestion",
                loadChildren: () => import('../app/pages/documentos-gestion/documentos-gestion.module').then(m => m.DocumentosGestionModule),
                data: { extraParameter: "facturacionMenu" },
            },
        ],
    },

    { path: "**", redirectTo: "default" },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: "enabled",
            anchorScrolling: "enabled",
            relativeLinkResolution: "legacy",
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
