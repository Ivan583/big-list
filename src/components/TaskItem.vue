<template>
  <li>
    <div v-if="!elem.editing" class="container">
      <div>
        <div>
          <button class="start" @click="startTask(elem.id, elem.stage)">Start</button>
          <button class="finish" @click="finishTask(elem.id, elem.stage)">Finish</button>
          <div class="box">
            <span class="index" :class="{work: inProgress(elem), done: isCompleted(elem)}">
              <strong>{{index + 1}}</strong>
            </span>
            <span :class="{work: inProgress(elem), done: isCompleted(elem)}">{{ localeDate }}</span>
            <span :class="{work: inProgress(elem), done: isCompleted(elem)}">{{elem.title}}</span>
          </div>
        </div>
        <div>
          <span :class="{work: inProgress(elem), done: isCompleted(elem)}">{{ elem.description }}</span>
        </div>
      </div>
      <div>
        <button class="edit" @click="editItem(elem.id)">Edit</button>
        <button class="delete" @click="removeTask(elem.id, elem.stage)">Delete</button>
      </div>
    </div>
    <div v-else class="editData">
      <input type="text" class="title" v-model="title" @keyup.enter="newData(elem.id)" />
      <input type="text" class="text" v-model="description" @keyup.enter="newData(elem.id)" />
    </div>
  </li>
</template>

<script>
import { bus } from "@/main.js";
export default {
  props: {
    elem: {
      type: Object,
      required: true
    },
    index: Number
  },
  data() {
    return {
      title: "",
      description: ""
    };
  },

  methods: {
    inProgress(myStage) {
      return myStage.stage === "in work";
    },

    isCompleted(myStage) {
      return myStage.stage === "completed";
    },

    startTask(id, stage) {
      bus.$emit("start-task", { id, stage });
    },

    finishTask(id, stage) {
      bus.$emit("finish-task", { id, stage });
    },

    removeTask(id, stage) {
      bus.$emit("remove-task", { id, stage });
    },

    editItem(id) {
      bus.$emit("edit-item", id);
    },

    newData(id) {
      if (this.title && this.description)
        bus.$emit("new-data", {
          id,
          title: this.title,
          description: this.description
        });
      // this.title = this.description = "";
    }
  },
  computed: {
    localeDate() {
      return new Date().toLocaleString();
    }
  }
};
</script>

<style scoped>
div {
  display: flex;
}

.container {
  justify-content: space-between;
  padding: 0.5rem 2rem;
  margin-bottom: 1rem;
  border: 1px solid green;
}

.editData {
  margin: -0.5rem 0 0.5rem;
}

.editData input {
  border: 2px solid blueviolet;
}

.work {
  color: green;
}

.box {
  width: 570px;
}

button {
  margin-right: 1rem;
  font-weight: bold;
  color: #fff;
}

.start {
  background-color: green;
}

.finish {
  background-color: blue;
}

.edit {
  background-color: blueviolet;
  width: 55px;
}

.delete {
  background-color: red;
}

input {
  margin-right: 0.5rem;
}

.title {
  margin-left: 410px;
  width: 260px;
}

.text {
  margin-left: 50px;
  width: 450px;
}

span {
  margin-right: 1.5rem;
  text-align: left;
}

.index {
  width: 35px;
  margin-right: 0.5rem;
}

.heading {
  display: inline-block;
  width: 250px;
}

.done {
  color: black;
  text-decoration: line-through;
}
</style>
