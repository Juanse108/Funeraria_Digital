import { Room } from "./room.model"

export class Site {
    id_site_mortuary?: number
    direction: string
    city: string
    phone: string
    rooms_number: number
    office_hours?: string
    rooms?: Room []
}
