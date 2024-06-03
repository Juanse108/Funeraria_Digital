import { Payment } from "./payment.model";

export class Subscription {
    subscription_id?: number;
    id_plan: number;
    id_customer: number;
    payments?: Payment []
}
