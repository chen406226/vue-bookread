import Vue from 'vue';
import App from './App.vue';
import Vuex from 'vuex';
import router from './router';
import MintUI from 'mint-ui';
import All from './assets/js/utils.js'
// import storage from './storage.js'
import components from "./plugins/components.js"
// import directives from './plugins/directives.js'
// import i18n from './i18n'
import createLogger from './logger/logger.js';

Vue.config.productionTip=false;
Vue.use(Vuex);
Vue.use(All);
Vue.use(MintUI);
// Vue.filter('filtertype',(v)=>{
//   return 2
// })
Vue.use(components);
// Vue.use(directives)
const store=new Vuex.Store({
  state:{
    booklist:[],
    bar:false,  //阅读页面修改配置用的
    bookdetailid:1,
    filters:[],
    chapter:1   //阅读的章节   
  },
  mutations:{
    GOBOOK(state,payload){
      state.bookdetailid=payload.id;
    },
    CHAPTER(state,payload){
      state.chapter=payload.num
    },
    TOGGLEBAR(state){
      state.bar=!state.bar
    }
  },  
  getters:{
    typehot(state){
      return state.booklist.filter(item=>item.type=="hot")
    },
    typetop(state){
      return state.booklist.filter(item=>item.type=="top")
    },
    typefree(state){
      return state.booklist.filter(item=>item.type=="free")
    },
    typenewbook(state){
      return state.booklist.filter(item=>item.type=='newbook')
    },
    typeendbook(state){
      return state.booklist.filter(item=>item.type=="endbook")
    },
    typelike(state){
      return state.booklist.filter(item=>item.type=="like")
    },
    filter(state,getters){
      var filt=state.booklist.filter(item=>item.json());
      state.filters=getters.filter;
      console.log(filt)
      return filt;
    }

  },
  actions:{
  },
  plugins:[createLogger()]
})
new Vue({
  el:"#root",
  store,
  router,
  template:'<App/>', //代替跟标签
  components:{
    App
  }
})

// Vue.component("App",{
//   props:["djf"],
//   太lower
//   template:'<span></span>'
// })

