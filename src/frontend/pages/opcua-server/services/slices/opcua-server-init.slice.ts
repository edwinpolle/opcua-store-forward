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

    set({ opcuaServer: dto });

    dto.namespaces.forEach((namespace) => {
      get().setNamespace(namespace);

      namespace.objects.forEach((object) => {
        get().setObject(object);

        object.methods.forEach((method) => {
          get().setMethod(method);

          method.inputArguments.forEach((inputArgument) => {
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
