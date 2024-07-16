import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LookupConfigurationConstant } from 'src/app/core-module/constants/lookup-configuration.constant';
import { CacheKey } from 'src/app/core-module/enums/cache-key.enum';
import { FieldNameEnum } from 'src/app/core-module/enums/field-name.enum';
import { User } from 'src/app/core-module/interfaces/profile/user.interface';
import { AuthService } from 'src/app/core-module/services/auth.service';
import { CacheService } from 'src/app/core-module/services/cache.service';
import { UtilService } from 'src/app/core-module/services/util.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  userInfo!: User;
  userDetailsForm!: FormGroup;
  intakeIds = LookupConfigurationConstant.INTAKE_ID;

  constructor(
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _utilService: UtilService,
    private _toastService: ToastrService,
    private _cacheService: CacheService
  ) { }

  ngOnInit(): void {
    this.userInfo = this._authService.getUserInfo();
    this.buildForm();
  }

  private buildForm(): void {
    if (this.userInfo) {
      this.userDetailsForm = this._fb.group({
        firstName: [this.userInfo.firstName, this._utilService.getValidators(FieldNameEnum.FIRST_NAME)],
        lastName: [this.userInfo.lastName, this._utilService.getValidators(FieldNameEnum.FIRST_NAME)],
        email: [this.userInfo.email, this._utilService.getValidators(FieldNameEnum.EMAIL)],
        password: ['', this._utilService.getValidators(FieldNameEnum.PASSWORD, false)],
        phoneNumber: [this.userInfo.phoneNumber, this._utilService.getValidators(FieldNameEnum.PHONE_NUMBER)],
        nickName: [this.userInfo.nickName, this._utilService.getValidators(FieldNameEnum.NICK_NAME)],
        universityName: [this.userInfo.universityName, this._utilService.getValidators(FieldNameEnum.UNIVERSITY_NAME, false)],
        major: [this.userInfo.major, this._utilService.getValidators(FieldNameEnum.MAJOR, false)],
        intake: [this.userInfo.intake],
        year: [this.userInfo.year, this._utilService.getValidators(FieldNameEnum.YEAR, false)],
        sharePhoneNumber: [this.userInfo.sharePhoneNumber, Validators.required],
        shareOnlyNickName: [this.userInfo.shareOnlyNickName, Validators.required]
      });
    }
  }

  onSubmit(): void {
    if (this.userDetailsForm.valid) {
      const user = this.userDetailsForm.getRawValue();

      this._authService.updateUserInfo(user, this.userInfo.id).subscribe({
        next: (res) => {
          if (res) {
            this._toastService.success("Personal details updated successfully");
            this._cacheService.setLocal(CacheKey.USER_INFO, res);
          }
        },
        error: (e) => {
          if (e.error && e.error.emailAlreadyExists) {
            this._toastService.error("Email already taken.");
          } else if (e.error && e.error.phoneNumberAlreadyExists) {
            this._toastService.error("Phone number already taken.");
          } else {
            this._utilService.toastSomethingWentWrong();
          }
        }
      });
    } else {
      this._utilService.toastValidateInputFields();
    }
  }

}
