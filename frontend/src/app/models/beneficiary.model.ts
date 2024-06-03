import { DateTime } from 'luxon';
export class Beneficiary {
    id: number;
    id_customer: number;
    id_owner: number;
    relationship_account_owner: string;
    start_date: DateTime;
    end_date?: DateTime;
}
