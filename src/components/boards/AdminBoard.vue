<template>
  <div class="container">
    <header class="jumbotron">
      <h2>Admin Board - Clue Bingo</h2>
      <h3>General Bingo Card</h3>
      <div class="items-collection" v-if="!loading">
        <div class="item-container" v-for="item in items" v-bind:key="item.name" :title="item.name"
             :class="{ 'checked': selected_items.includes(item.name) }"
             @click="handleSelectItemToggle(item.name)">
          <div class="item-container-content">
            <img class="item-img" :src="require(`@/assets/cluebingo/${item.name}.png`)" :alt="item.name">
          </div>
        </div>
      </div>
      <button @click="handleGenerateGeneralBingoCard">Create a new General Bingocard</button>
      <p>{{ selected_items.length }}/25 Items Selected...</p>

      <div class="users-wrapper" v-if="users.length > 0">
        <h3>Users</h3>
        <ul class="user-list">
          <li v-for="user in users" v-bind:key="user.id" class="user-line">
            <img :src="user.profileImageUrl" alt="profile picture">
            <div class="user-line-details">
              <span>{{ user.username }}</span>
              <label> <input type="checkbox" name="admin" :checked="user.roles.includes('ROLE_ADMIN')" disabled/> Admin </label>
              <label> <input type="checkbox" name="moderator" :checked="user.roles.includes('ROLE_MODERATOR')" disabled/> Moderator </label>
              <label> <input type="checkbox" name="user" :checked="user.roles.includes('ROLE_USER')" disabled/> User </label>
            </div>
            <div class="user-line-details bingo-cards">
              <div class="bingo-card-skeleton" v-for="bingoCard in user.bingoCards" v-bind:key="bingoCard.id"
                   @click="handleDeleteBingoCard(bingoCard.id)">DELETE CARD</div>
            </div>
            <div class="user-line-details">
              <button @click="handleAddBingoCard(user)">Add Bingo Card</button>
            </div>
          </li>
        </ul>
      </div>

      <form @submit.prevent="handleSearchTwitchAccount">
        <input type="text" v-model="searchField" placeholder="Search for a Twitch User">
        <button>Search</button>
      </form>
      <form v-if="twitchAccount" @submit.prevent="handleRegisterAccount(twitchAccount.id)">
        <img :src="twitchAccount.profileImageUrl" alt="">
        <p>Display Name: {{ twitchAccount.displayName }}</p>
        <p>Id: {{ twitchAccount.id }}</p>
        <p>Login: {{ twitchAccount.login }}</p>
        <button>Register this Account</button>
      </form>
      <p>{{ message }}</p>
    </header>
  </div>
</template>

<script>
import BingoService from "../../services/bingo.service";
import TwitchService from "@/services/twitch.service";
import UserService from "@/services/user.service";

export default {
  name: "AdminBoard",
  data() {
    return {
      loading: true,
      items: [],
      selected_items: [],
      searchField: '',
      twitchAccount: null,
      users: [],
      message: ""
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
          () => {
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
    handleSearchTwitchAccount() {
      TwitchService.searchTwitchAccount(this.searchField).then(
          (response) => {
            this.twitchAccount = response;
            this.message = "";
          },
          (error) => {
            this.twitchAccount = null;
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );
    },
    handleRegisterAccount() {
      UserService.registerTwitchAccount(this.twitchAccount).then(
          (response) => {
            this.message = response.message;
            this.twitchAccount = null;
            this.searchField = '';
            this.$router.go();
          },
          (error) => {
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );
    },
    handleAddBingoCard(user) {
      BingoService.addBingoCard(user.id).then(
          () => {
            this.$router.go();
          },
          (error) => {
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );
    },
    handleDeleteBingoCard(bingoCardId) {
      BingoService.deleteBingoCard(bingoCardId).then(
          () => {
            this.$router.go();
          },
          (error) => {
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );
    }
  },
  mounted() {
    this.loading = true;
    BingoService.getAllItems().then(
        (response) => {
          this.items = response;
        },
        (error) => {
          this.message =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
        }
    );
    UserService.getAllUsers().then(
        (response) => {
          this.users = response;
        },
        (error) => {
          this.message =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
        }
    )
    this.loading = false;
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
  -webkit-filter: drop-shadow(3px 3px 0 black) drop-shadow(-1px -1px 0 black);
  filter: drop-shadow(3px 3px 0 black) drop-shadow(-1px -1px 0 black);
}

.item-container.checked {
  background: rgb(53, 255, 0, 35%);
}
.user-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.user-line {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 5em;
  margin: 1em 0;
}
.user-line img {
  position: relative;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}
.user-line-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0 1em;
}
.user-line-details label {
  margin: 0;
}
.user-line-details.bingo-cards {
  display: flex;
  flex-direction: row;
  gap: 1em;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 0 1em;
}
.bingo-card-skeleton {
  width: 5em;
  height: 5em;
  background-color: coral;
  cursor: pointer;
}
</style>