import { Relocation } from "./relocation.model"

export class Driver {
    id_driver?: number
    user_id: string
    license: string
    disponibility: string
    years_experience: number
    assigned_vehicle: string
    relocations?: Relocation []
}
