import { ServicePlan } from "./service-plan.model"
import { Subscription } from "./subscription.model"

export class Plan {
    id_plan?: number
    name: string
    description: string
    price: number
    number_beneficiaries: number
    serviceplans? : ServicePlan [] 
    subscriptions? : Subscription []
}
