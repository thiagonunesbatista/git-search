<template>
  <div class="loader-wrapper">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  name: 'Loader'
}
</script>

<style lang="sass">
.loader-wrapper
  position: absolute
  top: 0
  height: 100%
  width: 100%
  display: flex
  justify-content: center
  align-items: center
  background-color: #fff
  z-index: 10

.loader
  animation: rotate 1s infinite linear
  border: 10px solid #344FA5
  border-top-color:   #6FCF97
  border-radius: 50%
  height: 100px
  width: 100px

@keyframes rotate
  0%
    transform: rotate(0deg)

  100%
    transform: rotate(360deg)
</style>
