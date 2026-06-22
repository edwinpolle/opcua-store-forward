import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { OpcuaServerNamespace } from "./opcua-server-namespace.entity";

@Entity()
export class OpcuaServerConfig {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  port!: number;

  @Column()
  runOnStartup!: boolean;

  @Column()
  securityMode!: string;

  @Column()
  securityPolicy!: string;

  @CreateDateColumn()
  createAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;

  @DeleteDateColumn()
  deletaAt!: Date;

  @OneToMany(() => OpcuaServerNamespace, (namespace) => namespace.serverConfig)
  namespaces!: OpcuaServerNamespace[];
}
