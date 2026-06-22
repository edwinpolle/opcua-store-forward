import { singleton } from "tsyringe";
import mysql, { Pool } from "mysql2";
import { MySQLConfig } from "./models/mysql.entity";

@singleton()
export class MySQLService {
  connections: Map<string, Pool>;

  constructor() {
    console.log("Register mysql service");
    this.connections = new Map<string, Pool>();
  }

  async cretaeInstance(config: MySQLConfig) {
    const conn = await mysql.createPool({
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.username,
    });

    this.connections.set(config.id, conn);
  }
}
