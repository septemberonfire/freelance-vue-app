import { defineStore } from "pinia";
import axios from "axios";

interface Task {
  appStatus: string,
  caption: string,
  date: string,
  name: string
}

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: [] as Task[],
  }),
  actions: {
    async fill() {
      const res = await axios.get("https://freelance-bourse-vue-ts-default-rtdb.firebaseio.com/Tasks.json");
      this.tasks = res.data
    },
  }
});
