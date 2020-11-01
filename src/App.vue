<template>
  <div id="app">
    <TaskList
      :item="tasks"
      msg="Список задач"
      @started-task="startedTask"
      @finish-task="finishTask"
      @remove-task="removeTask"
    />
  </div>
</template>

<script>
import TaskList from "@/components/TaskList.vue";

export default {
  name: "App",
  data() {
    return {
      tasks: []
    };
  },
  components: { TaskList },
  methods: {
    startedTask(id) {
      console.log(id);
    },
    finishTask(id) {
      console.log(id);
    },
    removeTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id);
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
