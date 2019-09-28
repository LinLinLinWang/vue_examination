import router from './router'
import store from './store/store'


// 页面刷新时，重新赋值token
if (localStorage.getItem('token')) {
    //重新付给页面store状态
    store.commit("set_token", {
        token: localStorage.getItem('token'),

    });
    //赋值store中的user
    store.commit("set_user", {
        user: localStorage.getItem('user'),

    });
} else {
    router.push('/login');
}

//免登录页面
const whiteList = ['/login','/404'];// no redirect whitelist

router.beforeEach((to, from, next) => {
    //不需要登录
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
        next();
        return;
    }
    //判断token
    if (store.state.token == null) {
        next({
            path: '/login',
            query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        });
    } else if (store.state.norouter) {
        const roles = ['' + store.state.user.type];
        store.dispatch('GenerateRoutes', {roles}).then(() => { //根据roles权限生成可访问的路由表
            router.addRoutes(store.state.addRouters); // 动态添加可访问路由表
            next({...to, replace: true}) //确保addRoutes已完成
        });
    } else {

        next();
    }
});
