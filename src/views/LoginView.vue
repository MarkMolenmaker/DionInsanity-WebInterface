<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <div class="form-group">
        <button class="btn btn-primary btn-twitch btn-block" :disabled="loading" @click="handleTwitchLogin">
            <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
            ></span>
          <font-awesome-icon icon="fa-brands fa-twitch" />
          <span>Login with Twitch</span>
        </button>
      </div>
      <div class="form-group">
        <div v-if="message" class="alert alert-danger" role="alert">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  components: {},
  data() {
    return {
      loading: false,
      message: ""
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleTwitchLogin() {
      this.loading = true;
      window.location = process.env.VUE_APP_TWITCH_AUTH_URL;
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.error-feedback {
  color: red;
}

.btn-twitch {
  background-color: #6441a5;
  color: #fff;
}

.btn-twitch:hover {
  background-color: #4b328d;
  color: #fff;
}

.btn-twitch:focus {
  background-color: #4b328d;
  color: #fff;
}

.btn-twitch:active {
  background-color: #4b328d;
  color: #fff;
}
</style>
