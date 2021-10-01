<template>
  <div class="pa-4">
    <div v-if="current === 'menu'">
      <v-row justify="center" align="center">
        <v-col cols="12">
          <v-btn
            x-large
            block
            @click="
              deal()
              current = 'sim'
            "
            >Simulate</v-btn
          >
        </v-col>
        <v-col cols="12">
          <v-btn x-large block @click="current = 'analyze'">Analyze</v-btn>
        </v-col>
        <!-- <v-col cols="12">
          <v-btn x-large block>Credits</v-btn>
        </v-col> -->
      </v-row>
    </div>
    <div v-if="current === 'analyze' || current === 'sim'">
      <div class="text-h5">Cards ({{ cards.length }}):</div>
      <div
        v-for="(card, i) in cards"
        :key="`card-1-${i}`"
        class="card"
        :class="attrClasses(card)"
      >
        {{ cardText(card) }}
      </div>

      <div class="text-h5 mt-4">Sets ({{ sets.length }}):</div>
      <div v-for="(set, i) in sets" :key="`card-2-${i}`" class="set">
        <div
          v-for="(card, j) in set"
          :key="`card-3-${j}`"
          class="card"
          :class="attrClasses(card)"
        >
          {{ cardText(card) }}
        </div>
      </div>
    </div>

    <v-row v-if="current === 'sim'" class="mt-4">
      <v-col cols="12">
        <v-btn x-large block @click="deal()">Simulate</v-btn>
      </v-col>
    </v-row>

    <div v-if="current === 'analyze'">
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
const COLORS = ['red', 'green', 'purple']
const SHAPES = ['pill', 'squiggle', 'diamond']
const NUMBERS = ['one', 'two', 'three']
const FILL = ['filled', 'empty', 'striped']

class Card {
  constructor(color, shape, number, fill) {
    this.color = color
    this.shape = shape
    this.number = number
    this.fill = fill
  }
}

class Deck {
  constructor() {
    const cards = []
    for (let c = 0; c < COLORS.length; c++) {
      for (let s = 0; s < SHAPES.length; s++) {
        for (let n = 0; n < NUMBERS.length; n++) {
          for (let f = 0; f < FILL.length; f++) {
            const card = new Card(COLORS[c], SHAPES[s], NUMBERS[n], FILL[f])
            cards.push(card)
          }
        }
      }
    }
    return cards
  }
}

export default {
  data() {
    return {
      current: 'menu',
      COLORS,
      SHAPES,
      NUMBERS,
      FILL,
      analyzeStage: 'color',
      pending: {},
      cards: [],
      sets: [],
      deck: new Deck()
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
      this.sets = this.analyze(this.cards)
      this.pending = {}
      this.analyzeStage = 'color'
    },

    attrClasses(card) {
      return `color-${card.color}`
    },

    cardText(card) {
      const chars = {
        squiggle: 'S',
        diamond: '♢',
        pill: '0'
      }
      const char = chars[card.shape]
      let text = char
      if (card.number === 'two') {
        text = text + text
      }
      if (card.number === 'three') {
        text = text + text + text
      }
      return text
    },

    deal() {
      this.deck = new Deck()
      const cards = []
      for (let i = 0; i < 12; i++) {
        const draw = this.deck.splice(
          Math.floor(Math.random() * this.deck.length),
          1
        )[0]
        cards.push(draw)
      }
      this.cards = cards
      this.sets = this.analyze(this.cards)
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
      console.log(cards[0], cards[1], cards[2])
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
