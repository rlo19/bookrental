import Axios from 'axios'
import Loading from './Loading'

//set xmlhttprequest as the default for axios
Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

Axios.interceptors.request.use(config => {
    Loading.show()

    return config
}, error => {
    Loading.hide()

    return Promise.reject(error);
})

// intercept all reponses and reject any results with a status of false
Axios.interceptors.response.use(response => {
    Loading.hide()
    if (response.data.status != undefined && response.data.status === false) {
        if (response.data.msg == undefined || response.data.msg == '') {
            response.data.msg = 'System Error';
        }
        return Promise.reject({response: response});
    } 

    return response;
}, error => {
    Loading.hide()
    // default system error message
    if (error.response.data.msg == undefined) {
        error.response.data = {
            status: false,
            msg: 'System Error'
        };
    }
    return Promise.reject(error);
});

export default Axios