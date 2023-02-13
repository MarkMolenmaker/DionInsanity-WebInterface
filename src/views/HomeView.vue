<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Main Bingocard</h3>
      <div v-if="this.bingocard" class="BingoCard">
        <div v-for="loot in this.bingocard.layout" v-bind:key="loot" class="BingoCardFrame">
          <img src="../assets/medium_loot/mithril_helmet.png" alt="">
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import BingoService from "../services/bingo.service";

export default {
  name: "HomeView",
  data() {
    return {
      bingocard: null,
    };
  },
  mounted() {
    BingoService.getMainBingoCard().then(
      (bingocard) => {
        this.bingocard = bingocard;
      },
      (error) => {
        this.bingocard =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>

<style scoped>
.BingoCard {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: .2em;
  width: 100%;
  height: 100%;
}
.BingoCardFrame {
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid black;
  width: 5em;
  height: 5em;
}
.BingoCardFrame img {
  max-width: 5em;
  max-height: 5em;
}
</style>