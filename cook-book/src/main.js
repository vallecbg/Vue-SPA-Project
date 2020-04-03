import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import '@babel/polyfill';
import MaterialKit from './plugins/material-kit';
import VueDisqus from 'vue-disqus'

Vue.use(MaterialKit);
Vue.use(VueDisqus)

Vue.config.productionTip = false;

const EventBus = new Vue();

Vue.prototype.$bus = EventBus;

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app');
