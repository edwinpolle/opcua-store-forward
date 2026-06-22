import { StateCreator } from "zustand";
import { OpcuaServerStore } from "../opcua-server.service";
import { OpcuaServerObjectDto } from "../../../../../backend/models/opcua-server/dtos/opcua-server-object.dto";

export interface OpcuaServerObjectSlice {
  objects: Map<string, OpcuaServerObjectDto>;
  setObject: (object: OpcuaServerObjectDto) => void;
  getObjectById: (id: string) => OpcuaServerObjectDto | null;
  getObjectsByNamespaceId: (id: string) => OpcuaServerObjectDto[];
  updateObject: (object: OpcuaServerObjectDto) => void;
  removeObject: (id: string) => void;
  clearObjects: () => void;
}

export const createOpcuaServerObjectSlice: StateCreator<
  OpcuaServerStore,
  [],
  [],
  OpcuaServerObjectSlice
> = (set, get) => ({
  objects: new Map(),
  setObject: (object) => {
    const objects = new Map(get().objects);

    objects.set(object.id, object);

    set({ objects });
  },
  getObjectById: (id) => {
    const object = get().objects.get(id);

    if (object) return object;

    return null;
  },
  getObjectsByNamespaceId: (id) => {
    const objects = [...get().objects.values()].filter(
      (v) => v.namespaceId === id,
    );

    return objects;
  },
  updateObject: async (object) => {
    const objects = new Map(get().objects);

    objects.set(object.id, object);

    set({ objects });
  },
  removeObject: (id) => {
    const objects = new Map(get().objects);

    objects.delete(id);

    set({ objects });
  },
  clearObjects: () => {
    const objects = new Map<string, OpcuaServerObjectDto>();

    set({ objects });
  },
});
