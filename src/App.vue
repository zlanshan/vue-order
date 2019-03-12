<template>
  <div id="app">
  <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  mounted(){
    this.$axios({
      url:'/admin/account/islogin',
       withCredentials: true
       }).then(res=>{
        //  如果不设置withCredentials:true的话，，页面每次刷新时都得去登录，也能通过地址栏直接进入界面的
        // 如果设置的话，，可以通过地址栏之间进入界面的
      // console.log(res);
      const {code}=res.data;
      if(code==='nologin'){
        this.$router.push('/login');
      }

    })
  }
}
</script>

<style>
#app {
  
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 0px; */
}
*{
  margin: 0;
  padding: 0;
}
.mt20{
  margin-top: 20px;
}
.mb20{
  margin-bottom: 20px;
}
</style>
