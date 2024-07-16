import { CheckListItem } from "./check-list-item.interface";

export interface CheckList {
  id: number;
  group: string;
  items?: CheckListItem[];
  hasSubGroups: boolean;
  subCheckList?: CheckList[];
}
