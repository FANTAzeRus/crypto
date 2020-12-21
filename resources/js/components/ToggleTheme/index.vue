<template>
  <div class="toggle-theme" @click="toggleTheme"></div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "ToggleTheme",

  setup() {
    const store = useStore();
    const getTheme = computed(() => [store.state.theme]);
    const toggleTheme = () => {
      store.dispatch("toggleTheme");
    };

    return { toggleTheme };
  },
};
</script>