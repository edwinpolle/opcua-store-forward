import { StateCreator } from "zustand";
import { OpcuaServerStore } from "../opcua-server.service";
import { OpcuaServerMethodDto } from "../../../../../backend/models/opcua-server/dtos/opcua-server-method.dto";

export interface OpcuaServerMethodSlice {
  methods: Map<string, OpcuaServerMethodDto>;
  setMethod: (method: OpcuaServerMethodDto) => void;
  getMethodById: (id: string) => OpcuaServerMethodDto | null;
  getMethodByObjectId: (id: string) => OpcuaServerMethodDto[];
  updateMethod: (method: OpcuaServerMethodDto) => void;
  removeMethod: (id: string) => void;
  clearMethods: () => void;
}

export const createOpcuaServerMethodSlice: StateCreator<
  OpcuaServerStore,
  [],
  [],
  OpcuaServerMethodSlice
> = (set, get) => ({
  methods: new Map(),
  setMethod: (method) => {
    const methods = new Map(get().methods);

    methods.set(method.id, method);

    set({ methods });
  },
  getMethodById: (id) => {
    const method = get().methods.get(id);

    if (method) return method;

    return null;
  },
  getMethodByObjectId: (id) => {
    const methods = [...get().methods.values()].filter(
      (v) => v.objectId === id,
    );

    return methods;
  },
  updateMethod: async (method) => {
    const methods = new Map(get().methods);

    methods.set(method.id, method);

    set({ methods });
  },
  removeMethod: (id) => {
    const methods = new Map(get().methods);

    methods.delete(id);

    set({ methods });
  },
  clearMethods: () => {
    const methods = new Map<string, OpcuaServerMethodDto>();

    set({ methods });
  },
});
