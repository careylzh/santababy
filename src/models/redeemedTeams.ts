import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class RedeemedTeams {
  @PrimaryColumn()
  team_name!: string;

  @Column()
  staff_pass_id!: string;

  @Column()
  redeemed_at!: string; //epoch time
}
