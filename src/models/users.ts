import {
  Entity,
  Column,
  PrimaryColumn,
  UpdateDateColumn,
  Timestamp,
} from "typeorm";

@Entity()
export class Users {
  @PrimaryColumn()
  staff_pass_id!: string;

  @Column()
  team_name!: string;

  @Column()
  created_at!: string; //epoch time
}
