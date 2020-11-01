<template>
  <div id="app">
    <TaskList
      :item="tasks"
      msg="Список задач"
      @finish-task="finishTask"
      @started-task="startedTask"
    />
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
          stage: "Pending"
        },
        {
          id: 2,
          title: "Питомцы",
          description: "Накормить кота",
          stage: "Completed"
        },
        {
          id: 3,
          title: "Деловая",
          description: "Написать проект",
          stage: "Started"
        }
      ]
    };
  },
  components: { TaskList },
  methods: {
    startedTask(id) {
      console.log(id);
    },
    finishTask(id) {
      console.log(id);
    }
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
