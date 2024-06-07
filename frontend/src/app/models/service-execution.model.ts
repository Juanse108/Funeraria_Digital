import { Chat } from "./chat.model";
import { CommentRating } from "./comment-rating.model";
import { DateTime } from 'luxon';
import { Customer } from "./customer.model";

export class ServiceExecution {
    service_code?: number;
    id_customer?: number
    id_service: number;
    deceased_location: string;
    start_date: DateTime;
    end_date: DateTime;
    commentRatings? : CommentRating []
    chats?  : Chat
}
