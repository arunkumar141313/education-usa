import { City } from "./city.interface";

export interface State {
  id?: number;
  name: string;
  cities?: City[];
}
