<template>
  <div class="dark-bg">
    <v-row
      justify="center"
      align="center"
      style="height: 100vh; margin: 0px !important"
    >
      <v-col
        cols="12"
        class="text-center d-flex flex-column justify-center"
        style="height: 80%"
      >
        <div ref="title" class="title-text">
          <div class="name text-h2 text-lg-h1">Daniel Jankowiak</div>
          <div class="subtitle">Full Stack Developer</div>
        </div>
        <main-menu :go-to-story="goToStory" />
        <scroll-down-button :action="goToStory" />
      </v-col>
    </v-row>
    <v-row ref="timeline" justify="center" align="center">
      <v-col cols="10">
        <my-timeline />
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
      this.$refs.title.classList.add('show')
    }, this.nameDelay)
  },
  methods: {
    goToStory() {
      this.$refs.timeline.scrollIntoView()
    }
  }
}
</script>

<style scoped>
.name {
  font-family: 'Francois One', sans-serif !important;
}
.title-text {
  transition: opacity 1.2s ease-in-out;
  opacity: 0;
}
.title-text.show {
  opacity: 1;
}
.subtitle {
  letter-spacing: 4px;
  text-transform: uppercase;
  font-size: 12px;
  margin-top: 8px;
  margin-bottom: 4px;
}
</style>
