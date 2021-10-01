# vue3-angle

## Installation

```
yarn add vue3-angle
```

or

```
npm install vue3-angle
```

### Global registration

```
import Angle from "vue3-angle";
import "vue3-angle/style.css";

app.use(Angle)
```

### Use as a component

```
<template>
  <div class="home">
    <angle v-model:angle="angle" :size="100" />
    <div style="margin-top: 20px">{{ angle }}</div>
  </div>
</template>

<script lang="js">
import { defineComponent, ref } from "vue";
import Angle from "vue3-angle";
import "vue3-angle/style/bundle.css"

export default defineComponent({
  components: {
    Angle
  },
  setup() {
    const angle = ref(0);
    return { angle };
  }
});
</script>

```

## [Live Demo](https://aesoper101.github.io/vue3-angle/)
