import axios from 'axios'

export const getLanguageColors = () =>
  axios(
    'https://raw.githubusercontent.com/doda/github-language-colors/master/colors.json'
  )
