import { InterviewStatusEnum, InterviewTypeEnum, RowStatusEnum } from "src/app/core-module/enums/lookup-configuration.enum";
import { User } from "./user.interface";

export interface InterviewDetails {
  id: number;
  embassy: number;
  interviewType: InterviewTypeEnum;
  interviewDate: Date | string;
  interviewStatus: InterviewStatusEnum;
  comments: string;
  rowStatus: RowStatusEnum;
  user: User;
  hideFindPartnerButton: boolean;
}
