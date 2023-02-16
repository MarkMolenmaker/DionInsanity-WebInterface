<template>
  <div class="container d-flex justify-content-center align-items-center mt-5">
    <BingoCard v-if="!loading" :bingoCard="bingoCard" @bingo-card-updated="() => {this.$router.go()}"
               :size="8" quality="high_quality" allow-item-updates />
  </div>
</template>

<script>
import BingoService from "../services/bingo.service";
import BingoCard from "../components/cluebingo/BingoCard";

export default {
  name: "HomeView",
  components: {
    BingoCard,
  },
  data() {
    return {
      bingoCard: null,
      loading: true
    };
  },
  mounted() {
    this.loading = true;
    BingoService.getGeneralBingoCard().then(
      (bingoCard) => {
        this.bingoCard = bingoCard;
        this.loading = false;
      },
      (error) => {
        this.bingoCard =
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