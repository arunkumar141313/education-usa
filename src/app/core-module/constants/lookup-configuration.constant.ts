import { GenderEnum, GenderPreferenceEnum, IntakeIdEnum, InterviewStatusEnum, InterviewTypeEnum } from "../enums/lookup-configuration.enum";
import { Base } from "../interfaces/base.interface";

export class LookupConfigurationConstant {


  public static GENDER_PREFERENCE: Base[] = [
    {
      id: GenderPreferenceEnum.MALE,
      name: "Male"
    },
    {
      id: GenderPreferenceEnum.FEMALE,
      name: "Female"
    },
    {
      id: GenderPreferenceEnum.BOTH,
      name: "Both"
    }
  ];


  public static GENDER: Base[] = [
    {
      id: GenderEnum.MALE,
      name: "Male"
    },
    {
      id: GenderEnum.FEMALE,
      name: "Female"
    },
    {
      id: GenderEnum.OTHER,
      name: "Other"
    }
  ];

  public static INTERVIEW_TYPE: Base[] = [
    {
      id: InterviewTypeEnum.BIOMETRIC,
      name: "Biometric (OFC/VAC)"
    },
    {
      id: InterviewTypeEnum.VISA_INTERVIEW,
      name: "Visa Interview"
    }
  ];

  public static INTERVIEW_STATUS: Base[] = [
    {
      id: InterviewStatusEnum.APPROVED,
      name: "Approved"
    },
    {
      id: InterviewStatusEnum.REJECTED,
      name: "Rejected"
    },
    {
      id: InterviewStatusEnum.ADMINISTRATIVE_PROCESSING,
      name: "Administrative Processing"
    },
    {
      id: InterviewStatusEnum.NEED_TO_ATTEND,
      name: "Need To Attend"
    },
    {
      id: InterviewStatusEnum.BIOMETRICS_COMPLETED,
      name: "Biometric Completed"
    },
    {
      id: InterviewStatusEnum.BIOMETRICS_PENDING,
      name: "Biometric Pending"
    }
  ];

  public static INTAKE_ID: Base[] = [
    {
      id: IntakeIdEnum.FALL,
      name: "Fall"
    },
    {
      id: IntakeIdEnum.SPRING,
      name: "Spring"
    },
    {
      id: IntakeIdEnum.SUMMER,
      name: "Summer"
    }
  ]

}

export const lookupConstants: Base[] = [];
lookupConstants.push(
  ...LookupConfigurationConstant.GENDER,
  ...LookupConfigurationConstant.GENDER_PREFERENCE,
  ...LookupConfigurationConstant.INTERVIEW_TYPE,
  ...LookupConfigurationConstant.INTERVIEW_STATUS,
);
