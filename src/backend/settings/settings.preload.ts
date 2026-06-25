import { ipcRenderer } from "electron";

export const settingsPreload = {
  setAutostartState: (on: boolean): Promise<boolean> =>
    ipcRenderer.invoke("setAutostartState", on),
  getAutostartState: (): Promise<boolean> =>
    ipcRenderer.invoke("getAutostartState"),
  setTheme: (theme: string): Promise<boolean> =>
    ipcRenderer.invoke("setTheme", theme),
  getTheme: (): Promise<string> => ipcRenderer.invoke("getTheme"),
};
