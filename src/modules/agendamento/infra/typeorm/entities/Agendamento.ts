/* eslint-disable camelcase */
import { Expose } from "class-transformer";
import Users from "@modules/users/infra/typeorm/entities/Users";
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

   @ManyToOne(() => Users)
   @JoinColumn({ name: "provider_id" })
   provider: Users;

   @Column()
   user_id: string;

   @ManyToOne(() => Users)
   @JoinColumn({ name: "user_id" })
   user: Users;

   @Column()
   service: string;

   @Column()
   user_name: string;

   @Column()
   telefone: number;

   @Column()
   avatar: string;

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

   @Expose({ name: "avatar_url" })
   getAvatarUrl(): string | null {
      return this.avatar
         ? `${process.env.APP_API_URL}file/${this.avatar}`
         : null;
   }
}
