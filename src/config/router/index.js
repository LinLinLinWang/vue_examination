import Router from 'vue-router';
import Layout from '../../components/views/Home.vue'
import normaluserRouter from './normaluser'
import managerRouter from "./manager";

export const constantRouterMap = [
   {
        path: '/login',
        name: 'login',
        hidden: true,
        component: resolve => require(['../../components/views/both/Login.vue'], resolve)
    },
    {
        path: '/',
        redirect: '/dashboard',
        component: Layout,
        children: [
            {
                path: '/dashboard',
                component: resolve => require(['../../components/views/both/Dashboard.vue'], resolve),
                hidden: true,
                meta: {title: 'dashboard'},
            },

        ]
    },
    {
        path: '/404',
        hidden: true,
        component: resolve => require(['../../components/views/404.vue'], resolve),
        meta: {title: '404'}
    }
];

export default new Router({
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
})


export const asyncRouterMap = [
    normaluserRouter,
    managerRouter,
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
];
