import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MySQLConfig {
  @PrimaryGeneratedColumn('uuid')
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
