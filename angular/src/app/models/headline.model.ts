import { Beneficiary } from "./beneficiary.model";

export class Headline {
  id?: number;
  name: string;
  email: string;
  password: string;
  beneficiaries?: Beneficiary[];
}
