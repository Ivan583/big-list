<template>
  <ul>
    <task-item v-for="(task, i) in item" :key="task.id" :elem="task" :index="i" />
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
