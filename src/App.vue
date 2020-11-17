<template>
  <div id="app">
    <h1>Список задач</h1>
    <add-task @add-task="newTask" />

    <form>
      <fieldset>
        <legend>Сортировка и фильтры</legend>
        <label>Status</label>
        <select v-model="statusFilter">
          <option value="all">Все</option>
          <option value="completed">Готово</option>
          <option value="in work">В работе</option>
          <option value="pending">На очереди</option>
        </select>
        <label data-tooltip="введите заголовок или его часть и кликните вне поля">Task</label>
        <input type="text" placeholder="наведитесь на label" v-model.lazy="titleFilter" />
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

    <task-list v-if="filteredTasks.length" :item="filteredTasks" />
    <h2 v-else>Все задачи выполнены</h2>
  </div>
</template>

<script>
import { bus } from "@/main.js";
import TaskList from "@/components/TaskList.vue";
import AddTask from "@/components/AddTask.vue";

export default {
  name: "App",
  data() {
    return {
      tasks: [],
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
    newTask(elem) {
      if (elem != {}) this.tasks.push(elem);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
  },

  computed: {
    filteredTasks() {
      let arr;
      if (this.statusFilter === "all") {
        if (this.titleFilter)
          arr = this.tasks.filter(t => t.title.includes(this.titleFilter));
        else arr = this.tasks;
      } else {
        if (this.titleFilter)
          arr = this.tasks
            .filter(t => t.stage === this.statusFilter)
            .filter(t => t.title.includes(this.titleFilter));
        else arr = this.tasks.filter(t => t.stage === this.statusFilter);
      }
      if (arr) {
        let sortedArray = arr.slice(0);
        let sortByTitle = (d1, d2) => {
          return d1.title.toLowerCase() > d2.title.toLowerCase() ? 1 : -1;
        };
        let sortByStatus = (d1, d2) => {
          return d1.stage > d2.stage ? 1 : -1;
        };
        let sortByDate = (d1, d2) => {
          return d1.id > d2.id ? 1 : -1;
        };

        switch (this.order.method) {
          case "По заголовку":
            return arr.sort(sortByTitle);
            break;
          case "По статусу":
            return arr.sort(sortByStatus);
            break;
          default:
            return arr.sort(sortByDate);
        }
      }
    }
  },

  created() {
    bus.$on("start-task", data => {
      const id = data.id;
      const stage = data.stage;

      this.tasks = this.tasks.map(el =>
        el.id === id
          ? {
              ...el,
              stage: "in work"
            }
          : el
      );
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    });

    bus.$on("finish-task", data => {
      const id = data.id;
      const stage = data.stage;

      this.tasks = this.tasks.map(el =>
        el.id === id
          ? {
              ...el,
              stage: "completed"
            }
          : el
      );
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    });

    bus.$on("remove-task", data => {
      const id = data.id;
      if (data.stage === "completed") {
        this.tasks = this.tasks.filter(t => t.id != id);
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
      } else alert("Задача не выполнена!");
    });

    bus.$on("edit-item", data => {
      const id = data;
      this.tasks = this.tasks.map(el =>
        el.id === id
          ? {
              ...el,
              editing: true
            }
          : el
      );
    });

    bus.$on("new-data", data => {
      const id = data.id;
      const title = data.title;
      const description = data.description;

      this.tasks = this.tasks.map(el =>
        el.id === id
          ? {
              ...el,
              title,
              description,
              editing: false
            }
          : el
      );
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    });
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
  padding-top: 0.5rem;
}

[data-tooltip] {
  position: relative;
}

[data-tooltip]::after {
  content: attr(data-tooltip);
  position: absolute;
  width: 300px;
  left: 0;
  top: 0;
  padding: 0.5em;
  color: #fff;
  background-color: blueviolet;
  pointer-events: none;
  opacity: 0;
  transition: 1s;
}

[data-tooltip]:hover::after {
  opacity: 1;
  top: 2em;
}
</style>
