<template>
  <span class="wai">
    <b :class="{underln:udline(en)}" @click="searchword(en)" v-for="en in word" href="" >{{en}}</b>   
  </span>
</template>

<script>
  export default {
    data(){
      return {
        word:[]
      }
    },
    props:['toggle','doc','index'],
    mounted(){
      this.word=this.$props.doc.split(" ");
    },
    methods:{
      searchword(w){
        const word = w.match(/\w+/);
        if (word) {
          //发送要查询的单词与有道api接口
          this.$props.toggle.searchword=word[0]
        }
      },
      udline(w){
        const word = w.match(/\w+/);
        // 判断是不是标点符号标点符号不给加下划线标识
        if (word) {
          return true;  
        }else{
          return false;
        }
      }
    },
    computed:{

    }
  }
</script>

<style lang="less" scoped>
.wai{
  width: 100%;
  display: inline-block;
  b{
    font-weight: normal;
    display: inline-block;
    text-align: left;
    border: 1px solid #fff;
    margin-right: 1rem;
    &:first-child{
      text-indent: 2em;
    }
  }
  .underln{
    text-decoration: underline;
  }

}
</style>

