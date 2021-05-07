import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';
import Notification from '../infra/typeorm/entities/Notification';

export default interface INotification {
   create(data: ICreateNotificationDTO): Promise<Notification>;
}
