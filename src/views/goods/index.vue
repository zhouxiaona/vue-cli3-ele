<template>
  <div class="container">
    <HeaderDefine />
    <div class="content">
      <div class="menu">
        <div 
          class="menuItem"
          v-for="(v,k) in goodsData"
          v-bind:key = "k" 
          @click.stop="menuShow(k)" 
          :class="k == defaultIndex ? 'whites' : 'grays'"
        >
          <div class="menuItem_box">{{v.name}}</div>
        </div>
      </div>
      <div class="goods" @scroll.passive="scrollC" ref="ulContainer">
        <div 
          class="goodsItem" 
          v-for="(val,key) in goodsData" 
          v-bind:key = "key"
          ref = "lis"
        >
          <h2>{{val.name}}</h2>
          <div class="goodsItem_boxWrap">
            <div 
              class="goodsItem_boxItem"
              v-for="(vals,keys) in val.foods" 
              v-bind:key="keys" 
            >
              <div class="goodsItem_boxItem_inner">
                <img 
                  class="foods_img" 
                  :src="vals.icon" 
                  @click="infoShows(key,keys)"
                />
                <div class="foods_info">
                  <h3>{{vals.name}}</h3>
                  <div class="foods_sale">
                    <div class="saleCount">月售{{vals.sellCount}}份</div>
                    <div class="ratingRank">好评率{{vals.rating}}%</div>
                  </div>
                  <div class="foods_price">
                    <div class="now_price"><span>¥</span>{{vals.price}}</div>
                    <div class="old_price" v-show="vals.oldPrice">¥{{vals.oldPrice}}</div>
                  </div>
                </div>
                <Addcart 
                  @addFn="doAnimate"
                  :mykey="key"
                  :mykeys="keys"
                  :goodsData="goodsData"
                />
              </div>
            </div>
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
    <FooterDefine />
  </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  import HeaderDefine from '@/components/headerDefine/index'
  import FooterDefine from '@/components/footerDefine/index'
  import Addcart from '@/components/addcart/index'
  export default {
    name: "goods",
    components: {
      HeaderDefine,
      Addcart,
      FooterDefine,
    },
    data(){
      return {
        move: true, // 区分点击左边事件
        defaultIndex: 0,
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
    beforeRouteUpdate (to, from, next) {
      // react to route changes...
      // don't forget to call next()
      next()
    },
    methods: {
      doAnimate(el){
        for(var i = 0; i < this.balls.length; i++){
          if(this.balls[i].judge == false){
            this.balls[i].judge = true;
            this.balls[i].rect = el.getBoundingClientRect();
            return;
          }
        }
      },
      beforeEnter(el){
        for(var i = 0; i < this.balls.length; i++){
          if(this.balls[i].judge){
            var x = this.balls[i].rect.left-40;
            var y = window.innerHeight - this.balls[i].rect.top-44;
          }
        }
        el.style.transform = `translateX(${x}px)`;
        el.getElementsByClassName("ball2")[0].style.transform=`translateY(-${y}px)`;
      },
      enter(el, done){
        //重新绘制
        el.offsetHeight;
        el.style.transform="translateX(0px)";
        el.getElementsByClassName("ball2")[0].style.transform="translateY(0px)";
        //监控过渡动画动画完成之后执行done方法
        el.addEventListener("transitionend",done);
      },
      afterEnter(el){
        //可能会清除正在运动的小球，体验略微不好
        for(var i = 0; i < this.balls.length; i++){
          this.balls[i].judge = false;
        }
      },
      infoShows(key, keys){
        //去往详情页面
        // console.log(key,keys,'detail')
        this.$router.push({name:`goodsDetail`,params:{key,keys}});
      },
      menuShow(k){
        //点击左边菜单改变左边背景颜色
        this.defaultIndex = k;
        this.move = false;
        //点击左边菜单定位右边的scroll
        var lis = this.$refs.lis;
        var num = 0;
        var Heights = [];
        for(var i = 0; i < lis.length; i++){
          Heights.push(num);
          num += lis[i].scrollHeight;
        }
        var newScorll = Heights[k];
        var oldScorll = this.$refs.ulContainer.scrollTop;
        var timer = setInterval(()=>{
          if(newScorll > oldScorll){
            oldScorll += 15;
            if(oldScorll > newScorll){
              oldScorll = newScorll;
            }
          }else if(newScorll < oldScorll){
            oldScorll -= 15;  
            if(oldScorll < newScorll){
              oldScorll = newScorll;
            }
          }else{
            //当旧的top值与新的top值相等时关掉计时器，并把右边的滑动开关打开
            clearInterval(timer);
            this.move = true;
          }
          this.$refs.ulContainer.scrollTop = oldScorll;
        },5);
      },
      scrollC() {
        var myScroll = this.$refs.ulContainer.scrollTop;
        var lis = this.$refs.lis;
        var num = 0;
        var Heights = []; 
        for (var i = 0; i < lis.length; i++) {
          Heights.push(num);
          num += lis[i].scrollHeight;
        }
        if(this.move){
          if (myScroll < Heights[1]){
            this.defaultIndex = 0;
          }
          for (var i = 1; i < Heights.length; i++) {
            if (myScroll >= Heights[i - 1] && myScroll < Heights[i]) {
              this.defaultIndex = i-1;
            }
          }
        }
        //判断nowScroll在哪个区间，根据区间拿到索引值
        //改变左边菜单的索引（通过控件区分左边和右边的事件触发）
        //小球动画：
        //$event.target  getBoundingClientRect();
        //做动画：小球由两个div构成，一个做线性运动，一个做贝塞尔运动
        //beforeEnter;
        //enter
        //afterEnter
        //重置画布enter过程中： el.offsetHeight 或者el.offsetWidth
      }
    },
    mounted(){
      console.log('/goods')
    }
  }
</script>

<style lang="less" scoped>
  .container{
    width: 100vw;
    box-sizing: border-box;
    height: calc(100vh-115px);
    // height: calc(100vh-268px-91px-115px);
    overflow: auto;
    background-color:#f3f5f7;
    .content {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding-top: 359px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .menu{
        width: 180px;
        background-color: #fff;
        height: 100%;
        .menuItem{
          width: 100%;
          height: 120px;
          .menuItem_box{
            width: 70%;
            height: 100%;
            margin: 0 auto;
            box-sizing: border-box;
            padding-top: 45px;
            text-align: center;
            font-size: 26px;
            color: rgb(20, 20, 20);
            font-weight: 200;
            border-bottom: 1px solid rgba(7,17,27,0.1);
          }
        }
      }
      .whites{
        background-color:white;
      }
      .grays{
        background-color:#f3f5f7;
      }
      .goods{
        width: calc(100vw-180px);
        background: #f3f5f7;
        height: 100%;
        overflow: auto;
        .goodsItem{
          width: 100%;
          h2{
            height: 70px;
            line-height: 70px;
            border-left: 8px solid #d9dde1;
            padding-left: 26px;
            font-size: 26px;
            color: rgb(147, 153, 159);
          }
          .goodsItem_boxWrap{
            width: 100%;
            box-sizing: border-box;
            background: #fff;
            padding: 24px 0;
            .goodsItem_boxItem{
              width: 100%;
              box-sizing: border-box;
              .goodsItem_boxItem_inner{
                width: 85%;
                margin: 0 auto;
                display: flex;
                align-items: center;
                padding: 20px 0;
                border-bottom: 1px solid lightgray;
                position: relative;
                .foods_img{
                  width: 120px;
                  height: 120px;
                  margin-right: 26px;
                }
                .foods_info{
                  display: flex;
                  flex-direction: column;
                  h3{
                    font-size: 28px;
                    color: rgb(7, 17, 27);
                  }
                  .foods_sale{
                    display: flex;
                    align-items: center;
                    font-size: 24px;
                    color: rgb(147, 153, 159);
                    margin: 10px 0 15px;
                    .saleCount{
                      margin-right: 30px;
                    }
                  }
                  .foods_price{
                    display: flex;
                    align-items: center;
                    .now_price{
                      font-size: 26px;
                      color: rgb(240, 20, 20);
                      font-weight: 700;
                      margin-right: 10px;
                      span{
                        font-size: 24px;
                      }
                    }
                    .old_price{
                      font-size: 25px;
                      font-weight: 700;
                      color: rgb(147, 153, 159);
                      text-decoration: line-through;
                    }
                  }
                }
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
  }
</style>
