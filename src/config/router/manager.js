
import Layout from '../../components/views/Home.vue'
const managerRouter = {
    path: '/manager',
    component: Layout,
    meta: {
        roles: ['1']
    },

    children: [
        {
            path: '/managerDashboard',
            meta: {
                title: '系统首页',
                icon: 'dashboard',
            },
            component: resolve => require(['../../components/views/manager/managerView.vue'], resolve),
      }
        ,
        {
            path: '/personalInformation',
            component: resolve => require(['../../components/views/both/PersonalInformation.vue'], resolve),
            meta: {
                title: '个人信息',
                icon: 'documentation',
            }
        }
        // {
        //     path: '/createClass',
        //     component: resolve => require(['../../components/views/manager/managerView.vue'], resolve),
        //     meta: {
        //         title: '班级维护',
        //         icon: '班级'
        //     }
        // },
        // {
        //     path: '/showCreatedClass',
        //     component: resolve => require(['../../components/views/manager/managerView.vue'], resolve),
        //     meta: {
        //         title: '课程维护',
        //         icon: '课程'
        //     }
        // },
        //
        // {
        //     path: '/rollCall',
        //     component: resolve => require(['../../components/views/manager/managerView.vue'], resolve),
        //     meta: {
        //         title: '考勤管理',
        //         icon: '考勤'
        //     }
        // }, {
        //     path: '/studentManagement',
        //     component: resolve => require(['../../components/views/manager/managerView.vue'], resolve),
        //     meta: {
        //         title: '人员管理',
        //         icon: '班级'
        //     }
        // }
    ]
};

export default managerRouter
