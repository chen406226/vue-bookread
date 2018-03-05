<style lang="stylus" scoped>
  tr{
    border:1px solid red;
    td{
      border:1px solid #333;
      button{
        width:20px ;
        height: 20px;
      }
    }
  }
</style>


<template>
<div>
  <tr>
    <td>{{item.title}}</td>
    <td>单价{{item.danjia}}</td>
    <td>
      <button @click="jian">--</button>
      {{item.shuliang}}
      <button @click="jia">++</button>
    </td>
    <td>总价{{zongjia}}</td>
  </tr>
</div>
</template>
<script>
  export default {
    data(){
      return {
        a:100
      }
    },
    props:["item"],
    methods:{
      jian(){
        this.item.shuliang=this.item.shuliang==0?0:this.item.shuliang-1;
      },
      jia(){
        this.item.shuliang++
      }
    },
    computed:{
      zongjia(){
        this.item.zongjia=this.item.shuliang*this.item.danjia
        return this.item.zongjia
      }
    }
  }
</script>
