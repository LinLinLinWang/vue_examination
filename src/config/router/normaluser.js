import Layout from '../../components/views/Home.vue'
const normaluserRouter = {
    path: '/normaluser',
    component: Layout,
    meta: {
        roles: ['0']
    },
    children: [

        {
            path: '/normalUserDashboard',
            meta: {
                title: '系统首页',
                icon: 'dashboard',
            },
            component: resolve => require(['../../components/views/normaluser/normaluserView.vue'], resolve),
        },
        {
            path: '/information',
            component: resolve => require(['../../components/views/normaluser/normaluserView.vue'], resolve),
            meta: {
                title: '信息维护',
                icon: 'documentation',
            }
        },
        {
            path: '/SetFaceImg',
            name: '人脸信息',
            meta: {
                title: '人脸信息',
                icon: '人脸',
            },
            component: resolve => require(['../../components/views/normaluser/normaluserView.vue'], resolve)
        },
        {
            path: '/myClass',
            name: 'myClass',
            component: resolve => require(['../../components/views/normaluser/normaluserView.vue'], resolve),
            meta: {
                title: '我的班级',
                icon: '班级'
            }
        }]
};

export default normaluserRouter
