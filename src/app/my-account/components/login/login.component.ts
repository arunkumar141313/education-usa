import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CacheKey } from 'src/app/core-module/enums/cache-key.enum';
import { FieldNameEnum } from 'src/app/core-module/enums/field-name.enum';
import { AuthService } from 'src/app/core-module/services/auth.service';
import { CacheService } from 'src/app/core-module/services/cache.service';
import { UtilService } from 'src/app/core-module/services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _utilService: UtilService,
    private _router: Router,
    private _cacheService: CacheService,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.loginForm = this._fb.group({
      email: ['', this._utilService.getValidators(FieldNameEnum.EMAIL)],
      password: ['', this._utilService.getValidators(FieldNameEnum.PASSWORD)],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginInfo = this.loginForm.getRawValue();
      this._authService.login(loginInfo).subscribe({
        next: (res) => {
          if (res && res.jwt) {
            this._cacheService.setLocal(CacheKey.AUTH_TOKEN, res.jwt);
            this._cacheService.setLocal(CacheKey.USER_INFO, res);
            this._authService.setUserInfo(res);
            this._router.navigate(['my-account/interview-details']);
          }
        },
        error: (e) => {
          this.loginForm.controls['password'].setValue('');
          if (e.status == 401) {
            this._toastr.error("Incorrect email or password.");
          } else {
            this._utilService.toastSomethingWentWrong();
          }
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
