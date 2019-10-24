import Vue from 'vue'
import App from './App'
import Router from './router';

Vue.config.productionTip = false

export default new Vue({
    el: '#app',
    router: Router,
    render: h => h(App),
});
