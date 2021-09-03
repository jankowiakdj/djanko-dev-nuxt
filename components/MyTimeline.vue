<template>
  <v-timeline
    class="mx-0 mx-md-8 ma-8 pt-8"
    :dense="$vuetify.breakpoint.smAndDown"
  >
    <v-timeline-item
      v-for="(item, i) in items"
      :key="i"
      v-observe-visibility="observeConfig"
      :color="item.color"
      :icon="item.icon"
      fill-dot
      transition="scale-transition"
    >
      <template #opposite>
        <span class="headline font-weight-bold">{{
          item.date || 'June, 2010'
        }}</span>
      </template>
      <v-card
        color="#ddd"
        light
        width="auto"
        :class="{ expanded: item.showBody }"
        @click="item.showBody = !item.showBody"
      >
        <v-card-title
          class="text-subtitle-2 text-md-h6 d-flex justify-space-between"
        >
          <div>{{ item.title }}</div>
          <v-btn text icon small>
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn></v-card-title
        >
        <v-card-text v-if="item.showBody">
          <p>
            {{ ipsum }}
          </p>
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          date: 'June, 2011',
          color: 'blue',
          icon: 'mdi-school-outline',
          title: 'Graduated',
          body: '',
          showBody: false
        },
        {
          date: '2011-2013',
          color: 'green lighten-1',
          icon: 'mdi-desktop-tower-monitor',
          title: 'Work in IT',
          body: '',
          showBody: false
        },
        {
          date: 'April 2013',
          color: 'red',
          icon: 'mdi-controller-classic-outline',
          title: 'MLG Internship',
          body: '',
          showBody: false
        },
        {
          date: 'TBD',
          color: 'blue',
          icon: 'mdi-buffer',
          title: 'Hired by MLG',
          body: '',
          showBody: false
        },
        {
          date: 'TBD',
          color: 'blue',
          icon: 'mdi-book-variant',
          title: 'The Early Years',
          body: '',
          showBody: false
        },
        {
          date: 'TBD',
          color: 'blue',
          icon: 'mdi-book-variant',
          title: 'Getting Traction',
          body: '',
          showBody: false
        },
        {
          date: 'TBD',
          color: 'blue',
          icon: 'mdi-buffer',
          title: 'Aquisition',
          body: '',
          showBody: false
        },
        {
          date: 'TBD',
          color: 'blue',
          icon: 'mdi-airballoon',
          title: 'Enhanced Viewing Experience',
          body: '',
          showBody: false
        },
        {
          date: 'TBD',
          color: 'blue',
          icon: 'mdi-hammer',
          title: 'Doom Hammer',
          body: '',
          showBody: false
        },
        {
          date: 'TBD',
          color: 'blue',
          icon: 'mdi-buffer',
          title: 'Web Socket Chat',
          body: '',
          showBody: false
        },
        {
          date: 'TBD',
          color: 'blue',
          icon: 'mdi-helicopter',
          title: 'Helicopter',
          body: '',
          showBody: false
        },
        {
          date: 'TBD',
          color: 'blue',
          icon: 'mdi-book-variant',
          title: 'MLG.com',
          body: '',
          showBody: false
        },
        {
          date: 'TBD',
          color: 'blue',
          icon: 'mdi-airballoon',
          title: 'Alleycat',
          body: '',
          showBody: false
        },
        {
          date: 'TBD',
          color: 'blue',
          icon: 'mdi-buffer',
          title: 'Sentinel',
          body: '',
          showBody: false
        },
        {
          date: 'TBD',
          color: 'red darken-2',
          icon: 'mdi-hiking',
          title: 'Norway',
          body: '',
          showBody: false
        },
        {
          date: 'Sometime Soon',
          color: 'purple darken-1',
          icon: 'mdi-crystal-ball',
          title: 'Next',
          body: '',
          showBody: false
        }
      ],
      observeConfig: {
        callback: this.visibilityChanged,
        once: true,
        throttle: 100,
        intersection: { threshold: 0.85 }
      },
      ipsum:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec eros nunc. Etiam erat erat, mattis vitae gravida vitae, posuere in massa. Etiam cursus lorem at elit ornare, non sollicitudin justo faucibus. Mauris rhoncus varius urna ut varius. Aliquam eu odio sed risus fringilla mollis. Praesent eleifend nulla bibendum, vulputate ipsum id, efficitur mi. Fusce volutpat purus ex, at commodo nunc dictum quis. Cras vel ex pellentesque, luctus est sed, aliquam enim. Aliquam elementum pulvinar dui.'
    }
  },
  methods: {
    visibilityChanged(isVisible, entry) {
      if (!isVisible) {
        return
      }
      entry.target.classList.add('show')
    }
  }
}
</script>

<style scoped>
::v-deep .v-timeline-item__body {
  opacity: 0;
  transition: opacity 1.2s ease-in-out,
    transform 0.3s cubic-bezier(0.44, 0.3, 0.76, 1.5);
}

::v-deep .show .v-timeline-item__body {
  opacity: 1;
  transform: translateX(0px) !important;
}

.v-timeline--dense ::v-deep .v-timeline-item__body {
  transform: translateX(64px);
}

.v-timeline:not(.v-timeline--dense)
  ::v-deep
  .v-timeline-item:nth-child(odd):not(.v-timeline-item--after)
  .v-timeline-item__body {
  transform: translateX(64px);
}

.v-timeline:not(.v-timeline--dense)
  ::v-deep
  .v-timeline-item:nth-child(even):not(.v-timeline-item--after)
  .v-timeline-item__body {
  transform: translateX(-64px);
}

.expanded .v-icon {
  transform: rotate(-180deg);
}
</style>
