import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/pageTitle'
import { Message } from 'element-ui'
NProgress.configure({ showSpinner: false }) // NProgress Configuration


router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start()
    // set page title
    document.title = getPageTitle(to.meta.title)

    try {
        // generate accessible routes map based on roles
        const accessRoutes = await store.dispatch('permission/generateRoutes')
        // dynamically add accessible routes
        router.addRoutes(accessRoutes)
        // hack method to ensure that addRoutes is complete
        // set the replace: true, so the navigation will not leave a history record
    } catch (error) {
        NProgress.done()
    }
}

})

router.afterEach(async (to, from, next) => {
    // finish progress bar
    next()
    NProgress.done()
})
