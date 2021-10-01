<template>
  <div class="pa-4">
    <div v-if="current === 'menu'">
      <v-row justify="center" align="center">
        <v-col cols="12">
          <v-btn x-large block>New Game</v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn x-large block @click="current = 'analyze'">Analyze</v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn x-large block>Credits</v-btn>
        </v-col>
      </v-row>
    </div>
    <div v-if="current === 'analyze'">
      <div class="text-h5">Cards ({{ cards.length }}):</div>
      <div
        v-for="(card, i) in cards"
        :key="i"
        class="card"
        :class="attrClasses(card)"
      >
        SSS
      </div>

      <div class="text-h5 mt-4">Sets ({{ sets.length }}):</div>
      <div v-for="(set, i) in sets" :key="i" class="set">
        <div
          v-for="(card, i) in set"
          :key="i"
          class="card"
          :class="attrClasses(card)"
        >
          SSS
        </div>
      </div>

      <div class="text-h5 mt-4 mb-2">Add:</div>

      <v-row v-if="analyzeStage === 'color'" justify="center" align="center">
        <v-col v-for="(color, i) in COLORS" :key="i" cols="12">
          <v-btn x-large block :color="color" @click="setColor(color)"></v-btn>
        </v-col>
      </v-row>
      <v-row v-if="analyzeStage === 'shape'" justify="center" align="center">
        <v-col v-for="(shape, i) in SHAPES" :key="i" cols="12">
          <v-btn x-large block @click="setShape(shape)">{{ shape }}</v-btn>
        </v-col>
      </v-row>
      <v-row v-if="analyzeStage === 'number'" justify="center" align="center">
        <v-col v-for="(number, i) in NUMBERS" :key="i" cols="12">
          <v-btn x-large block @click="setNumber(number)">{{ number }}</v-btn>
        </v-col>
      </v-row>
      <v-row v-if="analyzeStage === 'fill'" justify="center" align="center">
        <v-col v-for="(fill, i) in FILL" :key="i" cols="12">
          <v-btn x-large block :color="fill" @click="setFill(fill)">{{
            fill
          }}</v-btn>
        </v-col>
      </v-row>

      <v-divider class="ma-6"></v-divider>

      <v-row>
        <v-col cols="12">
          <v-btn x-large block @click="reset()">Reset</v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 'menu',
      COLORS: ['red', 'green', 'purple'],
      SHAPES: ['pill', 'squiggle', 'diamond'],
      NUMBERS: ['one', 'two', 'three'],
      FILL: ['filled', 'empty', 'striped'],
      analyzeStage: 'color',
      pending: {},
      cards: [],
      sets: []
    }
  },
  head() {
    return {
      title: 'Set'
    }
  },

  mounted() {},
  methods: {
    reset() {
      this.cards = []
      this.sets = []
      this.pending = {}
      this.analyzeStage = 'color'
    },
    setColor(color) {
      this.pending.color = color
      this.analyzeStage = 'shape'
    },
    setShape(shape) {
      this.pending.shape = shape
      this.analyzeStage = 'number'
    },
    setNumber(number) {
      this.pending.number = number
      this.analyzeStage = 'fill'
    },
    setFill(fill) {
      this.pending.fill = fill
      this.addCard()
    },
    addCard() {
      this.cards.push(this.pending)
      this.resetPending()
    },
    resetPending() {
      console.log(this.pending)
      console.log(this.cards)
      this.sets = this.analyze(this.cards)
      this.pending = {}
      this.analyzeStage = 'color'
    },

    attrClasses(card) {
      return `color-${card.color}`
    },

    analyze(cards) {
      // dont need to analyze the twelfth cards because its alraedy been included in all others
      const sets = []
      for (let i = 0; i < cards.length - 1; i++) {
        for (let j = 0; j < cards.length - 1; j++) {
          if (i === j || i + 1 === j) {
            continue
          }
          const potentialSet = [cards[i], cards[i + 1], cards[j]]
          if (this.isSet(potentialSet)) {
            sets.push(potentialSet)
          }
        }
      }
      return sets
    },

    isSet(cards) {
      if (
        this.isValidAttr(cards, 'color') &&
        this.isValidAttr(cards, 'shape') &&
        this.isValidAttr(cards, 'number') &&
        this.isValidAttr(cards, 'fill')
      ) {
        return true
      }
      return false
    },

    isValidAttr(cards, attr) {
      if (
        cards[0][attr] === cards[1][attr] &&
        cards[0][attr] === cards[2][attr]
      ) {
        return true
      }
      if (
        cards[0][attr] !== cards[1][attr] &&
        cards[0][attr] !== cards[2][attr] &&
        cards[1][attr] !== cards[2][attr]
      ) {
        return true
      }
    }
  }
}
</script>

<style scoped>
.card {
  width: 45px;
  height: 33px;
  border: 1px solid #888;
  line-height: 33px;
  text-align: center;
  font-weight: bold;
  border-radius: 3px;
  display: inline-block;
  margin: 4px;
}

.color-red {
  color: red;
}
.color-green {
  color: green;
}
.color-purple {
  color: purple;
}
</style>
