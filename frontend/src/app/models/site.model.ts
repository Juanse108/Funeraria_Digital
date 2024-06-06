import { Room } from "./room.model"

export class Site {
    id_site_mortuary?: number
    direction: string
    city: string
    phone: number
    rooms_number: number
    office_hour?: string
    rooms?: Room []
}
