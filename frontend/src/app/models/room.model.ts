import { Burial } from "./burial.model"
import { Cremation } from "./cremation.model"

export class Room {
    id_room?: number
    capacity: number
    chairs_number: number
    id_site_mortuary: number
    burials?: Burial []
    cremations?: Cremation []
}
