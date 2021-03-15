import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowLeft,
  faFolderOpen,
  faHome,
  faLaptop,
  faMale,
  faSearch,
  faUser,
  faUsers
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createApp } from 'vue'
import { RouterLink } from 'vue-router'

import App from './App.vue'
import router from './router'

import '@/assets/sass/global.sass'

library.add(faArrowLeft)
library.add(faFolderOpen)
library.add(faHome)
library.add(faLaptop)
library.add(faMale)
library.add(faSearch)
library.add(faUser)
library.add(faUsers)

createApp(<App />)
  .use(router)
  .component('FontAwesomeIcon', FontAwesomeIcon)
  .component('Link', RouterLink)
  .mount('#app')
