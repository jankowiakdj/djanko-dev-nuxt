<template>
  <v-snackbar v-model="show" :bottom="true" :right="true" class="ma-4">
    <v-layout align-center>
      <v-layout column>
        <div class="text-center">{{ message }}</div>
      </v-layout>
    </v-layout>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return { show: false, message: '' }
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'snackbar/showMessage') {
        this.message = state.snackbar.message
        this.show = true
      }
    })
  }
}
</script>

<style scoped>
::v-deep .v-snack__wrapper {
  min-width: 100px !important;
}
</style>
