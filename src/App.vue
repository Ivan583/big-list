<template>
  <div id="app">
    <h1>Список задач</h1>
    <AddTask @add-task="newTask" />
    <hr />
    <TaskList
      v-if="tasks.length"
      :item="tasks"
      @started-task="startedTask"
      @finish-task="finishTask"
      @remove-task="removeTask"
    />
    <h2 v-else>Все задачи выполнены</h2>
  </div>
</template>

<script>
import TaskList from "@/components/TaskList.vue";
import AddTask from "@/components/AddTask.vue";

export default {
  name: "App",
  data() {
    return {
      tasks: []
    };
  },
  components: { TaskList, AddTask },
  methods: {
    startedTask(id) {
      console.log(id);
    },
    finishTask(id) {
      console.log(id);
    },
    removeTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id);
    },
    newTask(elem) {
      this.tasks.push(elem);
    }
  },
  mounted() {
    fetch("/tasks.json")
      .then(res => res.json())
      .then(data => {
        setTimeout(() => {
          this.tasks = data.tasks;
          this.loading = false;
        }, 2000);
      })
      .catch(err => {
        console.log(err);
      });
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
