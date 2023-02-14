<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{currentUser.displayName}}</strong> Profile
      </h3>
      <img :src="currentUser.profileImageUrl">
    </header>
    <p>
      <strong>Username:</strong>
      {{currentUser.username}}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="role in currentUser.roles" :key="role">{{role}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ProfileView',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>