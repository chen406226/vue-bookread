<template>
  <div class="readtop">
    <div class="back">
      <mt-header title="">
      <mt-button slot="left" icon="back" @click="back">返回</mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data(){
      return {
        bar:false
      }
    },
    methods:{
      back(){
        this.$router.go(-1);
      }
    },
    computed:{
      // ...mapState(['bar'])
    },
    mounted(){
      this.bar=this.$store.state.bar
    }
  }
</script>

<style scoped>
  .readtop{
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
  }
</style>