<template>
  <div class="cont_detail">
    <div class="header">
      <div class="backWrap" @click="goBack">
        <img class="back" src="../../assets/img/back.png"/>
      </div>
    </div>
    <img 
      class="goodsBg"
      :src="detailData.image" 
    />
    <div class="goodsInfo">
      <h2>{{detailData.name}}</h2>
      <div class="goodsSale">
        <div class="saleCount">月售{{detailData.sellCount}}份</div>
        <div class="ratingRate">好评率{{detailData.rating}}%</div>
      </div>
      <div class="goodsPrice">
        <div class="now_price">￥{{detailData.price}}</div>
        <div class="old_price" v-show="detailData.oldPrice">￥{{detailData.oldPrice}}</div>
      </div>
      <button 
        class="mybtn" 
        v-show="!detailData.showBtn" 
        @click="showIs"
      >加入购物车</button>
      <div class="cartWrap">
        <Addcart 
          @addFn="doAnimate"
          :mykey="key"
          :mykeys="keys"
          :goodsData="goodsData"
          v-show="detailData.showBtn"
        />
      </div>
    </div>
    <div class="jieshao" v-show="detailData.info">
      <h2>商品介绍</h2>
      <div class="desc">{{detailData.info}}</div>
    </div>
    <div class="pingjia">
      <div class="pingjia_top">
        <h2>商品评价</h2>
        <div class="selectWrap">
          <div class="selectBar all">全部 <span>{{parseInt(Math.random()*40+10)}}</span></div>
          <div class="selectBar tuijian">推荐 <span>{{parseInt(Math.random()*60+20)}}</span></div>
          <div class="selectBar tucao">吐槽 <span>{{parseInt(Math.random()*80+30)}}</span></div>
        </div>
      </div>
      <div class="pingjia_bottom">
        <div 
          class="rankItem"
          v-for="(item,index) in detailData.ratings" 
          v-bind:key="index"
        >
          <div class="date_user">
            <div class="date">{{myTimer(item.rateTime)}}</div>
            <div class="user">
              <div class="nickname">{{item.username}}</div>
              <img class="avater" :src="item.avatar"/>
            </div>
          </div>
          <div class="user_txt">
            <img 
              class="thumb" 
              v-show="item.rateType !== 0"
              src="~@/assets/img/thumb_down.png"
            />
            <img 
              class="thumb" 
              v-show="item.rateType == 0"
              src="~@/assets/img/thumb_up.png"
            />
            <div class="desc_txt">{{item.text}}</div>
          </div>
        </div>
      </div>
    </div>
    <!--需要做动画的小球-->
    <div class="ball_container" v-for="(v, k) in balls" v-bind:key="k">
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        v-bind:css="false"
      >
        <div class="ball1" v-show="v.judge">
          <div class="ball2"></div>
        </div>
      </transition>
    </div>
     <FooterDefine/>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  import Addcart from '@/components/addcart/index'
  import FooterDefine from '@/components/footerDefine/index'
  export default {
    name: "goodsDetail",
    components: {
      Addcart,
      FooterDefine
    },
    data(){
      return {
        detailData: '',
        key: 0,
        keys: 0,
        balls: [
          {
            judge: false,
            rect: {}
          },
          {
            judge: false,
            rect: {}
          },
          {
            judge: false,
            rect: {}
          },
          {
            judge: false,
            rect: {}
          },
          {
            judge: false,
            rect: {}
          }
        ]
      }
    },
    computed:{
      ...mapGetters([
        'goodsData',
      ]),
    },
    methods: {
      doAnimate(el){
        for(var i=0; i<this.balls.length; i++){
          if(this.balls[i].judge == false){
            this.balls[i].judge = true;
            this.balls[i].rect = el.getBoundingClientRect();
            return;
          }
        }
      },
      beforeEnter(el){
        for(var i=0;i<this.balls.length;i++){
          if(this.balls[i].judge){
            var x = this.balls[i].rect.left-40;
            var y = window.innerHeight-this.balls[i].rect.top-44;
          }
        }
        el.style.transform=`translateX(${x}px)`;
        el.getElementsByClassName("ball2")[0].style.transform=`translateY(-${y}px)`;
      },
      enter(el,done){
        //重新绘制
        el.offsetHeight;
        el.style.transform="translateX(0px)";
        el.getElementsByClassName("ball2")[0].style.transform="translateY(0px)";
        //监控过渡动画动画完成之后执行done方法
        el.addEventListener("transitionend",done);
      },
      afterEnter(el){
        //可能会清除正在运动得到小球，体验略微不好
        for(var i = 0; i < this.balls.length; i++){
          this.balls[i].judge = false;
        }
      },
      showIs(event){
        this.detailData.showBtn = true
        let operateTool = [this.key, this.keys]
        this.$store.dispatch('updateAction', {type:'ADD', operateTool: operateTool})
        this.doAnimate(event.target)
      },
      myTimer(arg){
        return new Date(parseInt(arg)).toLocaleString().substr(0,16);
      },
      goBack(){
        this.$router.go(-1)
      }
    },
    mounted(){
      // console.log('/goodsDetail',this.$route.params,'params',this.goodsData)
      this.key = Number(this.$route.params.key)
      this.keys = Number(this.$route.params.keys)
      let resData = {}
      resData = this.goodsData.filter((item, index)=>{
        return index == this.key
      })[0].foods.filter((val, key)=>{
        return key == this.keys
      })
      this.detailData = resData[0]
      // console.log(this.detailData,'this.detailData')
    }
  }
