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
  }
};
</script>

<style scoped>
li {
  border: 1px solid green;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 2rem;
  margin-bottom: 1rem;
}

.title {
  display: flex;
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

.title {
  display: inline-block;
  width: 250px;
}

.done {
  color: black;
  text-decoration: line-through;
}
</style>
