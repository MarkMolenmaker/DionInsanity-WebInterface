<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Admin Board - Clue Bingo</h3>
      <div class="items-collection" v-if="!loading">
        <div class="item-container" v-for="item in items" v-bind:key="item.name" :title="item.name"
             :class="{ 'checked': selected_items.includes(item.name) }"
             @click="handleSelectItemToggle(item.name)">
          <div class="item-container-content">
            <img class="item-img" :src="require(`@/assets/cluebingo/${item.name}.png`)" :alt="item.name" >
          </div>
        </div>
      </div>
      <button @click="handleGenerateGeneralBingoCard">Create a new General Bingocard</button>
      <p>{{selected_items.length}}/25 Items Selected...</p>
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
      loading: true,
      items: [],
      selected_items: [],
    };
  },
  methods: {
    handleSelectItemToggle(item_name) {
      if (this.selected_items.includes(item_name)) {
        this.selected_items.splice(this.selected_items.indexOf(item_name), 1);
      } else {
        this.selected_items.push(item_name);
      }
    },
    handleGenerateGeneralBingoCard() {
      // if selected_items.length is something other than 0 or 25, then alert the user
      if (this.selected_items.length !== 0 && this.selected_items.length !== 25) {
        alert("Please select either exactly none or 25 items to generate a new bingo card!");
        return;
      }
      BingoService.generateGeneralBingoCard(this.selected_items).then(
        (response) => {
          this.content = response.data;
          this.$router.push("/");
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
    this.loading = true;
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
    BingoService.getAllItems().then(
      (response) => {
        this.items = response;
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
.items-collection {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
  width: fit-content;
  height: fit-content;
  grid-gap: 0;
  /*noinspection CssUnknownTarget*/
  /*background-image: url("~@/assets/dion_logo.png");*/
  background-size: 100% auto;
}
.item-container {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 4em;
  height: 4em;
  border: .2em black solid;
  cursor: pointer;
}
.item-container-content {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: .5em;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 35%);
}
.item-container-content img {
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
.item-container.checked {
  background: rgb(53, 255, 0, 35%);
}
</style>