</script>

<style lang="less" scoped>
.cont_detail{
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  padding-bottom: 115px;
  background: #f3f5f7;
  overflow: auto;
  .header{
    width: 100%;
    height: 130px;
    position: fixed;
    top: 0;
    .backWrap{
      width: 130px;
      height: 130px;
      display: flex;
      justify-content: center;
      align-items: center;
      .back{
        width: 60px;
        height: 60px;
      }
    }
  }
  .goodsBg{
    display: block;
    width: 100%;
  }
  .goodsInfo{
    padding: 24px;
    background: #fff;
    border-bottom: 2px solid rgba(7, 17, 27, 0.1);
    margin-bottom: 20px;
    position: relative;
    h2{
      display: flex;
      align-items: center;
      font-size: 30px;
      font-weight: 700;
      color: rgb(7,17,27);
      margin-bottom: 20px;
      &::before{
        display: block;
        content:'';
        width: 10px;
        height: 31px;
        background: rgb(147, 153, 159);
        margin-right: 10px;
      }
    }
    .goodsSale{
      display: flex;
      align-items: center;
      margin: 10px 0 40px;
      .saleCount,.ratingRate{
        font-size: 26px;
        color: rgb(147,153,159);
      }
      .saleCount{
        margin-right: 20px;
      }
    }
    .goodsPrice {
      display: flex;
      align-items: center;
      .now_price{
        font-size: 26px;
        font-weight: 700;
        color: rgb(240,20,20);
      }
      .old_price{
        font-size: 24px;
        font-weight: 700;
        color: rgb(147,153,159);
        text-decoration: line-through;
      }
    }
    .mybtn{
      padding: 10px 25px;
      border: none;
      border-radius: 26px;
      background: rgb(0,160,220);
      font-size: 26px;
      color: #fff;
      position: absolute;
      right: 24px;
      bottom: 24px;
    }
    .cartWrap{
      width: 130px;
      height: 38px;
      position: absolute;
      right: 24px;
      bottom: 6px;
    }
  }
  .jieshao{
    padding: 40px 30px;
    background: #fff;
    margin-bottom: 20px;
    h2{
      display: flex;
      align-items: center;
      font-size: 30px;
      font-weight: 600;
      color: rgb(77, 85, 93);
      margin-bottom: 20px;
      &::before{
        display: block;
        content:'';
        width: 10px;
        height: 31px;
        background: rgb(147, 153, 159);
        margin-right: 10px;
      }
    }
    .desc{
      line-height: 37px;
      font-size: 26px;
      color: rgb(77, 85, 93);
    }
  }
  .pingjia{
    padding: 40px 30px;
    background: #fff;
    .pingjia_top{
      padding-bottom: 30px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      h2{
        display: flex;
        align-items: center;
        font-size: 30px;
        font-weight: 600;
        color: rgb(77, 85, 93);
        margin-bottom: 20px;
        &::before{
          display: block;
          content:'';
          width: 10px;
          height: 31px;
          background: rgb(147, 153, 159);
          margin-right: 10px;
        }
      }
      .selectWrap{
        display: flex;
        align-items: center;
        .selectBar{
          font-size: 26px;
          padding: 15px 20px;
          margin-right: 15px;
        }
        .all{
          color: #fff;
          background: rgb(0, 160, 220);
        }
        .tuijian{
          color: rgb(77, 85, 93);
          background: rgba(0, 160, 220,0.2);
        }
        .tucao{
          color: rgb(77, 85, 93);
          background: rgba(77, 85, 93,0.2);
        }
      }
    }
    .pingjia_bottom{
      margin-top: 10px;
      .rankItem{  
        padding: 25px 0;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        display: flex;
        flex-direction: column;
        .date_user{
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          .date{
            font-size: 26px;
            color: rgb(147, 153, 159);
          }
          .user{
            display: flex;
            align-items: center;
            .nickname{
              font-size: 26px;
              color: rgb(147, 153, 159);
            }
            .avater{
              width: 32px;
              height: 32px;
              border-radius: 50%;
              margin-left: 15px;
            }
          }
        }
        .user_txt{
          display: flex;
          align-items: center;
          .thumb{
            width: 32px;
            height: 32px;
            margin-right: 15px;
          }
          .desc_txt{
            font-size:26px;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
  }
}
  // 动画小球
  .ball_container{
    position: absolute;
    left: 40px;
    bottom: 32px;
    .ball1{
      transition:all linear .5s;
      .ball2{
        transition: all cubic-bezier(.79,-0.3,.86,.24) .5s;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background:rgb(0,160,220);
      }
    }
  }

</style>
