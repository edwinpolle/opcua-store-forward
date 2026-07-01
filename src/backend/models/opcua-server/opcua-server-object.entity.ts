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
import { OpcuaServerNamespace } from "./opcua-server-namespace.entity";
import { OpcuaServerMethod } from "./opcua-server-method.entity";

@Entity()
export class OpcuaServerObject {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  object!: string;

  @Column({ default: 0 })
  order!: number;

  @CreateDateColumn()
  createAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;

  @DeleteDateColumn()
  deleteAt!: Date;

  @OneToMany(
    () => OpcuaServerMethod,
    (opcuaServerMethod) => opcuaServerMethod.object,
  )
  methods!: OpcuaServerMethod[];

  @Column()
  namespaceId!: string;

  @ManyToOne(
    () => OpcuaServerNamespace,
    (opcuaServerNamespace) => opcuaServerNamespace.objects,
  )
  namespace!: OpcuaServerNamespace;
}
