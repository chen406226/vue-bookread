<template>
  <div class="bookdetail">
    <Loading v-show="loading"></Loading>
    <div class="content" v-if="!loading">
    <div class="detailcontent">
      <header>
        <div>
          <i @click="prev"></i>
          <h2>{{bookdetail.name}}</h2>
        </div>
        <router-link to="/" class="home">
          <i></i>
        </router-link>
      </header>
      <div class="detail">
        <div class="img">
          <img :src="bookdetail.images" alt="" @error="setErrImage($event)" >
        </div>
        <div class="info">
          <h3>{{bookdetail.name}}</h3>
          <p class="author">作者 ：{{bookdetail.author}}</p>
          <p class="kind">类型 ：{{bookdetail.kind}}</p>
          <p class="count">{{bookdetail.content.length}}万字 | {{bookdetail.finish?"完结":"连载中"}}</p>
          <Rate :score.number="7" class="rate" ></Rate>
        </div>
      </div>
      <div class="readbtn">
        <div>
          <mt-button type="default" @click="openbook">
            <router-link :to="{path:'/reading/'+bookdetail.id}" >开始阅读</router-link>
          </mt-button>
        </div>
        <div>
          <mt-button type="primary" @click="add">
            加入书架</mt-button>
          <div v-if="addbooklist"></div>
        </div>
      </div>
      <div class="intro">
        <p>{{bookdetail.intro}}</p>
      </div>
    </div>
    <div class="dir">
      <div class="head">
        <mt-cell  title="目录"  to="//github.com"  
        is-link  value="CHAPTER"></mt-cell>
      </div>
      <div class="advert">
        <img src="../assets/images/dow.jpg" alt="">
      </div>
      <div class="do">
        <div class="share">
          <div class="sha">
            <img src="../assets/images/ewm.png" alt="">            
            <p>分享</p>
          </div>
        </div>
        <div class="pay">
          <div class="pa">
            <img src="../assets/images/ewm.png" alt="">
            <p>支持我们</p>
          </div>
        </div>
      </div>
    </div>
    <div class="comment">
      <header>
        <h2>书友评价</h2>
        <span>{{commentnum}}条评论</span>
      </header>
      <div class="con">
        <div class="user" v-for="user in comment">
          <div class="avatar">
            <img :src="user.avator" alt="">
          </div>
          <div class="text">
            <p>{{user.name}}</p>
            <p>{{user.text}}</p>
            <p>{{user.time}}<span>0回复</span></p>
          </div>
        </div>
      </div>
      <footer>
        <router-link to="{path:'/more'}" >更多书友评价</router-link>
      </footer>
    </div>
    <div class="other">
      <div class="similar">
        <h2>类似推荐</h2>
        <div>
          <Recommend :booklist="similar" nott="0" title="热门小说" ></Recommend>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  import Loading from './loading/Loading.vue';
  import Rate from "./rate/Rate.vue";
  export default {
    data(){
      return {
        loading:true,
        bookdetail:{},
        similar:[],  //相似类型的
        addbooklist:false,
        commentnum:189, //评论条数
        comment:[{
            name:'Danni',
            text:'很喜欢,很好看',
            time:'2018-2-1',
            avator:'app/assets/images/avator1.jpg'
          },{
            name:'lumiaya',
            text:'very good',
            time:'2018-2-2',
            avator:'app/assets/images/avator2.jpg'            
          },{
            name:'aimi',
            text:'签到打卡',
            time:'2018-2-3',
            avator:'app/assets/images/avator1.jpg'            
          }
        ]
      }
    },
    created(){
      this.getbookid(this.$route.params.id)
    },
    methods:{
      async getbookid(id){
        this.loading=true;
        var book = await fetch("book/bookdetail/"+id).then((res)=>{
          return res.json()
        })

        this.bookdetail=book;
        const maxchapter = book.chapter.length;
        // 最大章节数让reading知道 并持久
        localStorage.setItem("maxchapter",maxchapter)
        this.loading=false;
      },
      prev(){
        this.$router.go(-1)
      },
      setErrImage(e){
        this.common.setErrImage(e);
      },
      add(){
        //根据用户名看书架里面有没有在判断
      },
      openbook(){
        this.$store.state.bar=false;
        // 饿了么阻止里面事件捕获只能在这里跳转
        this.$router.push({path:'/reading/'+this.bookdetail.id})
      }
    },
    mounted(){
      this.similar=this.$store.getters.typehot;
    },
    components:{
      Loading
    },
    computed:{
      // ...mapState(['bar'])  映射到这个this上面
      
    },
    filters:{
      // hot(v,$store){
      //   if (!v) return ;
      //   return $store.getters.typehot;
      // }
    },
    watch:{
      $route(to,from){
        this.getbookid(to.params.id)
      }
    }
  }
</script>
<style lang="less" scoped src="./Bookdetail.less" >

</style>
