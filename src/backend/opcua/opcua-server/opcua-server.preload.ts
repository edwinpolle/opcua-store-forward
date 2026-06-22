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
  createOpcuaServerNamespace: (
    dto: CreateOpcuaServerNamespaceDto,
  ): Promise<OpcuaServerNamespaceDto | false> =>
    ipcRenderer.invoke("createOpcuaServerNamespace", dto),
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
  createOpcuaServerObject: (
    dto: CreateOpcuaServerObjectDto,
  ): Promise<OpcuaServerObjectDto | false> =>
    ipcRenderer.invoke("createOpcuaServerObject", dto),
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
  createOpcuaServerMethod: (
    dto: CreateOpcuaServerMethodDto,
  ): Promise<OpcuaServerMethodDto | false> =>
    ipcRenderer.invoke("createOpcuaServerMethod", dto),
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
  createOpcuaServerInputArgument: (
    dto: CreateOpcuaServerInputArgumentDto,
  ): Promise<OpcuaServerInputArgumentDto | false> =>
    ipcRenderer.invoke("createOpcuaServerInputArgument", dto),
  updateOpcuaServerInputArgument: (
    id: string,
    dto: OpcuaServerInputArgumentDto,
  ): Promise<OpcuaServerInputArgumentDto> =>
    ipcRenderer.invoke("updateOpcuaServerInputArgument", { id, dto }),
  deleteOpcuaServerInputArgument: (id: string): Promise<boolean> =>
    ipcRenderer.invoke("deleteOpcuaServerInputArgument", id),
};
