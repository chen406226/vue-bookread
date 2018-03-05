<template>
  <div class="loading">
    <p>玩命加载中...</p>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="less" scoped>
  .loading{
    position: fixed;
    width: 100%;
    height: 200px;
    line-height: 200px;
    left: 0;
    top: 50%;
    text-align: center;
    transform: translateY(-50%);
    p{
      background-color: #aaa;
    }
  }
</style>
