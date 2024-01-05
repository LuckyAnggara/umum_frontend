import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    meta: {
      title: 'Login',
      layout: 'layout-guest',
      requiresAuth: false,
    },
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue'),
  },

  {
    meta: {
      title: 'Dashboard',
      requiresAuth: true,
      layout: 'layout-authenticated',
    },
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/dashboard/User.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  },
})

router.beforeResolve(async (to, _, next) => {
  // const auth = useAuthStore()
  // if (to.meta.requiresAuth == true && auth.isLoggedIn() == false) {
  //   return next('/login')
  // } else if (to.name == 'login' && auth.isLoggedIn() == true) {
  //   return next('/')
  // } else {
  return next()
  // }
})

export default router
