/* eslint-disable camelcase */
import {
   Column,
   CreateDateColumn,
   Entity,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
} from "typeorm";

@Entity("services")
class Service {
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @Column()
   provider_id: string;

   @Column()
   service: string;

   @Column()
   description: string;

   @Column()
   time: string;

   @Column()
   value: number;

   @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;
}

export default Service;
