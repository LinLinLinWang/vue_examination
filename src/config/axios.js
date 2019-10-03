import axios from 'axios'
import store from './store/store'

// 配置默认的host,假如你的API host是：http://api.htmlx.club
axios.defaults.baseURL = 'http://localhost:8888/knowledgebase'
//改为表单提交
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; //改为表单提交
// axios.interceptors.request.use(function (config) {
//     let data = config.data;
//     let params = new URLSearchParams() //将参数转换为url的形式
//     for (var key in config.data) {
//         params.append(key, data[key])
//     }
//     config.data = params;
//     return config;
// }, function (error) {
//     return Promise.reject(error);
// });

axios.defaults.transformRequest = [function (data) {
    let ret = ''
    for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
}]// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  console.log("添加请求拦截器");
  /// console.log("本地token"+localStorage.getItem("token"));
    return config
}, function (error) {
    console.log("请求错误");
    // 对请求错误做些什么
    return Promise.reject(error)
});
// http request 拦截器
axios.interceptors.request.use(
    config => {
   //     console.log(`${store.state.token}`);
        if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `${store.state.token}`;
            console.log("添加请求头的token"+store.state.token);
        }
        return config;
    },
    err => {
        return Promise.reject(err);

    });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    console.log("添加响应拦截器");
    if(response.data.token!=null){
        console.log("拦截器中后台返回新的token"+response.data.token);
    }else{

        console.log("拦截器中后台暂无返回新token");
    }



    return response
}, function (error) {
    // 对响应错误做点什么
    console.log("响应错误");
    return Promise.reject(error)
});

export default axios;




















