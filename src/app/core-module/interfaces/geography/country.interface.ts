import { State } from "./state.interface";

export interface Country {
  id?: number;
  name: string;
  url: string;
  states: State[];
}
