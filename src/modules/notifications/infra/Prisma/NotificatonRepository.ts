import { PrismaClient, notification } from "@prisma/client";

import ICreateNotificationDTO from "@modules/notifications/dtos/ICreateNotificationDTO";
import INotificationRepository from "@modules/notifications/repositories/INotificationsReposiotry";

export default class NotificationsRepository
   implements INotificationRepository {
   private prisma = new PrismaClient();

   public async create({
      content,
      recipient_id,
   }: ICreateNotificationDTO): Promise<notification> {
      const notifica = await this.prisma.notification.create({
         data: {
            content,
            recipient_id,
         },
      });

      return notifica;
   }
}
