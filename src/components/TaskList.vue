<template>
  <ul>
    <h1>{{msg}}</h1>
    <hr />
    <TaskItem v-for="task in item" :key="task.id" :elem="task" />
  </ul>
</template>

<script>
import TaskItem from "@/components/TaskItem";

export default {
  props: ["item", "msg"],
  components: { TaskItem }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
