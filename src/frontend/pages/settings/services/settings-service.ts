import { create, StateCreator } from "zustand";
import { AutostartSlice, createAutostartSlice } from "./autostart-slice";
import { createThemeSlice, ThemeSlice } from "./theme-slice";

export type SettingsStore = AutostartSlice & ThemeSlice & SharedSlice;

interface SharedSlice {
  initialized: boolean;
  init: () => Promise<void>;
}

const createSharedSlice: StateCreator<SettingsStore, [], [], SharedSlice> = (
  set,
  get,
) => ({
  initialized: false,
  init: async () => {
    if (!get().initialized) {
      await Promise.all([get().initAutostart(), get().initTheme()]).then(() => {
        get().initialized = true;
      });
    }
  },
});

export const useSettingsBound = create<SettingsStore>()((...a) => ({
  ...createAutostartSlice(...a),
  ...createThemeSlice(...a),
  ...createSharedSlice(...a),
}));
