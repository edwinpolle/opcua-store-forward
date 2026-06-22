import { OpcuaServerDto } from "../../../../models/opcua-server/dtos/opcua-server.dto";

export type MainToUtilityMessage =
  | { type: "SET_CONFIG"; payload: { config: OpcuaServerDto } }
  | { type: "START_SERVER"; payload: null }
  | { type: "STOP_SERVER"; payload: null };

export type UtilityToMainMessage =
  | { type: "SERVER_READY"; payload: { url: string } }
  | { type: "SERVER_ERROR"; payload: { message: string } }
  | { type: "SERVER_STOPPED"; payload: null }
  | { type: "SERVER_STATUS"; payload: { status: string } }
  | { type: "CLIENT_CONNECTED"; payload: { endpoint: string } }
  | { type: "CLIENT_UPDATE"; payload: { status: string } }
  | { type: "METHOD_CALL"; payload: { message: string } };
