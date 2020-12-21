<template>
  <div class="home-wrapper">
    <div class="home" :class="classes" @click="onPress">Press me</div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const classes = ref([]);
    const router = useRouter();
    const onPress = () => {
      router.push("/converter");
    };

    return { classes, onPress };
  },
};
</script>