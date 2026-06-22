import { create } from "zustand";
import {
  createOpcuaServerNamespaceSlice,
  OpcuaServerNamespaceSlice,
} from "./slices/opcua-server-namespace.slice";
import {
  createOpcuaServerObjectSlice,
  OpcuaServerObjectSlice,
} from "./slices/opcua-server-object.slice";
import {
  createOpcuaServerMethodSlice,
  OpcuaServerMethodSlice,
} from "./slices/opcua-server-method.slice";
import {
  createOpcuaServerInputArgumentSlice,
  OpcuaServerInputArgumentSlice,
} from "./slices/opcua-server-input-argument.slice";
import {
  createOpcuaServerInitSlice,
  OpcuaServerInitSlice,
} from "./slices/opcua-server-init.slice";
import {
  createOpcuaServerStatusSlice,
  OpcuaServerStatusSlice,
} from "./slices/opcua-server-status.slice";

export type OpcuaServerStore = OpcuaServerNamespaceSlice &
  OpcuaServerObjectSlice &
  OpcuaServerMethodSlice &
  OpcuaServerInputArgumentSlice &
  OpcuaServerStatusSlice &
  OpcuaServerInitSlice;

export const useOpcuaServerBound = create<OpcuaServerStore>()((...a) => ({
  ...createOpcuaServerInitSlice(...a),
  ...createOpcuaServerNamespaceSlice(...a),
  ...createOpcuaServerObjectSlice(...a),
  ...createOpcuaServerMethodSlice(...a),
  ...createOpcuaServerInputArgumentSlice(...a),
  ...createOpcuaServerStatusSlice(...a),
}));
