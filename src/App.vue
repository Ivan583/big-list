<template>
  <div id="app">
    <h1>Список задач</h1>
    <add-task @add-task="newTask" />

    <form>
      <fieldset>
        <legend>Сортировка и фильтры</legend>
        <label>Status</label>
        <select v-model="statusFilter">
          <option :value="filterStatuses.ALL">Все</option>
          <option :value="filterStatuses.DONE">Готово</option>
          <option :value="filterStatuses.IN_PROGRESS">В работе</option>
          <option :value="filterStatuses.PENDING">На очереди</option>
        </select>
        <label
          data-tooltip="введите заголовок или его часть и кликните вне поля"
          >Task</label
        >
        <input
          type="text"
          placeholder="наведитесь на label"
          v-model.lazy="titleFilter"
        />
        <div class="sort">
          <div>
            <input
              type="radio"
              :value="order.date"
              v-model="order.method"
              id="date"
            />
            <label for="date">По времени</label>
          </div>
          <div>
            <input
              type="radio"
              :value="order.title"
              v-model="order.method"
              id="title"
            />
            <label for="title">По заголовку</label>
          </div>
          <div>
            <input
              type="radio"
              :value="order.status"
              v-model="order.method"
              id="status"
            />
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
import { sortingStatuses, filterStatuses } from "@/constants";
import { sortByTitle, sortByStatus, sortByDate } from "@/utils";

export default {
  name: "App",
  data() {
    return {
      tasks: [],
      order: {
        method: sortingStatuses.BY_DATE,
        date: sortingStatuses.BY_DATE,
        title: sortingStatuses.BY_TITLE,
        status: sortingStatuses.BY_STATUS,
      },
      statusFilter: filterStatuses.ALL,
      titleFilter: "",
      sortingStatuses,
      filterStatuses,
    };
  },
  components: { TaskList, AddTask },

  methods: {
    newTask(elem) {
      if (!elem?.title || !elem.description) return;
      this.tasks.push(elem);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
  },

  computed: {
    filteredTasks() {
      let arr = this.tasks
        .filter((t) => t.title.includes(this.titleFilter))
        .filter((t) =>
          this.statusFilter === filterStatuses.ALL
            ? t
            : t.stage === this.statusFilter
        );
      if (arr) {
        let sortedArray = arr.slice(0);
        switch (this.order.method) {
          case sortingStatuses.BY_TITLE:
            return arr.sort(sortByTitle);
          case sortingStatuses.BY_STATUS:
            return arr.sort(sortByStatus);
          default:
            return arr.sort(sortByDate);
        }
      }
    },
  },

  created() {
    bus.$on("start-task", (data) => {
      const { id, stage } = data;
      this.tasks = this.tasks.map((el) =>
        el.id === id
          ? {
              ...el,
              stage: filterStatuses.IN_PROGRESS,
            }
          : el
      );
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    });

    bus.$on("finish-task", (data) => {
      const { id, stage } = data;
      this.tasks = this.tasks.map((el) =>
        el.id === id
          ? {
              ...el,
              stage: filterStatuses.DONE,
            }
          : el
      );
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    });

    bus.$on("remove-task", (data) => {
      const id = data.id;
      if (data.stage === filterStatuses.DONE) {
        this.tasks = this.tasks.filter((t) => t.id != id);
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
      } else alert("Задача не выполнена!");
    });

    bus.$on("edit-item", (data) => {
      const id = data;
      this.tasks = this.tasks.map((el) =>
        el.id === id
          ? {
              ...el,
              editing: true,
            }
          : el
      );
    });

    bus.$on("new-data", (data) => {
      const id = data.id;
      const title = data.title;
      const description = data.description;

      this.tasks = this.tasks.map((el) =>
        el.id === id
          ? {
              ...el,
              title,
              description,
              editing: false,
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
  },
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
