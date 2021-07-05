import { notification } from "@prisma/client";
import ICreateNotificationDTO from "../dtos/ICreateNotificationDTO";

export default interface INotification {
   create(data: ICreateNotificationDTO): Promise<notification>;
}
