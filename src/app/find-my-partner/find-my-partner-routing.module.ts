import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterviewTravelComponent } from './components/interview-travel/interview-travel.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'interview-travel', pathMatch: 'full'
  },
  {
    path: 'interview-travel', component: InterviewTravelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FindMyPartnerRoutingModule { }
