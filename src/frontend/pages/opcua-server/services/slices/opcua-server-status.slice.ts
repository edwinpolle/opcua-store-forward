import { StateCreator } from "zustand";
import { OpcuaServerStatusDto } from "../../../../../backend/opcua/opcua-server/dtos/opcua-server-status.dto";
import { OpcuaServerStore } from "../opcua-server.service";

export interface OpcuaServerStatusSlice {
  initilized: boolean;
  servers: Map<string, OpcuaServerStatusDto>;
  initStatus: () => void;
  getLastStatus: () => void;
  getStatus: (id: string) => string | undefined;
}

export const createOpcuaServerStatusSlice: StateCreator<
  OpcuaServerStore,
  [],
  [],
  OpcuaServerStatusSlice
> = (set, get) => ({
  initilized: false,
  servers: new Map<string, OpcuaServerStatusDto>(),
  initStatus: () => {
    if (get().initilized) return;

    set({ initilized: true });

    window.api.opcuaServerStatus((status) => {
      const stats = new Map(get().servers);

      stats.set(status.message.id, status.message);

      set({ servers: stats });
    });
  },
  getLastStatus: () => {
    window.api.getOpcuaServerStatus().then((data) => {
      const stats = new Map(get().servers);
      data.forEach((v) => {
        stats.set(v.id, v);
      });

      set({ servers: stats });
    });
  },
  getStatus: (id) => {
    return get().servers.get(id)?.status;
  },
});
