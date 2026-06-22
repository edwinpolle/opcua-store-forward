import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { OpcuaServerObject } from "./opcua-server-object.entity";
import { OpcuaServerMethodInputArgument } from "./opcua-server-input-argument.entity";

@Entity()
export class OpcuaServerMethod {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @CreateDateColumn()
  createAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;

  @DeleteDateColumn()
  deleteAt!: Date;

  @OneToMany(
    () => OpcuaServerMethodInputArgument,
    (opcuaServerMethodInputArgument) => opcuaServerMethodInputArgument.method,
  )
  inputArguments!: OpcuaServerMethodInputArgument[];

  @Column()
  objectId!: string;

  @ManyToOne(
    () => OpcuaServerObject,
    (opcuaServerObject) => opcuaServerObject.methods,
  )
  object!: OpcuaServerObject;
}
