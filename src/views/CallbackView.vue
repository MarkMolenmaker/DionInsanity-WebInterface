<template>
  <div>
    <span>You are being redirected...</span>
  </div>
</template>

<script>
export default {
  name: "CallbackView",
  created() {
    this.loading = true;

    this.$store.dispatch("auth/twitchLogin", this.$route.query.code).then(
        () => {
          this.$router.push("/profile");
        },
        (error) => {
          this.loading = false;
          this.message =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
        }
    );
  }
}
</script>

<style scoped>

</style>