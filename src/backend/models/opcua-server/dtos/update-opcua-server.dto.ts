export interface UpdateOpcuaServerDto {
  name?: string;
  port?: number;
  runOnStartup?: boolean;
  securityMode?: string;
  securityPolicy?: string;
}
