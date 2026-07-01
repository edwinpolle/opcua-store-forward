import { OpcuaServerMethodDto } from "./opcua-server-method.dto";

export interface OpcuaServerObjectDto {
  id: string;
  name: string;
  object: string;
  order: number;
  createAt: Date;
  updateAt: Date;
  namespaceId: string;
}
