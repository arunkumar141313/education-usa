import { Pipe, PipeTransform } from "@angular/core";
import { Base } from "../interfaces/base.interface";

@Pipe({
  name: 'idName'
})

export class IdNamePipe implements PipeTransform {
  transform(value: number | undefined, dataList: Base[]) {
    if (dataList && dataList.length) {
      return dataList.find(x => x.id === value)?.name || '';
    }
    return '';
  }
}
