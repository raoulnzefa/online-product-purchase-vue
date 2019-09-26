import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Folders from '@/components/Folders'
import Businesscards from '@/components/Businesscards'
import Posters from '@/components/Posters'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Folders',
      component: Folders
    },
    {
      path: '/folders',
      name: 'Folders',
      component: Folders
    },
    {
      path: '/businesscards',
      name: 'Businesscards',
      component: Businesscards
    },
    {
      path: '/posters',
      name: 'Posters',
      component: Posters
    }
  ]
})
