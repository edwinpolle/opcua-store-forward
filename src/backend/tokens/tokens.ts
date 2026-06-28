import { BrowserWindow } from "electron";
import { InjectionToken } from "tsyringe";

export const BROWSER_WINDOW_TOKEN: InjectionToken<BrowserWindow> =
  Symbol("BrowserWindow");
