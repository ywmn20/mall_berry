import Vue from 'vue';
import VueRouter from "vue-router";

const Home=()=>import('views/home/Home')
const Category=()=>import('views/category/Category')
const Cart=()=>import('views/cart/Cart')
const Profile=()=>import('views/profile/Profile')
const Detail=()=>import('views/detail/Detail')

Vue.use(VueRouter);

export default new VueRouter({
  routes:[
    {
      path:'',
      redirect:'/home'
    },
    {
      path:'/home',
      component:Home
    },
    {
      path:'/cart',
      component:Cart
    },
    {
      path:'/category',
      component:Category
    },

    {
      path:'/profile',
      component:Profile
    },
    {
      path:'/detail/:id',
      component:Detail
    },
    // {
    //   path:'/detail',
    //   component:Detail
    // },

  ],
  mode:'history'
})
