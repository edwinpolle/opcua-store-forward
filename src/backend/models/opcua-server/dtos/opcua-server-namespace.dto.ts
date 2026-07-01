import { OpcuaServerObjectDto } from "./opcua-server-object.dto";

export interface OpcuaServerNamespaceDto {
  id: string;
  name: string;
  url: string;
  createAt: Date;
  updateAt: Date;
  serverConfigId: string;
}
