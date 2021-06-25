import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Users {
  @PrimaryColumn()
  staff_pass_id!: string;

  @Column()
  team_name!: string;

  @Column()
  createdAt!: Date;
}
