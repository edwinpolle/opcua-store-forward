import { singleton } from "tsyringe";

@singleton()
export class OpcuaClientService {
  constructor() {
    console.log("Register opcua client service");
  }
}
