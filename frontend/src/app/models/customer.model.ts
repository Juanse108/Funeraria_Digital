import { DateTime } from 'luxon';
import { ServiceExecution } from './service-execution.model';
import { Subscription } from './subscription.model';

export class Customer {
    id?: number;
    user_id: string;
    registration_date: DateTime;
    status: string;
    service_executions? : ServiceExecution [] ;
    subscriptions? : Subscription []
    // owners? : Owner []
    // beneficiaries  : Beneficiary []
}
