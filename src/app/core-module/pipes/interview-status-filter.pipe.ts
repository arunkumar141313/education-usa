import { Pipe, PipeTransform } from "@angular/core";
import { InterviewStatusEnum, InterviewTypeEnum } from "../enums/lookup-configuration.enum";
import { Base } from "../interfaces/base.interface";

@Pipe({
  name: 'interviewStatusFilter'
})

export class InterviewStatusFilterPipe implements PipeTransform {
  transform(value: Base[] | undefined, interviewType: InterviewTypeEnum) {
    if (interviewType === InterviewTypeEnum.BIOMETRIC) {
      return value?.filter((x) => (x.id == InterviewStatusEnum.BIOMETRICS_PENDING) || (x.id == InterviewStatusEnum.BIOMETRICS_COMPLETED));
    } else {
      return value?.filter((x) => (x.id !== InterviewStatusEnum.BIOMETRICS_PENDING) && (x.id !== InterviewStatusEnum.BIOMETRICS_COMPLETED));
    }
  }
}
