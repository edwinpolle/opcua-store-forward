export interface CreateOpcuaServerDto {
  name: string;
  port: number;
  runOnStartup: boolean;
  securityMode: string;
  securityPolicy: string;
}
