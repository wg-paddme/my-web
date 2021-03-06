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

    if (to.path === '/index') {
        // if is logged in, redirect to the home page
        next()
        NProgress.done()
    } else {
        try {
            // generate accessible routes map based on roles
            const accessRoutes = await store.dispatch('permission/generateRoutes', { root: true })

            // dynamically add accessible routes
            router.addRoutes(accessRoutes)

            // hack method to ensure that addRoutes is complete
            // set the replace: true, so the navigation will not leave a history record
            //next({ ...to, replace: true })
            console.log(router)
        } catch (error) {
            Message.error(error || '路由加载错误！')
            next(`/index?redirect=${to.path}`)
            NProgress.done()
        }

    }

    NProgress.done()
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
