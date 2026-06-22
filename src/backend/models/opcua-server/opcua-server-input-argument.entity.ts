import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { OpcuaServerMethod } from "./opcua-server-method.entity";

@Entity()
export class OpcuaServerMethodInputArgument {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ default: "Boolean" })
  dataType!: string;

  @Column({ default: 0 })
  order!: number;

  @CreateDateColumn()
  createAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;

  @DeleteDateColumn()
  deleteAt!: Date;

  @Column()
  methodId!: string;

  @ManyToOne(
    () => OpcuaServerMethod,
    (opcuaServerMethod) => opcuaServerMethod.inputArguments,
  )
  method!: OpcuaServerMethod;
}
