<template>
  <div class="transl">
    <p class="se">
      <input @input="changese" type="search" v-model="se" />
      <button :disabled="disable" @click="checksearch" >搜索单词</button>
    </p>
    <div v-if="!loading" class="con" >

      <div class="type">

        <div class="audi">{{translate.translation}}

          <span> 英 </span><b>[{{translate.basic['uk-phonetic']}}]</b>
          <span> 美 </span><b>[{{translate.basic['us-phonetic']}}]</b>
          <i @click="playaudio"></i>
          <audio :src="audiosrc" ref="audioplay" ></audio>
        </div>
        <p v-for="v in translate.basic.explains">{{v}}</p>
      </div>
      <p class="center">短句</p>
      <div class="sort">
        <p v-for="v in translate.web">
          <span class="head">[ {{v.key}} ] : </span>
          <span class="re" v-for="(val, indx)  in v.value">{{indx+1}} . {{val}} ;</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:['toggle','searchword'],
    data(){
      return {
        translate:{},   //翻译之后的文字
        loading:true,
        se:'',       //给这个子组件增加独立的搜索功能
        disable:true,
        nowse:'',    //当前搜索的单词,同样的单词不让按按钮
        audiosrc:''   
      }
    },
    methods:{
      dosearch(n){
        this.nowse=n;
        // this.audiosrc =  "http://dict.youdao.com/dictvoice?audio="+n;
        // return ;
        const key='346f66bfe53a3bd3';
        const appSecret= 'Piwel6vRPPJNl4mOrI2WFQkYES5pdS0R';//注意：暴露appSecret，有被盗用造成损失的风险
        const salt = (new Date).getTime();
        const query = n ;
        // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
        const from = 'en';
        const to = 'zh-CHS';
        const str1 = key + query + salt +appSecret;
        const sign = md5(str1);
        const self = this;
        $.ajax({
          url:'http://openapi.youdao.com/api',
          type:'post',
          dataType:'jsonp',
          data:{
            q:query,
            appKey:key,
            salt:salt,
            from:from,
            to:to,
            sign:sign
          },
          success:function(data){
            self.translate = data ;
            self.loading = false;
            self.audiosrc =  "http://dict.youdao.com/dictvoice?audio="+n;
          }
        })
        
      },
      changese(){
        if (this.se!=this.nowse&&this.se) {
          this.disable=false;
        }else{
          this.disable=true;
        }
      },
      checksearch(){
        this.dosearch(this.se)
      },
      playaudio(){
        this.$refs.audioplay.play()
      }
    },
    watch:{
      'toggle.searchword'(newt,oldt){
        if (newt!=oldt) {
          // 先检测符合查询的条件不
          this.dosearch(newt);    //*******
          // this.translate={
          //   basic:{
          //     explains:['v,破坏','adj,被毁坏'],
          //     ukspeech:'distroid',
          //     usspeech:'dIstroi'
          //   },
          //   translation:['摧毁了'],
          //   web:[{
          //     key:"Destroyed",
          //     value:['毁掉','毁于一旦','毁坏']
          //   },{
          //     key:'be destroyed',
          //     value:['被损坏','灭亡','颠覆']
          //   },{
          //     key:'The destroyed',
          //     value:['被毁灭','被毁灭']
          //   }]
          // }
          this.se= newt;
        }
        // this.loading=false
      }
    }
  }
</script>
<style lang="less" scoped>
  .transl{
    width: 100%;
    height: 100%;
    position: relative;
    .se{
      position: absolute;
      width: 100%;
      height: 40px;
      left: 0;
      top: 0;
      input{
        width: 50%;
        font:18px/40px "consolas";
        color:rgb(75, 28, 185);  
        text-indent: 1em;       
      }
      button{
        color: rgb(103, 136, 11);
        &:disabled{
          background:#444;
        }
      }
    }
    .con{
      padding-top: 40px;
      width: 100%;
      .type{
        background-color: #bbb;
        .audi{
          width:100%;
          height: 30px;
          text-indent: 1em;
          line-height: 30px;
          border-bottom: 1px dashed #fff;
          i{
            float: right;
            margin-right: 100px;
            width: 30px;
            height: 30px;
            background: url('../../assets/images/audio.png') no-repeat;
            background-size: cover;
            color: blue;
            border-left: 1px dashed #666;
            border-right: 1px dashed #666;
          }
        }
      }
      .sort{
        background-color: #ccc;
        .head{
          margin-right: 20px;
          background-color: #fff;
        }
        .re{
          margin: 0 10px;
        }
      }
      .center{
        text-align: center;
      }
    }
  }
</style>
