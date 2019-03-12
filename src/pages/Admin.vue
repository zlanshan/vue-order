<template>
    <div class="layout">
        <Sider ref="side1" collapsible v-model='isCollapsed' :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <div class='logo'>logo</div>
            <shop-aside></shop-aside>  
        </Sider>
        <!-- :style="{marginLeft: '200px'}" -->
        <Layout  :style="{marginLeft:marginLeft}" width='auto'>
            <shop-header @on-collapse='shopCol'></shop-header>
            <Content :style="{padding: '0 16px 16px'}">
                <shop-breadcrump :dataSource='bread'></shop-breadcrump>
                <Card>
                    <div style="height: 600px"><router-view></router-view></div>
                </Card>
            </Content>
        </Layout>
    </div>
</template>
<script>
import Aside from '../components/Aside';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrump'
    export default {
        components:{
         'shop-aside':Aside,
         'shop-header':Header,
         'shop-breadcrump':Breadcrumb
        },
         data () {
            return {
                isCollapsed: false,
                marginLeft:'200px'
            }
        },
        methods:{
            shopCol(){
                 this.isCollapsed=!this.isCollapsed;
                //  这是判断右边的按钮控制器左边外边框的距离
                 if(this.marginLeft==='64px'){
                 this.marginLeft=200+'px';
                 }else{
                 this.marginLeft=64+'px';
                 }

                //  console.log(2);
                // this.$refs.side1.toggleCollapse();
            }
        },
        computed:{
            bread(){
                // console.log(this.$route.matched)
               var arr=this.$route.matched.map(v=>{
                   return {
                       src:v.path,
                       title:v.meta
                   }
               })
               return arr;
            }
        }
        
    }
</script>
<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
   
    .logo{
        font-size: 0;
        height: 64px;
        background: #515a6e;
    }

    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>
