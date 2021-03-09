import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login/Login'
import CarManagement from "@/view/administratorView/CarManagement";
import OrderManagement from "@/view/administratorView/OrderManagement";
import ViewInformation from "@/view/administratorView/ViewInformation";
import Home from "@/view/userView/Home";
import ModelQuery from "@/view/userView/ModelQuery";
import SelfDrivingCarRental from "@/view/userView/SelfDrivingCarRental";
import PersonalInformation from "../view/userView/PersonalInformation";

import HomeNavBar from "@/components/client/HomeNavBar";

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/CarManagement',
    component: CarManagement
  },
  {
    path: '/OrderManagement',
    component: OrderManagement
  },
  {
    path: '/ViewInformation',
    component: ViewInformation
  },
  {
    path:'/HomeNavBar',
    component: HomeNavBar
  },
  {
    path:'/Home',
    component: Home
  },
  {
    path: '/ModelQuery',
    component: ModelQuery
  },
  {
    path: '/SelfDrivingCarRental',
    component: SelfDrivingCarRental
  },
  {
    path: '/PersonalInformation',
    component: PersonalInformation
  }

]

const router = new VueRouter({
  routes
})

//解决跳转到同个路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
