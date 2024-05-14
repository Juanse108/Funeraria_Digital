import { Driver } from "./driver.model";

export class Service {
  id?: number;
  name: string;
  description: string;
  price: number;
  drivers?: Driver[];
}
