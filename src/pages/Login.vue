<template>
<div class='login'>
    <div class="login-page">登录</div>
    <Form ref="formCustom" :model="formCustom"  :label-width="80">
         <FormItem label="账号" prop="user">
            <Input type="text" v-model="formCustom.uname"></Input>
        </FormItem>
        <FormItem label="密码" prop="passwd">
            <Input type="password" v-model="formCustom.upwd"></Input>
        </FormItem>
       
        <FormItem style='text-align:center'>
            <Button type="primary" @click="handleSubmit">登录</Button>
            <Button @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
    </div>
</template>
<script>
    export default {

        data () {  
            return {
                formCustom: {
                   uname:'',
                   upwd:''
                }
            }
        },
        methods: {
            handleSubmit () {
                // var username=this.formCustom.uname;
                // var upwd=this.formCustom.upwd;
                this.$store.dispatch("user/login",this.formCustom).then(res=>{
                    this.$Message.success('登录成功');
                    setTimeout(()=>{
                    this.$router.push('/admin/orderlist');
                    },1000)
                })
            //    this.$axios({
            //        method:'post',
            //        url:'/admin/account/login',
            //        data:this.formCustom,
            //        withCredentials: true
            //    }).then(res=>{
            //     //    console.log(res);
            //     const {message,status}=res.data;
            //     if(status===0){
            //         this.$Message.success('登录成功');
            //         setTimeout(()=>{
            //             this.$router.push('/admin');
            //         },1000)
            //     }else{
            //         this.$Message.error('账号或密码错误')
            //     }
            //    })
            },
            handleReset (name) {
                // this.$refs[name].resetFields();
                this.formCustom={
                      uname:'',
                      upwd:''
                };
            }
        }
    }
</script>
<style>
.login{
    width:500px;
    /* margin:0 auto; */
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-60%,-60%);
}
.login-page{
    text-align: center;
    font-size: 18px;
    color: #2d8cf0;
    margin-bottom: 20px;
    padding-left:50px;
}
</style>
