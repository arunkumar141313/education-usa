import { DateTimeZonePipe } from "./date-timezone.pipe";
import { IdNamePipe } from "./id-name.pipe";
import { InterviewStatusFilterPipe } from "./interview-status-filter.pipe";
import { InterviewStatusPipe } from "./interview-status.pipe";
import { SafeContentPipe } from "./safe-content.pipe";

export const corePipes = [
  InterviewStatusPipe,
  InterviewStatusFilterPipe,
  IdNamePipe,
  DateTimeZonePipe,
  SafeContentPipe
]
