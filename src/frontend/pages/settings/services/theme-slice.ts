import { useNotifycationStore } from "../../../../frontend/components/notification/notifycationt-service";
import { StateCreator } from "zustand";
import { SettingsStore } from "./settings-service";

export interface ThemeSlice {
  theme: "light" | "dark";
  updateTheme: (value: "light" | "dark") => Promise<void>;
  initTheme: () => Promise<void>;
}

export const createThemeSlice: StateCreator<
  SettingsStore,
  [],
  [],
  ThemeSlice
> = (set) => ({
  theme: "light",
  updateTheme: async (value: "light" | "dark") => {
    document.documentElement.setAttribute("data-bs-theme", value);

    const result = await window.api.setTheme(value);
    if (result) {
      set({ theme: value });
      if (value === "dark")
        useNotifycationStore
          .getState()
          .show("Settings", "Dark mode on", "success");
      if (value === "light")
        useNotifycationStore
          .getState()
          .show("Settings", "Dark mode off", "info");
    }
  },
  initTheme: async () => {
    const result = await window.api.getTheme();
    set({ theme: result });
  },
});
