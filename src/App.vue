<template>
    <div>
        <mt-header title="myShop_VueProject"  ref="n1"></mt-header>
        <transition name="main" mode="out-in">
            <router-view></router-view>
        </transition>
        <nav class="mui-bar mui-bar-tab"  ref="n2">
            <router-link :to="{name:'home'}" class="mui-tab-item">
                <span class="mui-icon icon-shouye"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link :to="{name:'vip'}" class="mui-tab-item">
                <span class="mui-icon icon-huiyuan1"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link :to="{name:'shopcart'}" class="mui-tab-item">
                <span class="mui-icon icon-gouwuche-white-copy"><span class="mui-badge">{{num}}</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link :to="{name:'search'}" class="mui-tab-item">
                <span class="mui-icon icon-work-search"></span>
                <span class="mui-tab-label">查找</span>
            </router-link>
        </nav>
    </div>
</template>
<script>
    import Connector from './components/commons/Connector.js';
    export default {
        data(){
            return {
                num:0,
            }
        },
        created(){
            Connector.$on('changeShopCart',(num)=> this.num += num)
        }
    }
</script>
<style scoped>
    .mint-header{
        background-color: yellowgreen;
    }
    .main-enter-active, .main-leave-active {
        transition: opacity .5s
    }
    .main-enter, .main-leave-to  {
        opacity: 0
    }
</style>