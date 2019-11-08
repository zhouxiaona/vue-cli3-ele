<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view />
    </transition>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'App',
  data() {
    return {
      transitionName: 'slide-left',
      sellerData: {},
      goodsData: {},
      ratingsData: {}
    }
  },
  watch: {
    '$route' (to, from) {
      // console.log(to,'--to--')
      // console.log(from,'--from--')
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      // console.log(toDepth,'--',fromDepth)
      this.transitionName = toDepth == fromDepth ? 'slide-right' : 'slide-left'
    }
  },
  methods:{
    getGoodsData(){
      this.$http.get('/api/goods').then((res)=>{
        for(let i = 0; i < res.data.length; i++){
          for(let j = 0; j < res.data[i].foods.length; j++){
            res.data[i].foods[j].count = 0;
            res.data[i].foods[j].showBtn = false;
            res.data[i].foods[j].singleM = 0;
          }
        }
        this.goodsData = res.data
        this.$store.dispatch('updateAction', {type:'UPDATE_STATE', stateType: 'goodsData', value: this.goodsData})
      }).catch(err=>{
        return console.log(err,'err==')
      })
    },
    getSellerData(){
      this.$http.get('/api/seller').then((res)=>{
        this.sellerData = res.data
        this.$store.dispatch('updateAction', {type:'UPDATE_STATE', stateType: 'sellerData', value: this.sellerData})
      }).catch(err=>{
        return console.log(err,'err==')
      })
    },
    getRatingsData(){
      this.$http.get('/api/ratings').then((res)=>{
        this.ratingsData = res.data
        this.$store.dispatch('updateAction', {type:'UPDATE_STATE', stateType: 'ratingsData', value: this.ratingsData})
      }).catch(err=>{
        return console.log(err,'err==')
      })
    },
  },
  create(){},
  mounted() {
    this.getSellerData()
    this.getGoodsData()
    this.getRatingsData()
    console.log('--master--branch--')
    console.log('--dev--branch--')
  }
}
</script>
<style lang="less">
@import './Font/font.css';
*{
  margin: 0;
  padding: 0;
  font-family: fzzyjt;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-touch-callout: none;
  /*系统默认菜单被禁用*/
  -webkit-user-select: none;
  /*webkit浏览器*/
  -khtml-user-select: none;
  /*早期浏览器*/
  -moz-user-select: none;
  /*火狐*/
  -ms-user-select: none;
  /*IE10*/
  user-select: none;
}
img {
  content: normal !important;
}
// 滚动条设置
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
::-webkit-scrollbar-track-piece {
  background-color: rgba(0, 0, 0, 0.2);
  -webkit-border-radius: 6px;
}
// 纵向滚动
::-webkit-scrollbar-thumb:vertical {
  height: 20px;
  background-color: rgba(125, 125, 125, 0.7);
  -webkit-border-radius: 6px;
}
// 横向滚动
// ::-webkit-scrollbar-thumb:horizontal {
//   width: 20px;
//   background-color: rgba(125, 125, 125, 0.7);
//   -webkit-border-radius: 6px;
// }
</style>
