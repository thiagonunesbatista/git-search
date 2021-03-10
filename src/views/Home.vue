<template>
  <section class="home-wrapper">
    <img src="../assets/github-140x140.png" alt="GitHub" />
    <h1 class="home-title">GitSearch</h1>
    <Loader v-if="loading" />
    <input
      type="text"
      placeholder="Pesquisar..."
      class="home-input"
      v-model="searchInput"
    />

    <section class="buttons-container">
      <button
        class="button"
        :disabled="searchInput.length === 0"
        @click="searchAll"
      >
        Ver Todos
      </button>
      <button
        class="button"
        :disabled="searchInput.length === 0"
        @click="searchUsers"
      >
        Buscar
      </button>
    </section>
  </section>
</template>

<script>
import Loader from '@/components/Loader'

export default {
  name: 'Home',
  components: { Loader },
  data() {
    return {
      loading: false,
      searchInput: ''
    }
  },
  methods: {
    searchAll() {
      console.log('AQUI')

      this.loading = true
    },
    searchUsers() {
      this.loading = true
    }
  }
}
</script>

<style lang="sass" scope>
.home-wrapper
  padding: 65px 23px 0px
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center

.home-title
  margin: 37px 0 54px
  font-weight: 600
  font-size: 30px
  line-height: 22px
  color: #000

.home-input
  margin-bottom: 19px
  font-size: 15px
  font-weight: 400
  line-height: 36.4px
  color: #7a7a7a
  padding: 4px 6px
  width: 100%
  border: 1px solid #90a4ae
  border-radius: 4px

.buttons-container
  display: flex
  width: 100%

.button
  width: 100%
  height: 50px
  border: none
  border-radius: 4px
  cursor: pointer
  font-size: 16px
  line-height: 22px
  font-weight: 600
  color: #fff

.button:disabled
  background-color: #7A7A7A !important
  cursor: not-allowed

.button:first-child
  margin-right: 22px
  background-color: #344fa5

.button:nth-child(2)
  background-color: #6fcf97

@media (min-width: 769px)
  .home-wrapper
    background-color: #f0f
    padding-top: 199px

  .home-title
    margin: 37px 0 38px

  .home-input, .buttons-container
    max-width: 420px

  .button:first-child
    margin-right: 20px
</style>
