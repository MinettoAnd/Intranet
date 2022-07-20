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
                path: "rrhh/collaborators",
                component: CollaboratorsComponent,
                data: { extraParameter: "recursosMenu" },
            },
            {
                path: "report/send",
                component: SendComponent,
                data: { extraParameter: "recursosMenu" },
            },
            {
                path: "encuesta",
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
