import { Payment } from "./payment.model";

export class Subscription {
    subscription_id?: number;
    id_plan: number;
    customer_id: number;
    payments?: Payment []
}
