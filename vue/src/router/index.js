import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'home',
      component: () => import('../components/Navigation.vue'),
      children:[
      { path: 'home', component: () => import('../views/HomeView.vue') },
      ]
    },
  ],
})

export default router
