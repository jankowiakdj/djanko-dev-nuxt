<template>
  <v-btn
    class="ma-2 ma-sm-6 mt-sm-0 mt-0 menu-button"
    text
    icon
    x-large
    v-bind="attrs"
    target="_blank"
    @click="item.action"
    v-on="on"
  >
    <v-icon large>{{ item.icon }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: ['item', 'attrs', 'on'],
  data() {
    return {}
  }
}
</script>

<style scoped>
.cascade-icons button.v-btn {
  opacity: 0;
  transform: translateY(-18px);
  transition: opacity 1.2s ease-in-out,
    transform 0.3s cubic-bezier(0.44, 0.3, 0.76, 1.5);
}

.cascade-icons button.v-btn.show {
  opacity: 1;
  transform: translateY(0px);
}
</style>
