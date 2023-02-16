<template>
  <div class="wrapper">
  <div class="bingoCard" v-if="!loading">
    <div class="bingoCard-cell"
         :style="sizeStyle"
         v-for="item_name in bingoCard.layout" :key="item_name"
         :class="{ 'checked': bingoCard.loot[item_name] }"
         @click.left="handleIncreaseItemAmount(item_name)"
         @click.right.prevent="handleDecreaseItemAmount(item_name)">
      <div class="bingoCard-cell-content"
           :title="item_name" >
        <img class="bingoCard-cell-content-img"
             :src="require(`@/assets/cluebingo/${quality}/${item_name}.png`)"
             :alt="item_name" />
        <span class="bingoCard-cell-content-amount"
              v-if="bingoCard.loot[item_name] > 1" >{{bingoCard.loot[item_name]}}</span>
        <span class="bingoCard-cell-content-bonus"
              v-if="bingoCard.bonusLayout.includes(item_name)" >+1</span>
      </div>
    </div>
  </div>
  <div class="bingoCard" v-else>
    <div class="bingoCard-cell" :style="sizeStyle"
         v-for="index in 25" :key="index" >
      <div class="bingoCard-cell-content">
        <img class="bingoCard-cell-content-img"
             :src="require(`@/assets/logo.png`)"
        alt="Loading..." />
      </div>
    </div>
  </div>
    <span>Score: {{bingoCard.score}}</span>
  </div>
</template>

<script>
import BingoService from "@/services/bingo.service";

export default {
  name: "BingoCard",
  props: {
    bingoCard: {
      type: Object,
      required: true,
    },
    size: {
      type: Number,
      default: 8,
    },
    quality: {
      type: String,
      default: 'low_quality',
    },
    allowItemUpdates: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    sizeStyle () {
      return `width: ${this.size}em; height: ${this.size}em;`;
    }
  },
  data() {
    return {
      loading: false
    }
  },
  emits: ['bingoCardUpdated'],
  methods: {
    handleIncreaseItemAmount(item) {
      if (!this.allowItemUpdates) return;
      this.loading = true;
      BingoService.increaseItemAmount("general_bingo_card_owner", item).then(
          () => {
            this.$emit('bingoCardUpdated');
          }).catch(() => {
        this.loading = false;
      });
    },
    handleDecreaseItemAmount(item) {
      if (!this.allowItemUpdates) return;
      this.loading = true;
      BingoService.decreaseItemAmount("general_bingo_card_owner", item).then(
          () => {
            this.$emit('bingoCardUpdated');
          }).catch(() => {
        this.loading = false;
      });
    }
  }
}
</script>

<style scoped>
.bingoCard {
  display: grid;
  position: relative;
  width: fit-content;
  height: fit-content;
  grid-gap: 0;
  grid-template-columns: repeat(5, 1fr);
  border: .2em black solid;
  /*noinspection CssUnknownTarget*/
  /*background-image: url("~@/assets/dion_logo.png");*/
  background-size: 100% auto;
}
.bingoCard-cell {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  border: .2em black solid;
  cursor: pointer;
}
.bingoCard-cell-content {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: .5em;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 35%);
}
.bingoCard-cell-content-img {
  margin: auto;
  position: relative;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  -webkit-filter: drop-shadow(3px 3px 0 black)
  drop-shadow(-1px -1px 0 black);
  filter: drop-shadow(3px 3px 0 black)
  drop-shadow(-1px -1px 0 black);
}
.bingoCard-cell-content-amount {
  z-index: 1;
  position: absolute;
  font-size: 3em;
  color: rgba(50, 255, 0, 50%);
  text-shadow: .05em .05em 0 rgba(0, 0, 0, 50%);
}
.bingoCard-cell-content-bonus {
  z-index: 2;
  position: absolute;
  font-size: 1.5em;
  color: white;
  bottom: 0;
  text-shadow: .05em .05em 0 black;
}
.bingoCard-cell.checked {
  background: rgb(53, 255, 0, 35%);
}
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>