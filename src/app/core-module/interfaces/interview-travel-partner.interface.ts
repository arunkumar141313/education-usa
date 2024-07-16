import { GenderPreferenceEnum, RowStatusEnum } from "../enums/lookup-configuration.enum";
import { InterviewDetails } from "./profile/interview-details.interface";
import { User } from "./profile/user.interface";

export interface InterviewTravelPartner {
  id?: number;
  travelFromState: number;
  travelFromCity: string;
  travelPartnerRequired: boolean;
  hasTravelPartner: boolean;
  travelDate: string;
  comments: string;
  genderPreference: GenderPreferenceEnum;
  rowStatus: RowStatusEnum;
  user: User;
  interviewDetails: InterviewDetails | undefined;
}
