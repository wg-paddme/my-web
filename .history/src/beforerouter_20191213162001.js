import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/pageTitle'
import { Message } from 'element-ui'
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/index'] // no redirect whitelist
router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start()

    // set page title
    document.title = getPageTitle(to.meta.title)

    // determine whether the user has logged in
    const hasToken = true

    if (hasToken) {

        // determine whether the user has obtained his permission roles through getInfo
        const hasRoles = store.getters.roles && store.getters.roles.length > 0
        if (hasRoles) {
            next()
        } else {
            try {
                // get user info
                // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
                //const { roles } = await store.dispatch('user/getInfo')

                // generate accessible routes map based on roles
                const accessRoutes = await store.dispatch('permission/generateRoutes')

                // dynamically add accessible routes
                router.addRoutes(accessRoutes)

                // hack method to ensure that addRoutes is complete
                // set the replace: true, so the navigation will not leave a history record
                next()
                next({ ...to, replace: true })
            } catch (error) {
                // remove token and go to login page to re-login
                //await store.dispatch('user/resetToken')
                Message.error(error || 'Has Error')
                next(`/index?redirect=${to.path}`)
                NProgress.done()
            }
        }
    }
} else {
    /* has no token*/
    next()
            NProgress.done()

}
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
