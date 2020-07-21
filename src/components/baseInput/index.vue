<template>
<div>
  <label>
    <input
      v-bind="$attrs"
      v-bind:value="value"
      v-on="inputListeners"
    >
  </label>
  <!-- <br/> -->
  <!-- <button @click="myevent($event)">myevent</button> -->

</div>
</template>

<script>
  export default {
    name: "baseInput",
    inheritAttrs: false,
    props: ['value'],
    computed:{
      inputListeners:function() {
        var vm = this
        // `Object.assign` 将所有的对象合并为一个新对象
        console.log(this.$listeners,'--$listeners--')
        console.log(this.$root,'--$root--')
        return Object.assign({},
          // 我们从父级添加所有的监听器
          this.$listeners,
          // 然后我们添加自定义监听器，
          // 或覆写一些监听器的行为
          {
            // 这里确保组件配合 `v-model` 的工作
            input: function (event) {
              vm.$emit('input', event.target.value)
            }
          }
        )
      }
    },
    // methods:{
    //   myevent($event){
    //     this.$emit('myevent', $event)
    //     // this.$emit('testFunc')
    //   },
    //   focus(){
    //     console.log('--focus--')
    //   },
    // },
  }
</script>

<style lang="less" scoped>

</style>
