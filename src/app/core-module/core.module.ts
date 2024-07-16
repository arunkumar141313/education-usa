import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { corePipes } from './pipes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FloatingActionMenuModule } from 'ng2-floating-action-menu';
import { VisaCheckListComponent } from './components/visa-check-list/visa-check-list.component';

@NgModule({
  declarations: [
    corePipes,
    VisaCheckListComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    FloatingActionMenuModule,
  ],

  exports: [
    corePipes,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    FloatingActionMenuModule,
    VisaCheckListComponent
  ],

  providers: [
    DatePipe
  ]
})

export class CoreModule { }
