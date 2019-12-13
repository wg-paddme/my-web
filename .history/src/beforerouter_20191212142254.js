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

    if (to.path === '/') {
        // if is logged in, redirect to the home page
        next()
        NProgress.done()
    } else {

        // generate accessible routes map based on roles
        const accessRoutes = await store.dispatch('permission/generateRoutes')

        // dynamically add accessible routes
        router.addRoutes(accessRoutes)

        // hack method to ensure that addRoutes is complete
        // set the replace: true, so the navigation will not leave a history record
        console.log(to)
        /* next({ ...to, replace: true }) */

    }

    NProgress.done()
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
