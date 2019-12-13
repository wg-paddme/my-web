import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    // 开始进度条
    NProgress.start()

    // 设置页面Title信息
    document.title = getPageTitle(to.meta.title)

    // determine whether the user has logged in
    try {
        const accessRoutes = await store.dispatch('permission/generateRoutes')

        // dynamically add accessible routes
        router.addRoutes(accessRoutes)

        // hack method to ensure that addRoutes is complete
        // set the replace: true, so the navigation will not leave a history record
        next({ ...to, replace: true })
    } catch (error) {
        // remove token and go to login page to re-login
        await store.dispatch('user/resetToken')
        Message.error(error || 'Has Error')
        next(`/login?redirect=${to.path}`)
        NProgress.done()
    }
}
        }

})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
