import { CreateOpcuaServerObjectDto } from "../backend/models/opcua-server/dtos/create-opcua-server-object.dto";
import { CreateOpcuaServerNamespaceDto } from "../backend/models/opcua-server/dtos/create-opcua-server-namespace.dto";
import { CreateOpcuaServerDto } from "../backend/models/opcua-server/dtos/create-opcua-server.dto";
import { OpcuaServerDto } from "../backend/models/opcua-server/dtos/opcua-server.dto";
import { CreateOpcuaServerMethodDto } from "../backend/models/opcua-server/dtos/create-opcua-server-method.dto";
import { CreateOpcuaServerInputArgumentDto } from "../backend/models/opcua-server/dtos/create-opcua-server-input-argument.dto";
import { OpcuaServerInputArgumentDto } from "../backend/models/opcua-server/dtos/opcua-server-input-argument.dto";
import { OpcuaServerMethodDto } from "../backend/models/opcua-server/dtos/opcua-server-method.dto";
import { OpcuaServerObjectDto } from "../backend/models/opcua-server/dtos/opcua-server-object.dto";
import { OpcuaServerNamespaceDto } from "../backend/models/opcua-server/dtos/opcua-server-namespace.dto";
import { UpdateOpcuaServerNamespaceDto } from "../backend/models/opcua-server/dtos/update-opcua-server-namespace.dto";
import { UpdateOpcuaServerObjectDto } from "../backend/models/opcua-server/dtos/update-opcua-server-object.dto";
import { UpdateOpcuaServerMethodDto } from "../backend/models/opcua-server/dtos/update-opcua-server-method.dto";
import { UpdateOpcuaServerInputArgumentDto } from "../backend/models/opcua-server/dtos/update-opcua-server-input-argument.dto";
import { OpcuaServerStatusDto } from "../backend/opcua/opcua-server/dtos/opcua-server-status.dto";
import { UpdateOpcuaServerDto } from "../backend/models/opcua-server/dtos/update-opcua-server.dto";

export {};

declare global {
  interface Window {
    api: {
      setAutostartState(on: boolean): Promise<boolean>;
      getAutostartState(): Promise<boolean>;
      setTheme(theme: string): Promise<boolean>;
      getTheme(): Promise<"light" | "dark">;
      /**
       * Helpers
       */
      openExternalLink(url: string): void;
      /**
       * OPC UA Server
       */
      getOpcuaServers(): Promise<OpcuaServerDto[]>;
      setNewOpcuaServer(config: CreateOpcuaServerDto): Promise<boolean>;
      updateOpcuaServer(
        id: string,
        dto: UpdateOpcuaServerDto,
      ): Promise<OpcuaServerDto>;
      deleteOpcuaServer(id: string): Promise<boolean>;
      getOpcuaServerById(id: string): Promise<OpcuaServerDto>;
      opcuaServerStatus(
        callback: (data: { message: OpcuaServerStatusDto }) => void,
      ): () => void;
      getOpcuaServerStatus(): Promise<OpcuaServerStatusDto[]>;
      /**
       * Namespace
       */
      createOpcuaServerNamespace(
        dto: CreateOpcuaServerNamespaceDto,
      ): Promise<OpcuaServerNamespaceDto | false>;
      updateOpcuaServerNamespace(
        id: string,
        dto: UpdateOpcuaServerNamespaceDto,
      ): Promise<OpcuaServerNamespaceDto>;
      deleteOpcuaServerNamespace(id: string): Promise<boolean>;
      /**
       * Object
       */
      createOpcuaServerObject(
        dto: CreateOpcuaServerObjectDto,
      ): Promise<OpcuaServerObjectDto | false>;
      updateOpcuaServerObject(
        id: string,
        dto: UpdateOpcuaServerObjectDto,
      ): Promise<OpcuaServerObjectDto>;
      deleteOpcuaServerObject(id: string): Promise<boolean>;
      /**
       * Method
       */
      createOpcuaServerMethod(
        dto: CreateOpcuaServerMethodDto,
      ): Promise<OpcuaServerMethodDto | false>;
      updateOpcuaServerMethod(
        id: string,
        dto: UpdateOpcuaServerMethodDto,
      ): Promise<OpcuaServerMethodDto>;
      deleteOpcuaServerMethod(id: string): Promise<boolean>;
      /**
       * Input Argument
       */
      createOpcuaServerInputArgument(
        dto: CreateOpcuaServerInputArgumentDto,
      ): Promise<OpcuaServerInputArgumentDto | false>;
      updateOpcuaServerInputArgument(
        id: string,
        dto: UpdateOpcuaServerInputArgumentDto,
      ): Promise<OpcuaServerInputArgumentDto>;
      deleteOpcuaServerInputArgument(id: string): Promise<boolean>;
      /**
       * OPC UA Server Utility
       */
      startOpcuaServer(id: string): Promise<void>;
      stopOpcuaServer(id: string): Promise<void>;
      restartOpcuaServer(id: string): Promise<void>;
    };
  }
}
