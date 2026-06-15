import { create } from 'zustand';

export const useAppStore = create((set) => ({
  notifications: [],
  unreadNotifications: 0,
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadNotifications: state.unreadNotifications + 1,
    })),
  markNotificationsRead: () => set({ unreadNotifications: 0 }),
  clearNotifications: () => set({ notifications: [], unreadNotifications: 0 }),
}));
