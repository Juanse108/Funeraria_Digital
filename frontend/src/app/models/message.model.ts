import { DateTime } from 'luxon';

export class Message {

     id?: number
     content: string
     date_shipment: DateTime
     read: boolean
     id_chat: number

}
