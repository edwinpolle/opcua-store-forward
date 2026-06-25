import {
  AddressSpace,
  ArgumentOptions,
  DataType,
  MessageSecurityMode,
  Namespace,
  OPCUAServer,
  QualifiedNameLike,
  SecurityPolicy,
  StatusCodes,
  UAMethod,
  UAObject,
} from "node-opcua";
import { OpcuaServerDto } from "../../../../models/opcua-server/dtos/opcua-server.dto";
import { UtilityToMainMessage } from "../types/opcua-server-utility.types";
import { OpcuaServerMethodDto } from "../../../../models/opcua-server/dtos/opcua-server-method.dto";
import { OpcuaServerNamespaceDto } from "../../../../models/opcua-server/dtos/opcua-server-namespace.dto";
import { OpcuaServerInputArgumentDto } from "../../../../models/opcua-server/dtos/opcua-server-input-argument.dto";

export class OpcuaServer {
  config: OpcuaServerDto;
  server!: OPCUAServer;

  private messageHandler: ((message: UtilityToMainMessage) => void) | null =
    null;

  constructor(config: OpcuaServerDto) {
    this.config = config;
    this.createServer();
  }

  private createServer() {
    this.server = new OPCUAServer({
      port: this.config.port,
      resourcePath: "/UA/log4plc",
      serverInfo: {
        applicationName: { text: "log4plc.com", locale: "de" },
      },
      buildInfo: {
        productName: "log4plc",
      },
      allowAnonymous: true,
      securityPolicies: [
        SecurityPolicy.None,
        SecurityPolicy[
          this.config.securityPolicy as keyof typeof SecurityPolicy
        ],
      ],
      securityModes: [
        MessageSecurityMode.None,
        MessageSecurityMode[
          this.config.securityMode as keyof typeof MessageSecurityMode
        ],
      ],
    });
  }

  public async initServer() {
    this.setServerListener();

    await this.server.initialize();

    this.server.start();

    if (this.server.initialized) {
      this.emit({
        type: "SERVER_READY",
        payload: { url: this.server.getEndpointUrl() },
      });
    } else {
      this.emit({
        type: "SERVER_ERROR",
        payload: { message: "Server can not start!" },
      });
    }
  }

  public async stopServer() {
    await this.server.shutdown();

    if (!this.server.initialized) {
      this.emit({ type: "SERVER_STOPPED", payload: null });
    } else {
      this.emit({
        type: "SERVER_ERROR",
        payload: { message: "Server can not be stopped!" },
      });
    }
  }

  setServerListener() {
    this.server.on("create_session", (session) => {
      console.log(session);
    });

    this.server.on("session_closed", (session) => {
      console.log(session);
    });

    this.server.on("post_initialize", () => {
      this.createResources();
    });
  }

  public setMessageHandler(handler: (message: UtilityToMainMessage) => void) {
    this.messageHandler = handler;
  }

  private emit(message: UtilityToMainMessage) {
    if (this.messageHandler) {
      this.messageHandler(message);
    }
  }

  createResources() {
    const addressSpace = this.server.engine.addressSpace;

    if (!addressSpace) return;

    console.log("create Resources");

    const rootNamespace = addressSpace.getOwnNamespace();

    const folder = rootNamespace.addFolder(addressSpace.rootFolder.objects, {
      browseName: "log4plc",
    });

    this.config.namespaces?.forEach((namespace) => {
      const registeredNamespace = this.getNamespace(addressSpace, namespace);
      namespace.objects?.forEach((object) => {
        console.log(object);
        const device = this.getObject(registeredNamespace, folder, {
          name: object.name,
        });

        object.methods?.forEach((method) => {
          return this.getMethod(method, rootNamespace, device, method.name);
        });
      });
    });
  }

  getNamespace(addressSpace: AddressSpace, namespace: OpcuaServerNamespaceDto) {
    const registeredNamespace = addressSpace.registerNamespace(namespace.url);

    return registeredNamespace;
  }

  getObject(namespace: Namespace, path: UAObject, name: QualifiedNameLike) {
    return namespace.addObject({
      organizedBy: path,
      browseName: name,
    });
  }

  getMethod(
    method: OpcuaServerMethodDto,
    namespace: Namespace,
    object: UAObject,
    name: string,
  ) {
    const methodO = namespace.addMethod(object, {
      browseName: name,
      inputArguments: method.inputArguments?.map((input) => {
        return this.getInputArgument(input);
      }),
      outputArguments: [
        {
          name: "result",
          valueRank: -1,
          dataType: DataType.Boolean,
        },
      ],
    });
    console.log(methodO);

    this.setMethodBind(methodO);

    return methodO;
  }

  getInputArgument(dto: OpcuaServerInputArgumentDto): ArgumentOptions {
    return {
      name: dto.name,
      dataType: DataType[dto.dataType as keyof typeof DataType],
      valueRank: -1,
    };
  }

  setMethodBind(method: UAMethod) {
    method.bindMethod((inputArguments, context, callback) => {
      this.emit({
        type: "METHOD_CALL",
        payload: { message: JSON.stringify(inputArguments) },
      });

      callback(null, {
        statusCode: StatusCodes.Good,
        outputArguments: [
          {
            dataType: DataType.Boolean,
            value: true,
          },
        ],
      });
    });

    return;
  }
}
