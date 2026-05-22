import { create } from "zustand";

interface AdminState {
  isAdmin: boolean;
  login: (code: string) => boolean;
  logout: () => void;
}

const ADMIN_CODE = "trendhive2024";

export const useAdminStore = create<AdminState>((set) => ({
  isAdmin: sessionStorage.getItem("trendhive-admin") === "true",
  login: (code: string) => {
    if (code === ADMIN_CODE) {
      sessionStorage.setItem("trendhive-admin", "true");
      set({ isAdmin: true });
      return true;
    }
    return false;
  },
  logout: () => {
    sessionStorage.removeItem("trendhive-admin");
    set({ isAdmin: false });
  },
}));
