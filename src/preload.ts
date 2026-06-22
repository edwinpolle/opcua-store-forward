// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { opcuaServerPreloads } from "./backend/opcua/opcua-server/opcua-server.preload";
import { OpcuaServerStatusDto } from "./backend/opcua/opcua-server/dtos/opcua-server-status.dto";
import { opcuaServerUtilityPreloads } from "./backend/opcua/opcua-server/utility/opcua-server-utility.preload";

const listeners = new Set();

contextBridge.exposeInMainWorld("api", {
  setAutostartState: (on: boolean): Promise<boolean> =>
    ipcRenderer.invoke("setAutostartState", on),
  getAutostartState: (): Promise<boolean> =>
    ipcRenderer.invoke("getAutostartState"),
  setTheme: (theme: string): Promise<boolean> =>
    ipcRenderer.invoke("setTheme", theme),
  getTheme: (): Promise<string> => ipcRenderer.invoke("getTheme"),

  openExternalLink: (url: string) => ipcRenderer.send("openExternalLink", url),

  /** 
  opcuaServerStatus(callback: (message: OpcuaServerStatusDto) => void) {
    const listener = (_, message: OpcuaServerStatusDto) => callback(message);

    ipcRenderer.on("opcua-server-status", listener);
    listeners.add(listener);

    return () => {
      ipcRenderer.removeListener("opcua-server-status", listener);
      listeners.delete(listener);
    };
  },
  */

  ...opcuaServerPreloads,
  ...opcuaServerUtilityPreloads,
});
