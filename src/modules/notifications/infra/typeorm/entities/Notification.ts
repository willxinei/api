import {
   Column,
   CreateDateColumn,
   Entity,
   ObjectID,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
} from 'typeorm';

@Entity('notification')
export default class Notification {
   @PrimaryGeneratedColumn('uuid')
   id: ObjectID;

   @Column()
   content: string;

   @Column('uuid')
   recipient_id: string;

   @Column({ default: false })
   read: boolean;

   @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;
}
