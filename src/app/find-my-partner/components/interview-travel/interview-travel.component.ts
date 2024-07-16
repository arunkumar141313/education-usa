import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LookupConfigurationConstant } from 'src/app/core-module/constants/lookup-configuration.constant';
import { CountryEnum } from 'src/app/core-module/enums/country.enum';
import { FieldNameEnum } from 'src/app/core-module/enums/field-name.enum';
import { GenderPreferenceEnum, InterviewStatusEnum } from 'src/app/core-module/enums/lookup-configuration.enum';
import { InterviewTravelPartner } from 'src/app/core-module/interfaces/interview-travel-partner.interface';
import { InterviewDetails } from 'src/app/core-module/interfaces/profile/interview-details.interface';
import { User } from 'src/app/core-module/interfaces/profile/user.interface';
import { AuthService } from 'src/app/core-module/services/auth.service';
import { EmbassyService } from 'src/app/core-module/services/embassy.service';
import { InterviewDetailsService } from 'src/app/core-module/services/interview-details.service';
import { InterviewTravelPartnerService } from 'src/app/core-module/services/interview-travel-partner.service';
import { StateService } from 'src/app/core-module/services/state.service';
import { UtilService } from 'src/app/core-module/services/util.service';
import { Embassy } from '../../../core-module/interfaces/geography/embassy.interface';
import { State } from '../../../core-module/interfaces/geography/state.interface';

@Component({
  selector: 'app-interview-travel',
  templateUrl: './interview-travel.component.html',
  styleUrls: ['./interview-travel.component.scss']
})

export class InterviewTravelComponent implements OnInit {

  dataProcessed: boolean = false;
  embassies: Embassy[] = [];
  states: State[] = [];
  userInterviewDetails: InterviewDetails[] = [];
  userInterviewTravelPartnerPreferences: InterviewTravelPartner[] = [];

