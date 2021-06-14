/* eslint-disable camelcase */
import upload from "@config/upload";
import { Exclude, Expose } from "class-transformer";
import {
   Column,
   CreateDateColumn,
   Entity,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
} from "typeorm";

@Entity("users")
class User {
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @Column()
   name: string;

   @Column()
   email: string;

   @Column()
   telefone: number;

   @Column()
   @Exclude()
   password: string;

   @Column()
   avatar: string;

   @Column()
   prestador: boolean;

   @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;

   @Expose({ name: "avatar_url" })
   getAvatarUrl(): string | null {
      if (!this.avatar) {
         return null;
      }

      switch (upload.driver) {
         case "disk":
            return `${process.env.APP_API_URL}file/${this.avatar}`;
         case "s3":
            return `https://dai-nails.s3.us-east-2.amazonaws.com/${this.avatar}`;
         default:
            return null;
      }
   }
}

export default User;
