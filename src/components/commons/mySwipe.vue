<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(img,index) in imgs" :key="index">
        <a :href="img.url">
          <img :src="img.img">
        </a>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        imgs:[],//轮播图数据
      }
    }
    ,props:['url']
    ,created(){
      //发起请求获取轮播图数据
      this.$ajax.get(this.url)
          .then(res=>{
        this.imgs = res.data.message;
    })
    .catch(err=>{
        console.log('轮播图获取失败',err);
    })
    }
  }
</script>
<style scoped>
  .mint-swipe{
    height: 200px;
  }
  .mint-swipe img {
    height: 200px;
    width: 100%;
  }
</style>