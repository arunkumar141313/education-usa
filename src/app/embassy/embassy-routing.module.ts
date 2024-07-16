import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmbassiesComponent } from './components/embassies/embassies.component';
import { EmbassyItemComponent } from './components/embassy-item/embassy-item.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'india'
  },
  {
    path: 'india', children: [
      {
        path: '', pathMatch: 'full', component: EmbassiesComponent
      },
      {
        path: ':embassy-name', component: EmbassyItemComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmbassyRoutingModule { }
