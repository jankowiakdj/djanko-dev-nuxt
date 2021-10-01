<template>
  <v-btn
    text
    icon
    x-large
    class="abs-bottom"
    :class="{ show: show }"
    @click="click"
  >
    <v-icon large color="#ccc">mdi-chevron-down</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: ['action'],
  data() {
    return {
      show: false
    }
  },
  mounted() {
    this.show = true
    window.addEventListener('scroll', this.handleScroll)
  },

  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    click() {
      this.show = false
      this.action()
    },
    handleScroll() {
      this.show = window.scrollY === 0
    }
  }
}
</script>

<style scoped>
button.v-btn {
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 1.2s ease-in-out,
    transform 0.5s cubic-bezier(0.44, 0.3, 0.76, 1.5);
  transition-delay: 0s;
}

button.v-btn.show {
  opacity: 1;
  transform: translateY(0px);
  transition-delay: 1s;
}

.abs-bottom {
  position: fixed;
  bottom: 16px;
  left: calc(50% - 26px);
  right: auto;
}
</style>
