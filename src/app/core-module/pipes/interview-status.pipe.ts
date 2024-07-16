import { Pipe, PipeTransform } from "@angular/core";
import { LookupConfigurationConstant } from "../constants/lookup-configuration.constant";
import { InterviewStatusEnum } from "../enums/lookup-configuration.enum";

@Pipe({
  name: 'interviewStatus'
})

export class InterviewStatusPipe implements PipeTransform {
  transform(value: number | undefined) {
    let status = LookupConfigurationConstant.INTERVIEW_STATUS.find(x => x.id === value)?.name || '';

    switch (value) {
      case InterviewStatusEnum.APPROVED:
        status = status + ' 🎉';
        break;
      case InterviewStatusEnum.ADMINISTRATIVE_PROCESSING:
        status = status + ' ⌛';
        break;
      case InterviewStatusEnum.NEED_TO_ATTEND:
        status = status + ' 🤼';
        break;
      case InterviewStatusEnum.BIOMETRICS_COMPLETED:
        status = status + ' 🤞';
        break;
        case InterviewStatusEnum.BIOMETRICS_PENDING:
        status = status + ' 🤲';
        break;
      case InterviewStatusEnum.REJECTED:
        status = status + ' 🚫';
        break;
    }
    return status;
  }
}
