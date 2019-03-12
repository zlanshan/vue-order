<template>
<div>
<div class='look'>
    <h4>订单详情</h4>
    <p><span>订单id:</span>{{data.id}}</p>
    <p><span>会员名称:</span>{{data.user_name}}</p>
    <p><span>地址:</span>{{data.area}}</p>
    <p><span>快递:</span>{{data.expressTitle}}</p>
    <p><span>状态:</span>{{data.orderstatus}}</p>
    <p><span>购买时间:</span>{{data.payment_time}}</p>
</div>
<h4 style='margin-top:20px' class='list'>订单商品列表</h4>
 <Table stripe :columns="columns" :data="goodslist">
     <!-- slot-scope -->
      <template slot-scope="{row}" slot="action">
          <router-link to='/' class='ordera'>
          <Row type='flex' align='middle'>
            <div class='orderimg'>
            <img :src='row.imgurl' alt=''/>
            </div>
            <div>{{row.goods_title}}</div>
          </Row>
          </router-link>
      </template>
 </Table>
</div>
</template>
<script>
export default{
data(){
    return {
        id:'',
        goodslist:[],
        data:[],
        columns: [
            {
                title: '商品',
                slot:'action',
                // width:300,
                // align:'center'
            },
            {
                title: '类型',
                key: 'goods_no'
            },
            {
                title: '价格',
                key: 'real_price'
            }
        ],
    }
},
mounted(){
    this.id=this.$route.params.id;
    this.$axios({
        url:`/admin/order/getorderdetial/${this.id}`,
        withCredentials: true

        }).then(res=>{
            // console.log(res);
            const {message,status}=res.data;
            this.data=message.orderinfo;
            this.goodslist=message.goodslist;
        })
}
}
</script>


<style scoped>
/* .ivu-card-body{
background:#e9eef3;

} */
.ivu-row-flex{
flex-wrap: nowrap
}
.look h4,.list{
    font-weight:bold;
    font-size:16px;
    margin-bottom:10px;
}
.look p{
    height:30px;
    line-height:30px;
}
.look span{
    display:inline-block;
    font-size:15px;
    width:80px;
}
.ordera{
    color:#666;
    padding: 5px;
    /* font-size: 14px; */
}

/* 图片标题设置的高度 */
.orderimg{
    display:flex;
    width:64px;
    /* height:64px; */
    margin-right: 10px;
    flex-shrink:0;
    overflow: hidden;
    justify-content: center;
    align-items: center
}
.orderimg img{
    width:64px;
    display: block
}
</style>
