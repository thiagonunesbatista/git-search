import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import './assets/global.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowLeft,
  faFolderOpen,
  faHome,
  faLaptop,
  faMale,
  faUser,
  faUsers
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faArrowLeft)
library.add(faFolderOpen)
library.add(faHome)
library.add(faLaptop)
library.add(faMale)
library.add(faUser)
library.add(faUsers)

createApp(<App />)
  .use(router)
  .component('FontAwesomeIcon', FontAwesomeIcon)
  .mount('#app')
