import Vue from 'vue'
import VueRouter from 'vue-router'
import DragDrop from '../components/drag_drop/Index'
import Start from "../components/drag_drop/Start";
import Maket from "../components/drag_drop/Maket";
import Home from "../views/Home";

Vue.use(VueRouter);

const routes = [
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/drag-drop',
    name: 'DragDrop',
    component: DragDrop,
    meta: {
      layout: 'Default'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'Start',
    component: Start,
    meta: {
      layout: 'Default'
    }
  },
  {
    path: '/maket',
    name: 'Maket',
    component: Maket,
    meta: {
      layout: 'Default'
    }
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
