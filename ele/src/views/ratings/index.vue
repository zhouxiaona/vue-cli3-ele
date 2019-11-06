<template>
  <div class="cont_ratings">
    <HeaderDefine/>
    <div class="ratings_main">
      <div class="dianzan">
        <div class="multiple">
          <div class="scoreAll">{{sellerData.score}}</div>
          <div class="rankAll">综合评分</div>
          <div class="rankDesc">高于周边商家{{sellerData.rankRate}}%</div>
        </div>
        <div class="dian_star">
          <div class="line_wrap">
            <div class="line_title">服务态度</div>
            <div class="line_stars">
              <!--星星组件-->
              <Star :score.sync="sellerData.serviceScore" />
            </div>
            <div class="line_score">{{sellerData.serviceScore}}</div>
          </div>
          <div class="line_wrap">
            <div class="line_title">食物评分</div>
            <div class="line_stars">
              <!--星星组件-->
              <Star :score.sync="sellerData.foodScore"/>
            </div>
            <div class="line_score">{{sellerData.foodScore}}</div>
          </div>
          <div class="line_wrap">
            <div class="line_title">送达时间</div>
            <div class="line_time">{{sellerData.deliveryTime}}分钟</div>
          </div>
        </div>
      </div>
      <div class="pingjia">
        <div class="pingjia_top">
          <div class="selectWrap">
            <div class="selectBar all">全部 <span>{{parseInt(Math.random()*40+10)}}</span></div>
            <div class="selectBar tuijian">推荐 <span>{{parseInt(Math.random()*60+20)}}</span></div>
            <div class="selectBar tucao">吐槽 <span>{{parseInt(Math.random()*80+30)}}</span></div>
          </div>
        </div>
        <div class="pingjia_bottom">
          <div 
            class="rankItem"
            v-for="(item, index) in ratingsData" 
            v-bind:key="index"
          >
            <div class="date_user">
              <div class="user">
                <img class="avater" :src="item.avatar"/>
                <div class="user_left">
                  <div class="nickname">{{item.username}}</div>
                  <Star 
                    :score.sync="item.score" 
                    :styles="'width:10px;height:9px;'"
                  />
                  <div class="achive_time">{{item.deliveryTime}}分钟送达</div>
                </div>
              </div>
              <div class="date">{{myTimer(item.rateTime)}}</div>
            </div>
           <div class="desc_txt">{{item.text}}</div>
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
              <div 
                class="food" 
                v-for="(val, key) in item.recommend" 
                v-bind:key="key"
              >{{val}}</div>
            </div>
          </div>
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
    name: "ratings",
    components: {
      HeaderDefine,
      FooterDefine,
      Star,
    },
    computed:{
      ...mapGetters([
        'sellerData',
        'ratingsData',
      ]),
    },
    methods: {
      myTimer(arg){
        return new Date(parseInt(arg)).toLocaleString().substr(0,16);
      },
    },
    mounted(){
      console.log('/ratings')
    }
  }
</script>

<style lang="less" scoped>
.cont_ratings{
  width: 100vw;
  box-sizing: border-box;
  height: calc(100vh-115px);
  overflow: auto;
  background-color:#f3f5f7;
  .ratings_main{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 359px;
    .dianzan{
      background: #fff;
      padding: 40px 30px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      margin-bottom: 30px;  
      .multiple{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 50px;
        .scoreAll{
          font-size: 60px;
          color: rgb(255, 153, 0);
        }
        .rankAll{
          font-size: 30px;
          color: rgb(7, 17, 27);
          margin: 20px 0;
        }
        .rankDesc{
          font-size: 26px;
          color: rgb(147,153,159);
        }
      }
      .dian_star{
        .line_wrap{
          display: flex;
          align-items: center;
          margin: 30px 0;
          .line_title{
            font-size: 30px;
            color: rgb(7, 17, 27);
          }
          .line_score{
            font-size: 30px;
            color: rgb(255, 153, 0);
          }
          .line_stars{
            margin: 0 20px;
          }
          .line_time{
            margin-left: 24px;
            font-size: 26px;
            color: rgb(147,153,159);
          }
        }
      }
    }
    .pingjia{
      padding: 40px 30px;
      background: #fff;
      .pingjia_top{
        padding-bottom: 30px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
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
            .user{
              display: flex;
              align-items: center;
              .avater{
                width: 74px;
                height: 74px;
                border-radius: 50%;
                margin-right: 10px;
              }
              .user_left{
                display: flex;
                flex-direction: column;
                justify-content: center;
                .nickname{
                  font-size: 26px;
                  color: rgb(147, 153, 159);
                }
                .achive_time{
                  font-size: 26px;
                  color: rgb(147, 153, 159);
                  margin-top: 8px;
                }
              }
            }
            .date{
              font-size: 26px;
              color: rgb(147, 153, 159);
            }
          }
          .desc_txt{
            font-size: 28px;
            color: rgb(7, 17, 27);
            margin: 20px 0 40px;
          }
          .user_txt{
            display: flex;
            align-items: center;
            .thumb{
              width: 32px;
              height: 32px;
              margin-right: 15px;
            }
            .food{
              padding: 5px;
              font-size: 20px;
              color: rgb(147, 153, 159);
              margin: 0 5px;
              border: 1px solid rgb(147, 153, 159);
            }
          }
        }
      }
    }
  }
}
</style>
