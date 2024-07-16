import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { lookupConstants } from 'src/app/core-module/constants/lookup-configuration.constant';
import { Base } from 'src/app/core-module/interfaces/base.interface';
import { Embassy } from 'src/app/core-module/interfaces/geography/embassy.interface';
import { State } from 'src/app/core-module/interfaces/geography/state.interface';
import { InterviewTravelPartner } from 'src/app/core-module/interfaces/interview-travel-partner.interface';
import { User } from 'src/app/core-module/interfaces/profile/user.interface';
import { InterviewTravelPartnerService } from 'src/app/core-module/services/interview-travel-partner.service';
import { UtilService } from 'src/app/core-module/services/util.service';

@Component({
  selector: 'app-interview-travel-partner-preference-list',
  templateUrl: './interview-travel-partner-preference-list.component.html',
  styleUrls: ['./interview-travel-partner-preference-list.component.scss']
})

export class InterviewTravelPartnerPreferenceListComponent {

  lookupConstants: Base[] = lookupConstants;
  disableCheckbox: boolean = false;
  tempInterviewTravelPartner!: InterviewTravelPartner;
  openConfirmationModal: boolean = false;
  openPartnersModal: boolean = false;
  matchedInterviewTravelPartners: InterviewTravelPartner[] = [];

  @Input() userInfo!: User;
  @Input() interviewTravelPartnerPreferences: InterviewTravelPartner[] = [];
  @Input() states: State[] = [];
  @Input() embassies: Embassy[] = [];
  @Input() disableActionButtons: boolean = false;
  @Output() onEditInterviewTravelPartner = new EventEmitter<InterviewTravelPartner>();
  @Output() onDeleteInterviewTravelPartner = new EventEmitter<InterviewTravelPartner>();

  constructor(
    private _interviewTravelPartnerService: InterviewTravelPartnerService,
    private _toastr: ToastrService,
    private _utilService: UtilService
  ) {
  }

  public changePreference(event: any, interviewTravelPartner: InterviewTravelPartner, key: string): void {
    if (interviewTravelPartner.id) {
      this.disableCheckbox = true;
      this._interviewTravelPartnerService.changePartnerPreference(interviewTravelPartner?.id, key, (event.target.checked) ? 'true' : 'false').subscribe({
        next: (res) => {
        },
        error: () => {
          event.target.checked = !event.target.checked;
        },
        complete: () => {
          this.disableCheckbox = false;
        }
      });
    }
  }

  onEdit(interviewTravelPartner: InterviewTravelPartner): void {
    this.onEditInterviewTravelPartner.emit(interviewTravelPartner);
  }

  onDelete(interviewTravelPartner: InterviewTravelPartner): void {
    this.tempInterviewTravelPartner = interviewTravelPartner;
    this.openConfirmationModal = true;
  }

  deleteContinue(isDelete: boolean = false): void {
    if (isDelete) {
      this.onDeleteInterviewTravelPartner.emit(this.tempInterviewTravelPartner);
      Object.assign(this.tempInterviewTravelPartner, null);
      this.openConfirmationModal = false;
    } else {
      this.openConfirmationModal = false;
    }
  }

  onFindPartners(interviewTravelPartner: InterviewTravelPartner): void {
    // TODO: implement find partners
    return;
    this.tempInterviewTravelPartner = interviewTravelPartner;
    this.matchedInterviewTravelPartners = [];
    this._interviewTravelPartnerService.findPartnersForInterviewTravel(interviewTravelPartner.id, this.userInfo.id).subscribe({
      next: (res) => {
        if (res && res.length) {
          this.matchedInterviewTravelPartners = res;
          this.openPartnersModal = true;
        } else {
          this._toastr.warning("No partners found for your interview, try after sometime.")
        }
      },
      error: () => {
        this._utilService.toastSomethingWentWrong();
      },
      complete: () => {
        Object.assign(this.tempInterviewTravelPartner, null);
      }
    });
  }

}
