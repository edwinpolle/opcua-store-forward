import { ipcRenderer } from "electron";
import { OpcuaServerStatusDto } from "../dtos/opcua-server-status.dto";

export const opcuaServerUtilityPreloads = {
  startOpcuaServer: (id: string): Promise<void> =>
    ipcRenderer.invoke("startOpcuaServer", id),
  stopOpcuaServer: (id: string): Promise<void> =>
    ipcRenderer.invoke("stopOpcuaServer", id),
  restartOpcuaServer: (id: string): Promise<void> =>
    ipcRenderer.invoke("restartOpcuaServer", id),
  opcuaServerStatus: (callback: (message: OpcuaServerStatusDto) => void) => {
    ipcRenderer.on("opcua-server-status", (_, data) => {
      callback(data);
    });
  },
  getOpcuaServerStatus: (): Promise<OpcuaServerStatusDto[]> =>
    ipcRenderer.invoke("getOpcuaServerStatus"),
};
