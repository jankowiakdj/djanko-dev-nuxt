<template>
  <div>
    <v-row
      justify="center"
      align="center"
      style="height: 100vh; margin: 0px !important"
      class="dark-bg"
    >
      <v-col
        cols="12"
        class="text-center d-flex flex-column justify-center"
        style="height: 80%"
      >
        <!-- text-lg-h1 -->
        <div ref="name" class="name text-h2 mb-2">Daniel Jankowiak</div>
        <main-menu />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nameDelay: 300
    }
  },
  mounted() {
    setTimeout(() => {
      this.$refs.name.classList.add('show')
    }, this.nameDelay)
  }
}
</script>

<style scoped>
.name {
  font-family: 'Francois One', sans-serif !important;
  transition: opacity 1.2s ease-in-out;
  opacity: 0;
}
.name.show {
  opacity: 1;
}
</style>
