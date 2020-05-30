import axios from 'axios';

export function request(config){
    //1. 创建axios实例
    const instance = axios.create({
        baseURL:'http://152.136.185.210:8000/api/n3',
        timeout:5000,
        // headers:{}
    })

    //2.axios的拦截器
    //2.1请求拦截
    instance.interceptors.request.use(req=>{
        // console.log(req)
        return req
    },err=>{
        console.log(err)
    })

    instance.interceptors.response.use(res=>{
        return res
    },err=>{
        console.log(err)
    })


    //3.发送真正的网络请求
    return instance(config)  //instance调用返回的本身就是promise
}