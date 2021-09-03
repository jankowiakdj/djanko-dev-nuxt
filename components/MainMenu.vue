<template>
  <div>
    <div ref="cascadeIcons" class="cascade-icons">
      <v-tooltip v-for="(item, i) in menuItems" :key="`menu-item-${i}`" bottom>
        <template #activator="{ on, attrs }">
          <main-menu-button :item="item" :attrs="attrs" :on="on" />
        </template>
        <span>{{ item.label }}</span>
      </v-tooltip>
    </div>
    <div v-if="showEmail" class="subtitle mb-2">JankowiakDJ@gmail.com</div>
  </div>
</template>

<script>
export default {
  params: ['goToStory'],
  data() {
    return {
      menuItems: [
        {
          icon: 'mdi-timeline-outline',
          label: 'Timeline',
          action: this.$attrs['go-to-story']
        },
        {
          icon: 'mdi-file-document-outline',
          label: 'Resume',
          action: this.goToResume
        },
        {
          icon: 'mdi-linkedin',
          label: 'Linkedin',
          action: this.goToLinkedin
        },
        {
          icon: 'mdi-email-outline',
          label: 'Email',
          action: this.copyEmail
        }
      ],
      menuDelay: 600,

      showEmail: false
    }
  },
  mounted() {
    this.$refs.cascadeIcons.querySelectorAll('.menu-button').forEach((el) => {
      setTimeout(() => {
        el.classList.add('show')
      }, this.menuDelay)
      this.menuDelay += 200
    })
  },
  methods: {
    async copyEmail() {
      try {
        await this.$copyText('JankowiakDJ@gmail.com')
        this.$notifier.showMessage({
          message: 'Email Address Copied to Clipboard'
        })
      } catch (e) {
        this.showEmail = true
      }
    },
    goToResume() {
      window.open('https://djanko.dev/Daniel_Jankowiak_Resume.pdf', '_blank')
    },
    goToLinkedin() {
      window.open('https://www.linkedin.com/in/jankowiakdj/', '_blank')
    }
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
