import Vue from 'vue'

import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

import App from './App.vue'

import { router } from './helpers';
import { store } from './store';

import './assets/scss/index.scss';

import interceptor from './helpers/httpInterceptor';
interceptor();
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
