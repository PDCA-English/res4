import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Shop from '../views/Shop.vue'
import Mypage from '../views/Mypage.vue'
import Thanks from '../views/Thanks.vue'
import ShopRegister from '../views/ShopRegister.vue'
import TableRegister from '../views/TableRegister.vue'
import store from "../store/index";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/shop/:id",
    name: "shop",
    component: Shop,
    meta: {
      requiresAuth: true,
    },
    props: true,
  },
  {
    path: "/mypage",
    name: "Mypage",
    component: Mypage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/thanks",
    name: "Thanks",
    component: Thanks,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/shopRegister",
    name: "ShopRegister",
    component: ShopRegister,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/tableRegister",
    name: "TableRegister",
    component: TableRegister,
    meta: {
      requiresAuth: true,
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !store.state.auth
  ) {
    next({
      path: "/",
      query: {
        redirect: to.fullPath,
      },
    });
  } else {
    next();
  }
});


export default router
