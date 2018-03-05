<template>
  <div class="minu">
    <div class="flexbox" @click="minugo(1)">
      <i class="iconfont icon-caidan"></i><span>目录</span>
    </div>
    <div class="flexbox" @click="minugo(2)">
      <p><i class="iconfont icon-zuijinbofang"></i><span>进度</span></p>
    </div>
    <div class="flexbox" @click="minugo(3)">
      <p><i class="iconfont icon-shezhi"></i><span>设置</span></p>
    </div>
    <div class="flexbox" @click="goprev()" >
      <p><i class="iconfont icon-previous"></i><span>上一章</span></p>
    </div>
    <div class="flexbox" @click="gonext()">
      <p><i class="iconfont icon-next"></i><span>下一章</span></p>
    </div>
    

  </div>
</template>

<script>
  export default {
    data(){
      return {
        showidx: -1 //这里可以和父组件交互改变来显示
        
      }
    },
    props:['setindex','unit'],
    mounted(){
    },
    methods:{
      minugo(n){

        if (n==this.$props.setindex.showidx) {
          this.$props.setindex.showidx = -1;
        }else{
          this.$props.setindex.showidx = n;
        }

      },
      goprev(){
        this.$props.setindex.showidx = -1;
        if (this.$props.unit.idx>1) {
          this.$props.unit.idx = this.$props.unit.idx -1;
        }
      },
      gonext(){
        this.$props.setindex.showidx = -1;
        if (this.$props.unit.idx<this.$props.unit.maxidx) {
          this.$props.unit.idx = this.$props.unit.idx + 1;
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .minu{
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99999;
    width: 100%;
    height: 50px;
    background-color: blue;
    display: flex;
    font:12px/20px "consolas";
    .flexbox{
      text-align: center;
      flex: 1;
      height: 50px;
      display: flex;
      flex-direction: column;
      span{
        flex: 2;
        display: block;
        width:100%;
        color:#ccc;
      }
      i{
        flex: 3;
        display: block;
        width: 100%;
        font-size: 25px;
        line-height: 30px;
      }
    }
  }
</style>
