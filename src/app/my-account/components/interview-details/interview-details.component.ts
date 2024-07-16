import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LookupConfigurationConstant } from 'src/app/core-module/constants/lookup-configuration.constant';
import { CountryEnum } from 'src/app/core-module/enums/country.enum';
import { FieldNameEnum } from 'src/app/core-module/enums/field-name.enum';
import { InterviewStatusEnum, InterviewTypeEnum } from 'src/app/core-module/enums/lookup-configuration.enum';
import { InterviewDetails } from 'src/app/core-module/interfaces/profile/interview-details.interface';
import { User } from 'src/app/core-module/interfaces/profile/user.interface';
import { AuthService } from 'src/app/core-module/services/auth.service';
import { EmbassyService } from 'src/app/core-module/services/embassy.service';
import { UtilService } from 'src/app/core-module/services/util.service';
import { Embassy } from '../../../core-module/interfaces/geography/embassy.interface';
import { InterviewDetailsService } from '../../../core-module/services/interview-details.service';

@Component({
  selector: 'app-interview-details',
  templateUrl: './interview-details.component.html',
  styleUrls: ['./interview-details.component.scss']
})

export class InterviewDetailsComponent implements OnInit {

  dataProcessed: boolean = false;
  interviewDetailsForm!: FormGroup;
  embassies: Embassy[] = [];
  interviewTypes = LookupConfigurationConstant.INTERVIEW_TYPE;
  interviewStatuses = LookupConfigurationConstant.INTERVIEW_STATUS;
  userInfo!: User;
  userInterviewDetails: InterviewDetails[] = [];
  disableActionButtons: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _embassyService: EmbassyService,
    private _interviewDetailsService: InterviewDetailsService,
    private _authService: AuthService,
    private _utilService: UtilService,
    private _toastr: ToastrService
  ) {
    this.userInfo = this._authService.getUserInfo();
  }

  ngOnInit(): void {
    this.buildForm();
    this.getEmbassies();
    this.getInterviewDetails(this.userInfo)
  }

  private buildForm(): void {
    this.interviewDetailsForm = this._fb.group({
      embassy: [1, [Validators.required]],
      interviewDate: ['', [Validators.required]],
      interviewType: [InterviewTypeEnum.VISA_INTERVIEW, [Validators.required]],
      interviewStatus: [InterviewStatusEnum.NEED_TO_ATTEND, [Validators.required]],
      comments: ['', this._utilService.getValidators(FieldNameEnum.COMMENTS, false)]
    });
    this.disableActionButtons = false;
  }

  private getEmbassies(): void {
    this._embassyService.getEmbassies(CountryEnum.INDIA).subscribe({
      next: (res) => {
        this.embassies = res;
      }
    });
  }

  private getInterviewDetails(userInfo: User) {
    this._interviewDetailsService.getInterviewDetailsByUserId(userInfo.id).subscribe({
      next: (res) => {
        if (res && res.length) {
          this.userInterviewDetails = res;
          this.dataProcessed = true;

          this._utilService.sortByDate(this.userInterviewDetails, FieldNameEnum.INTERVIEW_DATE);
          this._utilService.hideFindPartnersButton(this.userInterviewDetails);
        } else {
          this.userInterviewDetails = [];
        }
      },
      error: () => this.userInterviewDetails = []
    });
  }

  public onInterviewTypeChange(): void {
    this.interviewDetailsForm.controls['interviewStatus'].setValue('');
  }

  public onSubmit(): void {
    if (this.interviewDetailsForm.valid) {
      const interviewDetails: InterviewDetails = this.interviewDetailsForm.getRawValue();
      interviewDetails.interviewDate = this._utilService.localDateToUtcWithTimeZone(interviewDetails.interviewDate);
      if (interviewDetails.id > 0) {
        this.updateInterviewDetails(interviewDetails);
      } else {
        this.addNewInterviewDetails(interviewDetails);
      }
    } else {
      this._utilService.toastValidateInputFields();
      this.interviewDetailsForm.markAllAsTouched();
    }
  }

  private addNewInterviewDetails(interviewDetails: InterviewDetails): void {
    this._interviewDetailsService.addNewInterviewDetails(this.userInfo.id, interviewDetails).subscribe({
      next: (res) => {
        this._toastr.success("Interview details added successfully.");
        this.userInterviewDetails.push(res);
        this.buildForm();
        this._utilService.hideFindPartnersButton(this.userInterviewDetails);
      },
      error: (e) => {
        this._utilService.toastSomethingWentWrong();
      }
    });
  }

  private updateInterviewDetails(interviewDetails: InterviewDetails): void {
    this._interviewDetailsService.updateInterviewDetails(this.userInfo.id, interviewDetails.id, interviewDetails).subscribe({
      next: (res) => {
        this._toastr.success("Interview details updated successfully.");
        const index = this.userInterviewDetails.findIndex((x) => x.id == res.id);
        this.userInterviewDetails.splice(index, 1, res);
        this._utilService.sortByDate(this.userInterviewDetails, FieldNameEnum.INTERVIEW_DATE);
        this.buildForm();
        this._utilService.hideFindPartnersButton(this.userInterviewDetails);
      },
      error: (e) => {
        this._utilService.toastSomethingWentWrong();
      }
    });
  }

  public onEdit(interviewDetails: InterviewDetails): void {
    if (interviewDetails) {
      const interviewDate = this._utilService.utcToLocalDateWithTimeZone(interviewDetails.interviewDate);
      this.interviewDetailsForm = this._fb.group({
        id: [interviewDetails.id],
        embassy: [interviewDetails.embassy, [Validators.required]],
        interviewDate: [interviewDate, [Validators.required]],
        interviewType: [interviewDetails.interviewType, [Validators.required]],
        interviewStatus: [interviewDetails.interviewStatus, [Validators.required]],
        comments: [interviewDetails.comments]
      });
      this.disableActionButtons = true;
      this._utilService.scrollTo("interviewDetailsForm");
    }
  }

  public onDelete(interviewDetails: InterviewDetails): void {
    this.disableActionButtons = true;
    this._interviewDetailsService.deleteInterviewDetails(interviewDetails.id).subscribe({
      next: (res) => {
        if (res) {
          this._toastr.success("Interview details deleted successfully.");
          const index = this.userInterviewDetails.findIndex((x) => x.id == interviewDetails.id);
          this.userInterviewDetails.splice(index, 1);
        } else {
          this._toastr.success("Unable to delete interview details, try again.")
        }
      },
      error: () => {
        this._utilService.toastSomethingWentWrong();
      },
      complete: () => {
        this.disableActionButtons = false;
      }
    });
  }

  cancelEdit(): void {
    this.buildForm();
    this.disableActionButtons = false;
  }

}
