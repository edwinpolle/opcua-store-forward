import { StateCreator } from "zustand";
import { OpcuaServerNamespaceDto } from "../../../../../backend/models/opcua-server/dtos/opcua-server-namespace.dto";
import { OpcuaServerStore } from "../opcua-server.service";

export interface OpcuaServerNamespaceSlice {
  namespaces: Map<string, OpcuaServerNamespaceDto>;
  setNamespace: (namespace: OpcuaServerNamespaceDto) => void;
  updateNamespace: (namespace: OpcuaServerNamespaceDto) => void;
  removeNamespace: (id: string) => void;
  clearNamespace: () => void;
}

export const createOpcuaServerNamespaceSlice: StateCreator<
  OpcuaServerStore,
  [],
  [],
  OpcuaServerNamespaceSlice
> = (set, get) => ({
  namespaces: new Map(),
  setNamespace: (namespace) => {
    const namespaces = new Map(get().namespaces);

    namespaces.set(namespace.id, namespace);

    set({ namespaces });
  },
  updateNamespace: async (namespace) => {
    const namespaces = new Map(get().namespaces);

    namespaces.set(namespace.id, namespace);

    set({ namespaces });
  },
  removeNamespace: (id: string) => {
    const namespaces = new Map(get().namespaces);

    namespaces.delete(id);

    set({ namespaces });
  },
  clearNamespace: () => {
    const namespaces = new Map<string, OpcuaServerNamespaceDto>();
    set({ namespaces });
  },
});
