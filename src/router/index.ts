import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Task from '../views/Task.vue'
import Tasks from '../views/Tasks.vue'
import CreateTask from '../views/CreateTask.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Tasks
  },
  {
    path: '/task/:id?',
    name: 'Task',
    component: Task,
  },
  {
    path: '/new',
    name: 'CreateTask',
    component: CreateTask
  }
]

export const router = createRouter({
  routes,
  history: createWebHistory(),
  linkExactActiveClass: 'active',
  linkActiveClass: 'active'
})
