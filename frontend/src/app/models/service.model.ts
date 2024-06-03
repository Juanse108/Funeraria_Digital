import { Burial } from "./burial.model";
import { Cremation } from "./cremation.model";
import { Relocation } from "./relocation.model";
import { ServiceExecution } from "./service-execution.model";
import { ServicePlan } from "./service-plan.model";

export class Service {
    id_service?: number;
    description: string;
    type_service: string;
    service_executions?: ServiceExecution [];
    service_plans?: ServicePlan [];
    burials?: Burial [];
    cremation?: Cremation [];
    relocation?: Relocation [];
}
