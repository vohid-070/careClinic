import { defineStore } from "pinia";
import AuthService from "../services/auth.service";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {},
  }),
  actions: {
    async login(userCredentials) {
      try {
        const data = await AuthService.login(userCredentials);
        this.user = data;
        localStorage.setItem("name", data.username);
        localStorage.setItem("user", data.role);
        localStorage.setItem("fullName", data.fullName);
        localStorage.setItem("speciality", data.speciality);
        localStorage.setItem("directory", data.directory);
        localStorage.setItem("access_token", data.token);
        localStorage.setItem("id", data.id);
        return data;
      } catch (error) {
        return false;
      }
    },
  },
});
