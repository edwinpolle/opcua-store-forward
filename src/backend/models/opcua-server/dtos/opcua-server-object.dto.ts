import { OpcuaServerMethodDto } from "./opcua-server-method.dto";

export interface OpcuaServerObjectDto {
  id: string;
  name: string;
  object: string;
  createAt: Date;
  updateAt: Date;
  methods?: OpcuaServerMethodDto[];
  namespaceId: string;
}
