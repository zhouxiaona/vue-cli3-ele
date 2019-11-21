<template>
  <div class="cont_other">
    <div class="other_main">
      <!-- 展示区域 -->
      <div class="info-bar">
        <div class="bar bar-left">
          <div 
          :class="controlStyle?'progress-noani':'progress'" 
          :style="`left:-${proWidth}%`"
          ></div>
          <img src="../../assets/img/rank.png" class="icon icon-rank"/>
          <div class="txt">等级{{100-proWidth}}%</div>
        </div>
        <div class="bar bar-right">
          <img src="../../assets/img/coin.png" class="icon icon-coin"/>
          <div class="txt">金币{{property}}</div>
        </div>
      </div>
      <div class="circle">
        <img class="bg" src="../../assets/img/rabbit.png"/>
        <div class="show-wrap">
          <!-- 金币容器 -->
          <div class="coin-wrap" :class="isHaveCoin?'block-style':''">
            <img 
              class="coin" 
              v-for="(val,key) in coinArr" 
              v-bind:key="key" 
              :style="val"
              src="../../assets/img/coin.png"
            />
          </div>
          <!-- 假金币 -->
          <img class="default-coin" src="../../assets/img/coin.png"/>
          <!-- 金币数量 -->
          <div class="coin-show">当前金币:{{propertyNow}}</div>
        </div>
      </div>
      <!-- 收缩弹窗 -->
      <div class="mask" :class="isScroll?'mask-block':''" @click="changeAlert"></div>
      <div class="alert-wrap" :class="isScroll?'alert-wrap-active':''">
        <div class="alert-inner">
          <div 
            class="alert-box"
            v-for="(item,index) in list"
            v-bind:key="index"
          >面条君</div>
        </div>
      </div>
      <!-- 操作按钮 -->
      <div @click="doAnimate" class="btn">click me -> doAni</div>
      <div @click="changeAlert" class="btn">click me -> alert</div>
    </div>
  </div>
</template>
<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  import Scene from 'scenejs'
import { clearInterval, setInterval } from 'timers';
  export default {
    name: "other",
    data(){
      return {
        property: 0,
        propertyNow: 0,
        coinScene: '',
        circleScene: '',
        coinItemScene: '',
        coinArr:[{x:0,y:0}],
        isHaveCoin: false,
        proWidth: 100,
        sum: 100,
        proNum: 0,
        canClick: true,
        controlStyle: false,
        isScale: false,
        list:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
        isScroll: false,
        timer: null,
      }
    },
    methods:{
      changeAlert(){
        this.isScroll = !this.isScroll
      },
      doAnimate(){
        if(!this.canClick) return;
        this.canClick = false
        this.proNum += 10
        this.proWidth = 100-(this.proNum/this.sum).toFixed(2)*100
        if(this.proWidth < 0){
          this.controlStyle = true
          this.canClick = true
          this.proWidth = 100
          this.proNum = 0
        }else{
          this.property += this.propertyNow
          this.propertyNow = 0
          this.controlStyle = false
          this.circleScene.play()
        }
      },
      onCircleEnded(){
        this.isHaveCoin = true
        this.coinScene.play()
      },
      onCoinPlay(){
        this.canClick = false
        this.isScale = true
      },
      onCoinEnded(){
        this.isHaveCoin = false
        this.canClick = true
        this.isScale = false
      },
      onCoinAnimate(){
        for(let k in this.coinItemScene){
          if(this.coinItemScene[k].isEnded()&&this.isScale){
            this.iconCoinScene.play()
          }
        }
      },
    },
    created(){
      let newArr = []
      while(newArr.length < 10){
        let str = `top:${parseInt(Math.random()*30)}px;left:${parseInt(Math.random()*50)}px;`
        newArr.push(str)
      }
      this.coinArr = newArr
    },
    mounted(){
      let targetEle = document.getElementsByClassName('icon-coin')[0]
      let targetX = targetEle.getBoundingClientRect().x
      let targetY = targetEle.getBoundingClientRect().y
      let coins = document.getElementsByClassName('coin')
      let disArr = []
      for(let i = 0; i < coins.length; i++){
        disArr.push({x:targetX-coins[i].getBoundingClientRect().x,y:targetY-coins[i].getBoundingClientRect().y})
      }
      this.circleScene = new Scene({
        '.circle':{
          0:{
            transform: "translateY(0)",
          },
          0.5:{
            transform: "translateY(-25px)",
          },
          1:{
            transform: "translateY(0)",
          }
        },
      },{
        selector: true,
        duration: 0.2,
        easing: "ease-in-out",
        iterationCount: '2',
      })
      this.circleScene.on('ended',e => this.onCircleEnded())
      this.coinScene = new Scene({
        ".coin": i => ({
          0:{
            transform: "translate(0,0) rotateY(0)",
          },
          1:{
            transform: 'translate('+(disArr[i].x)+'px,'+(disArr[i].y)+'px) rotateY(45deg)',
          },
          options:{
            delay: i * 0.1,
          }
        }),
      },
      {
        selector: true,
        easing: "ease-in-out",
        iterationCount: '1',
      });
      this.coinItemScene = this.coinScene.getItem('.coin').items.obj
      this.coinScene.on('play',e => this.onCoinPlay())
      this.coinScene.on('ended', e => this.onCoinEnded())
      this.coinScene.on('animate', e => this.onCoinAnimate())
      this.iconCoinScene = new Scene({
        ".icon-coin":{
          0:{
            transform: "scale(1)",
          },
          0.5:{
            transform: 'scale(1.5)',
          },
          1:{
            transform: 'scale(1)'
          }
        },
      },
      {
        selector: true,
        easing: "ease-in",
        iterationCount: '1',
        duration: 0.3,
      });
      if(this.timer) {clearInterval(this.timer)}
      this.timer = setInterval(()=>{
        this.propertyNow += 1
      },1000)
    },
    destroyed(){
      if(this.timer) {clearInterval(this.timer)}      
    },
  }
