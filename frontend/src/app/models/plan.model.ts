import { Subscription } from "rxjs"
import { ServicePlan } from "./service-plan.model"

export class Plan {
    id_plan?: number
    name: string
    description: string
    price: number
    number_beneficiaries: number
    service_plans? : ServicePlan [] 
    subscriptions? : Subscription []
}
