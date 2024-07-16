import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ShellComponent } from './components/shell/shell.component';
import { UnAuthorizedComponent } from './components/un-authorized/un-authorized.component';
import { VisaCheckListComponent } from './core-module/components/visa-check-list/visa-check-list.component';
import { UserRoleGuard } from './core-module/guards/user-role.guard';

const routes: Routes = [
  {
    path: "",  pathMatch: "full", component: HomeComponent
  },
  {
    path: "my-account", loadChildren: () => import("./my-account/my-account.module").then(m => m.MyAccountModule),
  },
  {
    path: "find-my-partner", loadChildren: () => import("./find-my-partner/find-my-partner.module").then(m => m.FindMyPartnerModule), canActivate: [UserRoleGuard]
  },
  {
    path: "embassy-consulates", loadChildren: () => import("./embassy/embassy.module").then(m => m.EmbassyModule),
  },
  {
    path: "f1-visa-interview-checklist", component: VisaCheckListComponent
  },
  {
    path: 'un-authorized', component: UnAuthorizedComponent
  },
  {
    path: 'page-not-found', component: PageNotFoundComponent
  },
  {
    path: "**", redirectTo: 'page-not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
