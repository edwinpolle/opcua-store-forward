import { inject, singleton } from "tsyringe";
import {
  app,
  BrowserWindow,
  ipcMain,
  ipcRenderer,
  UtilityProcess,
  utilityProcess,
} from "electron";
import * as path from "path";
import { OpcuaServerService } from "./opcua-server.service";
import { UtilityToMainMessage } from "./utility/types/opcua-server-utility.types";
import { OpcuaServerStatusDto } from "./dtos/opcua-server-status.dto";

@singleton()
export class OpcuaServerUtilityService {
  servers: Map<string, { server: UtilityProcess; status: string }>;
  service: OpcuaServerService;

  utilityPath: string;

  win: BrowserWindow | undefined;

  constructor(
    @inject(OpcuaServerService) opcuaServerService: OpcuaServerService,
  ) {
    this.servers = new Map();

    this.service = opcuaServerService;

    this.utilityPath = path.join(__dirname, "./opcuaServerUtility.js");

    this.registerHandler();

    this.initStatus();
  }

  initStatus() {
    app.addListener("ready", async () => {
      this.sendServerStatusWithRetry(1, 10);
    });
  }

  async sendServerStatusWithRetry(currentAttempt: number, maxAttempts: number) {
    try {
      this.win = BrowserWindow.getAllWindows()[0];

      if (!this.win) {
        return;
      }

      const configs = await this.service.configRepo.find();

      configs.forEach((config) => {
        this.win?.webContents.send("opcua-server-status", {
          message: {
            id: config.id,
            status: "stopped",
          },
        });
      });
    } catch (err) {
      if (currentAttempt < maxAttempts) {
        setTimeout(() => {
          this.sendServerStatusWithRetry(currentAttempt + 1, maxAttempts);
        }, 3000);
      } else {
        console.log("errror");
      }
    }
  }

  registerHandler() {
    ipcMain.handle("opcuaServerExists", async (_, id) => {
      return this.servers.has(id);
    });

    ipcMain.handle("startOpcuaServer", async (_, id) => {
      this.startOpcuaServer(id);
    });

    ipcMain.handle("restartOpcuaServer", async (_, id) => {
      this.restartOpcuaServer(id);
    });

    ipcMain.handle("stopOpcuaServer", async (_, id) => {
      this.stopOpcuaServer(id);
    });

    ipcMain.handle("getOpcuaServerStatus", async () => {
      return this.getStatus();
    });
  }

  async startOpcuaServer(id: string) {
    if (this.servers.has(id)) return;

    const dto = await this.service.configRepo.findOne({
      where: { id: id },
      relations: {
        namespaces: { objects: { methods: { inputArguments: true } } },
      },
      order: {
        namespaces: {
          objects: {
            methods: {
              inputArguments: {
                order: "ASC",
              },
            },
          },
        },
      },
    });

    const child = utilityProcess.fork(this.utilityPath);

    this.servers.set(id, { server: child, status: "created" });

    this.setMessageHandler(id);

    child.postMessage({ type: "SET_CONFIG", payload: { config: dto } });

    const server = this.servers.get(id)?.server;

    if (!server) return;

    server.postMessage({ type: "START_SERVER", payload: null });

    this.servers.set(id, { server: server, status: "running" });

    this.win?.webContents.send("opcua-server-status", {
      message: {
        id: id,
        status: "running",
      },
    });
  }

  async restartOpcuaServer(id: string) {
    await this.stopOpcuaServer(id);
    await this.startOpcuaServer(id);
  }

  async stopOpcuaServer(id: string) {
    if (!this.servers.has(id)) return;

    const server = this.servers.get(id);

    server?.server.kill();

    this.servers.delete(id);

    this.win?.webContents.send("opcua-server-status", {
      message: {
        id: id,
        status: "stopped",
      },
    });
  }

  setMessageHandler(id: string) {
    this.servers
      .get(id)
      ?.server.on("message", (message: UtilityToMainMessage) => {
        switch (message.type) {
          case "SERVER_READY": {
            console.log(message);
            console.log("Server Ready");
            break;
          }
          case "SERVER_ERROR": {
            console.log(message);
            break;
          }
          case "SERVER_STOPPED": {
            console.log(message);
            break;
          }
          case "SERVER_STATUS": {
            console.log(message);
            break;
          }
          case "CLIENT_CONNECTED": {
            console.log(message);
            break;
          }
          case "METHOD_CALL": {
            console.log(message);
            break;
          }
        }
      });
  }

  getStatus() {
    const stats: OpcuaServerStatusDto[] = [...this.servers].map((v) => ({
      id: v[0],
      status: v[1].status,
    }));

    return stats;
  }
}
