import { ipcMain } from "electron";
import { inject, singleton } from "tsyringe";
import { Repository } from "typeorm";
import { SettingsProfile } from "../models/settings/settings-profile.entity";
import { SqliteService } from "../db/sqlite/sqlite.service";
import { SettingsProfileDto } from "../models/settings/dtos/settings.dto";

@singleton()
export class SettingService {
  settingsRepo: Repository<SettingsProfile>;

  settings!: SettingsProfileDto;

  constructor(@inject(SqliteService) dbService: SqliteService) {
    this.settingsRepo = dbService.dataSource.getRepository(SettingsProfile);

    this.registerHandler();

    this.initSettings();
  }

  async initSettings() {
    const settings = await this.settingsRepo.findOne({
      where: { name: "Default" },
    });

    this.settings = { ...settings! };
  }

  registerHandler() {
    /**Autostart */
    ipcMain.handle(
      "setAutostartState",
      async (_, on: boolean): Promise<boolean> => {
        const result = await this.settingsRepo.update(
          { name: "Default" },
          { autostart: on },
        );

        if (result.affected) {
          return true;
        }
        return false;
      },
    );

    ipcMain.handle("getAutostartState", async (): Promise<boolean> => {
      return this.settings.autostart || false;
    });

    /**Theme */
    ipcMain.handle(
      "setTheme",
      async (_, theme: "light" | "dark"): Promise<boolean> => {
        const result = await this.settingsRepo.update(
          { name: "Default" },
          { theme: theme },
        );

        if (result.affected) {
          return true;
        }
        return false;
      },
    );

    ipcMain.handle("getTheme", async (): Promise<"light" | "dark"> => {
      return this.settings.theme;
    });
  }
}
