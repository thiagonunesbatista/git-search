import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/lista-de-usuarios/:search',
    name: 'UsersList',
    component: () => import('@/views/UsersList')
  },
  {
    path: '/lista-de-usuarios',
    name: 'UsersList',
    component: () => import('@/views/UsersList')
  },
  {
    path: '/perfil-usuario/:username',
    name: 'UserProfile',
    component: () => import('@/views/UserProfile')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
