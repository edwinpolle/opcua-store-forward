import { singleton } from "tsyringe";

@singleton()
export class MsSQLService {
  constructor() {
    console.log("Register mssql service");
  }
}
