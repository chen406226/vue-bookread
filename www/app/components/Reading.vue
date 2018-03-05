<template>
  <div class="reading" :style="[styleless]">
    <Loading v-if="loading"></Loading>
    <Readtop v-show="bar"></Readtop>
    <i class="shownav" ref="shownav"></i>
    <div class="readcontent" ref="readcon" :style="styleless" >
      <p>{{title}}</p>
      <div class="chapterContent" v-show="!loading">
        <h3>CHAPTER {{unit.idx}}</h3>
        <p :class="{indent:idx!=toggle.row}" v-for="(doc,idx) in en" :key="idx" @click="togglecn(idx)" >
          <span v-show="idx!=toggle.row">{{doc}}</span>
          <Showword v-if="idx==toggle.row" :toggle="toggle" :doc="doc" :index="idx" ></Showword>

        </p>
      </div>
      <!-- <div class="btnbar" v-show="!loading">
        <ul>
          <li class="prev" @click="prevchapter">上一章</li>
          <li class="next" @click="nextchapter">下一章</li>
        </ul>
      </div> -->
    </div>
    <div class="pageup" @click="pageup"></div>
    <div v-if="!loading">
      <Translate v-show="toggle.showcn" :toggle="toggle" :paragraph="paragraph" :cnn="cn" ></Translate>
    </div>
    <Minu v-show="bar" :setindex="setindex" :unit="unit" ></Minu>
    <div class="fixed">
    </div> 
    <transition name="bar">
      <Dir v-if="setindex.showidx==1" :unit="unit" :setindex="setindex" ></Dir>
    </transition> 
    <transition name="plan">
      <Plan v-if="setindex.showidx==2" :unit="unit"></Plan>
    </transition>
    <transition name="setting">
      <Setting :styleless="styleless" v-if="setindex.showidx==3"></Setting>
    </transition>

  </div>
</template>

