// src/store.ts

import {create} from "zustand";
import axios from "axios";
import { immer } from "zustand/middleware/immer";

interface User {
  id: number;
  name: string;
  email: string;
}

interface State {
  users: User[];
  fetchUsers: () => Promise<void>;
  addUser: (user: User) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}

export const useUserStore = create<State>()(
  immer((set) => ({
    users: [],
    fetchUsers: async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        set({ users: response.data });
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    addUser: async (user) => {
      try {
        const response = await axios.post("https://jsonplaceholder.typicode.com/users", user);
        set((state) => {
          state.users.push(response.data);
        });
      } catch (error) {
        console.error("Error adding user:", error);
      }
    },
    updateUser: async (updatedUser) => {
      try {
        await axios.put(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, updatedUser);
        set((state) => {
          const index = state.users.findIndex((user) => user.id === updatedUser.id);
          if (index !== -1) state.users[index] = updatedUser;
        });
      } catch (error) {
        console.error("Error updating user:", error);
      }
    },
    deleteUser: async (id) => {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        set((state) => {
          state.users = state.users.filter((user) => user.id !== id);
        });
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    },
  }))
);
