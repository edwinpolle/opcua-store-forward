import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MsSQLConfig {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  host!: string;

  @Column()
  port!: number;

  @Column()
  username!: string;

  @Column()
  database!: string;
}
