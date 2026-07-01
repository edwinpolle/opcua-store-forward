import { StateCreator } from "zustand";
import { SettingsProfileDto } from "../../../../backend/models/settings/dtos/settings-profile.dto";
import { SettingsStore } from "./settings-service";

export interface SettingsInitSlice {
  settings: SettingsProfileDto | null;
  init: (dto: SettingsProfileDto) => void;
}

export const createSettingsinitSlice: StateCreator<
  SettingsStore,
  [],
  [],
  SettingsInitSlice
> = (set, get) => ({
  settings: null,
  init: (dto) => {
    {
      set({ settings: dto });
    }
  },
});
