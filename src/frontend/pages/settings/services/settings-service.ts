import { create } from "zustand";
import { AutostartSlice, createAutostartSlice } from "./autostart-slice";
import { createThemeSlice, ThemeSlice } from "./theme-slice";
import {
  createSettingsinitSlice,
  SettingsInitSlice,
} from "./settings-init-slice";

export type SettingsStore = SettingsInitSlice & AutostartSlice & ThemeSlice;

export const useSettingsBound = create<SettingsStore>()((...a) => ({
  ...createSettingsinitSlice(...a),
  ...createAutostartSlice(...a),
  ...createThemeSlice(...a),
}));
