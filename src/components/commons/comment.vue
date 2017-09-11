<template>
  <div class="tmpl">
    <div class="photo-bottom">
      <ul>
        <li class="photo-comment">
          <div>
            <span>提交评论</span>
            <span><a @click="goback">返回</a></span>
          </div>
        </li>
        <li class="txt-comment">
          <textarea v-model="comment"></textarea>
        </li>
        <li>
          <mt-button type="primary" size="large" @click="sendMsg">发表评论按钮</mt-button>
        </li>
        <li class="photo-comment">
          <div>
            <span>评论列表</span>
            <span>44条评论</span>
          </div>
        </li>
      </ul>
      <ul class="comment-list">
        <li v-for="(msg,index) in msgs" :key="index">
          {{msg.user_name}}：{{msg.content}} {{msg.add_time | convertDate}}
        </li>

      </ul>
      <mt-button type="danger" size="large" plain @click="loadMorePage">加载更多按钮</mt-button>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        msgs:[],
        comment:'',//新的评论
        currentPage:2,

      }
    },
    props:['cid'],
    created(){
      this.loadFirstPage();
    },
    methods:{
      goback(){
        this.$router.go(-1);
      },
      loadFirstPage(){
        this.$ajax.get("getcomments/"+this.cid+"?pageindex=1")
            .then(res=>{this.msgs = res.data.message})
            .catch(err=>{console.log("获取评论失败",err)});
      },
      sendMsg(){
        this.$ajax.post("postcomment/"+this.cid,"content="+this.comment)
            .then(res=>{
              this.currentPage = 2;
              this.comment = "";
              this.loadFirstPage();
            })
            .catch(err=>{console.log("发表评论失败",err)});
      },
      loadMorePage(){
        this.$ajax.get("getcomments/"+this.cid+"?pageindex="+this.currentPage)
              .then(res=>{
                this.currentPage++;
                this.msgs = this.msgs.concat(res.data.message)
              })
              .catch(err=>{
                console.log("获取更多评论失败",err);
              })
      }
    }

  }


</script>
<style scoped>
  .photo-comment > div span:nth-child(1) {
    float: left;
    font-weight: bold;
    margin-left: 5px;
  }

  .photo-comment > div span:nth-child(2) {
    float: right;
  }

  .photo-comment {
    height: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    line-height: 30px;
    margin-bottom: 5px;
  }

  .txt-comment {
    padding: 5 5;
  }

  .txt-comment textarea {
    margin-bottom: 5px;
  }

  .comment-list li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
  }

  li {
    list-style: none;
  }

  ul {
    margin: 0;
    padding: 0;
  }
</style>