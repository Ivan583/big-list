<template>
  <li>
    <div>
      <div>
        <button class="start">Start</button>
        <button class="finish">Finish</button>
        <div class="box">
          <span>
            <strong>{{elem.id}}</strong>
          </span>
          <span :class="{done: isCompleted(elem) }">{{elem.title}}</span>
        </div>
      </div>
      <div>
        <span :class="{done: isCompleted(elem) }">{{ elem.description }}</span>
      </div>
    </div>
    <button class="delete">Delete</button>
  </li>
</template>

<script>
export default {
  props: {
    elem: {
      type: Object,
      required: true
    }
  },

  methods: {
    isCompleted(myStatus) {
      return myStatus.stage === "Completed";
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

div {
  display: flex;
}

.box {
  width: 300px;
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
  margin-right: 1rem;
  text-align: left;
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
