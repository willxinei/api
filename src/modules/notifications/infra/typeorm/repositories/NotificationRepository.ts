import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import INotificationRepository from '@modules/notifications/repositories/INotificationsReposiotry';
import { getRepository, Repository } from 'typeorm';
import Notification from '../entities/Notification';

export default class NotificationsRepository
   implements INotificationRepository {
   private ormRepository: Repository<Notification>;

   constructor() {
      this.ormRepository = getRepository(Notification);
   }

   public async create({
      content,
      recipient_id,
   }: ICreateNotificationDTO): Promise<Notification> {
      const notification = this.ormRepository.create({
         content,
         recipient_id,
      });

      await this.ormRepository.save(notification);

      return notification;
   }
}
