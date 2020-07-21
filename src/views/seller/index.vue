<template>
  <div class="cont_seller">
    <HeaderDefine/>
    <div class="seller_main">
      <div class="zpxf">
        <div class="zpxf_top">
          <div class="zpxf_left">
            <h2>{{sellerData.name}}</h2>
            <Star :score="sellerData.score"/>
            <div class="info_show">
              <span class="num num1">({{parseInt(Math.random()*600+50)}})</span>
              <span class="num num2">月售{{parseInt(Math.random()*600+500)}}单</span>
            </div>
          </div>
          <div class="like">
            <img class="like_icon" src="@/assets/img/cellection.png"/>
            <div class="like_txt">已收藏</div>
          </div>
        </div>
        <div class="zpxf_bottom">
          <div class="show_box">
            <div class="lineTop">起送价</div>
            <div class="lineBom"><span>{{sellerData['minPrice']}}</span>元</div>
          </div>
          <div class="show_box show_mid_box">
            <div class="lineTop">商家配送</div>
            <div class="lineBom"><span>{{sellerData['deliveryPrice']}}</span>元</div>
          </div>
          <div class="show_box">
            <div class="lineTop">平均配送时间</div>
            <div class="lineBom"><span>{{sellerData['deliveryTime']}}</span>分钟</div>
          </div>
        </div>
      </div>
      <div class="nodes">
        <h2>公告与活动</h2>
        <p>{{sellerData.bulletin}}</p>
        <div class="sign_wrap">
          <div 
            v-for="(v,k) in sellerData.supports" 
            v-bind:key="k"
            class="lis"
          >
            <img class="sign" src="@/assets/img/discount_3@2x.png" v-show="k%2==0&&k!==0"/>
            <img class="sign" src="@/assets/img/special_3@2x.png" v-show="k%2!==0"/>
            <img class="sign" src="@/assets/img/decrease_3@2x.png" v-show="k==0"/>
            <span class="sign_txt">{{v.description}}</span>
          </div>
        </div>
      </div>
      <div class="scene">
        <h2>商家实景</h2>
        <div class="slider">
          <div class="slider_inner">
            <img 
              v-for="(val,key) in sellerData['pics']" 
              v-bind:key="key" 
              :src="val" 
            />
          </div>
        </div>
      </div>
      <div class="message">
        <h2>商家信息</h2>
        <div class="msg_wrap">
          <div 
            v-for="(vals,keys) in sellerData['infos']" 
            v-bind:key="keys"
            class="msg_li"
          >{{vals}}</div>
        </div>
      </div>
    </div>
    <FooterDefine/>
  </div>
</template>
<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  import HeaderDefine from '@/components/headerDefine/index'
  import FooterDefine from '@/components/footerDefine/index'
  import Star from '@/components/star/index'
  export default {
    name: "seller",
    components:{
      HeaderDefine,
      FooterDefine,
      Star
    },
    computed:{
      ...mapGetters([
        'sellerData',
      ]),
    },
    mounted(){
      console.log('/seller')
    }
  }
</script>
<style lang="less" scoped>
.cont_seller{
  width: 100vw;
  box-sizing: border-box;
  height: calc(100vh-115px);
  overflow: auto;
  background-color:#f3f5f7;
  .seller_main{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 359px;
    .zpxf,.nodes,.scene,.message{
      background: #fff;
      padding: 40px;
      border-top: 1px solid rgba(7, 17, 27, 0.1);
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      margin-bottom: 40px;
    }
    .message{
      margin-bottom: 0;
    }
    .zpxf{
      .zpxf_top{
        padding-bottom: 40px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        .zpxf_left{
          h2{
            font-size: 35px;
            color: rgb(7, 17, 27);
            margin-bottom: 20px;
          }
          .info_show{
            display: flex;
            align-items: center;
            .num{
              font-size: 26px;
              color: rgb(7, 17, 27);
              margin-top: 20px;
            }
            .num1{
              margin-right: 10px;
            }
          }
        }
        .like{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .like_icon{
            width: 48px;
            height: 48px;
            margin-bottom: 20px;
          }
          .like_txt{
            font-size: 24px;
            color: rgb(77, 85, 93);
          }
        }
      }
      .zpxf_bottom{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 40px;
        .show_box{
          width: 33.3%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .lineTop,.lineBom{
            font-style: normal;
            font-size: 26px;
            color: rgb(147, 153, 159);
          }
          .lineBom{
            span{
              font-size: 60px;
              color: rgb(7, 17, 27);
            }
          }
        }
        .show_mid_box{
          border-right: 1px solid rgba(7, 17, 27, 0.1);
          border-left: 1px solid rgba(7, 17, 27, 0.1);
        }
      }
    }
    .nodes{
      h2{
        font-size: 35px;
        color: rgb(7, 17, 27);
      }
      p{
        font-size: 25px;
        color: rgb(240, 20, 20);
        line-height: 50px;
        padding: 20px 30px;
      }
      .sign_wrap{
        padding: 0 30px;
        .lis{
          height:100px;
          border-top: 1px solid rgba(7, 17, 27, 0.1);
          display: flex;
          align-items: center;
          .sign{
            width: 30px;
            height: 30px;
            margin-right: 15px;
          }
          .sign_txt{
            font-size: 25px;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
    .scene{
      h2{
        font-size: 35px;
        color: rgb(7, 17, 27);
        margin-bottom: 20px;
      }
      .slider{
        width: 100%;
        overflow-y: hidden;
        overflow-x: auto;
        .slider_inner{
          display: flex;
          align-items: center;
          flex-wrap: nowrap;
          img{
            display: block;
            width: 190px;
            height: 190px;
            margin-right: 10px;
          }
        }
      }
    }
    .message{
      h2{
        font-size: 35px;
        color: rgb(7, 17, 27);
      }
      .msg_wrap{
        padding: 30px;
        .msg_li{
          height: 90px;
          line-height: 90px;
          font-size: 25px;
          color: rgb(147, 153, 159);
          border-top: 1px solid rgba(7, 17, 27, 0.1);
        }
      }
    }
  }
}
</style>
