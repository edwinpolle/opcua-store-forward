import { StateCreator } from "zustand";
import { useNotifycationStore } from "../../../../frontend/components/notification/notifycationt-service";
import { SettingsStore } from "./settings-service";

export interface AutostartSlice {
  autostart: boolean;
  update: (value: boolean) => Promise<void>;
  initAutostart: () => Promise<void>;
}

export const createAutostartSlice: StateCreator<
  SettingsStore,
  [],
  [],
  AutostartSlice
> = (set) => ({
  autostart: true,
  update: async (value: boolean) => {
    const result = await window.api.setAutostartState(value);
    if (result) {
      set({ autostart: value });
      if (value) {
        useNotifycationStore
          .getState()
          .show("Settings", "Autostart set to on!", "success");
      } else {
        useNotifycationStore
          .getState()
          .show("Settings", "Autostart set to off!", "info");
      }
    } else {
      useNotifycationStore
        .getState()
        .show("Settings", "Autostart could not be updated!", "danger");
    }
  },
  initAutostart: async () => {
    const result = await window.api.getAutostartState();
    set({ autostart: result });
  },
});