</script>
<style lang="less" scoped>
.cont_other{
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  padding: 50px;
  background-color:#f3f5f7;
  // css-展示区域
  .info-bar{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .bar{
      width: 200px;
      height: 50px;
      border-radius: 50px;
      background: gray;
      overflow: hidden;
      position: relative;
      .progress{
        width: 100%;
        height: 50px;
        border-radius: 50px;
        background: lightgray;
        position: absolute;
        left: -100%;
        transition: left 1s;
      }
      .progress-noani{
        width: 100%;
        height: 50px;
        border-radius: 50px;
        background: lightgray;
        position: absolute;
        left: -100%;
      }
      .icon{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        position: absolute;
        left:0;
        top:0;
        bottom:0;
        margin: auto 0;
      }
      .txt{
        width: 100%;
        height: 50px;
        border-radius: 50px;
        background: transparent;
        position: absolute;
        left: 0;
        text-align: center;
        line-height: 50px;
        color: white;
        font-size: 24px;
      }
    }
  }
  .circle{
    width: 250px;
    height: 250px;
    margin: 180px auto;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .bg{
      display: block;
      width: 100%;
      height: 100%;
    }
    .show-wrap{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .coin-wrap{
        width: 200px;
        height: 100px;
        visibility: hidden;
        position: absolute;
        top: 20px;
        left: 0;
        .coin{
          width: 48px;
          height: 48px;
          border-radius: 50%;
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
          margin: auto;
        }
      }
      .block-style{
        visibility: visible;
      }
      .default-coin{
        width: 48px;
        height: 48px;
        border-radius: 50%;
      }
      .coin-show{
        color: green;
        font-size: 26px;
      }
    }
    
  }
  // css-收缩弹窗
  .mask{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.7);
    display: none;
  }
  .alert-wrap{
    width: 100%;
    height: 60vh;
    box-sizing: border-box;
    padding: 30px 20px;
    border-radius: 30px 30px 0 0;
    background: #fff;
    position: fixed;
    left: 0;
    bottom: -100%;
    transition: bottom .3s;
    .alert-inner{
      width: 100%;
      height: 100%;
      overflow: auto;
      .alert-box{
        height: 90px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        color: black;
      }
    }
  }
  .mask-block{
    display: block;
  }
  .alert-wrap-active{
    bottom: 0;
  }
  // css-操作按钮
  .btn{
    width: 300px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: white;
    margin: 30px auto;
    border-radius: 100px;
    background: lightblue;
  }
  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
}
</style>
