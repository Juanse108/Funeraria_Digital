import { Beneficiary } from "./beneficiary.model";

export class Owner {
    id_owner?: number
    id_customer: number
    active: boolean
    beneficiaries?: Beneficiary []
}
