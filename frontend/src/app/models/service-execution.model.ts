import { Chat } from "./chat.model";
import { CommentRating } from "./comment-rating.model";

export class ServiceExecution {
    service_code?: number;
    customer_id: number;
    service_id: number;
    commentRatings? : CommentRating []
    chats?  : Chat
}
