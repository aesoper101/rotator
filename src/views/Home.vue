<template>
  <div class="home">
    <angle v-model:angle="angle" :size="100" />
    <div style="margin-top: 20px">{{ angle }}°</div>
  </div>
</template>

<script lang="js">
import { defineComponent, ref } from "vue";


export default defineComponent({
  components: {
  },
  setup() {
    const angle = ref(0);
    return { angle };
  }
});
</script>
