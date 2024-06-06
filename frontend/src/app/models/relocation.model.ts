import { DateTime } from 'luxon';

export class Relocation {

     id_relocation?: number
     id_service: number
     id_driver: number
     departure_date: DateTime
     finish_date?: DateTime
     origin: string
     destiny: string
}
