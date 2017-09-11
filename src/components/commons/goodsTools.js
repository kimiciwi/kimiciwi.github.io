/**
 * Created by T on 2017/8/26.
 */

let goodsTools = {};

//初始化存储商品的对象
let prods = JSON.parse(window.localStorage.getItem('prods')) || {};

goodsTools.addOrUpdate = function(goods){
  console.log('add');
  if(prods[goods.id]){
    prods[goods.id] += goods.num;
  }else{
    prods[goods.id] = goods.num;
  }
  this.save(prods);
}

goodsTools.deleteProd = function(prodId){
  delete prods[prodId];
  this.save(prods);
}

//获取数据
goodsTools.getProds = function(id){
  let prods = JSON.parse(window.localStorage.getItem('prods'))||{};
  if(id){
    return prods[id]; //传id返回数量
  }else{
    return prods;
  }
}

goodsTools.save = function(prods){
  window.localStorage.setItem('prods',JSON.stringify(prods));
}
// 返回商品总数
goodsTools.getProdCount = function(){
  let sum = 0;
  let prods = this.getProds();

  for(let id in prods){
    sum += prods[id];
  }
  return sum;
}


export default goodsTools; // import xxx from './xxx.js'