/* eslint-disable camelcase */
import User from "@modules/users/infra/typeorm/entities/Users";
import { Expose } from "class-transformer";
import {
   Column,
   CreateDateColumn,
   Entity,
   JoinColumn,
   JoinTable,
   ManyToOne,
   OneToOne,
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
   user_name: string;

   // @ManyToOne(() => User)
   // @JoinColumn({ name: "avatar" })
   // avatar: string;

   @Column()
   from: number;

   @Column()
   at: number;

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

   // @Expose({ name: "avatar_url" })
   // getAvatarUrl(): string | null {
   //    return this.avatar_url
   //       ? `${process.env.APP_API_URL}file/${this.avatar_url}`
   //       : null;
   // }
}
