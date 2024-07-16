import { environment } from "src/environments/environment";

export class ApiUrl {
  public static UserBaseUrl = environment.apiBaseUrl + 'users';
  public static AuthBaseUrl = environment.apiBaseUrl + 'auth';
  public static InterviewDetails = environment.apiBaseUrl + 'interview-details';
  public static InterviewTravelPartner = environment.apiBaseUrl + 'interview-travel-partners';
  public static State = environment.apiBaseUrl + 'states';
  public static Country = environment.apiBaseUrl + 'countries';
  public static Embassy = environment.apiBaseUrl + 'embassies';
}
