<template>
    <Form :model="formItem" :label-width="80">
         <FormItem label="订单id">
            {{formItem.id}}
        </FormItem>
        <FormItem label="快递单号">
            <Input v-model="formItem.express_no"></Input>
        </FormItem>
        <FormItem label="快递费用">
            <Input v-model="formItem.express_fee"></Input>
        </FormItem>
        <FormItem label="收件人">
            <Input v-model="formItem.accept_name"></Input>
        </FormItem>
        <FormItem label="收货电话">
            <Input v-model="formItem.telephone"></Input>
        </FormItem>
        <FormItem label="收货手机">
            <Input v-model="formItem.mobile"></Input>
        </FormItem>
        <FormItem label="收货邮箱">
            <Input v-model="formItem.email"></Input>
        </FormItem>
        <FormItem label="收货地区">
            <Input v-model="formItem.area" placeholder="请输入收货地区"></Input>
        </FormItem>
        <FormItem label="收货地址">
            <Input v-model="formItem.address" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入收货地址"></Input>
        </FormItem> 
         <FormItem label="收货备注">
            <Input v-model="formItem.message" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="备注信息"></Input>
        </FormItem>
        <FormItem label="总金额">
            <Input v-model="formItem.order_amount"></Input>
        </FormItem>
        <FormItem label="订单状态">
            <Select v-model="formItem.orderstatus" style="width:200px">
                <Option  v-for='(item,index) in options' :key='index' :value="item.value">{{item.lable}}</Option>
            </Select>
        </FormItem>
        <FormItem>
            <Button type="primary" @click='handleEdit(formItem)'>保存</Button>
            <Button style="margin-left: 8px" @click='handleDel'>取消</Button>
        </FormItem>
    </Form>
</template>
<script>
    export default {
        data () {
            return {
                id:0,
                options:[{
                  value:1,
                  lable:'待付款'
                },{
                    value:2,
                    lable:'已付款'
                },{
                    value:3,
                    lable:'已发货'
                },{
                    value:4,
                    lable:'已签收'
                },{
                    value:5,
                    lable:'取消'
                }],
                formItem: {
                    id:'',
                    express_no:'',
                    express_fee:'',
                    accept_name:'',
                    telephone:'',
                    mobile:'',
                    email:'',
                    area:'',
                    address:'',
                    message:'',
                    order_amount:'',
                    orderstatus:''
                }
            }
        },
        methods:{
          handleEdit(data){
            this.$axios({
                method:'post',
                url:'/admin/order/updateorder',
                data:{orderinfo:this.formItem},
                withCredentials:true
            }).then(res=>{
                console.log(res);
                const {message,status}=res.data;
                if(status===0){
                    this.$Message.success(message);
                }
                setTimeout(()=>{
                   this.$router.replace('/admin/orderlist');
                },1000)
            })
          },
          handleDel(){
              this.$router.replace('/admin/orderlist');
          }
        },
        mounted(){
            this.id=this.$route.params.id;
            this.$axios({
              url:`/admin/order/getorderdetial/${this.id}`
            }).then(res=>{
                const {message,status}=res.data;
                if(status===0){
                    this.formItem=message.orderinfo
                }
            })
        }
    }
</script>
<style>

.ivu-card-body{
    overflow: scroll;
}

</style>
