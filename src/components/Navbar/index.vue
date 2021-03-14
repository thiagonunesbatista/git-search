<template>
  <nav class="navbar-wrapper">
    <router-link to="/" class="logo-link-wrapper">
      <img src="@/assets/images/github-50x50.png" alt="GitHub" />
      <p class="logo-title">GitSearch</p>
    </router-link>

    <section class="arrow-group" @click="$router.go(-1)">
      <FontAwesomeIcon icon="arrow-left" class="arrow" />
      <p class="title">{{ title }}</p>
    </section>
  </nav>
</template>

<script>
export default {
  props: {
    title: String
  },
  name: 'Loader'
}
</script>

<style src="./styles.sass" lang="sass" scoped />
