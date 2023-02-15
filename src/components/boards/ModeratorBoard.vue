<template>
  <div class="container">
    <header class="jumbotron">
      <h3>All BingoCards</h3>
    </header>
    <div v-if="!loading" class="users-wrapper">
      <div v-for="(array, owner) in owners" v-bind:key="owner" class="user-container">
        <p>{{owner}}</p>
        <div class="bingo-cards-wrapper">
          <BingoCard v-for="bingoCard in array" :bingoCard="bingoCard" size="3"
                     v-bind:key="bingoCard.id"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import BingoService from "@/services/bingo.service";
import BingoCard from "@/components/cluebingo/BingoCard.vue";

export default {
  name: "ModeratorBoard",
  components: {BingoCard},
  data() {
    return {
      content: "",
      owners: {},
      loading: true
    };
  },
  mounted() {
    this.loading = true;
    BingoService.getAllBingoCards().then(
        (bingoCards) => {
          // map the bingocards to the owner
          bingoCards.forEach((bingoCard) => {
            if (this.owners[bingoCard.owner] !== undefined) {
              this.owners[bingoCard.owner].push(bingoCard);
            } else {
              this.owners[bingoCard.owner] = [bingoCard];
            }
          });
          console.log(this.owners)

          this.loading = false;
        },
        (error) => {
          this.content =
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
.users-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.user-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}
.bingo-cards-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.bingoCard-cell-content-amount {
  font-size: 2em;
}
</style>