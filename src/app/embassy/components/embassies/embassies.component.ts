import { Component, OnInit } from '@angular/core';
import { CountryEnum } from 'src/app/core-module/enums/country.enum';
import { Embassy } from 'src/app/core-module/interfaces/geography/embassy.interface';
import { EmbassyService } from 'src/app/core-module/services/embassy.service';
import { UtilService } from 'src/app/core-module/services/util.service';

@Component({
  selector: 'app-embassies',
  templateUrl: './embassies.component.html',
  styleUrls: ['./embassies.component.scss']
})
export class EmbassiesComponent implements OnInit {

  embassies: Embassy[] = [];

  constructor(
    private _embassyService: EmbassyService,
    private _utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.getEmbassies();
  }

  getEmbassies(): void {
    this._embassyService.getEmbassies(CountryEnum.INDIA).subscribe({
      next: (res) => {
        this.embassies = res;
      },
      error: (e) => {
        this._utilService.toastSomethingWentWrong();
      }
    });
  }

}
