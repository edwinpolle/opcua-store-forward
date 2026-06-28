import { app } from "electron";
import path from "path";
import { singleton } from "tsyringe";
import { DataSource } from "typeorm";
import { MsSQLConfig } from "../mssql/models/mssql-config.entity";
import { MySQLConfig } from "../mysql/models/mysql.entity";
import { OpcuaServerEntities } from "../../models/opcua-server/opcua-server-entities";
import { BufferEntities } from "../../models/buffer/buffer-entities";
import { SettingsEntities } from "../../models/settings/settings-entities";
import { SettingsProfileDto } from "../../models/settings/dtos/settings.dto";
import { CreateSettingsProfile } from "../../models/settings/dtos/create-settings-profile.dto";
import { SettingsProfile } from "../../models/settings/settings-profile.entity";

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
        ...SettingsEntities,
        ...OpcuaServerEntities,
        ...BufferEntities,
      ],
    });
  }

  async initilizeDataSource() {
    try {
      await this.dataSource.initialize();

      await this.seedDefaultValues();
    } catch (error) {
      console.log(error);
    }
  }

  async seedDefaultValues() {
    const repo = this.dataSource.getRepository(SettingsProfile);

    const defaultProfile: CreateSettingsProfile = {
      name: "Default",
      autostart: false,
      theme: "dark",
    };

    const exists = await repo.findOne({ where: { name: "Default" } });

    if (!exists) {
      await repo.save(defaultProfile);
    }
  }
}
