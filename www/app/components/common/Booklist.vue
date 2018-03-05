<template>
  <div class="booklist">
    <h2>{{title}}<span>24小时热销更新</span><a :href="href">更多》</a></h2>
    <ul>
      <li v-for="item in booklist">
        <router-link  
          :to="{path:'/bookdetail/'+item.id}"
          @click.native="bookdetail(item.id)"
        >
          <div class="bookimg">
            <img :src="item.images" alt="">
          </div>
          <div class="bookdetail">
            <h3>{{item.name}}</h3>
            <p>{{item.intro}}</p>
            <div class="author">
              <i></i>
              <span>作者 ：{{item.author}}</span>
            </div>
            <div class="category">
              <span>{{item.kind}}</span>
              <span>{{item.finish?"完结":"连载中"}}</span>
              <span>{{item.content.length}}万字</span>
              <span>赞200</span>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        selfbooklist:[],
        href:""
      }
    },
    props:["booklist","title"],
    mounted(){
      this.href=this.$props.booklist[0].type
    },
    methods:{
      bookdetail(id){
        this.$store.commit("GOBOOK",{id})
      }
    }
  }
</script>
<style lang="less" scoped src="./Booklist.less" >

</style>
