import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core-module/core.module';
import { embassyComponents } from './components';
import { EmbassyRoutingModule } from './embassy-routing.module';

@NgModule({
  declarations: [
    embassyComponents
  ],
  imports: [
    CommonModule,
    CoreModule,
    EmbassyRoutingModule
  ]
})

export class EmbassyModule { }
