import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import firstPage from '../components/firstPage'
import secondPage from '../pages/secondPage'
import head from '../components/head'
import iView from 'iview'
import 'iview/dist/styles/iview.css'


Vue.use(Router)
Vue.use(iView)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'head',
      component: head
    },{
    	path:'/first',
    	name:'first',
    	component:firstPage
    },{
    	path:'/second',
    	name:'second',
    	component:secondPage
    }
  ]
})
