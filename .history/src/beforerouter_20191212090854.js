import router from './router'
import store from './store'
import { Message } from 'element-ui'
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

    try {
        // get user info
        // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
        /*  const { roles } = await store.dispatch('user/getInfo') */

        // generate accessible routes map based on roles
        const accessRoutes = await store.dispatch('permission/generateRoutes')

        // dynamically add accessible routes
        router.addRoutes(accessRoutes)

        // hack method to ensure that addRoutes is complete
        // set the replace: true, so the navigation will not leave a history record
        next({ ...to, replace: true })
    } catch (error) {
        // remove token and go to login page to re-login
        Message.error(error || '未知错误！')
        next(`/home?redirect=${to.path}`)
        NProgress.done()
    }
    NProgress.done()
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
