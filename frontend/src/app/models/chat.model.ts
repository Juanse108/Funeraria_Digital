import { Message } from "./message.model"

export class Chat {
     id_chat: number
     service_code: number
     content: string
     chat_status: string
     messages? : Message []

}
