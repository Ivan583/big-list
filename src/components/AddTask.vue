<template>
  <form @submit="onSubmit">
    <fieldset>
      <legend>Новая задача</legend>
      <input type="text" placeholder="Деловая" />
      <input type="text" class="content" placeholder="Подготовить договор поставки" />
      <button type="submit">Добавить</button>
    </fieldset>
  </form>
</template>

<script>
export default {
  methods: {
    onSubmit() {
      console.log("Submit");
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

.content {
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
