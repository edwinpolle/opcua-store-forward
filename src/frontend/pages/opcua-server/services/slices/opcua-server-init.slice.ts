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

    window.api.getOpcuaServerNamespacesByServerId(dto.id).then((namespaces) => {
      namespaces.forEach((n) => {
        get().setNamespace(n);

        window.api.getOpcuaServerObjectsByNamespaceId(n.id).then((objects) => {
          objects.forEach((o) => {
            get().setObject(o);

            window.api.getOpcuaServerMethodsByObjectId(o.id).then((methods) => {
              methods.forEach((m) => {
                get().setMethod(m);

                window.api
                  .getOpcuaServerInputArgumentsByObejectId(m.id)
                  .then((inputArgumets) => {
                    inputArgumets.forEach((i) => {
                      get().setInputArgument(i);
                    });
                  });
              });
            });
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
