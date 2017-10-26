import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import drawYahoo from '../components/drawYahoo'
import secondPage from '../pages/secondPage'
import head from '../components/head'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Yahoo from '../components/yahoo'
import ipList from '../components/ip_list'
import secondaryEmail from '../components/secondary_email'
import instagram from '../components/instagram'
import manualQueries from '../components/manualQueries'


Vue.use(Router)
Vue.use(iView)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },{
    	path:'/drawYahoo',
    	name:'drawYahoo',
    	component:drawYahoo
    },{
    	path:'/ipList',
    	name:'ipList',
    	component:ipList
    },
    {
    	path:'/yahoo',
    	name:'yahoo',
    	component:Yahoo
    },
    {
    	path:'/secondaryEmail',
    	name:'secondaryEmail',
    	component:secondaryEmail
    },
    {
    	path:'/instagram',
    	name:'instagram',
    	component:instagram
    },{
    	path:'/manualQueries',
    	name:'manualQueries',
    	component:manualQueries
    },
  ]
})
