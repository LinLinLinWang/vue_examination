import Vue from 'vue'
import Vuex from 'vuex'
import app from '../app'
import {asyncRouterMap, constantRouterMap} from '../router'

Vue.use(Vuex);
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true;
    }
}
function filterAsyncRouter(routes, roles) {
    const res = [];
    routes.forEach(route => {
        const tmp = {...route};
        console.log("当前路由有哪些"+tmp);
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRouter(tmp.children, roles)
            }
            res.push(tmp)
        }
    });
    return res
}

const store=new Vuex.Store({
    modules: {
        app
    },
    state:{
        user: null,
        token:'',
        norouter: true,
        routers: constantRouterMap,
        addRouters: [],
    },
    mutations:{
     login(state, data)  {
      //     console.log("当前state的用户的token"+store.state.token)
         state.token = data.token;
         state.user = data.user;
         localStorage.token = data.token;
         localStorage.user = JSON.stringify(data.user);
        },
       logout(state) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            state.token = null;
            state.user = null;
            state.routers = null;
            state.addRouters = null;
            state.norouter = true;
        },
       set_routers (state, routers) {
            state.addRouters = routers;
            state.routers = constantRouterMap.concat(routers);
            state.norouter = false;
        },

    },actions: {
        //生成路由
        GenerateRoutes({commit}, data) {
            return new Promise(resolve => {
                const {roles} = data;

                let accessedRouters;
                if (roles.includes('3')) {
                    console.log("生成路由按照"+roles+0);
                    accessedRouters = asyncRouterMap;
                    console.log(accessedRouters);
                } else {
                    console.log("生成路由按照"+roles);
                    accessedRouters = filterAsyncRouter(asyncRouterMap, roles);
                }
                commit("set_routers", accessedRouters);
                resolve()
            })
        },

    },
    getters: {
        sidebar: state => state.app.sidebar,
        token: state => state.token,
      //  user_detail:state =>state.user,
 permission_routers: state => state.routers,
        addRouters: state => state.addRouters,
        norouter: state => state.norouter,
    }

})
export  default  store;