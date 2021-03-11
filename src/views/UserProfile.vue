<template>
  <Navbar title="Perfil" />
  <Loader v-if="loading" />
  <div class="profile-wrapper">
    <img :src="user.avatar_url" :alt="user.name" class="profile-photo" />
    <p class="name">{{ user.name }}</p>
    <div class="username-wrapper">
      <FontAwesomeIcon icon="user" class="user-icon" />
      <p class="username">{{ user.login }}</p>
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

    <div class="tabs">
      <button @click="changeActiveTab(1)" :class="{ active: activeTab === 1 }">
        Sobre
      </button>
      <button @click="changeActiveTab(2)" :class="{ active: activeTab === 2 }">
        Projetos
      </button>
    </div>

    <div v-if="activeTab === 1" class="bio-wrapper">
      <p v-if="user.bio" class="title">Bio</p>
      <p class="description">{{ user.bio }}</p>

      <div v-if="user.location" class="bio-group">
        <FontAwesomeIcon icon="laptop" class="fa-icon" />
        <p>{{ user.location }}</p>
      </div>

      <div v-if="user.blog" class="bio-group">
        <FontAwesomeIcon icon="home" class="fa-icon" />
        <a target="_blank" :href="user.blog">{{ user.blog }}</a>
      </div>
    </div>

    <div v-if="activeTab === 2" class="repos-wrapper">
      <div v-for="repo in repos" v-bind:key="repo.id" class="repo">
        <p class="title">{{ repo.name }}</p>
        <p class="description">{{ repo.description }}</p>
        <div class="repo-info">
          <p v-if="repo.language" class="language">{{ repo.language }}</p>
          <p class="last-push">
            Atualizado em
            {{
              new Intl.DateTimeFormat('pt-br').format(new Date(repo.pushed_at))
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import Loader from '@/components/Loader'
import Navbar from '@/components/Navbar'

export default {
  components: {
    Loader,
    Navbar
  },
  data() {
    return {
      activeTab: 1,
      loading: true,
      user: {},
      repos: {}
    }
  },
  name: 'UserProfile',
  methods: {
    changeActiveTab(tab) {
      this.activeTab = tab
    }
  },
  mounted() {
    const loadData = async () => {
      try {
        this.loading = true
        const username = this.$route.params.username

        const [userData, userRepos] = await Promise.all([
          axios(`https://api.github.com/users/${username}`),
          axios(`https://api.github.com/users/${username}/repos`)
        ])

        this.user = userData.data
        this.repos = userRepos.data
      } catch (error) {
        this.loading = false
      }
    }

    loadData()
  }
}
</script>

<style lang="sass">
.profile-wrapper
  display: flex
  flex-direction: column
  align-items: center
  width: 100%

.profile-photo
  border-radius: 50%
  width: 120px
  margin-bottom: 10px
  border: 5px solid #ECEFF1
  margin-top: 42px

.name
  font-size: 24px
  font-weight: 600
  line-height: 36.4px
  color: #162668

.username-wrapper
  display: flex
  align-items: center
  margin-bottom: 23px

.username
  font-size: 16px
  font-weight: 400
  line-height: 22px
  color: #90a4ae

.user-icon
  color: #90a4ae
  margin-right: 7px
  font-size: 10px

.stats-wrapper
  display: grid
  grid-template-columns: repeat(3, 1fr)
  padding: 0 10px
  width: 100%

.stat-group
  display: flex
  flex-direction: column
  align-items: center
  color: #162668
  font-weight: 600
  font-size: 14px
  line-height: 20px

  & > div
    display: flex

    .fa-icon
      margin-right: 8px

.fa-icon
  font-size: 20px
  margin-bottom: 4.55px
  color: #162668

.tabs
  display: grid
  grid-template-columns: repeat(2, 1fr)
  width: 100%
  height: 50px
  margin-top: 30px

  button
    font-weight: 500
    font-size: 16px
    line-height: 22px
    color: #000
    background-color: #F7F9FA
    border: none
    outline: none
    cursor: pointer

  button:first-child
    border-right: 1px solid #DAE5F0

  button.active
    border-bottom: 3px solid #5C97D2

.bio-wrapper
  padding: 30px 20px 55px
  width: 100%

  .title
    font-weight: 600
    font-size: 18px
    line-height: 25.2px
    color: #162668
    margin-bottom: 10px

  .description
    font-weight: 400
    font-size: 16px
    line-height: 22.4px
    margin-bottom: 20px

  .bio-group
    display: flex
    line-height: 40px
    font-weight: 600
    font-size: 16px
    align-items: center
    color: #162668

    .fa-icon
      margin-right: 13px

    a
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      color: inherit

.repos-wrapper
  padding: 30px 20px 108px

  .repo:not(:last-child)
    border-bottom: 1px solid rgba(0, 0, 0, 0.5)
    margin-bottom: 16px

  .repo
      line-height: 20.6px
      font-weight: 600
      color: #586069
      padding-bottom: 7px

      .title
        font-size: 14px
        color: #0366D6
        margin-left: 7.72px

      .description
        font-size: 10px
        margin: 0 0 4px 16.41px

      .repo-info
        display: flex
        font-size: 8px
        justify-content: space-between

        .last-push
          margin-left: auto

        .language
          padding-left: 10px

        .language:before
          content: ''
          display: inline-block
          width: 8px
          height: 8px
          border-radius: 50%
          background-color: #060606
          position: relative
          left: -5px
</style>
