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
    startedTask(id) {
      this.$emit("started-task", id);
    },
    finishTask(id) {
      this.$emit("finish-task", id);
    },
    removeTask(index) {
      this.$emit("remove-task", index);
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
