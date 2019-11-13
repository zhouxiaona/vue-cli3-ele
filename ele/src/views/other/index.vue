<template>
  <div class="cont_other">
    <HeaderDefine/>
    <div class="other_main">
      <BaseInput
        v-model="username"
        required
        placeholder="Enter your username"
        @myevent="myevent"
        @focus="onFocus"
      />
      {{username}}
    </div>
    <FooterDefine/>
  </div>
</template>
<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  import HeaderDefine from '@/components/headerDefine/index'
  import FooterDefine from '@/components/footerDefine/index'
  import Star from '@/components/star/index'
  import BaseInput from '@/components/baseInput/index'
  export default {
    name: "other",
    data(){
      return {
        username:''
      }
    },
    components:{
      HeaderDefine,
      FooterDefine,
      Star,
      BaseInput,
    },
    computed:{
      ...mapGetters([
        'sellerData',
      ]),
    },
    watcher:{
      
    },
    // event:{
    //   testFunc(){
    //     console.log('--testFunc--')
    //   }
    // },
    methods:{
      myevent(arg){
        // console.log(this.$event,'--$event--')
        console.log('myevent',arg)
      },
      onFocus(){
        console.log('--onFocus--')
      }
    },
    // 生命周期函数全部
    beforeCreate(){
      console.log('beforeCreate')
    },
    created(){
      console.log('created')
    },
    beforeMount(){
      console.log('beforeMount')
    },
    mounted(){
      console.log('mounted')
    },
    beforeUpdate(){
      console.log('beforeUpdate')
    },
    updated(){
      console.log('updated')
    },
    beforeDestroy(){
      console.log('beforeDestroy')
    },
    destroyed(){
      console.log('destroyed')
    },
  }
</script>
<style lang="less" scoped>
.cont_other{
  width: 100vw;
  box-sizing: border-box;
  height: calc(100vh-115px);
  overflow: auto;
  background-color:#f3f5f7;
  .other_main{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 359px;
  }
}
</style>
