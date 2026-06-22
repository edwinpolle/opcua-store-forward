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
import { OpcuaServerConfig } from "./opcua-server-config.entity";
import { OpcuaServerObject } from "./opcua-server-object.entity";

@Entity()
export class OpcuaServerNamespace {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  url!: string;

  @CreateDateColumn()
  createAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;

  @DeleteDateColumn()
  deleteAt!: Date;

  @OneToMany(
    () => OpcuaServerObject,
    (opcuaServerObject) => opcuaServerObject.namespace,
  )
  objects!: OpcuaServerObject[];

  @Column()
  serverConfigId!: string;

  @ManyToOne(
    () => OpcuaServerConfig,
    (opcuaServerConfig) => opcuaServerConfig.namespaces,
  )
  serverConfig!: OpcuaServerConfig;
}
