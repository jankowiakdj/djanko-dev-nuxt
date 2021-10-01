<template>
  <v-timeline
    class="mx-0 mx-md-8 ma-8 py-8"
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
      dark
    >
      <template v-if="item.date" #opposite>
        <span class="headline font-weight-bold">{{ item.date }}</span>
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
          <div>
            <span v-if="item.date && $vuetify.breakpoint.smAndDown">
              {{ item.date }} -
            </span>
            {{ item.title }}
          </div>
          <v-btn text icon small>
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn></v-card-title
        >
        <v-card-text v-if="item.showBody">
          <div v-html="item.body"></div>
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
          body: '<p>Graduated from Pennsylvania State University with a Bachelors of Science in Secutrity and Risk Analysis with an option in Information and Cyber Security.</p>',
          showBody: false
        },
        {
          date: '2011-2013',
          color: 'green darken-1',
          icon: 'mdi-desktop-tower-monitor',
          title: 'Information Technology',
          body: '<p>After Graduating I was in the Information Technology industry for a few years. I was A+, Network+, and Security+ certified and worked for various companies including a Hospital, NiMH Battery Facotry, and Healthcare Non-profit.</p>',
          showBody: false
        },
        {
          date: 'Feb, 2013',
          color: 'orange darken-2',
          icon: 'mdi-hockey-sticks',
          title: 'My First Website',
          body: '<p>Don\'t Tell Me The Score (<a target="_blank" href="https://dtmts.com">DTMTS.com</a>) is a spoiler free NHL highlight portal. It was the first website I completed and launched. With many thanks going to <a target="_blank" href="https://josh.mn/">josh.mn</a> for answering all my silly questions and hosting the site in the early days. DTMTS is still running to this day and has served over 25 millions videos</p>',
          showBody: false
        },
        {
          date: '2013',
          color: 'red',
          icon: 'mdi-controller-classic-outline',
          title: 'MLG Internship',
          body: '<p>A three month full time internship at the Major League Gaming Headquarters in New York City. I worked mainly doing Quality Assurance for the MLG Video and the Gamebattles competition platforms. Durring this time I was able to learn the fundementals of professional web development.</p>',
          showBody: false
        },
        {
          date: '2013-2015',
          color: 'blue',
          icon: 'mdi-controller-classic-outline',
          title: 'MLG Full Time',
          body: '<p>After my internship I was brought on as a full time contractor and then shortly after converted to a full time employee.</p><p>I was exposed to and learned many different technologies in the early years at MLG. I worked on PHP, Ruby, and Node.js backends and jQuery, Backbone, and Angular frontends. Some of the projects I was heavily invlolved with were player metrics, steraming partner dashboard, chat, streaming tools, anti-adblock, and many others</p>',
          showBody: false
        },
        {
          date: 'Dec, 2015',
          color: 'yellow darken-2',
          icon: 'mdi-merge',
          title: 'Aquisition',
          body: '<p></p>',
          showBody: false
        },
        {
          date: 'TBD',
          color: 'blue',
          icon: 'mdi-airballoon',
          title: 'Enhanced Viewing Experience',
          body: '<p></p>',
          showBody: false
        },
        {
          date: 'TBD',
          color: 'blue',
          icon: 'mdi-hammer',
          title: 'Doom Hammer',
          body: '<p></p>',
          showBody: false
        },
        {
          date: 'TBD',
          color: 'blue',
          icon: 'mdi-buffer',
          title: 'Web Socket Chat',
          body: '<p></p>',
          showBody: false
        },
        {
          date: 'TBD',
          color: 'blue',
          icon: 'mdi-helicopter',
          title: 'Helicopter',
          body: '<p></p>',
          showBody: false
        },
        {
          date: 'TBD',
          color: 'blue',
          icon: 'mdi-book-variant',
          title: 'MLG.com',
          body: '<p></p>',
          showBody: false
        },
        {
          date: 'TBD',
          color: 'blue',
          icon: 'mdi-airballoon',
          title: 'Alleycat',
          body: '<p></p>',
          showBody: false
        },
        {
          date: 'TBD',
          color: 'blue',
          icon: 'mdi-buffer',
          title: 'Sentinel',
          body: '<p></p>',
          showBody: false
        },
        {
          date: 'TBD',
          color: 'red darken-2',
          icon: 'mdi-hiking',
          title: 'Norway',
          body: '<p></p>',
          showBody: false
        },
        {
          date: 'Sometime Soon',
          color: 'purple darken-1',
          icon: 'mdi-crystal-ball',
          title: 'Next',
          body: '<p></p>',
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
        // entry.target.classList.remove('show')
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
