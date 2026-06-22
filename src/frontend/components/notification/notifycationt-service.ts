import { create } from "zustand";

export type NotifycationVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "dark"
  | "light";

export interface NotifycationPayload {
  id: string;
  header: string;
  message: string;
  variant?: NotifycationVariant;
}

interface NotificationState {
  notifycations: NotifycationPayload[];
  show: (
    header: string,
    message: string,
    variant?: NotifycationVariant,
  ) => void;
  remove: (id: string) => void;
}

export const useNotifycationStore = create<NotificationState>((set, get) => ({
  notifycations: [],
  show: (header, message, variant = "info") => {
    const id = window.crypto.randomUUID();

    const notification: NotifycationPayload = {
      id: id,
      header,
      message,
      variant,
    };

    set((state) => ({
      notifycations: [...state.notifycations, notification],
    }));

    setTimeout(() => {
      get().remove(id);
    }, 3000);

    console.log(message, variant);
  },
  remove: (id) => {
    set((state) => ({
      notifycations: state.notifycations.filter((n) => n.id !== id),
    }));
    console.log(id);
  },
}));
