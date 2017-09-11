
import Vue from 'vue';
import App from './App.vue';

import Home from './components/home/Home.vue';
import Vip from './components/vip/vip.vue';
import Shopcart from './components/shopcart/shopcart.vue';
import Search from './components/search/search.vue';
import NewsList from './components/news/newsList.vue';
import NewsDetail from './components/news/newsDetail.vue';
import PhotoList from './components/photo/photoList.vue';
import PhotoDetail from './components/photo/photoDetail.vue';
import GoodsList from './components/goods/goodsList.vue';
import GoodsDetail from './components/goods/goodsDetail.vue';
import GoodsComment from './components/goods/goodsComment.vue';

import NavBar from './components/commons/NavBar.vue';
Vue.component('NavBar',NavBar);
import Comment from './components/commons/comment.vue';
Vue.component('Comment',Comment);
import MySwipe from './components/commons/mySwipe.vue';
Vue.component('MySwipe',MySwipe);

import MintUi from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUi);

//VuePreview: 开始
import VuePreview from 'vue-preview';
Vue.use(VuePreview);
//VuePreview: 结束



//Moment：开始
import Moment from 'moment';
//声明全局过滤器
Vue.filter('convertDate',function(value){
  return Moment(value).format('YYYY-MM-DD');
});
//Moment：结束


import './static/libs/mui-master/dist/css/mui.css';
// 引入全局的css
import './static/css/global.css';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

let router = new VueRouter({
  //更改默认router-link匹配锚点值后加上的class名，默认值router-link-active
  linkActiveClass:'mui-active',
  routes:[
    { path:'/',redirect:{name:'home'} },
    {name:'home',path:'/home',component:Home},
    {name:'vip',path:'/vip',component:Vip},
    {name:'shopcart',path:'/shopcart',component:Shopcart},
    {name:'search',path:'/search',component:Search},
    {name:'newsList',path:'/newsList',component:NewsList},
    {name:'newsDetail',path:'/newsDetail',component:NewsDetail},
    {name:'photoList',path:'/photoList',component:PhotoList},
    {name:'photoDetail',path:'/photoDetail/:imgId',component:PhotoDetail},
    {name:'goodsList',path:'/goodsList',component:GoodsList},
    {name:'goodsDetail',path:'/goodsDetail/:goodsId',component:GoodsDetail},
    {name:'goodsPhotoDetail',path:'/goodsPhotoDetail',component:NewsDetail},
    {name:'goodsComment',path:'/goodsComment',component:GoodsComment},

  ]
})

import Axios from 'axios';
Vue.prototype.$ajax = Axios;
Axios.defaults.baseURL = 'http://182.254.146.100:8899/api/';

//设置loading拦截器
Axios.interceptors.request.use(config=>{
  MintUi.Indicator.open({//显示loadding图标
    text: '加载中...',
    spinnerType: 'fading-circle'
  });
  return config;
});
//响应的拦截器
Axios.interceptors.response.use(response=>{
  MintUi.Indicator.close(); //关闭loadding图标
  return response;
})

new Vue({
  el:'#app',
  router,
  render:c=>c(App)
})











/*

//引入第三方包 开始
import Vue from 'vue';

//引入组件 开始
import Home from './components/home/Home.vue'
import App from './App.vue';
//引入组件 结束


//MintUi: 开始
import MintUi from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUi);
//MintUi: 结束

// Mui: 开始
import './static/libs/mui-master/dist/css/mui.css';
// Mui: 结束


//VueRouter: 开始
import VueRouter from 'vue-router';
Vue.use(VueRouter);
let router = new VueRouter({
   routes:[
        {name:'home',path:'/home',component:Home}
   ]
})
//VueRouter: 结束

//Axios: 开始
import Axios from 'axios';
Vue.prototype.$ajax = Axios;
Axios.defaults.baseURL = 'http://182.254.146.100:8899/api/';
//Axios: 结束


//引入第三方包 结束


new Vue({
    el:'#app',
    router,
    render:c=>c(App)
})
*/