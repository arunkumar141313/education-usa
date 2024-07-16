import { NgModule } from '@angular/core';
import { CoreModule } from '../core-module/core.module';
import { SharedModule } from '../shared-module/shared.module';
import { interviewTravelComponents } from './components';
import { FindMyPartnerRoutingModule } from './find-my-partner-routing.module';

@NgModule({
  declarations: [
    interviewTravelComponents
  ],
  imports: [
    CoreModule,
    FindMyPartnerRoutingModule,
    SharedModule
  ],
  exports: [

  ]
})
export class FindMyPartnerModule { }
