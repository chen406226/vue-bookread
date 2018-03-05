import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home.vue';
import Category from '../components/Category.vue';
import Bookdetail from '../components/Bookdetail.vue';
import Reading from '../components/Reading.vue';

Vue.use(Router)

export default new Router({
  routes:[
    {
      path:"/",
      redirect:'/home'
    },
    {
      path:"/home",
      name:'home',
      component:Home
    },
    {
      path:'/category',
      name:'category',
      component:Category
    },
    {
      path:'/bookdetail/:id',
      name:'bookdetail',
      component:Bookdetail
    },
    {
      path:'/reading/:id',
      name:"reading",
      component:Reading
    },{
      // 禁止路由乱输入重定向
      path:"*",redirect:"/"
    }
    
    
    
    
  ]
})
