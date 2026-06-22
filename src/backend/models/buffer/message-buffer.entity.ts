import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class MessageBuffer {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  payload!: string;

  @Column()
  retryCount!: number;

  @CreateDateColumn()
  createAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;

  @DeleteDateColumn()
  deletaAt!: Date;
}
