<template>
  <div class="score">
    <span  ref="span" v-for="idx in 5" ></span>
    <i>{{score}}分/{{peoplenum}}人评过</i>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        peoplenum:189
      }
    },
    props:["score"],
    created(){
      console.log(this.$props.score)
    },
    mounted(){
      const score = this.$props.score*0.5;
      this.$refs.span.forEach((span,index)=>{
        if (score-index>=1) {
          span.className="on";
        }else if(score-index>0&&score-index<1){
          span.className="half";
        }else{
          span.className="off";
        }
      })
    }
  }
</script>
<style lang="less" scoped>
  .score{
    span{
      display: inline-block;
      width:20px;
      height: 20px;
      margin-right: 2px;
      background-size: 100%;
      &.on{
        background: url('../../assets/images/star_on.png');
      }   
      &.half{
        background: url('../../assets/images/star_half.png');
      }
      &.off{
        background: url('../../assets/images/star_off.png');
      }
    }
    i{
      line-height: 20px;
      color: #888;
    }
  }
</style>
