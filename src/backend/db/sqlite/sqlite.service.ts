import { OpcuaServerConfig } from "../../models/opcua-server/opcua-server-config.entity";
import { app } from "electron";
import path from "path";
import { singleton } from "tsyringe";
import { DataSource } from "typeorm";
import { MsSQLConfig } from "../mssql/models/mssql-config.entity";
import { MySQLConfig } from "../mysql/models/mysql.entity";
import { OpcuaServerMethod } from "../../models/opcua-server/opcua-server-method.entity";
import { OpcuaServerNamespace } from "../../models/opcua-server/opcua-server-namespace.entity";
import { OpcuaServerObject } from "../../models/opcua-server/opcua-server-object.entity";
import { OpcuaServerMethodInputArgument } from "../../models/opcua-server/opcua-server-input-argument.entity";
import { OpcuaServerEntities } from "../../models/opcua-server/opcua-server-entities";
import { BufferEntities } from "../../models/buffer/buffer-entities";

@singleton()
export class SqliteService {
  dataSource: DataSource;

  constructor() {
    console.log("Register sqlite service");

    this.dataSource = new DataSource({
      type: "sqlite",
      database: path.join(app.getPath("userData"), "config.db"),
      synchronize: true,
      entities: [
        MsSQLConfig,
        MySQLConfig,
        ...OpcuaServerEntities,
        ...BufferEntities,
      ],
    });

    this.dataSource.initialize();
  }
}
