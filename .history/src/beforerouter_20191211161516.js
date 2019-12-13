import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration


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
        Message.error(error || '未知错误！')
        next(`/`)
        NProgress.done()
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
