import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CheckList } from '../../interfaces/visa-check-list/check-list.interface';
import { VisaCheckListService } from '../../services/visa-check-list.service';

@Component({
  selector: 'app-visa-check-list',
  templateUrl: './visa-check-list.component.html',
  styleUrls: ['./visa-check-list.component.scss']
})

export class VisaCheckListComponent implements OnInit {

  checkListData: CheckList[] = [];
  errorIds: number[] = [];

  constructor(
    private _visaCheckListService: VisaCheckListService,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this._visaCheckListService.getVisaCheckListData().subscribe({
      next: (res) => {
        this.checkListData = res;
      },
      error: (err) => {
      }
    })
  }


  validateVisaRequirements(groupId: number | undefined): void {
    const group = this.checkListData.find((x) => x.id === groupId);
    this.errorIds = [];
    if (group) {
      if (group.hasSubGroups) {
        group.subCheckList?.forEach((x) => {
          x.items?.forEach((y) => {
            if (y.required) {
              const input: any = document.getElementById(y.id?.toString());
              if (!input.checked) {
                this.errorIds.push(y.id);
              }
            }
          })
        })
      } else {
        group.items?.forEach((z) => {
          if (z.required) {
            const input: any = document.getElementById(z.id?.toString());
            if (!input.checked) {
              this.errorIds.push(z.id);
            }
          }
        });
      }
      if (this.errorIds.length > 0) {
        this._toastr.error("Required document(s) were missing for " + group.group + ", Please verify.");
      } else {
        this._toastr.success("Congratulations 🎉 you have all your documents for " + group.group + ".")
      }
    }
  }

  isError(id: number): boolean {
    return this.errorIds.findIndex((x) => x === id) > -1;
  }

}
