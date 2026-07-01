import { OpcuaServerDto } from "../../../models/opcua-server/dtos/opcua-server.dto";
import {
  MainToUtilityMessage,
  UtilityToMainMessage,
} from "./types/opcua-server-utility.types";
import { OpcuaServer } from "./classes/opcua-server";

interface MainMessageEvent {
  data: MainToUtilityMessage;
  ports: Electron.MessagePortMain[];
}

const sendToMain = (message: UtilityToMainMessage) => {
  process.parentPort.postMessage(message);
};

let config: OpcuaServerDto | null = null;
let server: OpcuaServer | null = null;

async function createServer() {
  if (config) {
    server = new OpcuaServer(config);

    server.setMessageHandler((message) => {
      process.parentPort.postMessage(message);
    });

    await server.initServer();
  }
}

function setConfig(c: OpcuaServerDto) {
  config = c;
}

process.parentPort.on("message", (event: MainMessageEvent) => {
  const message = event.data;

  switch (message.type) {
    case "SET_CONFIG":
      setConfig(message.payload.config);
      break;
    case "START_SERVER":
      console.log("Start Server");
      createServer();
      break;
    case "STOP_SERVER":
      console.log("Stop Server");
      break;
  }
});
