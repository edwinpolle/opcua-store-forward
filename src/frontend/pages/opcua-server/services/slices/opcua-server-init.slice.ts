import { StateCreator } from "zustand";
import { OpcuaServerDto } from "../../../../../backend/models/opcua-server/dtos/opcua-server.dto";
import { OpcuaServerStore } from "../opcua-server.service";

export interface OpcuaServerInitSlice {
  opcuaServer: OpcuaServerDto | null;
  init: (dto: OpcuaServerDto) => void;
  updateOpcuaServer: (dto: OpcuaServerDto) => void;
  clear: () => void;
}

export const createOpcuaServerInitSlice: StateCreator<
  OpcuaServerStore,
  [],
  [],
  OpcuaServerInitSlice
> = (set, get) => ({
  opcuaServer: null,
  init: (dto) => {
    get().clear();

    const { namespaces, ...dtoFlat } = dto;

    set({ opcuaServer: dtoFlat });

    namespaces?.forEach((namespace) => {
      const { objects, ...namespaceFlat } = namespace;

      get().setNamespace({ ...namespaceFlat });

      objects?.forEach((object) => {
        const { methods, ...objectFlat } = object;

        get().setObject({ ...objectFlat });

        methods?.forEach((method) => {
          const { inputArguments, ...methodFlat } = method;

          get().setMethod({ ...methodFlat });

          inputArguments?.forEach((inputArgument) => {
            get().setInputArgument(inputArgument);
          });
        });
      });
    });
  },
  updateOpcuaServer: (dto) => {
    set({ opcuaServer: dto });
  },
  clear: () => {
    set({ opcuaServer: null });
    get().clearNamespace();
    get().clearObjects();
    get().clearMethods();
    get().clearInputArguments();
  },
});
