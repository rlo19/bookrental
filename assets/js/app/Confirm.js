import Vue from 'vue'
import TrxDialogModal from '../utils/DialogModal.vue'

export default function(msg, ok = 'OK', cancel = 'cancel', header = null, timer = null) {
    return new Promise((resolve, reject) => {
        const dialogVue = Vue.extend(TrxDialogModal);
        const dialog = new dialogVue({
            propsData: {
                message: msg,
                ok: ok,
                cancel: cancel,
                timer: timer,
                header: header
            }
        });

        dialog.$once('ok', () => {
            dialog.$destroy();
            dialog.$el.remove();
            resolve();
        });

        dialog.$once('cancel', () => {
            dialog.$destroy();
            dialog.$el.remove();
            reject();
        });

        dialog.$mount();
        document.body.appendChild(dialog.$el);
    });
}