<template>
  <div class="container">
    <header class="jumbotron">
      <h3>All User Loot</h3>
    </header>
    <div v-if="!loading" class="users-wrapper">
      <div v-for="(map, owner) in owners" v-bind:key="owner" class="user-container">
        <p>{{ owner }}</p>
        <div class="items-collection" v-if="!loading">
          <div class="item-container" v-for="(value, item) in map" v-bind:key="item" :title="item"
               @click.left="handleIncreaseItemAmount(owner, item)"
               @click.right.prevent="handleDecreaseItemAmount(owner, item)">
            <div class="item-container-content">
              <img class="item-img" :src="require(`@/assets/cluebingo/low_quality/${item}.png`)" :alt="item">
              <span class="item-amount"
                    v-if="value > 0" >{{value}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import BingoService from "@/services/bingo.service";

export default {
  name: "ModeratorBoard",
  data() {
    return {
      content: "",
      owners: {},
      loading: true
    };
  },
  mounted() {
    this.loading = true;
    BingoService.getAllLootCollections().then(
        (lootCollections) => {
          // map the bingocards to the owner
          lootCollections.forEach((lootCollection) => {
            this.owners[lootCollection.owner] = lootCollection.loot;
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
  methods: {
    handleIncreaseItemAmount(username, item) {
      BingoService.increaseItemAmount(username, item).then(
          () => { this.$router.go(); },
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
    handleDecreaseItemAmount(username, item) {
      BingoService.decreaseItemAmount(username, item).then(
          () => { this.$router.go(); },
          (error) => {
            this.content =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );
    }
  }
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
  -webkit-filter: drop-shadow(3px 3px 0 black) drop-shadow(-1px -1px 0 black);
  filter: drop-shadow(3px 3px 0 black) drop-shadow(-1px -1px 0 black);
}
.item-amount {
  position: absolute;
  font-size: 2em;
  font-weight: bold;
  color: white;
  text-shadow: 1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black;
}
</style>