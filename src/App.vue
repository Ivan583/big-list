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
        <input
          type="text"
          class="title"
          placeholder="enter and click outside"
          v-model.lazy="titleFilter"
        />
      </fieldset>
    </form>

    <form>
      <fieldset>
        <legend>Сортировка</legend>
        <div class="sort">
          <div>
            <input type="radio" :value="order.date" v-model="order.method" id="date" />
            <label for="date">По времени</label>
          </div>
          <div>
            <input type="radio" :value="order.title" v-model="order.method" id="title" />
            <label for="title">По заголовку</label>
          </div>
          <div>
            <input type="radio" :value="order.status" v-model="order.method" id="status" />
            <label for="status">По статусу</label>
          </div>
        </div>
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
      order: {
        method: "По времени",
        date: "По времени",
        title: "По заголовку",
        status: "По статусу"
      },
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
    finishTask(index) {
      this.tasks[index].stage = "completed";
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    removeTask(index) {
      if (this.tasks[index].stage === "completed") {
        this.tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
      } else {
        alert("Задача не выполнена!");
      }
    },
    newTask(elem) {
      if (elem != {}) this.tasks.push(elem);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
  },

  computed: {
    filteredTasks() {
      if (this.statusFilter === "all")
        if (this.titleFilter)
          return this.tasks.filter(t => t.title.includes(this.titleFilter));
        else return this.tasks;
      else if (this.titleFilter)
        return this.tasks
          .filter(t => t.stage === this.statusFilter)
          .filter(t => t.title.includes(this.titleFilter));
      else return this.tasks.filter(t => t.stage === this.statusFilter);
    }

    // if (this.tasks.lengtn) {
    //   let tasksArray = this.tasks.slice(0);
    // }
    // switch (this.order.method) {
    //   case "По заголовку":
    //   function compare(d1, d2)
    //   return (d1.title.toLowerCase() > d2.title.toLowerCase() ? 1 : -1);
    //   break;

    //   case "По статусу":
    //   function compare(d1, d2)
    //   return (d1.stage > d2.stage ? 1 : -1);
    //   break;

    //   default:
    //   function compare(d1, d2)
    //   return (d1.id > d2.id ? 1 : -1);
    // }
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

.sort {
  display: flex;
  justify-content: space-around;
}
</style>
