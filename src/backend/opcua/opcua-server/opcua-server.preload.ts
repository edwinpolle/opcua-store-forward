import { ipcRenderer } from "electron";
import { CreateOpcuaServerInputArgumentDto } from "../../models/opcua-server/dtos/create-opcua-server-input-argument.dto";
import { CreateOpcuaServerMethodDto } from "../../models/opcua-server/dtos/create-opcua-server-method.dto";
import { CreateOpcuaServerNamespaceDto } from "../../models/opcua-server/dtos/create-opcua-server-namespace.dto";
import { CreateOpcuaServerObjectDto } from "../../models/opcua-server/dtos/create-opcua-server-object.dto";
import { CreateOpcuaServerDto } from "../../models/opcua-server/dtos/create-opcua-server.dto";
import { OpcuaServerInputArgumentDto } from "../../models/opcua-server/dtos/opcua-server-input-argument.dto";
import { OpcuaServerMethodDto } from "../../models/opcua-server/dtos/opcua-server-method.dto";
import { OpcuaServerNamespaceDto } from "../../models/opcua-server/dtos/opcua-server-namespace.dto";
import { OpcuaServerObjectDto } from "../../models/opcua-server/dtos/opcua-server-object.dto";
import { OpcuaServerDto } from "../../models/opcua-server/dtos/opcua-server.dto";
import { UpdateOpcuaServerMethodDto } from "../../models/opcua-server/dtos/update-opcua-server-method.dto";
import { UpdateOpcuaServerNamespaceDto } from "../../models/opcua-server/dtos/update-opcua-server-namespace.dto";
import { UpdateOpcuaServerObjectDto } from "../../models/opcua-server/dtos/update-opcua-server-object.dto";
import { UpdateOpcuaServerDto } from "../../models/opcua-server/dtos/update-opcua-server.dto";

export const opcuaServerPreloads = {
  getOpcuaServers: (): Promise<OpcuaServerDto[]> =>
    ipcRenderer.invoke("getOpcuaServers"),
  setNewOpcuaServer: (config: CreateOpcuaServerDto): Promise<boolean> =>
    ipcRenderer.invoke("setNewOpcuaServer", config),
  getOpcuaServerById: (id: string): Promise<OpcuaServerDto> =>
    ipcRenderer.invoke("getOpcuaServerById", id),
  updateOpcuaServer: (
    id: string,
    dto: UpdateOpcuaServerDto,
  ): Promise<OpcuaServerDto> =>
    ipcRenderer.invoke("updateOpcuaServer", { id, dto }),
  deleteOpcuaServer: (id: string): Promise<boolean> =>
    ipcRenderer.invoke("deleteOpcuaServer", id),

  /**
   * Namespace
   */
  getOpcuaServerNamespacesByServerId: (
    id: string,
  ): Promise<OpcuaServerNamespaceDto[]> =>
    ipcRenderer.invoke("getOpcuaServerNamespacesByServerId", id),
  createOpcuaServerNamespace: (
    serverId: string,
    dto: CreateOpcuaServerNamespaceDto,
  ): Promise<OpcuaServerNamespaceDto | false> =>
    ipcRenderer.invoke("createOpcuaServerNamespace", { serverId, dto }),
  updateOpcuaServerNamespace: (
    id: string,
    dto: UpdateOpcuaServerNamespaceDto,
  ): Promise<OpcuaServerNamespaceDto> =>
    ipcRenderer.invoke("updateOpcuaServerNamespace", { id, dto }),
  deleteOpcuaServerNamespace: (id: string): Promise<boolean> =>
    ipcRenderer.invoke("deleteOpcuaServerNamespace", id),

  /**
   * Object
   */
  getOpcuaServerObjectsByNamespaceId: (
    id: string,
  ): Promise<OpcuaServerObjectDto[]> =>
    ipcRenderer.invoke("getOpcuaServerObjectsByNamespaceId", id),
  createOpcuaServerObject: (
    namespaceId: string,
    dto: CreateOpcuaServerObjectDto,
  ): Promise<OpcuaServerObjectDto | false> =>
    ipcRenderer.invoke("createOpcuaServerObject", { namespaceId, dto }),
  updateOpcuaServerObject: (
    id: string,
    dto: UpdateOpcuaServerObjectDto,
  ): Promise<OpcuaServerObjectDto> =>
    ipcRenderer.invoke("updateOpcuaServerObject", { id, dto }),
  deleteOpcuaServerObject: (id: string): Promise<boolean> =>
    ipcRenderer.invoke("deleteOpcuaServerObject", id),
  /**
   * Method
   */
  getOpcuaServerMethodsByObjectId: (
    id: string,
  ): Promise<OpcuaServerMethodDto[]> =>
    ipcRenderer.invoke("getOpcuaServerMethodsByObjectId", id),
  createOpcuaServerMethod: (
    objectId: string,
    dto: CreateOpcuaServerMethodDto,
  ): Promise<OpcuaServerMethodDto | false> =>
    ipcRenderer.invoke("createOpcuaServerMethod", { objectId, dto }),
  updateOpcuaServerMethod: (
    id: string,
    dto: UpdateOpcuaServerMethodDto,
  ): Promise<OpcuaServerMethodDto> =>
    ipcRenderer.invoke("updateOpcuaServerMethod", { id, dto }),
  deleteOpcuaServerMethod: (id: string): Promise<boolean> =>
    ipcRenderer.invoke("deleteOpcuaServerMethod", id),
  /**
   * Input Argument
   */
  getOpcuaServerInputArgumentsByObejectId: (
    id: string,
  ): Promise<OpcuaServerInputArgumentDto[]> =>
    ipcRenderer.invoke("getOpcuaServerInputArgumentsByObejectId", id),
  createOpcuaServerInputArgument: (
    methodId: string,
    dto: CreateOpcuaServerInputArgumentDto,
  ): Promise<OpcuaServerInputArgumentDto | false> =>
    ipcRenderer.invoke("createOpcuaServerInputArgument", { methodId, dto }),
  updateOpcuaServerInputArgument: (
    id: string,
    dto: OpcuaServerInputArgumentDto,
  ): Promise<OpcuaServerInputArgumentDto> =>
    ipcRenderer.invoke("updateOpcuaServerInputArgument", { id, dto }),
  deleteOpcuaServerInputArgument: (id: string): Promise<boolean> =>
    ipcRenderer.invoke("deleteOpcuaServerInputArgument", id),
};
