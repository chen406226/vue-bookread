<template>
  <div class="recommend">
    <h2 v-if="!nott" class="title">{{title}}<span>起点编辑推荐</span></h2>
    <div class="list">
      <ul class="listul" :style="{width:width+'px'}" >
        <li class="listli" v-for="item in selfbooklist" >
          <router-link
          class="link"
          :to="{path:'/bookdetail/'+item.id}" 
          @click.native="bookdetail(item.id)"
          >
            <img :src="item.images" alt="" @error="setErrImage($event)" >
            <p class="bookname">{{item.name}}</p>
            <p class="bookauthor">{{item.author}}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        selfbooklist:[2],
        width:0
      }
    },
    props:['booklist',"title",'nott'],
    methods:{
      initlist(){
        this.selfbooklist=this.$props.booklist;
      },
      bookdetail(id){
        this.$store.commit("GOBOOK",{id});
      },
      setErrImage(e){
        this.common.setErrImage(e);
      }
    },
    mounted(){
      this.initlist();
      this.width=110*this.selfbooklist.length>window.innerWidth?110*this.selfbooklist.length:window.innerWidth
    }
  }
</script>
<style lang="less" scoped src="./Recommend.less" >

</style>
