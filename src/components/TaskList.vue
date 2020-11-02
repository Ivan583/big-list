<template>
  <ul>
    <TaskItem
      v-for="task in item"
      :key="task.id"
      :elem="task"
      @started-task="startedTask"
      @finish-task="finishTask"
      @remove-task="removeTask"
    />
  </ul>
</template>

<script>
import TaskItem from "@/components/TaskItem";

export default {
  props: ["item", "msg"],
  components: { TaskItem },
  methods: {
    startedTask(id) {
      this.$emit("started-task", id);
    },
    finishTask(id) {
      this.$emit("finish-task", id);
    },
    removeTask(id) {
      this.$emit("remove-task", id);
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
