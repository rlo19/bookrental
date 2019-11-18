import Vue from 'vue'
import TrxDialogModal from '../utils/DialogModal.vue'

export default function(msg, ok = 'OK', header = null, timer = null) {
    return new Promise(resolve => {
        const dialogVue = Vue.extend(TrxDialogModal);
        const dialog = new dialogVue({
            propsData: {
                message: msg,
                ok: ok,
                timer: timer,
                header: header
            }
        });

        dialog.$once('ok', () => {
            dialog.$destroy();
            dialog.$el.remove();
            resolve();
        });

        dialog.$mount();
        document.body.appendChild(dialog.$el);
    });
}