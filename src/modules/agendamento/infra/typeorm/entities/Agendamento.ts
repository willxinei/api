/* eslint-disable camelcase */
import User from "@modules/users/infra/typeorm/entities/Users";
import {
   Column,
   CreateDateColumn,
   Entity,
   JoinColumn,
   ManyToOne,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
} from "typeorm";

@Entity("agendamentos")
export default class Agendamentos {
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @Column()
   provider_id: string;

   @ManyToOne(() => User)
   @JoinColumn({ name: "provider_id" })
   provider: User;

   @Column()
   user_id: string;

   @ManyToOne(() => User)
   @JoinColumn({ name: "user_id" })
   user: User;

   @Column()
   service: string;

   @Column()
   from: string;

   @Column()
   at: string;

   @Column()
   dia: number;

   @Column()
   mes: number;

   @Column()
   ano: number;

   @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;
}
