import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { lookupConstants } from 'src/app/core-module/constants/lookup-configuration.constant';
import { InterviewDetails } from 'src/app/core-module/interfaces/profile/interview-details.interface';
import { Embassy } from '../../../core-module/interfaces/geography/embassy.interface';

@Component({
  selector: 'app-interviews-list',
  templateUrl: './interviews-list.component.html',
  styleUrls: ['./interviews-list.component.scss']
})

export class InterviewsListComponent {

  lookupConstants = lookupConstants;

  @Input() userInterviewDetails: InterviewDetails[] = [];
  @Input() embassies: Embassy[] = [];
  @Input() disableActionButtons: boolean = false;
  @Output() onEditInterviewDetails = new EventEmitter<InterviewDetails>();
  @Output() onDeleteInterviewDetails = new EventEmitter<InterviewDetails>();
  openModal: boolean = false;
  tempInterviewDetails!: InterviewDetails;

  constructor(
    private _router: Router
  ){}
  onEdit(interviewDetails: InterviewDetails): void {
    this.onEditInterviewDetails.emit(interviewDetails);
  }

  onDelete(interviewDetails: InterviewDetails): void {
    this.tempInterviewDetails = interviewDetails;
    this.openModal = true;
  }

  deleteContinue(isDelete: boolean = false): void {
    if (isDelete) {
      this.onDeleteInterviewDetails.emit(this.tempInterviewDetails);
      this.openModal = false;
    } else {
      this.openModal = false;
    }
  }

  findPartners(): void {
   this._router.navigate(['find-my-partner','interview-travel'])
  }
}
