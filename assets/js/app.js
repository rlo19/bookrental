import Vue from 'vue'
import jquery from 'jquery'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Notifications from 'vue-notification'
import Axios from './app/Http'
import Alert from './app/Alert'
import Confirm from './app/Confirm'


var $ = jquery
/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

Vue.use(BootstrapVue)
//Vue.use(BoostrapVue)
Vue.use(Notifications)

Vue.prototype.$http = Axios

// extend vue to add a promise based confirmation dialog
Vue.prototype.$confirm = Confirm

// extend vue to add a modal based alert function
Vue.prototype.$alert = Alert

// Enable all bootstrap tooltips
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

// any CSS you require will output into a single css file (app.css in this case)
require('../css/app.css');

// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.
// const $ = require('jquery');

window.Vue = Vue
window.$ = $
window.Axios = Axios

console.log('Hello Webpack Encore! Edit me in assets/js/app.js');
