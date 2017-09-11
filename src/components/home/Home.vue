<template>
  <div>
    <my-swipe url="getlunbo"></my-swipe>
    </mt-swipe>
    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link :to="{name:'newsList'}">
            <span class="mui-icon mui-icon-home"></span>
            <div class="mui-media-body">新闻资讯</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link :to="{name:'photoList'}">
            <span class="mui-icon mui-icon-email"></span>
            <div class="mui-media-body">图文分享</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link :to="{name:'goodsList'}">
            <span class="mui-icon mui-icon-chatbubble"></span>
            <div class="mui-media-body">商品展示</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <span class="mui-icon mui-icon-location"></span>
          <div class="mui-media-body">留言反馈</div>
        </a></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <span class="mui-icon mui-icon-search"></span>
          <div class="mui-media-body">搜索咨询</div>
        </a></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <span class="mui-icon mui-icon-phone"></span>
          <div class="mui-media-body">联系我们</div>
        </a></li>

      </ul>
    </div>

  </div>
</template>
<script>
  export default {
    data(){
      return {
        imgs: [],
      }
    }, created(){
      this.$ajax.get('getlunbo')
          .then(res => {

        this.imgs = res.data.message;
    })
    .
      catch(err => {
        console.log(err);
    })
    }
  }
</script>
<style scoped>

  /*设置9九宫格*/
  .mui-table-view.mui-grid-view.mui-grid-9 {
    background-color: white;
    margin: 0;
  }

  .mui-table-view.mui-grid-view.mui-grid-9 li {
    border: 0;
  }

  /*清空原来的字体图标*/
  .mui-icon-home:before, .mui-icon-email:before, .mui-icon-chatbubble:before, .mui-icon-location:before, .mui-icon-search:before, .mui-icon-phone:before {
    content: '';
  }

  /*设置背景图片*/
  .mui-icon-home {
    background-image: url('../../static/img/news.png');
    background-repeat: round;
  }

  .mui-icon-email {
    background-image: url('../../static/img/picShare.png');
    background-repeat: round;
  }

  .mui-icon-chatbubble {
    background-image: url('../../static/img/goodShow.png');
    background-repeat: round;
  }

  .mui-icon-location {
    background-image: url('../../static/img/feedback.png');
    background-repeat: round;
  }

  .mui-icon-search {
    background-image: url('../../static/img/search.png');
    background-repeat: round;
  }

  .mui-icon-phone {
    background-image: url('../../static/img/callme.png');
    background-repeat: round;
  }

  /*设置字体图标高度*/
  .mui-icon {
    height: 50px;
    width: 50px;
  }
</style>