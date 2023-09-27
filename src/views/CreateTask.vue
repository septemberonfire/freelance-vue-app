<template>
  <a-form :model="formState">
    <a-card title="Создать новую задачу" :bordered="false">
      <div class="card-content">
        <a-form-item
          name="name"
          :rules="[{ required: true, message: 'Напишите название задачи' }]"
        >
          <a-input
            v-model:value="formState.name"
            placeholder="Название задачи"
          />
        </a-form-item>
        <a-form-item
          name="caption"
          :rules="[{ required: true, message: 'Напишите описание задачи' }]"
        >
          <a-input v-model:value="formState.caption" placeholder="Описание задачи" />
        </a-form-item>
        <a-form-item>
        <a-date-picker v-model:value="picked" />
      </a-form-item>
        <a-button @click="showInfo" class="btn-ant" :disabled="!isValid"
          >Создать</a-button
        >
      </div>
    </a-card>
  </a-form>
</template>

<script lang="ts" setup>
import axios from "axios";
import { ref, computed, reactive } from "vue";
import type { Dayjs } from "dayjs";
import { useRouter } from "vue-router";

interface FormState {
  name: string;
  caption: string;
}

const router = useRouter();
const picked = ref<Dayjs>();
const isValid = computed(
  () => formState.name && formState.caption && picked.value
);

const formState = reactive<FormState>({
  name: "",
  caption: "",
});

function showInfo() {
  const taskData = {
    name: formState.name,
    date: picked?.value?.format("DD.MM.YYYY"),
    caption: formState.caption,
    appStatus: "primary",
  };
  console.log(taskData);
  axios.post(
    "https://freelance-bourse-vue-ts-default-rtdb.firebaseio.com/Tasks.json",
    taskData
  );
  router.push("/");
}
</script>

<style scoped>
.btn-ant {
  width: fit-content;
  padding: 0 40px;
  align-self: flex-end;
}

.card-content {
  
  display: flex;
  flex-direction: column;
}
</style>
