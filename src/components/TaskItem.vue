<template>
  <li>{{ elem.content }}</li>
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
