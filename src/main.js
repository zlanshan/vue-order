import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
// import Routers from './router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Admin from './pages/Admin.vue';
import Login from './pages/Login.vue';
// Vue.config.productionTip = false
import GoodsList from './pages/goods/GoodsList.vue';
import CategoryList from './pages/category/CategoryList.vue';
import AccountList from './pages/account/AccountList.vue';
import OrderList from './pages/order/OrderList.vue';
import OrderEdit from './pages/order/OrderEdit.vue';
import OrderLook from './pages/order/OrderLook.vue';
import axios from 'axios';
import store from './store';

axios.defaults.baseURL = "http://127.0.0.1:8899";
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;
// import 'babel-polyfill';
// 注册插件
Vue.use(VueRouter);
Vue.use(iView);
// The routing configuration
const Routers = [{ path: '/', redirect: '/admin' },
    { path: '/login', component: Login, meta: '登录页面' },
    {
        path: '/admin',
        component: Admin,
        meta: '购物商城',
        redirect: '/admin/orderlist',
        children: [
            { path: '/admin/goodslist', component: GoodsList, meta: '商品管理' },
            { path: '/admin/categorylist', component: CategoryList, meta: '栏目管理' },
            { path: '/admin/accountlist', component: AccountList, meta: '会员列表' },
            { path: '/admin/orderlist', component: OrderList, meta: '订单列表' },
            { path: '/admin/orderedit/:id', component: OrderEdit, meta: '订单编辑' },
            { path: '/admin/orderlook/:id', component: OrderLook, meta: '订单详情' },
        ]
    }
];

const RouterConfig = {
        routes: Routers
    }
    // http response 拦截器
    // axios.interceptors.response.use(
    //     response => {
    //         //这个判断是关键，如果返回登陆页面内容了，就刷新当前页面，经后端处理就会跳转到登陆页面了
    //         var temp = response.data + "";
    //         if (temp.indexOf('lkdjoifdgjdfgjdfgjfh14546') > -1) {
    //             router.go(0);
    //         }
    //         return response;
    //     },
    //     error => {
    //         if (error.response) {
    //             //退出登陆的时候就响应401即可
    //             if (error.response.status == 401) {
    //                 router.go(0);
    //             }
    //         }
    //         return Promise.reject(error.response.data) // 返回接口返回的错误信息
    //     }
    // );
const router = new VueRouter(RouterConfig);

/* to: Route: 即将要进入的目标 路由对象
    from: Route: 当前导航正要离开的路由
    next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
    next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。
    next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。
    next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。 */
// 利用vue-router提供的钩子函数beforeEach()对路由进行判断。
// to.meta中是我们自定义的数据，其中就包括我们刚刚定义的requireAuth字段
router.beforeEach((to, from, next) => {
    // 通过该路由是否需要登录权限
    if (to.matched.some(res => res.meta.requireAuth)) {
        // 通过vuex state 获取当前的token是否存在
        if (localStorage.getItem('username')) {
            next();
        } else {
            next({
                path: '/login',
                // 将跳转的路由path作为参数，登录成功后跳转到该路由
                query: {
                    redirect: to.fullPath
                }
            })
        }
    } else {
        next()
    }
})
new Vue({
    el: '#app',
    router: router,
    store,
    render: h => h(App),
}).$mount('#app')