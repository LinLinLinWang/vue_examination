import router from './router'
import store from './store/store'


// alert("token"+localStorage.getItem('token'));

// 页面刷新时，重新赋值token
if (localStorage.getItem('token')) {
    store.commit("login", {
        token: localStorage.getItem('token'),
        user: eval("(" + localStorage.getItem('user') + ")")
    });
} else {
    router.push('/login');
}

//免登录页面
const whiteList = ['/login','/404'];// no redirect whitelist

router.beforeEach((to, from, next) => {
    // alert("将要从"+from.path+"转到"+to.path);
    //不需要登录
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入

        next();
        return;
    }
    //判断token
    console.log("路由跳转时的store中的token"+store.state.token);
    if (store.state.token == null||store.state.token == 'undefined') {
        console.log("store中的token为null");
        next({
            path: '/login',
            query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        });
    } else if (store.state.norouter) {
        console.log("store中的token不为null"+store.state.token);
        console.log("store中的user"+store.state.user);
        console.log("localstorge中的user"+localStorage.getItem('user'));
        if(store.state.user==null){
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            });
        }else{
            const roles = ['' + store.state.user.type];
            console.log("角色"+roles+roles);
            store.dispatch('GenerateRoutes', {roles}).then(() => { //根据roles权限生成可访问的路由表
                router.addRoutes(store.state.addRouters); // 动态添加可访问路由表
                next({...to, replace: true}) //确保addRoutes已完成
            });
        }

        // alert("生成的路由"+store.state.routers);
    } else {

        next();
    }
});
