<template>
  <div class="container">
    <header class="jumbotron">
      <h3>All General Bingo Card variations</h3>
    </header>
    <div v-if="!loading" class="users-wrapper">
      <div v-for="(bingoCard, owner) in owners" v-bind:key="owner" class="user-container">
        <p>{{owner}}</p>
        <BingoCard :bingoCard="bingoCard" :size="8" />
      </div>
    </div>
  </div>
</template>

<script>
import BingoCard from "@/components/cluebingo/BingoCard.vue";
import BingoService from "@/services/bingo.service";

export default {
  name: "BoughtBoard",
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
    BingoService.getAllGeneralBingoCardVariations().then(
        (bingoCards) => {
          // map the bingocards to the owner
          bingoCards.forEach((bingoCard) => {
            this.owners[bingoCard.owner]= bingoCard;
          });
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
  gap: 1em;
}
.bingoCard-cell-content-amount {
  font-size: 2em;
}
</style>