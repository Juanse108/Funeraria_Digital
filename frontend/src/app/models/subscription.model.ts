import { Payment } from "./payment.model";
import { DateTime } from 'luxon';

export class Subscription {
    subscription_id?: number;
    id_plan: number;
    id_customer: number;
    start_date: DateTime;
    end_date:DateTime;
    payments?: Payment []
}
