<template>
  <form @submit.prevent="onSubmit">
    <fieldset>
      <legend>Новая задача</legend>
      <input v-model="title" type="text" placeholder="Деловая" required />
      <input
        v-model="description"
        type="text"
        class="description"
        placeholder="Подготовить договор поставки"
        required
      />
      <button type="submit">Добавить</button>
    </fieldset>
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      description: ""
    };
  },
  methods: {
    onSubmit() {
      const newTask = {
        id: Date.now(),
        title: this.title,
        description: this.description,
        stage: "Not Started"
      };
      this.$emit("add-task", newTask);
      this.title = "";
      this.description = "";
    }
  }
};
</script>

<style scoped>
form {
  width: 500px;
  margin: 10px auto 20px;
}

fieldset,
input {
  border: 2px solid green;
}

input {
  font-size: 1.1rem;
  margin-bottom: 0.7rem;
}

.description {
  width: 450px;
  /* margin-bottom: 0.4rem; */
}

button {
  font-size: 1.1rem;
  font-weight: bold;
  color: white;
  background-color: rgb(53, 130, 192);
  border-radius: 5px;
  padding: 5px;
}
</style>
