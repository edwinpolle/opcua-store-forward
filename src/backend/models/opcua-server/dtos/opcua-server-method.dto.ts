import { OpcuaServerInputArgumentDto } from "./opcua-server-input-argument.dto";

export interface OpcuaServerMethodDto {
  id: string;
  name: string;
  description: string;
  order: number;
  createAt: Date;
  updateAt: Date;
  inputArguments?: OpcuaServerInputArgumentDto[];
  objectId: string;
}
