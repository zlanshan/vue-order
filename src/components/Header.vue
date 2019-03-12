<template>
  <div>
    <Header :style="{padding: 0}" class="layout-header-bar">
    <Row type='flex' align='middle' justify='space-between' >
      <Icon
        @click.native="collapsedSider"
        type="md-menu"
        :style="{margin: '0 20px',transform:'rotate('+translate+')'}"
        size="24"
      ></Icon>
      <!-- 为什么添加了这些后其icon按钮点击后不能再次点击的那种？ 这是下面功能没完成，自动保存，后面不能再改的-->
       <!-- <a href="javascript:void(0)" class='exit' @click='handleExit'>退出</a> -->
      <div class='username'>{{username}} {{identity}} </div>
      <div>
      <a href="javascript:void(0)" class='exit' @click='handleExit'>退出</a>
      </div> 
</Row>
      
        <!--
        :class="rotateIcon"   -->
    </Header>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
//   props: ["dataSource"],
data(){
  return {
    translate:0
  }
},
  methods: {
    handleExit(){
      // 第一个参数尽量写成双引号的，后期可能有bug的
      this.$store.dispatch("user/handleExit",()=>{
      this.$router.replace('/login');
      })
    },
    collapsedSider() {
        // this.$refs.side1.toggleCollapse();
        // 图标按钮展开和收起时选择下
        if(this.translate==0){
        this.translate='90deg'
        }else{
          this.translate=0;
        }
       this.$emit("on-collapse");
    }
  },
  computed:{
    ...mapState('user',{
      username:'username',
      identity:state=>state.identity
    })
  }
};
</script>

<style>
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.exit{
  color:#2d8cf0;
  font-size: 14px;
  margin-right:10px;
}
.username{
  font-size: 14px;
}
</style>
