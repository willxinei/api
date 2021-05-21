import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("bloqueio")
export default class bloqueio {
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @Column()
   provider_id: string;

   @Column()
   from: string;

   @Column()
   at: string;

   @Column()
   dia: number;

   @Column()
   mes: number;
}
