import axios from 'axios'

// 配置默认的host,假如你的API host是：http://api.htmlx.club
axios.defaults.baseURL = 'http://localhost:8080'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  console.log("添加请求拦截器");
    return config
}, function (error) {
    console.log("请求错误");
    // 对请求错误做些什么
    return Promise.reject(error)
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    console.log("添加响应拦截器");
    return response
}, function (error) {
    // 对响应错误做点什么
    console.log("响应错误");
    return Promise.reject(error)
});

export default axios;