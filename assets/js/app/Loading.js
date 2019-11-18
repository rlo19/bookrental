import Vue from 'vue'
import TrxLoadingIndicator from '../utils/LoadingIndicator.vue'

const indicator = Vue.extend(TrxLoadingIndicator)
export default {
    i: null,

    show: function() {
        if (this.i == null) {
            this.i = new indicator();
            this.i.$mount();
            document.body.appendChild(this.i.$el)
        } else {
            this.i.showp()
        }
    },

    hide: function() {
        var self = this
        if (this.i != null) {
            this.i.hide()
            this.i.$once('hide', () => {

            })
        }
    }
}