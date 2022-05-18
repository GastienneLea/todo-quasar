import { boot } from 'quasar/wrappers'
import { User } from 'src/store/user'

export default boot(({ router, store }) => {
  const user = store.getters['user/getUser'] as User

  router.beforeEach((to, from, next) => {
    if (to.name !== 'login' && user.token === '') {
      next('/login')
    } else {
      next()
    }
  })
})
