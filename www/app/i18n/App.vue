<template>
  <div class="box">
    <span :key="locale?'en':'cn'" @click="changeLang" >{{lang}}</span>
    <li>
      <!-- <router-link to="/indexCon" >{{message.index}}</router-link> -->
    </li>
    <Vhead></Vhead>
    <!-- <Vsidebar></Vsidebar> -->
    <!-- <Vplay></Vplay> -->
    <!-- <router-view class="router-view" v-if="!isShowPlay" :id="theme" ></router-view> -->
    <!-- <Vfooter></Vfooter> -->
    <!-- <About></About> -->
    <!-- <Login></Login> -->
  </div>
</template>
<script>
  import Vhead from './components/common/Vhead.vue'
  export default {
    data(){
      return {
        locale:'cn',
        lang:'ENG'
      }
    },
    components:{
      Vhead
    },
    computed:{
      isShowPlay(){
        return false
      },
      theme(){
        return 'red'
      }
    },
    methods:{
      changeLang(){
        if (this.locale=='cn') {
          this.lang="ENG";
          this.locale='en'
        }else{
          this.lang="中文";
          this.locale='cn';
        }
        localStorage.setItem('ing',this.locale=='cn'?'0':'1',1);
      }
    },
    mounted(){
      if (localStorage.getItem("ing")=='0') {
        this.locale='cn';
        this.lang='ENG';
      }else{
        this.locale='en';
        this.lang='中文';
      }
      localStorage.setItem("ing",this.locale=='cn'?'0':'1',1)
    },
    watch:{
      locale(val){
        this.$i18n.locale=val;
        console.log("locale",val)
      }
    }
  }
</script>
<style lang="less" scoped src="./style/app.less" >
</style>



