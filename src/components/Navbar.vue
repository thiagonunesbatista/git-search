<template>
  <nav class="navbar-wrapper">
    <FontAwesomeIcon icon="arrow-left" class="arrow-left" />
    <p class="title">{{ title }}</p>
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

<style lang="sass" scoped>
.navbar-wrapper
  height: 50px
  backgroud-color: #fff
  display: flex
  align-items: center

.arrow-left
  color: #90A4AE
  margin: 0 10px
  font-size: 24px
  padding: 4px
  cursor: pointer

.title
  font-weight: 600
  font-size: 14px
  line-height: 20.6px
  color: #263238
</style>
