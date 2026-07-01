import { OpcuaServerNamespaceDto } from "./opcua-server-namespace.dto";

export interface OpcuaServerDto {
  id: string;
  name: string;
  port: number;
  runOnStartup: boolean;
  securityMode: string;
  securityPolicy: string;
  createAt: Date;
  updateAt: Date;
}
