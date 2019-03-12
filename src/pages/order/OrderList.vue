<template>
  <div>
    <Row class='order mb20' type='flex' justify='end'>
        <div class="choose" style='marginRight:20px'>
            <Select v-model="orderstatus" style="width:200px" @on-change='handleChoose'>
            <Option v-for="(item,index) in options" :value="item.value" :key="index">{{ item.label }}</Option>
            </Select>
        </div>
       <div class='search'>
           <Input v-model="searchvalue" placeholder="会员名称">
           <Button slot="append" icon="ios-search" @click='handleSearch'></Button>
           </Input>
       </div>
    </Row>
    <Table border ref="selection" :columns="columns4" :data='data'></Table>
    <div class='mt20'>
    <Page :total="totalcount" :current='pageIndex' :page-size='pageSize' :page-size-opts='size' show-total show-elevator show-sizer @on-change='handlePage' @on-page-size-change='handleSize'/>
    </div>
   
  </div>
</template>
<script>
    export default {
        data () {
            return {
                 options:[{
                        value:0,
                        label:'全部'
                    },{
                        value:1,
                        label:'待付款'
                    },
                    {
                    value:2,
                    label:'已付款'
                    },{
                        value:3,
                        label:'已发货'
                    },{
                        value:4,
                        label:'已签收'
                    },{
                        value:5,
                        label:'取消'
                    }],
                
                
                
                searchvalue:'',
                size:[5,10,15,20],
                statusValue:'',
                totalcount:0,
                orderstatus:0,
                // showSizer:5,
                'page-size':5,
                'page-size-opts':[5,10,15,20],
                pageIndex:1,
                // vipname:'ivanyb',
                pageSize:2,
                data:[],
                columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '订单id',
                        key: 'id'
                    },
                    {
                        title: '会员名称',
                        key: 'user_name'
                    },
                    {
                        title: '地址',
                        key: 'area'
                    },
                     {
                        title: '快递',
                        key: 'expressTitle'
                    },
                     {
                        title: '状态',
                        key: 'statusName'
                    },
                     {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        // type: 'info',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            // this.edit(params.index)
                                            this.edit(params.row);
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.row)
                                     }
                                    }
                                }, '查看')
                            ]);   
                        }
                     }
                ]          
             } 
        },
        methods:{
            // handleSelectAll (status) {
            //     this.$refs.selection.selectAll(status);
            // },
            // 设置当前页码的跳转,,但更改后面的页码数时不能动态改变？？
            // 可以改变  但是是鼠标的enter键按下后变动
            handlePage(val){
            // console.log(val);
             this.pageIndex=val;
             this.getorderList();
            },
            // 设置每页多少条数
            handleSize(val){
                this.pageSize=val;
                this.getorderList();
            },
            // 搜索功能没有实现，是请求中不带搜索值，即不能实现请求，渲染数据的
            // 这个搜索设置的是对应的vipname--即this.vipname=searchvalue
            handleSearch(){
               this.vipname=this.searchvalue;
               this.pageIndex=1;
               this.getorderList();
            },
            // 这是选择器选择快递的当前状态值的
            handleChoose(val){
                this.orderstatus=val;
                this.getorderList();
            },
             edit(data) {
                // this.data6.splice(index, 1);
                // params.row就是一行的数据还包括未显示的根据id获取的所有信息的
                // params返回的是数组，有点类似this.$route.matched
                // console.log(data.id);
                const id=data.id;
                this.$router.push(`/admin/orderedit/${id}`)
            },
             show (data) {
                 const id=data.id;
                this.$router.push(`/admin/orderlook/${id}`)
            },
           
            getorderList(){
                this.$axios({
                method:'get',
                url:'/admin/order/getorderlist',
                params:{
                 pageIndex:this.pageIndex,
                 pageSize:this.pageSize,
                 vipname:this.searchvalue,
                 orderstatus:this.orderstatus
                },
                 withCredentials: true
            }).then(res=>{
                // console.log(res);
                const {message,status,totalcount}=res.data;
                if(status==0){
                    this.data=message;
                    this.totalcount=totalcount;
                }
            })
            }
        },
        mounted(){
            this.getorderList();
        }
    }
    </script>
    
    <style>
  
    </style>
    