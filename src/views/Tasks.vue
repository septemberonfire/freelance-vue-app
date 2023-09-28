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
    <a-radio-group v-model:value="activeKey" style="margin-bottom: 16px" @change="showKey">
      <a-radio-button value="all">Все</a-radio-button>
      <a-radio-button value="primary">Выполненные</a-radio-button>
      <a-radio-button value="warning">В процессе</a-radio-button>
      <a-radio-button value="danger">Отменённые</a-radio-button>
    </a-radio-group>
    <template v-if="filterTasks.length" v-for="task in filterTasks">
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
    <a-card>
      <h3>Таких задач нет</h3>
    </a-card>
  </div>
</template>

<script lang="ts">
import AppStatus from "../components/AppStatus.vue";
import { useTasksStore } from "@/store";
import { defineComponent, ref, onMounted, computed } from "vue";
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

    const filterTasks = computed(() => {
      switch(activeKey.value) {
        case 'primary': 
        return store.tasks.filter((task) => task.appStatus === 'primary')
        case 'warning': 
        return store.tasks.filter((task) => task.appStatus === 'warning')
        case 'danger': 
        return store.tasks.filter((task) => task.appStatus === 'danger')
        default:
        return store.tasks
      }
    })

    const activeKey = ref('all')

    const showKey = () => {
      console.log(activeKey.value);
      
    }
    const loading = ref(false);
    const store = useTasksStore();
    return {
      store,
      loading,
      openTask,
      activeKey,
      showKey,
      filterTasks
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
