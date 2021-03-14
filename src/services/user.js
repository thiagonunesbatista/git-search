import axios from 'axios'

export const getUser = username =>
  axios(`https://api.github.com/users/${username}`)

export const getUserRepos = (username, perPage = 8) =>
  axios(`https://api.github.com/users/${username}/repos?per_page=${perPage}`)
