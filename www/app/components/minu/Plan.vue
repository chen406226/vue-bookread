<template>
  <div class="plan">
    <header>
      <p>第{{nextidx}}章<span>{{plan}}/%</span></p>
    </header>
    <div class="rang">
      <p class="dragf">
        <b></b>
        <u class="dragc" ref="el"></u>
        <i></i>
      </p>
    </div>

  </div>
</template>

<script>
  export default {
    props:['unit'],
    data(){
      return {
        plan:0,  //书的进度条
        maxwidth:0,  // 滑动条的最大宽度
        dist:0,    //  滑动条的起点
        touchend:false   //在move里面避免多重监听只执行一次
      }
    },
    computed:{
      nextidx(){
        const nplan = Math.round(this.plan/100*this.$props.unit.maxidx);
        return nplan==0? 1: nplan;
      }
    },
    mounted(){
      // 初始设置位置
      const el = this.$refs.el;
      const self = this;

      const pic = (this.$props.unit.idx/this.$props.unit.maxidx*100).toFixed(1);
      const maxwidth = parseInt(getComputedStyle(el.parentNode)['width']);
      this.dist = el.parentNode.getBoundingClientRect().left
      this.maxwidth = maxwidth;
      if (this.$props.unit.idx==1) {
        $(el.parentNode).find('b').width(0);
        $(el).css('left',0);
        this.plan = 0;
      }else{
        $(el.parentNode).find('b').width(maxwidth*pic/100);
        $(el).css('left',maxwidth*pic/100);
        this.plan = pic;
      }

      el.addEventListener("touchstart",(e)=>{
        // 初始状态display:none时候获得的width 100%
        document.addEventListener("touchmove",self.docmove);

      },true)
        el.addEventListener("touchend",(en)=>{
          var chapter = Math.round(self.plan/100*self.$props.unit.maxidx);
          if (chapter==0) {
            chapter = 1;
          }            
          if (chapter!=self.$props.unit.idx) {
            self.$props.unit.idx = chapter;
            console.log(Date.parse(new Date()))
          }
          document.removeEventListener("touchmove",self.docmove)
        },true)
    },
    methods:{
      docmove(e){
        const doc = this.$refs.el;
        const self = this;
        var move = e.changedTouches[0].clientX;
        var dis = parseInt(move-this.dist);
        var bwidth = dis;
        if (dis<=0) {
          bwidth = 0;
          e.target.style.left = '0px';
        }else if(dis>this.maxwidth) {
          bwidth = this.maxwidth;
          e.target.style.left = this.maxwidth+'px';
        }else {
          e.target.style.left = dis +"px";
        }
        $(e.target.parentNode).find("b").width(bwidth);
        $(e.target.parentNode).find("i").width(this.maxwidth - bwidth);
        var n = (bwidth/this.maxwidth*100).toFixed(1)
        this.plan = n;
      }
    }
  }
</script>

<style lang="less" scoped>
  .plan{
    position: fixed;
    width: 100%;
    height: 100px;
    bottom: 50px;
    left: 0;
    color: #ccc;
    font:16px/24px "SimSun";
    background-color: rgba(0, 0, 0, .9);
    display: flex;
    flex-direction: column;
      header{
        height: 40px;
        width: 100%;
        position: relative;
        p{
          text-align: center;
          span{
            font-size: 12px;
            position: absolute;
            left: 50%;
            bottom: 0;
            transform:translateX(-50%); 
          }
        }
        border-bottom: 1px dashed #ccc;
      }
      .rang{
        flex: 1;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 20px;
        width: 100%;
        position: relative;
        p{
          width: 100%;
          height: 5px;
          flex: 1;
          display: flex;
          b{
            display: inline-block;
            height: 100%;
            float: left;
            background-color: red;
          }
          u{
            display: block;
            position: absolute;
            width: 20px;
            height: 20px;
            border-radius: 50%;          
            background-color: blue;
            transform:translate(-50%,-40%) 
          }
          i{
            flex: 1;
            display: inline-block;
            height: 100%;
            float: left;
            background-color: rgba(200, 200, 200, .8)
          }
        }
      }
    }

</style>
