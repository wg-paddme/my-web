import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/getPageTitle'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start()
    // set page title
    document.title = getPageTitle(to.meta.title)


    if (whiteList.indexOf(to.path) !== -1) {
        // in the free login whitelist, go directly
        next()
    } else {
        // other pages that do not have permission to access are redirected to the login page.
        next(`/`)
        NProgress.done()
    }


    if (to.path === '/login') {
        // if is logged in, redirect to the home page
        next({ path: '/' })
        NProgress.done()
    } else {
        try {
            // get user info
            // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
            const { roles } = await store.dispatch('user/getInfo')

            // generate accessible routes map based on roles
            const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

            // dynamically add accessible routes
            router.addRoutes(accessRoutes)

            // hack method to ensure that addRoutes is complete
            // set the replace: true, so the navigation will not leave a history record
            next({ ...to, replace: true })
        } catch (error) {
            // remove token and go to login page to re-login
            Message.error(error || '未知错误!')
            next(`/`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})
