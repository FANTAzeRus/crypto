<template>
  <div class="wrapper" :class="getTheme">
    <router-view />

    <toggle-theme />
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

import ToggleTheme from "./components/ToggleTheme";
export default {
  name: "App",

  components: {
    ToggleTheme,
  },

  setup() {
    const store = useStore();
    const getTheme = computed(() => store.state.theme);
    onMounted(() => {
      store.dispatch("init");
    });

    return { getTheme };
  },
};
</script>