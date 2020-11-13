<template>
  <li>
    <div>
      <div>
        <button class="start" @click="$emit('started-task', index)">Start</button>
        <button class="finish" @click="$emit('finish-task', index)">Finish</button>
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
    <button class="delete" @click="$emit('remove-task', index)">Delete</button>
  </li>
</template>

<script>
export default {
  props: {
    elem: {
      type: Object,
      required: true
    },
    index: Number
  },

  methods: {
    inProgress(myStage) {
      return myStage.stage === "in work";
    },
    isCompleted(myStage) {
      return myStage.stage === "completed";
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
li {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 2rem;
  margin-bottom: 1rem;
  border: 1px solid green;
}

.work {
  color: green;
}

div {
  display: flex;
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

.delete {
  background-color: red;
}

input {
  margin-right: 0.5rem;
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
