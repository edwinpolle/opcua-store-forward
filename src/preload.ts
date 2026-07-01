// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { opcuaServerPreloads } from "./backend/opcua/opcua-server/opcua-server.preload";
import { opcuaServerUtilityPreloads } from "./backend/opcua/opcua-server/utility/opcua-server-utility.preload";
import { settingsPreload } from "./backend/settings/settings.preload";

contextBridge.exposeInMainWorld("api", {
  openExternalLink: (url: string) => ipcRenderer.send("openExternalLink", url),
  ...settingsPreload,
  ...opcuaServerPreloads,
  ...opcuaServerUtilityPreloads,
});
