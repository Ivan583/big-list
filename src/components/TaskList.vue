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


<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>
