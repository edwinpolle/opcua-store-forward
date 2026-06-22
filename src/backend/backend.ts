import { ipcMain, shell } from "electron";
import { MsSQLService } from "./db/mssql/mssql.service";
import { MySQLService } from "./db/mysql/mysql.service";
import { SqliteService } from "./db/sqlite/sqlite.service";
import { OpcuaClientService } from "./opcua/opcua-client/opcua-client.service";
import { OpcuaServerUtilityService } from "./opcua/opcua-server/opcua-server-utility.service";
import { OpcuaServerService } from "./opcua/opcua-server/opcua-server.service";
import { Settings } from "./settings/settings";
import { container } from "tsyringe";

export default class Backend {
  settings: Settings;

  constructor() {
    this.settings = new Settings();

    this.registerServices();

    this.registerHelpers();
  }

  registerServices() {
    container.resolve(OpcuaServerService);
    container.resolve(OpcuaClientService);
    container.resolve(SqliteService);
    container.resolve(MySQLService);
    container.resolve(MsSQLService);
    container.resolve(OpcuaServerUtilityService);
  }

  registerHelpers() {
    ipcMain.on("openExternalLink", (event, url: string) => {
      shell.openExternal(url);
    });
  }
}
