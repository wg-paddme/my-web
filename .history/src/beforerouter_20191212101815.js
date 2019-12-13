import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/pageTitle'

NProgress.configure({ showSpinner: false }) // NProgress Configuration



router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start()

    // set page title
    document.title = getPageTitle(to.meta.title)

    // determine whether the user has logged in

    const accessRoutes = await store.dispatch('permission/generateRoutes')

    // dynamically add accessible routes
    router.addRoutes(accessRoutes)
    next()
    NProgress.done()
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
