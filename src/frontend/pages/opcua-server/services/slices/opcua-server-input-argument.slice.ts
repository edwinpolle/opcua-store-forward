import { StateCreator } from "zustand";
import { OpcuaServerStore } from "../opcua-server.service";
import { OpcuaServerInputArgumentDto } from "../../../../../backend/models/opcua-server/dtos/opcua-server-input-argument.dto";

export interface OpcuaServerInputArgumentSlice {
  inputArguments: Map<string, OpcuaServerInputArgumentDto>;
  setInputArgument: (inputArgument: OpcuaServerInputArgumentDto) => void;
  getInputArgumentById: (id: string) => OpcuaServerInputArgumentDto | null;
  getInputArgumetsByMethodId: (id: string) => OpcuaServerInputArgumentDto[];
  updateInputArgument: (inputArgument: OpcuaServerInputArgumentDto) => void;
  removeInputArgument: (id: string) => void;
  clearInputArguments: () => void;
}

export const createOpcuaServerInputArgumentSlice: StateCreator<
  OpcuaServerStore,
  [],
  [],
  OpcuaServerInputArgumentSlice
> = (set, get) => ({
  inputArguments: new Map(),
  setInputArgument: (inputArgument) => {
    const inputArguments = new Map(get().inputArguments);

    inputArguments.set(inputArgument.id, inputArgument);

    set({ inputArguments });
  },
  getInputArgumentById: (id) => {
    const inputArgument = get().inputArguments.get(id);

    if (inputArgument) return inputArgument;

    return null;
  },
  getInputArgumetsByMethodId: (id) => {
    const inputArguments = [...get().inputArguments.values()].filter(
      (v) => v.methodId === id,
    );

    return inputArguments;
  },
  updateInputArgument: async (inputArgument) => {
    const inputArguments = new Map(get().inputArguments);

    inputArguments.set(inputArgument.id, inputArgument);

    set({ inputArguments });
  },
  removeInputArgument: (id) => {
    const inputArguments = new Map(get().inputArguments);

    inputArguments.delete(id);

    set({ inputArguments });
  },
  clearInputArguments: () => {
    const inputArguments = new Map<string, OpcuaServerInputArgumentDto>();

    set({ inputArguments });
  },
});
