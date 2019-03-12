<template>
  <div>
    <Menu active-name="3-1" theme="dark" width="auto" :open-names="['3']">
      <Submenu  v-for='(item,index) in menu' :key='index' :name="`${index+1}`">
        <template slot="title">
          <Icon :type="item.icon"></Icon>{{item.title}}
        </template>
        <MenuItem  v-for='(item2,index2) in item.group' :key='index2'                                                                                                                                                                                                                                                                                                                                                   
        :name='`${index+1}-${index2+1}`'>
        <router-link :to='item2.src'>{{item2.content}}</router-link> 
        </MenuItem>  
      </Submenu>
    </Menu>
  </div>
</template>
<script>
export default {
    data(){
        return {
         menu:[{
             icon:'md-apps',title:'购物商城',
             group:[{src:'/admin/goodslist',content:'商品管理'},
             {src:'/admin/categorylist',content:'栏目管理'}]
         },{
           icon:'ios-headset-outline',title:'会员管理',
           group:[{src:'/admin/accountlist',content:'会员列表'}]
         },{
           icon:'ios-paper',title:'商城订单',
           group:[{src:'/admin/orderlist',content:'订单列表'}]
         }]
        }
    }
//   data() {
//     return {
//       theme2: "light"
//     };
//   }
};
</script>
<style scoped>
.ivu-menu a{
  color:#fff;
}
.ivu-menu .ivu-menu-dark .ivu-menu-vertical{
  width:64px;
}
</style>
