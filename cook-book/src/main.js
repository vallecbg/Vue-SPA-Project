import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import '@babel/polyfill';
//TODO: think about removing progressbar from there
import ProgressBar from 'vuejs-progress-bar'
Vue.use(ProgressBar);

Vue.config.productionTip = false;

const EventBus = new Vue();

Vue.prototype.$bus = EventBus;

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app');
