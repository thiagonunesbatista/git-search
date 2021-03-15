<template>
  <Navbar title="Lista de Usuários" />
  <Loader v-if="loading" />

  <p v-if="error" class="error-message">{{ error }}</p>

  <div v-if="!error" class="list-wrapper">
    <div class="title-wrapper">
      <h1 class="list-title">Resultados da Busca</h1>
      <div class="input-wrapper">
        <button
          @click="handleSearch"
          :disabled="searchInput.length === 0"
          class="search-button"
        >
          <FontAwesomeIcon icon="search" class="search-icon" />
        </button>
        <input v-model="searchInput" type="text" class="search-input" />
      </div>
    </div>

    <div class="users-wrapper">
      <Link
        v-for="user in users"
        :key="user.id"
        :to="{
          name: 'UserProfile',
          params: {
            username: user.login
          }
        }"
        class="user"
      >
        <img
          :src="user.avatar_url"
          alt="user.login"
          class="user-profile-photo"
        />
        <p class="username">{{ user.login }}</p>
      </Link>
    </div>
    <div>
      <button
        v-if="!finishedUsers && nextLink"
        @click="loadMoreUsers(nextLink === lastLink)"
        class="load-more"
      >
        Carregar outros usuários
      </button>

      <button v-else class="load-more disabled">
        Não há mais usuários
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import Loader from '@/components/Loader'
import Navbar from '@/components/Navbar'

import { parseURLPagination } from '@/helpers/github'

import { searchUsers, showUsers } from '@/services/user'

export default {
  name: 'UsersList',
  components: {
    Loader,
    Navbar
  },
  data() {
    return {
      error: '',
      finishedUsers: false,
      lastLink: '',
      loading: true,
      nextLink: '',
      searchInput: '',
      users: []
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      try {
        const searchParam = this.$route.params.search

        this.loading = true
        this.searchInput = searchParam || ''

        const response = searchParam
          ? await searchUsers(searchParam)
          : await showUsers()

        this.users = searchParam ? response.data.items : response.data

        const hasLinkHeader = response?.headers?.link

        this.nextLink =
          hasLinkHeader && parseURLPagination(response.headers.link, 'next')

        this.lastLink =
          searchParam && hasLinkHeader
            ? parseURLPagination(response.headers.link, 'last')
            : ''
      } catch (error) {
        this.error = 'Erro interno. Entre em contato com o desenvolvedor!'
      } finally {
        this.loading = false
      }
    },
    async handleSearch() {
      try {
        this.loading = true

        const response = await searchUsers(this.searchInput)

        this.users = response.data.items

        this.nextLink =
          response.headers?.link &&
          parseURLPagination(response.headers.link, 'next')

        this.lastLink =
          response.headers?.link &&
          parseURLPagination(response.headers.link, 'last')
      } catch (error) {
        this.error = 'Erro interno. Entre em contato com o desenvolvedor!'
      } finally {
        this.loading = false
      }
    },
    async loadMoreUsers(areLastUsers) {
      try {
        this.loading = true

        const response = await axios(this.nextLink)

        this.finishedUsers = areLastUsers

        const isSearch = Boolean(this.searchInput && this.lastLink)

        this.users = isSearch ? response.data.items : response.data

        this.nextLink =
          response.headers?.link &&
          parseURLPagination(response.headers.link, 'next')
      } catch (error) {
        this.error = 'Erro interno. Entre em contato com o desenvolvedor!'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style src="./styles.sass" lang="sass" scoped />
