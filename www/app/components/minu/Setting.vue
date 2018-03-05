<template>
  <div class="setting">
    <div class="fontsize">
      <p @click="minusfs">A-</p>
      <div class="rang">
        <p class="dragf" @click="changefont">
          <b></b>
          <u class="dragc" ref="el"></u>
          <i></i>
        </p>
      </div>
      <p @click="addfs">A+</p>
    </div>
    <div class="bgc">
      <p v-for="(bg, idx) in bgcolor" :style="bg.color" @click="changebgc(idx)" >
        <span v-show="bgcoloridx==idx">*_*</span>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    props:['styleless'],
    data(){
      return {
        style:{
          bs:{
            width:"0px"
          }
        },
        pec:0,    //字体有5个格子当前位置
        startfontsize:1.6,  //字体初始大小rem
        ranges: 0, // 滑动条的起始  clientx 
        rangew: 0,  //  滑动条的宽度
        bgcoloridx:0,  //显示第几章背景图
        bgcolor:[{
          color:{backgroundColor:'#dccca8'}
        },{
          color:{backgroundColor:'#cad9e8'}
        },{
          color:{backgroundColor:'#943593'}
        },{
          color: {backgroundColor:'#077777'}
        }]
      }
    },
    methods:{
      changebgc(idx){
        if (idx == this.bgcoloridx) return ;
        this.bgcoloridx = idx;
        this.$props.styleless['background-color'] = this.bgcolor[this.bgcoloridx].color.backgroundColor;
        // 这里再把Reading里面的背景颜色更改
      },
      minusfs(){
        if (this.pec == 0) return ;
        const fontsize = (this.startfontsize + this.pec/10 - 0.1) + "rem";
        this.pec-=1;  //当前位于第几格子
        var bw = this.rangew*this.pec/5;
        $(this.$refs.el.parentNode).find('b').width(bw).siblings('i').width(this.rangew-bw) ;
        $(this.$refs.el).css('left',bw);
        this.$props.styleless['fontSize'] = fontsize;
      },
      addfs(){
        if (this.pec == 5) return ;
        const fontsize = (this.startfontsize + this.pec/10 + 0.1) + 'rem';
        this.pec +=1;
        var bw = this.rangew*this.pec/5;
        $(this.$refs.el.parentNode).find('b').width(bw).siblings('i').width(this.rangew-bw) ;
        $(this.$refs.el).css('left',bw);        
        this.$props.styleless['fontSize'] = fontsize;
      },
      changefont(e){
        const round =(e.clientX-this.ranges)*5
        var pec = Math.round(round/this.rangew);  //占了几格一共5
        pec = pec>5? 5: pec<0 ? 0: pec ;
        this.pec = pec;
        const bwidth = pec/5*this.rangew;
        // 这里控制着字体大小
        const fontsize = (parseFloat(this.startfontsize) +pec*0.1)+'rem';
        this.$props.styleless['fontSize'] = fontsize;
        // 这里是显示进度条
        $(e.target.parentNode).find("b").width(bwidth);
        $(e.target.parentNode).find('u').css("left",bwidth);
        // 不让p乱变所以把b和i的宽度都写上去
        $(e.target.parentNode).find("i").width(this.rangew - bwidth);
      },
      fontset(){
        const el = this.$refs.el;
        var self = this;
        const styleless = this.$props.styleless;
        // 将滑动条的注入
        // 获得到客户端的集合
        const maxwidth = parseInt(getComputedStyle(el.parentNode)['width']);
        this.rangew = maxwidth ;
        this.ranges = el.getBoundingClientRect().left ;
        el.addEventListener("touchstart",(e)=>{
          var dist = e.changedTouches[0].clientX - el.offsetLeft;
          el.addEventListener("touchmove",(doc)=>{
            // doc 和e 是一个元素都是u  不是document
            var newl = doc.changedTouches[0].clientX
            var dis = parseInt(newl-dist);
            // 这里是复制进度条里面的可以简化
            const round =(newl-this.ranges)*5 ;
            var pec = Math.round(round/this.rangew);  //占了几格一共5
            pec = pec>5? 5: pec<0 ? 0: pec ;
            self.pec = pec;
            const bwidth = pec/5*this.rangew;
            el.style.left = bwidth +"px";
            // 这里控制着字体大小
            const fontsize = (self.startfontsize +pec*0.1)+'rem';
            styleless['fontSize'] = fontsize;
            // 这里是显示进度条
            $(el.parentNode).find("b").width(bwidth);
            $(el.parentNode).find("i").width(maxwidth - bwidth);
          })

        })        
      }
    },
    mounted(){
      this.fontset();
      // 给div上点击事件
    }
  }
</script>

<style lang="less" scoped>
  .setting{
    position: fixed;
    width: 100%;
    height: 120px;
    bottom: 50px;
    left: 0;
    color: #ccc;
    background-color: rgba(0, 0, 0, .9);
    display: flex;
    flex-direction: column;
    .fontsize{
      flex: 1;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 0 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px dashed #ccc;
      p{
        flex: 1;
        height: 100%;
        font: 14px/30px "SimSun";
        text-align: center;
      }
      .rang{
        flex: 10;
        height: 30px;
        padding: 0 20px;
         p{
          width: 100%;
          height: 5px;
          display: flex;
          position: relative;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
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
    .bgc{
      flex: 3;
      display: flex;
      align-items: center;
      padding: 0 10px;
      font: 14px/20px "consolas";
      p{
        flex: 1;
        height: 30px;
        margin: 0 10px;
        text-align: center;
        span{
          color: red;
          font: 20px/30px "consolas";
        }
      }
    }  
  }
</style>
