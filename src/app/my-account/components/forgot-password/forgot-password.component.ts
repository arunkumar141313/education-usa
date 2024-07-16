import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FieldNameEnum } from 'src/app/core-module/enums/field-name.enum';
import { AuthService } from 'src/app/core-module/services/auth.service';
import { UtilService } from 'src/app/core-module/services/util.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _utilService: UtilService,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.forgotPasswordForm = this._fb.group({
      email: ['', this._utilService.getValidators(FieldNameEnum.EMAIL)],
      newPassword: [''],
      otp: [''],
      iHaveOtp: ['']
    });
  }

  onSubmit(): void {

  }

}
