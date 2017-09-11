<template>
  <div>
    <nav-bar title="商品详情"></nav-bar>
    <div class="outer-swiper">
      <div class="swiper">
        <my-swipe :url="'getthumimages/'+ $route.params.goodsId"></my-swipe>
      </div>
    </div>
    <div class="product-desc">
      <ul>
        <li>
          <span class="product-desc-span">
            {{goodsInfo.title}}
          </span>
        </li>
        <li class="price-li">市场价：
          <s>￥{{goodsInfo.market_price}}</s> 销售价：<span>￥{{goodsInfo.sell_price}}</span></li>
        <li class="number-li">购买数量：<span @click="sub">-</span><span>{{pickNum}}</span><span @click="add">+</span></li>
        <li>
          <mt-button type="primary">立即购买</mt-button>
          <mt-button type="danger" @click="addShopcart">加入购物车</mt-button>
        </li>
      </ul>
    </div>
    <transition name="ball" @after-enter="afterEnter">
      <div class="ball" v-if="isShow"></div>
    </transition>
    <div class="product-props">
      <ul>
        <li>商品参数</li>
        <li>商品货号：123441231</li>
        <li>库存情况：999件</li>
        <li>上架时间：2014-08-09</li>
      </ul>
    </div>
    <div class="product-info">
      <ul>
        <li>
          <mt-button type="primary" size="large" plain @click="showPhotoInfo">图文介绍</mt-button>
        </li>
        <li>
          <mt-button type="danger" size="large" plain @click="showGoodsComment">商品评论</mt-button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import Connector from '../commons/Connector.js';
  //操作商品CRUD
  import GoodsTools from '../commons/goodsTools.js';

  export default{
    data(){
      return{
        goodsInfo:{},
        isShow:false,
        pickNum:1,
      }
    },
    created(){
      let goodsId = this.$route.params.goodsId;
      this.$ajax.get('goods/getinfo/'+goodsId)
          .then(res=>{
        this.goodsInfo = res.data.message[0];
    })
    .catch(err=>{
        console.log('获取商品信息失败',err)
    });
    },
    methods:{
      addShopcart(){
        this.isShow = true;
        Connector.$emit('changeShopCart',this.pickNum);
        //调用具备对于商品CRUD操作的对象的函数
        GoodsTools.addOrUpdate({
          id:this.goodsInfo.id,
          num:this.pickNum,
        });

      },
      afterEnter(){
        this.isShow = false;//移除小球
      },
      add(){
        if(this.goodsInfo.stock_quantity<=this.pickNum) return;
        this.pickNum++;
      },
      sub(){
        if(this.pickNum<=1) return;
        this.pickNum--;
      },
      showPhotoInfo(){
        this.$router.push({
          name:'goodsPhotoDetail',
          query:{goodsId:this.goodsInfo.id}
        })
      },
      showGoodsComment(){
        this.$router.push({
          name:'goodsComment',
          query:{goodsId:this.goodsInfo.id}
        })
      }
    }
  }

</script>
<style scoped>
  .ball-enter-active {
    animation: bounce-in 1s;
  }

  @keyframes bounce-in {
    0% {
      /*translate3d硬件加速，流畅一些*/
      transform: translate3d(0, 0, 0);
    }
    50% {
      transform: translate3d(140px, -50px, 0);
    }
    75% {
      transform: translate3d(160px, 0px, 0);
    }
    100% {
      transform: translate3d(140px, 300px, 0);
    }
  }

  .swiper {
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 8px;
    width: 95%;
    border-radius: 15px;
    overflow: hidden;
  }

  .outer-swiper,
  .product-desc,
  .product-props,
  .product-info {
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 3px;
  }


  /*请ulpadding*/

  .outer-swiper ul,
  .product-desc ul,
  .product-props ul,
  .product-info ul {
    padding: 0;
  }

  .product-desc ul li,
  .product-props ul li,
  .product-info ul li {
    list-style: none;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 8px;
  }

  .product-desc ul >:nth-child(1) span {
    color: blue;
    font-size: 22px;
    font-weight: bold;
  }

  .product-desc ul >:nth-child(1) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  }

  .product-desc ul,
  .product-info ul,
  .product-props ul {
    padding-left: 10px;
  }

  .price-li span {
    color: red;
    font-size: 25px;
  }

  .price-li s {
    margin-right: 16px;
  }


  /*加减*/

  .number-li span {
    display: inline-block;
    border: 2px solid rgba(0, 0, 0, 0.1);
    width: 25px;
  }


  /*商品参数*/

  .product-props ul >:nth-child(1) {
    text-align: left;
  }

  .product-props ul:not(:nth-child(1)) {
    margin-left: 40px;
  }

  .product-info ul {
    margin-bottom: 70px;
    padding: 0 5;
  }

  .number-li span {
    text-align: center;
  }

  .number-li >:nth-child(2) {
    width: 40px;
  }

  .ball {
    border-radius: 50%;
    background-color: red;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 440px;
    left: 120px;
    display: inline-block;
    z-index: 9999;
  }
</style>