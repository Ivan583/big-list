<template>
  <ul>
    <h1>{{msg}}</h1>
    <hr />
    <TaskItem v-for="task in item" :key="task.id" :elem="task" @finish-task="finishTask" />
  </ul>
</template>

<script>
import TaskItem from "@/components/TaskItem";

export default {
  props: ["item", "msg"],
  components: { TaskItem },
  methods: {
    finishTask(id) {
      this.$emit("finish-task", id);
    }
  }
};
</script>


<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>
