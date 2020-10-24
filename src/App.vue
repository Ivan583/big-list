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
        { id: 1, content: "Купить хлеб", stage: "Not Started" },
        { id: 2, content: "Накормить кота", stage: "Not Started" },
        { id: 3, content: "Написать проект", stage: "Not Started" }
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
  color: blue;
  margin-top: 60px;
}
</style>
