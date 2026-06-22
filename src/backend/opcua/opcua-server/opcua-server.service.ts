import { OpcuaServerConfig } from "../../models/opcua-server/opcua-server-config.entity";
import { SqliteService } from "../../../backend/db/sqlite/sqlite.service";
import { inject, singleton } from "tsyringe";
import { Repository } from "typeorm";
import { ipcMain } from "electron";
import { CreateOpcuaServerDto } from "../../models/opcua-server/dtos/create-opcua-server.dto";
import { CreateOpcuaServerNamespaceDto } from "../../models/opcua-server/dtos/create-opcua-server-namespace.dto";
import { OpcuaServerNamespace } from "../../models/opcua-server/opcua-server-namespace.entity";
import { CreateOpcuaServerObjectDto } from "../../models/opcua-server/dtos/create-opcua-server-object.dto";
import { OpcuaServerObject } from "../../models/opcua-server/opcua-server-object.entity";
import { OpcuaServerMethod } from "../../models/opcua-server/opcua-server-method.entity";
import { CreateOpcuaServerMethodDto } from "../../models/opcua-server/dtos/create-opcua-server-method.dto";
import { OpcuaServerMethodInputArgument } from "../../models/opcua-server/opcua-server-input-argument.entity";
import { UpdateOpcuaServerNamespaceDto } from "../../models/opcua-server/dtos/update-opcua-server-namespace.dto";
import { UpdateOpcuaServerObjectDto } from "../../models/opcua-server/dtos/update-opcua-server-object.dto";
import { UpdateOpcuaServerMethodDto } from "../../models/opcua-server/dtos/update-opcua-server-method.dto";
import { UpdateOpcuaServerInputArgumentDto } from "../../models/opcua-server/dtos/update-opcua-server-input-argument.dto";
import { UpdateOpcuaServerDto } from "../../models/opcua-server/dtos/update-opcua-server.dto";

@singleton()
export class OpcuaServerService {
  configRepo: Repository<OpcuaServerConfig>;
  namespaceRepo: Repository<OpcuaServerNamespace>;
  objectRepo: Repository<OpcuaServerObject>;
  methodrepo: Repository<OpcuaServerMethod>;
  inputArgumentRepo: Repository<OpcuaServerMethodInputArgument>;

  constructor(@inject(SqliteService) dbService: SqliteService) {
    this.configRepo = dbService.dataSource.getRepository(OpcuaServerConfig);

    this.namespaceRepo =
      dbService.dataSource.getRepository(OpcuaServerNamespace);

    this.objectRepo = dbService.dataSource.getRepository(OpcuaServerObject);

    this.methodrepo = dbService.dataSource.getRepository(OpcuaServerMethod);

    this.inputArgumentRepo = dbService.dataSource.getRepository(
      OpcuaServerMethodInputArgument,
    );

    console.log("Register opcua server service");

    this.registerHandler();
  }

  registerHandler() {
    ipcMain.handle("getOpcuaServers", async () => {
      return this.configRepo.find();
    });

    ipcMain.handle(
      "setNewOpcuaServer",
      async (_, config: CreateOpcuaServerDto) => {
        const result = await this.configRepo.insert(config);

        return result ? true : false;
      },
    );

    ipcMain.handle(
      "updateOpcuaServer",
      async (_, { id, dto }: { id: string; dto: UpdateOpcuaServerDto }) => {
        const result = await this.configRepo.update({ id: id }, { ...dto });

        return await this.configRepo.findOne({ where: { id: id } });
      },
    );

    ipcMain.handle("deleteOpcuaServer", async (_, id: string) => {
      const result = await this.configRepo.softDelete({ id: id });

      return result.affected ? true : false;
    });

    ipcMain.handle("getOpcuaServerById", async (_, id: string) => {
      console.log(id);
      return this.configRepo.findOne({
        where: { id: id },
        relations: {
          namespaces: { objects: { methods: { inputArguments: true } } },
        },
      });
    });

    ipcMain.handle(
      "createOpcuaServerNamespace",
      async (_, dto: CreateOpcuaServerNamespaceDto) => {
        const result = await this.namespaceRepo.insert(dto);

        if (result.identifiers.length > 0) {
          const namespace = await this.namespaceRepo.findOne({
            where: { id: result.identifiers[0].id },
          });

          return namespace;
        }

        return false;
      },
    );

    ipcMain.handle(
      "updateOpcuaServerNamespace",
      async (
        _,
        { id, dto }: { id: string; dto: UpdateOpcuaServerNamespaceDto },
      ) => {
        console.log(id, dto);

        const result = await this.namespaceRepo.update({ id: id }, { ...dto });

        return await this.namespaceRepo.findOne({ where: { id: id } });
      },
    );

    ipcMain.handle("deleteOpcuaServerNamespace", async (_, id: string) => {
      const result = await this.namespaceRepo.softDelete({ id: id });

      if (result.affected) {
        return true;
      }

      return false;
    });

    ipcMain.handle(
      "createOpcuaServerObject",
      async (_, dto: CreateOpcuaServerObjectDto) => {
        const result = await this.objectRepo.insert(dto);

        if (result.identifiers.length > 0) {
          const object = await this.objectRepo.findOne({
            where: { id: result.identifiers[0].id },
          });

          return object;
        }

        return false;
      },
    );

    ipcMain.handle(
      "updateOpcuaServerObject",
      async (
        _,
        { id, dto }: { id: string; dto: UpdateOpcuaServerObjectDto },
      ) => {
        const result = await this.objectRepo.update({ id: id }, { ...dto });

        return await this.objectRepo.findOne({
          where: { id: id },
        });
      },
    );

    ipcMain.handle("deleteOpcuaServerObject", async (_, id: string) => {
      const result = await this.objectRepo.softDelete({ id: id });

      if (result.affected) return true;

      return false;
    });

    ipcMain.handle(
      "createOpcuaServerMethod",
      async (_, dto: CreateOpcuaServerMethodDto) => {
        const result = await this.methodrepo.insert(dto);

        if (result.identifiers.length > 0) {
          const method = await this.methodrepo.findOne({
            where: { id: result.identifiers[0].id },
          });

          return method;
        }

        return false;
      },
    );

    ipcMain.handle(
      "updateOpcuaServerMethod",
      async (
        _,
        { id, dto }: { id: string; dto: UpdateOpcuaServerMethodDto },
      ) => {
        const result = await this.methodrepo.update({ id: id }, { ...dto });

        return await this.methodrepo.findOne({
          where: { id: id },
        });
      },
    );

    ipcMain.handle("deleteOpcuaServerMethod", async (_, id: string) => {
      const result = await this.methodrepo.softDelete({ id: id });

      if (result.affected) return true;

      return false;
    });

    ipcMain.handle("createOpcuaServerInputArgument", async (_, dto) => {
      const result = await this.inputArgumentRepo.insert(dto);

      if (result.identifiers.length > 0) {
        const argument = await this.inputArgumentRepo.findOne({
          where: { id: result.identifiers[0].id },
        });

        return argument;
      }

      return false;
    });

    ipcMain.handle(
      "updateOpcuaServerInputArgument",
      async (
        _,
        { id, dto }: { id: string; dto: UpdateOpcuaServerInputArgumentDto },
      ) => {
        const result = await this.inputArgumentRepo.update(
          { id: id },
          { ...dto },
        );

        return await this.inputArgumentRepo.findOne({ where: { id: id } });
      },
    );

    ipcMain.handle("deleteOpcuaServerInputArgument", async (_, id: string) => {
      const result = await this.inputArgumentRepo.softDelete({ id: id });

      if (result) return true;

      return false;
    });
  }
}
