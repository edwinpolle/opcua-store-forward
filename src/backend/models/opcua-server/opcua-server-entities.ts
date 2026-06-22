import { OpcuaServerConfig } from "./opcua-server-config.entity";
import { OpcuaServerMethodInputArgument } from "./opcua-server-input-argument.entity";
import { OpcuaServerMethod } from "./opcua-server-method.entity";
import { OpcuaServerNamespace } from "./opcua-server-namespace.entity";
import { OpcuaServerObject } from "./opcua-server-object.entity";

export const OpcuaServerEntities = [
  OpcuaServerConfig,
  OpcuaServerNamespace,
  OpcuaServerObject,
  OpcuaServerMethod,
  OpcuaServerMethodInputArgument,
];
