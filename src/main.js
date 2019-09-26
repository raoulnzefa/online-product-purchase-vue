// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Axios from 'axios';

import NavBar from './components/NavBar.vue'
import Folders from './components/Folders.vue'
import ShoppingCart from './components/ShoppingCart.vue'

Vue.config.productionTip = false;

Axios.defaults.baseURL = process.env.API_ENDPOINT;

Vue.use(BootstrapVue);

// Components
Vue.component('NavBar', NavBar)
Vue.component('Folders', Folders)
Vue.component('ShoppingCart', ShoppingCart)

// Filters
Vue.filter('currency', function (value) {
  return '€' + parseFloat(value / 100).toFixed(2);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
