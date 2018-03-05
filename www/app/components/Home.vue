<template>
  <div class="container">
    <nav class="nav-header">
      <header>
        <a href="/" class="brand" ></a>
        <a href="/" class="avatar" ></a>
      </header>
      <div class="swipe" @click="clickswipe">
        <mt-swipe :auto="5000" @change="handleChange"  >
          <mt-swipe-item><img src='../assets/images/1.jpg'></mt-swipe-item>
          <mt-swipe-item><img src='../assets/images/2.jpg'></mt-swipe-item>
          <mt-swipe-item><img src='../assets/images/3.jpg'></mt-swipe-item>
          <mt-swipe-item><img src='../assets/images/4.jpg'></mt-swipe-item>
          <mt-swipe-item><img src='../assets/images/5.jpg'></mt-swipe-item>
        </mt-swipe>        
      </div>
    </nav>
    <nav class="nav-home">
      <router-link class="guide-nav"
      v-for="(item,index) in type" 
      :to="{path:'category',query:{type:item.num}}"
      :key="item.num"
      @click='openBookCategory(item.num)'
      >
        <i class="icon icon-sort"></i>
        <h4 class="guide-nav-h">{{item.word}}</h4>
      </router-link>
    </nav>
    <div v-if="!loading">
      <Recommend :booklist="$store.state.booklist | hot($store)"  title="热门小说" ></Recommend>
      <!-- <Recommend :booklist="$store.state.booklist | top($$store)" title="排行榜"></Recommend> -->
      <!-- <Recommend :booklist="$store.state.booklist | free($store)" title="限时免费"></Recommend> -->
      <Booklist :booklist="$store.state.booklist | newbook($store)" title="新书抢鲜"></Booklist>
      <!-- <Booklist :datalist="$store.state.booklist | endbook($store)" title="畅销完本"></Booklist> -->
      <!-- <Booklist :datalist="$store.state.booklist | like($store)" title="猜你喜欢"></Booklist> -->
    </div>
    <Loading v-show="loading"></Loading>
  </div>
</template>

<script>
import Recommend from './common/Recommend.vue';
import Booklist from './common/Booklist.vue';
import Loading from './loading/Loading.vue'

  export default {
    data(){
      return {
        nowswipeindex:0,
        swipepath:['/1','2','3','4','5'],
        booklist:[],
        type:[
          {num:1,word:'天文'},
          {num:2,word:'名著'},
          {num:3,word:'传记'},
          {num:4,word:'历史'},
          {num:5,word:'教育'},
        ],
        loading:false
      }
    },
    created(){
      this.getData()
    },
    mounted(){
    },
    methods:{
      async getData(){
        this.loading=true;
        const doc= await fetch('book/booklist').then(doc=>doc.json())
        this.loading=false; //获取数据之后读取状态改变
        this.$store.state.booklist=doc.booklist;
      },
      handleChange(index){
        this.nowswipeindex=index;
        
      },
      clickswipe(){
        this.$router.push({path:'category'})
        // this.$router.go({name:"category",params:{userId:1}})
      }
    },
    components:{
      Loading,Recommend,Booklist
    },
    // 注册一个过滤器
    filters:{
      hot(v,$store){
        // store中拿到的数据传进去出来value然后过滤
        if (!v) return;
        // 一直刷新页面也没事数据多子组件再分页吧
        return $store.getters.typehot;
      },
      top(v,$store){
        if(!v) return ;
        return $store.getters.typetop;
      },
      free(v,$store){
        if(!v) return ;
        return $store.getters.typefree
      },
      newbook(v,$store){
        if(!v) return ;
        return $store.getters.typenewbook;
      },
      endbook(v,$store){
        if(!v) return ;
        return $store.getters.typeendbook;
      },
      like(v,$store){
        if(!v) return ;
        return $store.geetters.typelike;
      }
    }
  }
</script>

<style lang="less" scoped src="../style/Home.less" >
</style>
