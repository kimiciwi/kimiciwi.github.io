<template>
  <div class="tmpl">
    <nav-bar title="图片详情"></nav-bar>
    <div class="photo-title">
      <p>{{imgInfo.title}}</p>
      <span>发起日期：{{imgInfo.add_time | convertDate}}</span>
      <span>{{imgInfo.click}}次浏览</span>
      <span>分类：民生经济</span>
    </div>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li v-for="(img,index) in imgs" :key="index" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <!--<img :src="img.src" alt="">-->
        <img class="preview-img" :src="img.src" height="100" @click="$preview.open(index, imgs)">
      </li>

    </ul>
    <div class="photo-desc">
      <p v-html="imgInfo.content"></p>
    </div>
    <comment :cid="imgId"></comment>
  </div>
</template>
<script>
export default{
  data(){
    return {
      imgId:'',
      imgInfo:{},
      imgs:[],
    }
  },
  created(){
    this.imgId = this.$route.params.imgId;
    //合并请求，保证两个请求都成功
    this.$ajax.all([
          this.$ajax.get('getimageInfo/'+ this.imgId),
          this.$ajax.get('getthumimages/'+ this.imgId)
        ])
        .then( this.$ajax.spread( (infoRes,imgsRes)=>{
          this.imgInfo = infoRes.data.message[0];
    this.imgs = imgsRes.data.message;
    //遍历图片，添加宽和高
    this.imgs.forEach(ele=> {
      ele.w = 600;
    ele.h = 400;
  })
  }
  )
  )
  .catch(err=>{
      console.log('获取图片详情相关数据失败',err);
  })
  }
//  created(){
//    this.imgId = this.$route.params.imgId;
//    this.$ajax.all([
//      this.$ajax.get('getimageInfo/'+this.imgId),
//    this.$ajax.get('getthumimages/'+this.imgId)
//    ]).then( this.$ajax.spread( (infoRes,imgsRes)=>{
//      this.imgInfo = infoRes.data.message[0];
//    this.imgs = imgsRes.data.message;
//    //遍历图片，添加宽和高
//    this.imgs.forEach(ele=> {ele.w = 600;ele.h = 400;})})).catch(err=>{console.log('获取图片相关详情数据失败',err);
//    })
//  }
}


</script>
<style scoped>
  li {
    list-style: none;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  .photo-title {
    overflow: hidden;
  }

  .photo-title,
  .photo-desc {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
  }

  .photo-title p {
    color: #13c2f7;
    font-size: 20px;
    font-weight: bold;
  }

  .photo-title span {
    margin-right: 20px;
  }

  .mui-table-view.mui-grid-view.mui-grid-9 {
    background-color: white;
    border: 0;
  }

  .mui-table-view.mui-grid-view.mui-grid-9 li {
    border: 0;
  }

  .photo-desc p {
    font-size: 18px;
  }

  .mui-table-view-cell.mui-media.mui-col-xs-4.mui-col-sm-3 {
    padding: 2 2;
  }
</style>