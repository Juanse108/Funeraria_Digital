import { DateTime } from 'luxon';

export class Payment {
     id?: number;
     payment_date: DateTime;
     quantity: number;
     payment_type: string;
     discount: number
     subscription_id: number
}
