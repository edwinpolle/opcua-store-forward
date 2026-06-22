import { ipcMain } from "electron";

export class Settings {
  autostart: boolean;
  theme: "light" | "dark";

  constructor() {
    this.autostart = false;
    this.theme = "dark";
    this.setHandler();
  }

  setHandler() {
    /**Autostart */
    ipcMain.handle("setAutostartState", (_, on: boolean): boolean => {
      this.autostart = on;
      return true;
    });

    ipcMain.handle("getAutostartState", async (): Promise<boolean> => {
      return this.autostart;
    });

    /**Theme */
    ipcMain.handle("setTheme", (_, theme: "light" | "dark"): boolean => {
      this.theme = theme;
      return true;
    });

    ipcMain.handle("getTheme", async (): Promise<"light" | "dark"> => {
      return this.theme;
    });
  }
}
