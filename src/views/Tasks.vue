<template>
  <div class="loader" v-if="loading">
    <a-spin />
  </div>
  <div v-else>
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
        <a-button @click="openTask(task.id)"> Посмотреть </a-button>
      </a-card>
    </template>
  </div>
</template>

<script lang="ts">
import AppStatus from "../components/AppStatus.vue";
import { useTasksStore } from "@/store";
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const openTask = (id: string) => {
      router.push(`/task/${id}`);
    };
    onMounted(async () => {
      if (store.tasks.length === 0) {
        loading.value = true;
        await store.fill();
        loading.value = false;
      }
    });

    const loading = ref(false);
    const store = useTasksStore();
    return {
      store,
      loading,
      openTask,
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
.loader {
  width: 100px;
  height: 100px;
}
</style>
