<template>
  <h1 class="text-white center" v-if="store.tasks.length === 0">
    Задач пока нет
  </h1>
  <h3 class="text-white" v-else>
    Всего активных задач: {{ store.tasks.length }}
  </h3>
  <template v-for="task in store.tasks">
    <a-card class="card" :title="task.name">
      <template #extra>
        <AppStatus :type="task.appStatus"></AppStatus>
      </template>
      <div class="card-content">
        <p>{{ task.caption }}</p>
        <div class="card-date">
          <p>Дедлайн: {{ task.date }}</p>
        </div>
      </div>
      <a-button> Посмотреть </a-button>
    </a-card>
  </template>
</template>

<script lang="ts">
import AppStatus from "../components/AppStatus.vue";
import { useTasksStore } from "@/store";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const store = useTasksStore();
    store.fill();
    return {
      store,
    };
  },
  components: { AppStatus },
});
</script>

<style scoped>
.card-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.card-date {
  padding-bottom: 16px;
}
</style>
