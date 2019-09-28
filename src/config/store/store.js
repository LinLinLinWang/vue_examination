import Vue from 'vue'
import Vuex from 'vuex'
import {asyncRouterMap, constantRouterMap} from './router'

Vue.use(Vuex);

const store=new Vuex.Store({
    state:{
        user: null,
        token:'',
        norouter: true,
        routers: constantRouterMap,
        addRouters: [],
    },
    mutations:{
        set_token(state, token) {
            state.token = token
            localStorage.setItem("token",token)
        },
        del_token(state) {
            state.token = ''
            localStorage.removeItem("key")
        }
        ,
       set_user(state,user_detail){

            state.user=user_detail;
            localStorage.setItem("user",JSON.stringify(user_detail));

},
    },
    getters: {

        token: state => state.token,
        user_detail:state =>state.user,
     //   permission_routers: state => state.routers,
        addRouters: state => state.addRouters,
        norouter: state => state.norouter,
    }

})
