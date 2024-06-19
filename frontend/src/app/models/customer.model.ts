import { DateTime } from 'luxon';
import { ServiceExecution } from './service-execution.model';
import { Subscription } from './subscription.model';
import { Beneficiary } from './beneficiary.model';
import { Owner } from './owner.model';
import { User } from './user.model';

export class Customer {
    id_customer?: number;
    user_id?: string;
    registration_date?: DateTime;
    status?: string;
    user?: User
    service_executions? : ServiceExecution [] ;
    subscriptions? : Subscription [];
    owners? : Owner [];
    beneficiaries?: Beneficiary []
}
