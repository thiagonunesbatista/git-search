<template>
  <Navbar title="Perfil" />
  <Loader v-if="loading" />

  <p v-if="error" class="error-message">{{ error }}</p>

  <div v-if="!error" class="profile-wrapper">
    <div class="personal-info-wrapper">
      <img
        src="@/assets/images/profile-cover-860-200.png"
        :alt="`Capa do perfil de ${user.name}`"
        class="cover-photo"
      />
      <img :src="user.avatar_url" :alt="user.name" class="profile-photo" />

      <div class="name-wrapper">
        <p class="name">{{ user.name }}</p>
        <div class="username-wrapper">
          <FontAwesomeIcon icon="user" class="user-icon" />
          <p class="username">{{ user.login }}</p>
        </div>
      </div>

      <div class="stats-wrapper">
        <div class="stat-group">
          <div>
            <FontAwesomeIcon icon="male" class="fa-icon" />
            <p>{{ user.following }}</p>
          </div>
          <p>Seguindo</p>
        </div>

        <div class="stat-group">
          <div>
            <FontAwesomeIcon icon="folder-open" class="fa-icon" />
            <p>{{ user.public_repos }}</p>
          </div>
          <p>Projetos</p>
        </div>

        <div class="stat-group">
          <div>
            <FontAwesomeIcon icon="users" class="fa-icon" />
            <p>{{ user.followers }}</p>
          </div>
          <p>Seguidores</p>
        </div>
      </div>
    </div>

    <div class="tabs-wrapper">
      <div class="tabs-button-wrapper">
        <button
          @click="changeActiveTab(1)"
          :class="[{ active: activeTab === 1 }, 'tab-button']"
        >
          Sobre
        </button>
        <button
          @click="changeActiveTab(2)"
          :class="[{ active: activeTab === 2 }, 'tab-button']"
        >
          Projetos
        </button>
      </div>

      <div v-if="activeTab === 1" class="bio-wrapper">
        <p v-if="user.bio" class="title">Bio</p>
        <p v-if="user.bio" class="description">{{ user.bio }}</p>

        <div v-if="user.location" class="bio-group">
          <FontAwesomeIcon icon="laptop" class="fa-icon" />
          <p>{{ user.location }}</p>
        </div>

        <div v-if="user.blog" class="bio-group">
          <FontAwesomeIcon icon="home" class="fa-icon" />
          <a target="_blank" :href="user.blog" class="blog">{{ user.blog }}</a>
        </div>
      </div>

      <div v-if="activeTab === 2" class="repos-wrapper">
        <div v-for="repo in repos" v-bind:key="repo.id" class="repo">
          <a class="project-title" :href="repo.html_url" target="_blank">{{
            repo.name
          }}</a>
          <p v-if="repo.description" class="description">
            {{ repo.description }}
          </p>
          <div class="repo-info">
            <div class="language-wrapper">
              <span
                class="language-circle"
                :style="{ backgroundColor: languageColors[repo.language] }"
              />
              <p v-if="repo.language" class="language">
                {{ repo.language }}
              </p>
            </div>
            <p class="last-push">
              Atualizado em
              {{
                new Intl.DateTimeFormat('pt-br').format(
                  new Date(repo.pushed_at)
                )
              }}
            </p>
          </div>
        </div>

        <button
          v-if="!finishedRepos && nextLink"
          @click="loadMoreRepos(nextLink === lastLink)"
          class="repos-quantity-info"
        >
          Carregar mais
        </button>

        <button v-else class="repos-quantity-info disabled">
          Não há mais repositórios
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import Loader from '@/components/Loader'
import Navbar from '@/components/Navbar'

import { parseURLPagination } from '@/helpers/github'

import { getLanguageColors } from '@/services/repo'
import { getUser, getUserRepos } from '@/services/user'

export default {
  components: {
    Loader,
    Navbar
  },
  data() {
    return {
      activeTab: 1,
      loading: true,
      error: '',
      finishedRepos: false,
      languageColors: {},
      lastLink: '',
      nextLink: '',
      user: {},
      repos: {}
    }
  },
  name: 'UserProfile',
  methods: {
    changeActiveTab(tab) {
      this.activeTab = tab
    },
    async loadMoreRepos(isLastRepos) {
      try {
        this.loading = true
        const response = await axios(this.nextLink)

        this.repos = [...this.repos, ...response.data]
        this.finishedRepos = isLastRepos

        this.nextLink =
          response.headers?.link &&
          parseURLPagination(response.headers.link, 'next')
      } catch (error) {
        this.error = 'Erro interno. Entre em contato com o desenvolvedor!'
      } finally {
        this.loading = false
      }
    },
    async loadData() {
      try {
        this.loading = true
        const username = this.$route.params.username

        const [colors, userData, userRepos] = await Promise.all([
          getLanguageColors(),
          getUser(username),
          getUserRepos(username)
        ])

        this.user = userData.data
        this.repos = userRepos.data
        this.languageColors = colors.data

        this.nextLink =
          userRepos.headers?.link &&
          parseURLPagination(userRepos.headers.link, 'next')

        this.lastLink =
          userRepos.headers?.link &&
          parseURLPagination(userRepos.headers.link, 'last')
      } catch (error) {
        if (error.response.status === 404) {
          this.error = 'Este usuário não existe'
          return
        }
        this.error = 'Erro interno. Entre em contato com o desenvolvedor!'
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    this.loadData()
  },
  watch: {
    '$route.params.username': {
      handler() {
        this.finishedRepos = false
        this.error = ''
        this.loadData()
      }
    }
  }
}
</script>

<style src="./styles.sass" lang="sass" scoped />
