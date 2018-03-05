<template>
  <div class="dir">
    <div class="dircon">
      <header>
        <h3>目录</h3>
      </header>
      <section>
        <p class="count"><b>共{{dirlist.length}}章</b><span @click="dirreverse">{{reverse?'正序↑':'倒序↓'}}</span></p>
        <i>正文卷</i>
        <div class="con">
          <p @click="changechapter(reverse?idx+1:dirlist.length-idx)" :class="{'cur':unit.idx==(reverse?idx+1:dirlist.length-idx)}" v-for="(cap,idx) in dirlist">{{idx+1}}、{{cap}}</p>
        </div>
      </section>
    </div>
    <div class="bg" @click="exitdir" ></div>
  </div>
</template>

<script>
  export default {
    props:['unit','setindex'],
    data(){
      return {
        reverse: false,
        dirlist: []  //获取列表信息给Dir组件使用
      }
    },
    mounted(){
      $(this.$el).height(window.innerHeight-50);
      this.getdirlist();
      const rev = localStorage.getItem('reverse');
      if (rev) {
        this.reverse = rev ;
      }

    },
    methods:{
      dirreverse(){
        this.reverse = !this.reverse;
        this.dirlist=this.dirlist.reverse();
        localStorage.setItem("reverse",this.reverse)
      },
      exitdir(){
        this.$props.setindex.showidx = -1;
      },
      async getdirlist(){
        const id = this.$route.params.id;
        const dirlist = await fetch('book/bookdir/'+id).then((res)=>{return res.json()});
        this.dirlist = dirlist.chapter;
      },
      changechapter(n){
        if (n == this.$props.unit.idx) return ;
        this.$props.unit.idx = n ;
        this.exitdir()  //更换章节之后退出目录
      }
    },
    watch:{

    }
  }
</script>
<style lang="less" scoped>
  .dir{
    position: fixed;
    width: 100%;
    top: 0;
    display: flex;
    .dircon{
      flex: 1;
      height: 100%;
      position: relative;
      overflow: hidden;
      background-color: white;
      header{
        width: 100%;
        height: 50px;
        position: absolute;
        left: 0;
        top: 0;
        background-color: #fff;
        border-bottom: 1px solid red;
        h3{
          text-align: center;
          color: red;
          line-height: 50px;
        }
      }
      section{
        height: 100%;
        padding-top: 50px;
        overflow-y: auto;
        box-sizing: border-box;
        // padding-left: 10px;
        p{
          width: 100%;
          overflow: hidden;
        }
        .count{
          height: 40px;
          font: 20px/40px "SimSun";
          width: 100%;
          padding: 0 10px;
          box-sizing: border-box;
          span{
            float: right;
          }
        }
        i{
          box-sizing: border-box;
          padding-left: 10px;
          display: inline-block;
          width: 100%;
          color: #aaa;
          height: 35px;
          background-color: #ddd;
          line-height: 40px;
        }
        .con{
          padding-left: 10px;
          line-height: 40px;
          p{
            height: 40px;
            border-bottom: 1px dashed #aaa;
            &.cur{
              color: red;
            }
          }
        }
      }
    }
    .bg{
      width:60px;
      height: 100%;
      background-color: rgba(0, 0, 0, .5)
    }
  }
</style>
