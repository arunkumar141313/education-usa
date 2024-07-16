import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CacheKey } from 'src/app/core-module/enums/cache-key.enum';
import { FieldNameEnum } from 'src/app/core-module/enums/field-name.enum';
import { User } from 'src/app/core-module/interfaces/profile/user.interface';
import { AuthService } from 'src/app/core-module/services/auth.service';
import { CacheService } from 'src/app/core-module/services/cache.service';
import { UtilService } from 'src/app/core-module/services/util.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})

export class UserDetailsComponent implements OnInit {

  userDetailsForm!: FormGroup;
  userDetails!: User;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _cacheService: CacheService,
    private _router: Router,
    private _utilService: UtilService,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.userDetailsForm = this._fb.group({
      firstName: ['', this._utilService.getValidators(FieldNameEnum.FIRST_NAME)],
      lastName: ['', this._utilService.getValidators(FieldNameEnum.FIRST_NAME)],
      email: ['', this._utilService.getValidators(FieldNameEnum.EMAIL)],
      phoneNumber: ['', this._utilService.getValidators(FieldNameEnum.PHONE_NUMBER)],
      password: ['', this._utilService.getValidators(FieldNameEnum.PASSWORD)],
      nickName: ['', this._utilService.getValidators(FieldNameEnum.NICK_NAME)],
      sharePhoneNumber: [true, Validators.required],
      shareOnlyNickName: [false, Validators.required]
    });
  }


  public onSubmit(): void {
    if (this.userDetailsForm.valid) {
      this.userDetails = this.userDetailsForm.getRawValue();
      this._authService.register(this.userDetails).subscribe({
        next: (res: User) => {
          if (res) {
            if (res && res.jwt) {
              this._cacheService.setLocal(CacheKey.AUTH_TOKEN, res.jwt);
              this._cacheService.setLocal(CacheKey.USER_INFO, res);
              this._authService.setUserInfo(res);
              this._router.navigate(['my-account', 'interview-details']);
            }
          }
        },
        error: (e) => {
          if (e.error && e.error.emailAlreadyExists) {
            this._toastr.error("Email already taken.");
          } else if (e.error && e.error.phoneNumberAlreadyExists) {
            this._toastr.error("Phone number already taken.");
          } else {
            this._utilService.toastSomethingWentWrong();
          }
        }
      });
    } else {
      this._toastr.error("Validate the input fields.");
      this.userDetailsForm.markAllAsTouched();
    }
  }

}
