<template>
  <a-card>
    <h2>{{ currentTask?.name }}</h2>
    <p>Статус: <AppStatus :type="currentTask?.appStatus" /></p>
    <p>Дэдлайн: {{ currentTask?.date }}</p>
    <p>Описание: {{ currentTask?.caption }}</p>
    <div class="status-wrap">
    <p>Изменить статус: </p>
      <a-select ref="select" 
      v-model:value="chosenStatus" 
      style="width: 160px"
      @change="changeHandler"
      >
        <a-select-option value="warning">Взять в работу</a-select-option>
        <a-select-option value="primary">Завершить</a-select-option>
        <a-select-option value="danger">Отменить</a-select-option>
      </a-select>
    </div>
      <a-button @click="changeStatusHandler" class="btn-confirm">Подтвердить</a-button>
    
  </a-card>
</template>

<script lang="ts">
import AppStatus from "../components/AppStatus.vue";
import { useRoute } from "vue-router";
import { ref, defineComponent, onMounted } from "vue";
import axios from "axios";
import { Task } from "@/store";

export default defineComponent({
  setup() {
    const route = useRoute();
    const taskid = route.params.id;
    const loading = ref(false);
    const currentTask = ref();
    const chosenStatus = ref('Взять в работу');
    const changeHandler = (value: string) => {
      return value
    }

    const changeStatusHandler = async () => {
      console.log(chosenStatus);
      const status = {appStatus: chosenStatus.value}
      await axios.patch(`https://freelance-bourse-vue-ts-default-rtdb.firebaseio.com/Tasks/${currentTask.value.key}.json`, status)
      console.log({key: currentTask.value.key, newStatus: chosenStatus.value});
    }
    onMounted(async () => {
      const res = await axios.get(
        "https://freelance-bourse-vue-ts-default-rtdb.firebaseio.com/Tasks.json"
      );
      // const data = Object.values(res.data) as Task[];
      const data = (Object.entries(res.data) as Array<[string, Task]>).map(([key, val]) => ({...val, key}))
      
      currentTask.value = data.find((el) => el.id === taskid);
      
    });
    return {
      currentTask,
      loading,
      chosenStatus,
      changeHandler,
      changeStatusHandler
    };
  },
  components: { AppStatus },
});
</script>

<style scoped>
.loader {
  width: 100px;
  height: 100px;
}

.btn-confirm {
  margin: 16px;
  display: flex;
  justify-content: flex-end;
}

.status-wrap {
  display: flex;
  gap: 16px;
}
</style>
