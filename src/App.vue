<template>
  <div id="app">
    <TaskList :item="tasks" msg="Список задач" />
  </div>
</template>

<script>
import TaskList from "@/components/TaskList.vue";

export default {
  name: "App",
  data() {
    return {
      tasks: [
        {
          id: 1,
          title: "Продовольствие",
          description: "Купить хлеб",
          stage: "Completed"
        },
        {
          id: 2,
          title: "Питомцы",
          description: "Накормить кота",
          stage: "Not Started"
        },
        {
          id: 3,
          title: "Деловая",
          description: "Написать проект",
          stage: "Not Started"
        }
      ]
    };
  },
  components: {
    TaskList
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 1.2rem;
  color: blue;
  margin-top: 60px;
}
</style>