  interviewTravelForm!: FormGroup;
  genderPreferences = LookupConfigurationConstant.GENDER_PREFERENCE;
  userInfo!: User;
  userActiveInterviewDetails: InterviewDetails[] = [];
  disableActionButtons: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _stateService: StateService,
    private _embassyService: EmbassyService,
    private _interviewDetailsService: InterviewDetailsService,
    private _authService: AuthService,
    private _interviewTravelPartnerService: InterviewTravelPartnerService,
    private _utilService: UtilService,
    private _toastService: ToastrService
  ) { }

  ngOnInit(): void {
    this.userInfo = this._authService.getUserInfo();
    this.buildForm();
    this.loadBaseConfiguration();
  }

  private loadBaseConfiguration(): void {
    this._stateService.getStatesByCountryId(CountryEnum.INDIA).subscribe({
      next: (res) => {
        this.states = res || [];
        this.getEmbassies();
      }
    });
  }

  private getEmbassies(): void {
    this._embassyService.getEmbassies(CountryEnum.INDIA).subscribe({
      next: (res) => {
        this.embassies = res || [];
        this.getUserInterviewDetails();
      }
    });
  }

  private getUserInterviewDetails(): void {
    this._interviewDetailsService.getInterviewDetailsByUserId(this.userInfo.id).subscribe({
      next: (res) => {
        this.userInterviewDetails = res || [];
        this.dataProcessed = true;
        this.getUserInterviewTravelPartnerPreferences();
      }
    });
  }

  private filterActiveInterviewDetails(ignoreInterviewId: number = 0): void {
    this._utilService.sortByDate(this.userInterviewDetails, FieldNameEnum.INTERVIEW_DATE);
    this.userActiveInterviewDetails = this.userInterviewDetails;
    this._utilService.hideFindPartnersButton(this.userActiveInterviewDetails);
    this.userActiveInterviewDetails = this.userActiveInterviewDetails.filter((x) => {
      if (ignoreInterviewId == x.id) {
        return true;
      }
      if (x.hideFindPartnerButton) {
        return false;
      }
      const currentInterviewTravelPreferenceIndex = this.userInterviewTravelPartnerPreferences.findIndex((y) => y.interviewDetails?.id == x.id && y.rowStatus == 1);
      if (currentInterviewTravelPreferenceIndex > -1) {
        return false;
      }
      return true;
    });
  }

  public getUserInterviewTravelPartnerPreferences() {
    this._interviewTravelPartnerService.getAllInterviewTravelPartnerPreferencesByUserId(this.userInfo.id)
      .subscribe({
        next: (res) => {
          this.userInterviewTravelPartnerPreferences = res || [];
          this.filterActiveInterviewDetails();
          this.mapUserInterviewTravelPartnerPreferences();
        },
        error: () => {
          this._toastService.warning("Unable to fetch your interview travel preferences, refresh page again.")
        }
      });
  }

  private mapUserInterviewTravelPartnerPreferences(): void {
    this._utilService.sortByDate(this.userInterviewTravelPartnerPreferences, FieldNameEnum.TRAVEL_DATE);
    this.userInterviewTravelPartnerPreferences.forEach((travelPreference) => {
      travelPreference.interviewDetails = this.userInterviewDetails.find((interview) =>
        interview.id == travelPreference?.interviewDetails?.id
      );
    });
  }

  private buildForm(): void {
    this.interviewTravelForm = this._fb.group({
      interviewDetailsId: ['', Validators.required],
      genderPreference: [GenderPreferenceEnum.BOTH, Validators.required],
      travelFromState: ['', Validators.required],
      travelFromCity: ['', Validators.required],
      travelDate: ['', Validators.required],
      travelPartnerRequired: [true],
      hasTravelPartner: [false],
      comments: ['', this._utilService.getValidators(FieldNameEnum.COMMENTS, false)],
    });
  }

  public onSubmit(): void {
    if (this.interviewTravelForm.valid) {
      let interviewTravelPartner: InterviewTravelPartner = this.interviewTravelForm.getRawValue();
      let { interviewDetailsId } = this.interviewTravelForm.getRawValue();
      interviewTravelPartner.travelDate = this._utilService.localDateToUtcWithTimeZone(interviewTravelPartner.travelDate);
      if (interviewTravelPartner.id) {
        this.updateInterviewTravelPreference(interviewTravelPartner, interviewDetailsId);
      } else {
        this.addInterviewTravelPreference(interviewTravelPartner, interviewDetailsId);
      }
    } else {
      this._utilService.toastValidateInputFields();
      this.interviewTravelForm.markAllAsTouched();
    }
  }

  private updateInterviewTravelPreference(interviewTravelPartner: InterviewTravelPartner, interviewDetailsId: number) {
    this._interviewTravelPartnerService.updateInterviewTravelPartner(this.userInfo.id, interviewTravelPartner.id, interviewDetailsId, interviewTravelPartner)
      .subscribe({
        next: (res) => {
          if (res && res.id) {
            const index = this.userInterviewTravelPartnerPreferences.findIndex((x) => x.id == interviewTravelPartner.id);
            this.userInterviewTravelPartnerPreferences.splice(index, 1, res);
            this.buildForm();
            this.filterActiveInterviewDetails();
            this.mapUserInterviewTravelPartnerPreferences();
            this.disableActionButtons = false;
            this._toastService.success("Interview travel partner preference updated successfully.");
          }
        },
        error: (e) => {
          this._utilService.toastSomethingWentWrong();
        }
      });
  }

  private addInterviewTravelPreference(interviewTravelPartner: InterviewTravelPartner, interviewDetailsId: number): void {
    this._interviewTravelPartnerService.addInterviewTravelPartner(this.userInfo.id, interviewDetailsId, interviewTravelPartner)
      .subscribe({
        next: (res) => {
          if (res && res.id) {
            this.userInterviewTravelPartnerPreferences.push(res);
            this.mapUserInterviewTravelPartnerPreferences();
            this.buildForm();
            this.filterActiveInterviewDetails();
            this._toastService.success("Interview travel partner preference added successfully.");
          }
        },
        error: (e) => {
          this._utilService.toastSomethingWentWrong();
        }
      });
  }

  onEdit(interviewTravelPartner: InterviewTravelPartner): void {
    const travelDate = this._utilService.utcToLocalDateWithTimeZone(interviewTravelPartner.travelDate);
    this.interviewTravelForm = this._fb.group({
      id: interviewTravelPartner.id,
      interviewDetailsId: [interviewTravelPartner.interviewDetails?.id, Validators.required],
      genderPreference: [interviewTravelPartner.genderPreference, Validators.required],
      travelFromState: [interviewTravelPartner.travelFromState, Validators.required],
      travelFromCity: [interviewTravelPartner.travelFromCity, Validators.required],
      travelDate: [travelDate, Validators.required],
      travelPartnerRequired: [interviewTravelPartner.travelPartnerRequired],
      hasTravelPartner: [interviewTravelPartner.hasTravelPartner],
      comments: [interviewTravelPartner.comments, this._utilService.getValidators(FieldNameEnum.COMMENTS, false)],
    });
    this.disableActionButtons = true;
    this.filterActiveInterviewDetails(interviewTravelPartner.interviewDetails?.id);
  }

  onDelete(interviewTravelPartner: InterviewTravelPartner): void {
    this._interviewTravelPartnerService.deleteInterviewTravelPartner(interviewTravelPartner.id).subscribe({
      next: () => {
        this._toastService.success("Interview travel partner preference deleted.");
        const index = this.userInterviewTravelPartnerPreferences.findIndex((x) => x.id == interviewTravelPartner.id);
        this.userInterviewTravelPartnerPreferences.splice(index, 1);
        this.filterActiveInterviewDetails();
      },
      error: () => {
        this._utilService.toastSomethingWentWrong();
      }
    });
  }

  public cancelEdit(): void {
    this.buildForm();
    this.disableActionButtons = false;
    this.filterActiveInterviewDetails();
  }

}
