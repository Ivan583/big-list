<template>
  <ul>
    <task-item
      v-for="(task, i) in item"
      :key="task.id"
      :elem="task"
      :index="i"
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
    startedTask(index) {
      this.$emit("started-task", index);
    },
    finishTask(index) {
      this.$emit("finish-task", index);
    },
    removeTask(id, stage) {
      this.$emit("remove-task", id, stage);
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
