<template>
  <section class="home-wrapper">
    <img src="@/assets/images/github-140x140.png" alt="GitHub" />
    <h1 class="home-title">GitSearch</h1>

    <input
      type="text"
      placeholder="Pesquisar..."
      class="search-input"
      v-model="searchInput"
    />

    <section class="buttons-container">
      <router-link
        class="button"
        :to="{
          name: 'UsersList'
        }"
      >
        Ver Todos
      </router-link>

      <router-link
        custom
        :to="{
          name: 'UsersList',
          params: {
            search: searchInput
          }
        }"
        v-slot="{ navigate }"
      >
        <button
          @click="navigate"
          class="button"
          :disabled="searchInput.length === 0"
        >
          Buscar
        </button>
      </router-link>
    </section>
  </section>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      searchInput: ''
    }
  }
}
</script>

<style src="./styles.sass" lang="sass" scoped />
