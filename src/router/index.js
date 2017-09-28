import Vue from 'vue'
import Router from 'vue-router'
import GZPage from 'components/gz-index/gz-index'
import CQPage from 'components/cq-index/cq-index'
import GZDetailPage from 'components/gz-detail/gz-detail'
import CQDetailPage from 'components/cq-detail/cq-detail'
import HouseDetailPage from 'components/house-detail/house-detail'

Vue.use(Router)

export default new Router({
  routes: [
  	  {
  	  	path: '/',
  	  	redirect: '/cq'
  	  },
  	  {
  	  	path: '/gz',
  	  	component: GZPage,
  	  	children: [
  	  		{
  	  			path: 'detail',
  	  			component: GZDetailPage,
  	  			children: [
  	  				{
  	  					path: ':id',
  	  					component: HouseDetailPage
  	  				}
  	  			]
  	  		}
  	  	]
  	  },
  	  {
  	  	path: '/cq',
  	  	component: CQPage,
        children: [
          {
            path: ':id',
            component: CQDetailPage
          }
        ]
  	  },
  	  {
  	  	path: '*',
  	  	component: {
  	  		template: '<div>404 page</div>'
  	  	}
  	  }
  ]
})
