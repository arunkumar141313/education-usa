import { NgModule } from '@angular/core';
import { CoreModule } from '../core-module/core.module';
import { sharedComponents } from './components';

@NgModule({
  declarations: [
    sharedComponents,
  ],
  imports: [
    CoreModule
  ],
  exports: [
    sharedComponents
  ]
})
export class SharedModule { }