<script>
  import Readtop from './minu/Readtop.vue';
  import Translate from './translate/Translate.vue';  // 翻译框
  import Showword from './translate/Showword.vue';  //提供可选中word
  import Minu from './minu/index.vue';
  import Dir from './minu/Dir.vue';
  import Setting from './minu/Setting.vue';
  import Plan from './minu/Plan.vue';
  import Loading from './loading/Loading.vue'; 

  export default {
    data(){
      return {
        unit:{
          idx:1,    //现在看到第几章了
          maxidx:5   //这本书最大多少章 没读取数值改 
        },   // 第几章  给Dir组件使用
        bar:false,
        loading:false,
        readinfo:'',   //阅读历史信息
        styleless:{
          'fontSize':'1.6rem',
          'background-color':'#dccca8'
        },  //样式  可以在Setting组件中进行配置
        bgcolor:'',
        bgnight:false,
        title:'登录；刷卡机',
        cn:[],
        en:[],
        paragraph:0,
        toggle:{    //可以给子组件操作的数据
          idx:-1,   //传递给Showword组件显示可不可以选中单词查询-1不显示
          showcn:false,  //显示中文吗
          row:-1,     //要翻译的段落是多少
          searchword:''   //提供搜索的单词给Tra里面的Ws
        },
        setindex:{
          showidx:-1  //显示那个设置页面
        },
        homexy:{
          x:0,
          y:0
        }
      }
    },
    crated(){
      this.unit.idx = 1;
      return ;
      //读取本地存储的文字大小,颜色。。。
      if (localStorage.getItem("fsize")) {
        this.$store.state.fsize=localStorage.getItem("fsize")
      }
      if (localStorage.getItem("bgcolor")) {
        this.$store.state.bgcolor=localStorage.getItem("bgcolor")
      }
      // 加载阅读进度数据
      const readinfo = localStorage.getItem("readinfo")
      const id=this.$route.params.id;
      // 当前数据以前阅读过并有阅读进度
      if (readinfo&&readinfo[id]) {
        this.readinfo=readinfo;
        this.getbook(id,this.readinfo[id].chapter)  //映射章节
        this.$store.commit("CHAPTER",{num:this.readinfo[id].chapter})
      }else{
        // 当前书记没读过但有其他书籍记录
        if(readinfo){
          this.readinfo=readinfo;
          this.getbook(id,1)
          this.$store.commit("CHAPTER",1)
        }else{
        // 第一次进来
          this.readinfo[id]={
            book:id,
            chapter:1
          }
          this.getbook(id,1)
          this.$store.commit("CHAPTER",1)
        }
      }
    },
    mounted(){
      this.getbook(this.unit.idx);  //用数据库的话在这里设置就可以了
      // 给shownav按钮添加拖拽效果
      // $(this.$refs.shownav).draggable({
      //   containment:"parent"
      // })
      this.addevent(this.$refs.shownav)  //添加home键点击拖动事件
    },
    methods:{
      clickbar(){
        this.$store.commit("TOGGLEBAR");
      },
      changebar(){
        this.bar=!this.bar ;
        if (!this.var) {
          this.setindex.showidx = -1
        }
      },
      togglecn(idx){
        this.paragraph=idx;
        if(!this.toggle.showcn){
          this.toggle.showcn=true;
        }else{
          if (this.toggle.showcn&&this.toggle.row!=-1) {
            this.toggle.row=idx;
        } 
        }
      },
      pageup(){
        // 向上翻页
        const target = document.body.scrollTop - window.screen.height-80;
        this.startscroll(target,-20)
      },
      pagedown(){
        const target = document.body.scrollTop - window.screen.height-80;
        this.startscroll(target,20)
      },
      startscroll(target,speed){
        const times=null;
        times = setInterval(()=>{
          if(speed>0){
            if (document.body.scrollTop<=target) {
              document.body.scrollTop += speed
            }
            if (document.body.scrollTop>target||document.body.scrollTop+
            window.screen.height>=document.body.scrollHeight) {
              
            }
          }else{

          }
        },)
      },
      prevchapter(){

      },
      nextchapter(){

      },
      addevent(e){
        const fnend = this.changebar;
        const fnmove = (d)=>{
          const movex = d.changedTouches[0].clientX - this.homexy.homex ;
          const movey = d.changedTouches[0].clientY - this.homexy.homey;
          $(e).css({"left":movex,"top":movey})
          e.removeEventListener("touchend",fnend);
        }
        e.addEventListener('touchstart',(event)=>{
          this.homexy.homex = event.changedTouches[0].clientX - e.offsetLeft ;
          this.homexy.homey = event.changedTouches[0].clientY - e.offsetTop ;
          e.addEventListener('touchend',fnend)
          e.addEventListener('touchmove',fnmove)
        },true)



      },
      async getbook(chapter){
        if (this.loading) return;
        this.loading=true;
        const id = this.$route.params.id;
        var book = await fetch("bookread/"+id+"/"+chapter).then((book)=>{
          return book.json()})
        this.loading= false  ;
        this.unit.idx = chapter;
        this.unit.maxidx = localStorage.getItem("maxchapter");
        this.title=book.title;
        console.log(Date.parse(new Date()))
        this.cn = book.cn.split("&");
        this.en = book.en.split("&");
        this.$store.state.windowHeight=window.screen.height
      }
    },
    components:{
      Readtop,Translate,Showword,Minu,Dir,Setting,Plan,Loading
    },
    watch:{
      'unit.idx'(neww,oldw){
        console.log(Date.parse(new Date()))        
        this.getbook(neww)
      }
    }
  }
</script>
<style lang="less" scoped>
  .reading{
    margin: 0;
    width: 100%;
    height: 100%;
    // font-size: 30px;
    position: relative;
    .shownav{
      position: fixed;
      z-index: 999999999;
      display: block;
      width: 30px;
      height: 30px;
      left: 0;
      top: 0;
      background-color: #333;

      border: 20px solid #000;
      border-radius: 50%;
      opacity: 0.3;
    }
    p.indent{
      text-indent: 2em;
    }
    h3{
      text-align: center;
    }
    .fixed{
      position: absolute;
      left: 0;
      top: 0;
    }
  }








</style>












