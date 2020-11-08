<template>
  <div id="app">
    <h1>Список задач</h1>
    <add-task @add-task="newTask" />
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
    <task-list
      v-if="filteredTasks.length"
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

export default {
  name: "App",
  data() {
    return {
      tasks: [],
      elem: null,
      loading: true,
      statusFilter: "all",
      titleFilter: ""
    };
  },
  components: { TaskList, AddTask },

  methods: {
    startedTask(index) {
      this.tasks[index].stage = "started";
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    finishTask(id) {
      console.log(id);
    },
    removeTask(index) {
      console.log(index);
      this.tasks.splice(index, 1);
      console.log(this.tasks);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    newTask(elem) {
      if (elem != {}) this.tasks.push(elem);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
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

  async mounted() {
    try {
      const data = await localStorage.getItem("tasks");
      data ? (this.tasks = JSON.parse(data)) : null;
    } catch (err) {
      if (err == QUOTA_EXCEEDED_ERR) {
        alert("quota exceeded");
      }
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
