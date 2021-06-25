import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class RedeemedTeams {
  @PrimaryColumn()
  team_name!: string;

  @Column()
  redeemed_by!: string; //staff_pass_id

  @Column()
  redeemed_at!: Date; //epoch date
}
