<template>
  <div id="app">
    <h1>Список задач</h1>
    <AddTask @add-task="newTask" />
    <form>
      <fieldset>
        <legend>Фильтры</legend>
        <label>Status</label>
        <select v-model="statusFilter">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="started">Started</option>
          <option value="pending">Pending</option>
        </select>
        <label>Task</label>
        <input type="text" class="title" v-model.lazy="titleFilter" />
      </fieldset>
    </form>

    <hr />
    <Loader v-if="loading" />
    <TaskList
      v-else-if="filteredTasks.length"
      :item="filteredTasks"
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
import Loader from "@/components/Loader.vue";

export default {
  name: "App",
  data() {
    return {
      tasks: [],
      loading: true,
      statusFilter: "all",
      titleFilter: ""
    };
  },
  components: { TaskList, AddTask, Loader },

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

  computed: {
    filteredTasks() {
      if (this.statusFilter === "all") {
        if (this.titleFilter)
          return this.tasks.filter(t => t.title.includes(this.titleFilter));
        else return this.tasks;
      } else {
        if (this.titleFilter)
          return this.tasks
            .filter(t => t.stage === this.statusFilter)
            .filter(t => t.title.includes(this.titleFilter));
        else return this.tasks.filter(t => t.stage === this.statusFilter);
      }
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

<style>
form {
  width: 500px;
  margin: 10px auto 20px;
}

fieldset,
select,
input {
  border: 2px solid green;
  font-size: 1.1rem;
}

select,
label {
  margin-right: 0.5rem;
}
</style>
