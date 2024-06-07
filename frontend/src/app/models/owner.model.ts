import { Beneficiary } from "./beneficiary.model";
import { Customer } from "./customer.model";

export class Owner {
    id_owner?: number
    id_customer: number
    customer?:Customer
    active: string
    beneficiaries?: Beneficiary []
}
