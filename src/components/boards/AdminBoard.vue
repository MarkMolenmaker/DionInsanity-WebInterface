<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
      <button @click="handleCreateMainBingoCard">Create new Main Bingocard</button>
    </header>
  </div>
</template>

<script>
import UserService from "../../services/user.service";
import BingoService from "../../services/bingo.service";

export default {
  name: "AdminBoard",
  data() {
    return {
      content: "",
    };
  },
  methods: {
    handleCreateMainBingoCard() {
      BingoService.createMainBingoCard().then(
        (response) => {
          this.content = response.data;
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
  },
  mounted() {
    UserService.getAdminBoard().then(
      (response) => {
        this.content = response.data;
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
