<template>
  <div class="showcn" :style="height" >
    <header>
      <div class="left">
        <mt-button @click="changecur('yiwen')" :class="{cur:cur=='yiwen'}" size="small">译文</mt-button>
        <mt-button @click="changecur('cidian')" :class="{cur:cur=='cidian'}" size="small">词典</mt-button>
      </div>
      <div class="right">
        <mt-button @click="changeup" size="small">↑</mt-button>
        <mt-button @click="changedown" size="small">↓</mt-button>
        <mt-button @click="hide" size="small">V</mt-button>        
      </div>
    </header>
    <div class="con">
      <div v-show="cur=='yiwen'" class="yiwen">
        <p>{{para}}</p>
      </div>
      <div v-show="cur=='cidian'" class="cidian">
        <Wordsearch :toggle="toggle" :searchword="searchword" ></Wordsearch>
      </div>
    </div>
  </div>
</template>

<script>
  import Wordsearch from './Wordsearch.vue';   //显示翻译单词的组件

  export default {
    data(){
      return {
        para:'',   //那一段落的翻译
        word:[],   //分解提供查询的单词
        allword:[],   //提供的这一个章节的翻译
        height:{
          height:"250px"   //设置可控高度
        },
        cur:'yiwen',
        search:false,
        searchword:''
      }
    },
    props:['cnn','paragraph','toggle'],
    mounted(){
      if (this.$props.cnn.length>0) {
        this.para=this.$props.cnn[this.$props.paragraph];
        this.allword=this.$props.cnn
        this.word=this.para.split(" ");
      }

    },
    methods:{
      handleClose(){

      },
      updatep(newp){
        this.para=this.allword[newp];
      },
      updatecnn(newcnn){

      },
      changecur(e){
        if (this.cur==e) return ;
        this.cur=e;
        if(e=='cidian'){
          this.$props.toggle.row=this.$props.paragraph;
        }
      },
      changeup(){
        this.height.height = parseInt(this.height.height)+10+"px";
      },
      changedown(){
        this.height.height = parseInt(this.height.height)-10+"px";
      },
      hide(){
        // 因为前面用的是v-show所以在来没有更新所以再进来必须改成译文页面
        this.cur='yiwen';
        this.$props.toggle.row=-1;
        this.$props.toggle.showcn=false;
      }
    },
    components:{
      Wordsearch
    },
    watch:{
      paragraph(newp,oldp){
        this.updatep(newp)
      },
      cnn(newcnn,oldw){
        this.updatecnn(newcnn)
      }
    }
  }
</script>
<style lang="less" scoped src="./Translate.less" >

</style>
